import { countLeaves, countLinkedLeaves, menuTree, publishedRoutes, routes } from "../src/data";
import { militaryBranchByPath, militaryBranchPath, militaryBranches, militaryProvinces, uniqueMilitaryBranchCount } from "../src/military-branches";
import { annualThresholds } from "../src/thresholds";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const expectedLeaves = 252;
const expectedMilitaryDistrictPages = 973;
const expectedPhysicalMilitaryBranches = 397;
const publishedSlugs = new Set(publishedRoutes.map(route => route.slug));
const pathKeys = new Set(routes.map(route => route.pathKey));
const slugs = new Set(routes.map(route => route.slug));
const allowedAuditDates = new Set(["2026-08-21", "2026-08-23", "2026-09-05"]);
const staleSourceFragments = [
  "/mevzuatmetin/1.5.213.pdf",
  "/mevzuatmetin/1.5.2644.pdf",
  "/mevzuatmetin/1.5.6831.pdf",
  "yok.gov.tr/ogrenci/guz-ve-bahar-donemi-ek-madde-1-uygulama-ilkeleri",
  "webdosya.csb.gov.tr/db/altyapi/icerikler/7.5.16849-20230131125117.pdf",
  "webdosya.csb.gov.tr/db/tabiat/icerikler/planli-20210811131259.pdf"
];

assert(countLeaves(menuTree) === expectedLeaves, `Menü yaprağı sayısı ${expectedLeaves} değil.`);
assert(routes.length === expectedLeaves, "Her menü yaprağı için tam bir rota envanteri kaydı bulunmalı.");
assert(pathKeys.size === routes.length, "Aynı menü yaprağı için birden fazla rota kaydı var.");
assert(slugs.size === routes.length, "Rota slug değerleri benzersiz değil.");
assert(countLinkedLeaves(menuTree) === publishedRoutes.length, "Canlı menü bağlantıları ile yayımlanan rota sayısı eşleşmiyor.");

for (const route of routes) {
  const mandatory = [
    route.title,
    route.summary,
    route.deadlineAndAppeal,
    route.locationLogic,
    route.lastVerified
  ];
  assert(mandatory.every(Boolean), `Zorunlu metin alanı eksik: ${route.pathKey}`);
  assert(route.competentAuthorities.length > 0, `Yetkili merci eksik: ${route.pathKey}`);
  assert(route.applicationChannels.length > 0, `Başvuru kanalı eksik: ${route.pathKey}`);
  assert(route.requiredDocuments.length > 0, `Belge listesi eksik: ${route.pathKey}`);
  assert(route.escalation.length > 0, `Üst başvuru yolu eksik: ${route.pathKey}`);
  assert(route.legalBasis.length > 0, `Hukuki dayanak eksik: ${route.pathKey}`);
  assert(route.sources.length > 0, `Resmî kaynak eksik: ${route.pathKey}`);
  assert(allowedAuditDates.has(route.lastVerified), `Bilinmeyen son doğrulama tarihi: ${route.pathKey}`);
  assert(route.intentKey && route.parentHub && route.canonicalIntent, `Niyet modeli eksik: ${route.pathKey}`);
  assert(route.evidenceChecklist.length > 0, `Kanıt kontrol listesi eksik: ${route.pathKey}`);
  assert(["normal", "time-limited", "urgent"].includes(route.urgency), `Aciliyet değeri geçersiz: ${route.pathKey}`);
  assert(Number.isInteger(route.reviewCadence) && route.reviewCadence > 0, `Kontrol periyodu geçersiz: ${route.pathKey}`);
  assert(Array.isArray(route.sourceConflicts), `Kaynak çelişkisi alanı geçersiz: ${route.pathKey}`);
  if (route.thresholdKey) assert(Boolean(annualThresholds[route.thresholdKey]), `Merkezî eşik kaydı bulunamadı: ${route.pathKey}`);
  if (route.eGovernmentAvailable) assert(route.applicationChannels.some(channel => channel.type === "e-government" && channel.url), `e-Devlet köprüsü eksik: ${route.pathKey}`);
  if (route.petitionRequired) assert(Boolean(route.petitionReference), `Dilekçe referansı eksik: ${route.pathKey}`);

  for (const source of route.sources) {
    const url = new URL(source.url);
    assert(url.protocol === "https:", `HTTPS olmayan kaynak: ${source.url}`);
    assert(url.hostname === "turkiye.gov.tr" || url.hostname.endsWith(".gov.tr"), `Resmî/kamusal alan adı dışında kaynak: ${source.url}`);
    assert(!staleSourceFragments.some(fragment => source.url.toLowerCase().includes(fragment)), `Eski/kırık kaynak yeniden kullanılmış: ${source.url}`);
  }

  if (route.verificationStatus === "needs-review" || route.sourceConflicts.length > 0) {
    assert(!publishedSlugs.has(route.slug), `Doğrulanmamış rota canlıya sızdı: ${route.pathKey}`);
    if (route.verificationStatus === "needs-review") assert((route.publicationBlocker?.length || 0) >= 40, `Yayımlama engeli/eksik kapsam açıklanmamış: ${route.pathKey}`);
  } else {
    assert(publishedSlugs.has(route.slug), `Doğrulanmış rota canlı listede yok: ${route.pathKey}`);
    assert(!route.publicationBlocker, `Canlı rotada yayımlama engeli kalmış: ${route.pathKey}`);
  }
}

