import { announcements } from "../src/announcements";
import { supplementalAnnouncements } from "../src/supplemental-announcements";

const failures: string[] = [];
const existingSlugs = new Set(announcements.map(item => item.slug));
const seen = new Set<string>();
const requiredSlugs = new Set([
  "2026-dgs-tercihleri-basladi",
  "2026-kpss-lisans-sinava-giris-belgeleri",
  "2026-kpss-ortaogretim-basvurulari-basladi",
  "3713-terorle-mucadelede-yaralananlar-e-devlet-basvurusu",
  "2026-e-ydts-2-turkce-basvurulari",
  "2027-cks-basvurulari-basladi",
  "ipard-iii-12-cagri-basvuru-paketi-son-teslim-7-eylul",
  "2026-hayvancilik-destekleri-1-donem-basvurulari"
]);

for (const item of supplementalAnnouncements) {
  if (existingSlugs.has(item.slug)) failures.push(`Ana duyuru listesiyle çakışan slug: ${item.slug}`);
  if (seen.has(item.slug)) failures.push(`Tekrarlanan ek duyuru slug: ${item.slug}`);
  seen.add(item.slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(item.lastModified)) {
    failures.push(`Geçersiz tarih biçimi: ${item.slug}`);
  }
  if (item.summary.length < 100) failures.push(`Ek duyuru özeti fazla kısa: ${item.slug}`);
  if (item.details.length < 2 || item.actions.length < 1) failures.push(`Ek duyuru içeriği yetersiz: ${item.slug}`);
  if (!item.sources.length) failures.push(`Ek duyuruda resmî kaynak yok: ${item.slug}`);
  if (!item.relatedSearches?.length && item.relatedPathKeys.length === 0) failures.push(`Ek duyuruda güvenli iç bağlantı köprüsü yok: ${item.slug}`);

  for (const source of item.sources) {
    if (!source.url.startsWith("https://")) failures.push(`HTTPS olmayan ek kaynak: ${item.slug} -> ${source.url}`);
    if (!source.authority.trim() || !source.title.trim()) failures.push(`Eksik ek kaynak metadatası: ${item.slug}`);
  }
}

for (const slug of requiredSlugs) {
  if (!seen.has(slug)) failures.push(`Beklenen ek duyuru eksik: ${slug}`);
}
if (supplementalAnnouncements.length !== requiredSlugs.size) failures.push(`Ek duyuru seti beklenmeyen sayıda kayıt içeriyor: ${supplementalAnnouncements.length}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Ek duyuru doğrulaması başarılı: ${supplementalAnnouncements.length} kayıt, ana duyuru listesiyle slug çakışması yok.`);