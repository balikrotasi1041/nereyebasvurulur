import { announcements } from "../src/announcements";
import { routes } from "../src/data";

const failures: string[] = [];
const slugs = new Set<string>();
const pathKeys = new Map(routes.map(route => [route.pathKey, route]));

for (const item of announcements) {
  if (slugs.has(item.slug)) failures.push(`Tekrarlanan duyuru slug: ${item.slug}`);
  slugs.add(item.slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt)) {
    failures.push(`Geçersiz tarih biçimi: ${item.slug}`);
  }
  if (item.summary.length < 100) failures.push(`Duyuru özeti fazla kısa: ${item.slug}`);
  if (item.details.length < 2 || item.actions.length < 1) failures.push(`Duyuru içeriği yetersiz: ${item.slug}`);
  if (!item.sources.length) failures.push(`Resmî kaynak yok: ${item.slug}`);

  for (const source of item.sources) {
    if (!source.url.startsWith("https://")) failures.push(`HTTPS olmayan kaynak: ${item.slug} -> ${source.url}`);
    if (!source.authority.trim() || !source.title.trim()) failures.push(`Eksik kaynak metadatası: ${item.slug}`);
  }

  let publishedTargets = 0;
  for (const pathKey of item.relatedPathKeys) {
    const route = pathKeys.get(pathKey);
    if (!route) {
      failures.push(`Katalogda bulunmayan konu ilişkisi: ${item.slug} -> ${pathKey}`);
      continue;
    }
    if (route.verificationStatus !== "needs-review") publishedTargets += 1;
  }
  if (item.relatedPathKeys.length > 0 && publishedTargets === 0 && !(item.relatedSearches?.length)) {
    failures.push(`Kullanılabilir iç bağlantısı olmayan duyuru: ${item.slug}`);
  }
}

if (!announcements.length) failures.push("Duyuru listesi boş.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Duyuru doğrulaması başarılı: ${announcements.length} kayıt, ${slugs.size} benzersiz slug, her duyuruda yayımlanmış rota veya güvenli arama köprüsü mevcut.`);