const routeByLabel = (label: string) => routes.find(route => route.title === `${label} için nereye başvurulur?`);
assert(routeByLabel("Engelli emekliliği")?.verificationStatus === "verified", "Engelli emekliliği 2025 geçiş değişikliğiyle doğrulanmadı.");
assert(routeByLabel("Evde bakım yardımı")?.verificationStatus === "local-check", "Evde bakım yardımı yerel heyet kontrolünde tutulmalı.");
assert(routeByLabel("Sınav sonucu itirazı")?.verificationStatus === "needs-review", "Genel sınav itirazı sınav adı olmadan yayımlanmamalı.");
assert(routeByLabel("Yerleştirme işlemleri")?.verificationStatus === "needs-review", "Genel yerleştirme rotası sınav adı olmadan yayımlanmamalı.");
for (const label of ["Bitkisel üretim destekleri", "Kırsal kalkınma destekleri", "Hayvancılık destekleri"]) {
  assert(routeByLabel(label)?.verificationStatus === "needs-review", `${label} program adı olmadan yayımlanmamalı.`);
}

assert(militaryBranches.length === expectedMilitaryDistrictPages, `Askerlik şubesi ilçe sayfası sayısı ${expectedMilitaryDistrictPages} değil.`);
assert(militaryProvinces.length === 81, "Askerlik şubesi dizini 81 ilin tamamını kapsamıyor.");
assert(militaryBranchByPath.size === militaryBranches.length, "Askerlik şubesi sayfa yolları benzersiz değil.");
assert(new Set(militaryBranches.map(record => record.slug)).size === militaryBranches.length, "Askerlik şubesi slug değerleri benzersiz değil.");
assert(uniqueMilitaryBranchCount === expectedPhysicalMilitaryBranches, `Farklı fiziksel askerlik şubesi sayısı ${expectedPhysicalMilitaryBranches} değil.`);

for (const record of militaryBranches) {
  assert(record.province && record.district && record.branchName, `Şube kimliği eksik: ${record.slug}`);
  assert(record.address && record.phone && record.email, `Şube iletişim alanı eksik: ${record.slug}`);
  assert(record.officialProvince && record.officialDistrict && record.lookupDistrict, `MSB sorgu izi eksik: ${record.slug}`);
  assert(record.lastVerified === "2026-08-21", `Şube doğrulama tarihi beklenenden farklı: ${record.slug}`);
  assert(/^(?:\d{10}|0\d{10})$/.test(record.phone.replace(/\D/g, "")), `Şube telefonu Türkiye sabit hat biçiminde değil: ${record.slug}`);
  const source = new URL(record.officialSourceUrl);
  assert(source.protocol === "https:" && source.hostname === "www.msb.gov.tr", `Şube resmî kaynağı MSB değil: ${record.slug}`);
  const directions = new URL(record.directionsUrl);
  assert(directions.protocol === "https:" && directions.hostname === "www.google.com" && directions.pathname === "/maps/dir/", `Yol tarifi hedefi geçersiz: ${record.slug}`);
  assert(directions.searchParams.get("destination")?.includes(record.address), `Yol tarifi resmî adresi içermiyor: ${record.slug}`);
  assert(militaryBranchPath(record).startsWith("/askerlik-subeleri/") && militaryBranchPath(record).endsWith("/"), `Şube sayfa yolu geçersiz: ${record.slug}`);
}

const report = {
  leaves: expectedLeaves,
  inventoryRecords: routes.length,
  published: publishedRoutes.length,
  verified: routes.filter(route => route.verificationStatus === "verified").length,
  localCheck: routes.filter(route => route.verificationStatus === "local-check").length,
  needsReview: routes.filter(route => route.verificationStatus === "needs-review").length,
  officialSourceLinks: routes.reduce((total, route) => total + route.sources.length, 0),
  highFreshnessRisk: routes.filter(route => route.freshnessRisk === "high").length,
  lastVerified: Array.from(new Set(routes.map(route => route.lastVerified))),
  militaryProvinces: militaryProvinces.length,
  militaryDistrictPages: militaryBranches.length,
  militaryPhysicalBranches: uniqueMilitaryBranchCount,
  militaryLastVerified: Array.from(new Set(militaryBranches.map(record => record.lastVerified)))
};

console.log(JSON.stringify(report, null, 2));