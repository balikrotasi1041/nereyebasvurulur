import { announcements } from "../src/announcements";
import { supplementalAnnouncements } from "../src/supplemental-announcements";

const failures: string[] = [];
const existingSlugs = new Set(announcements.map(item => item.slug));
const seen = new Set<string>();

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

if (supplementalAnnouncements.length !== 2) failures.push(`28 Ağustos ek duyuru seti beklenmeyen sayıda kayıt içeriyor: ${supplementalAnnouncements.length}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Ek duyuru doğrulaması başarılı: ${supplementalAnnouncements.length} kayıt, ana duyuru listesiyle slug çakışması yok.`);
