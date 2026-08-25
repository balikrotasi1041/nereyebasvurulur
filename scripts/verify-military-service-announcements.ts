import { announcements } from "../src/announcements";
import { routes } from "../src/data";
import { militaryServiceAnnouncements } from "../src/military-service-announcements";

const failures: string[] = [];
const pathKeys = new Map(routes.map(route => [route.pathKey, route]));
const baseSlugs = new Set(announcements.map(item => item.slug));
const slugs = new Set<string>();
const allowedHosts = new Set(["www.msb.gov.tr", "msb.gov.tr", "www.turkiye.gov.tr", "turkiye.gov.tr"]);

if (militaryServiceAnnouncements.length !== 5) failures.push(`Beklenen 5 Askeralma duyurusu yerine ${militaryServiceAnnouncements.length} kayıt var.`);

for (const item of militaryServiceAnnouncements) {
  if (slugs.has(item.slug) || baseSlugs.has(item.slug)) failures.push(`Tekrarlanan duyuru slug: ${item.slug}`);
  slugs.add(item.slug);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt)) failures.push(`Geçersiz tarih biçimi: ${item.slug}`);
  if (item.verifiedAt !== "2026-08-25") failures.push(`Beklenmeyen doğrulama tarihi: ${item.slug}`);
  if (item.summary.length < 100 || item.details.length < 3 || item.actions.length < 2) failures.push(`Yetersiz içerik: ${item.slug}`);
  if (!item.sources.length) failures.push(`Resmî kaynak yok: ${item.slug}`);

  for (const source of item.sources) {
    try {
      const url = new URL(source.url);
      if (url.protocol !== "https:") failures.push(`HTTPS olmayan kaynak: ${item.slug} -> ${source.url}`);
      if (!allowedHosts.has(url.hostname)) failures.push(`İzin verilmeyen kaynak alan adı: ${item.slug} -> ${url.hostname}`);
    } catch {
      failures.push(`Geçersiz kaynak URL: ${item.slug} -> ${source.url}`);
    }
  }

  let usableTargets = 0;
  for (const pathKey of item.relatedPathKeys) {
    const route = pathKeys.get(pathKey);
    if (!route) failures.push(`Katalogda bulunmayan askerlik konu ilişkisi: ${item.slug} -> ${pathKey}`);
    else if (route.verificationStatus !== "needs-review") usableTargets += 1;
  }
  if (!item.relatedPathKeys.length) failures.push(`İç bağlantı hedefi olmayan kayıt: ${item.slug}`);
  if (usableTargets === 0 && !(item.relatedSearches?.length)) failures.push(`Kullanılabilir iç bağlantısı olmayan askerlik duyurusu: ${item.slug}`);
}

const normalCalendar = militaryServiceAnnouncements.find(item => item.slug === "2026-normal-tertip-er-celp-sevk-takvimi");
if (!normalCalendar || normalCalendar.calendarRows?.length !== 4) failures.push("Normal tertip 2026 takvimi 4 sınıflandırma dönemi içermiyor.");
else {
  const august = normalCalendar.calendarRows.find(row => row.period === "Ağustos 2026");
  const november = normalCalendar.calendarRows.find(row => row.period === "Kasım 2026");
  if (august?.resultDate !== "30 Temmuz 2026" || august?.group2 !== "3 Eylül 2026" || august?.group3 !== "1 Ekim 2026") failures.push("Ağustos 2026 sınıflandırma/sevk tarihleri beklenen resmî takvimle uyuşmuyor.");
  if (november?.resultDate !== "27 Ekim 2026" || november?.group1 !== "5 Kasım 2026" || november?.group2 !== "3 Aralık 2026" || november?.group3 !== "7 Ocak 2027") failures.push("Kasım 2026 sınıflandırma/sevk tarihleri beklenen resmî takvimle uyuşmuyor.");
}

const novemberNotice = militaryServiceAnnouncements.find(item => item.slug === "kasim-2026-siniflandirma-donemi-duyurusu");
if (novemberNotice?.deadlineAt !== "2026-08-31T23:59:59+03:00") failures.push("Kasım 2026 tercih son tarihi 31 Ağustos olarak kilitlenmemiş.");

const bedelli = militaryServiceAnnouncements.find(item => item.slug === "2026-bedelli-askerlik-celp-sevk-faaliyet-takvimi");
if (!bedelli || bedelli.calendarRows?.length !== 10) failures.push("2026 bedelli faaliyet takvimi 10 celp dönemi içermiyor.");
else {
  const september = bedelli.calendarRows.find(row => row.period === "Eylül 2026");
  const december = bedelli.calendarRows.find(row => row.period === "Aralık 2026");
  if (september?.sevkDate !== "3 Eylül 2026" || september?.oathDate !== "30 Eylül 2026" || september?.dischargeDate !== "3 Ekim 2026") failures.push("Eylül 2026 bedelli takvimi uyuşmuyor.");
  if (december?.sevkDate !== "3 Aralık 2026" || december?.oathDate !== "30 Aralık 2026" || december?.dischargeDate !== "3 Ocak 2027") failures.push("Aralık 2026 bedelli takvimi uyuşmuyor.");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Askeralma duyuru doğrulaması başarılı: ${militaryServiceAnnouncements.length} kayıt, normal tertip ve bedelli takvimleri, resmî kaynak alan adları ve iç bağlantılar doğrulandı.`);
