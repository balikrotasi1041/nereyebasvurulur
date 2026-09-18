import queue from "../docs/seo-quality-pilot.json";
import { publishedRoutes, type RouteRecord } from "../src/data";
import { militaryBranchPath, militaryProvinces } from "../src/military-branches";
import { renderRoutePreferenceLayer } from "../src/preference-layer";
import { applicationState, costAnswer, relatedRouteLinks, renderSeoGrowthLayer } from "../src/seo-growth";
import { formatThreshold } from "../src/thresholds";
import { renderMilitaryBranch } from "../src/ui";

function assert(condition: unknown, message = "İçerik anlamı doğrulaması başarısız."): asserts condition {
  if (!condition) throw new Error(message);
}
function equal(actual: unknown, expected: unknown, message?: string): void {
  assert(actual === expected, message || `Beklenen: ${expected}; bulunan: ${actual}`);
}
function notEqual(actual: unknown, expected: unknown, message?: string): void {
  assert(actual !== expected, message);
}
function match(actual: string, expected: RegExp, message?: string): void {
  assert(expected.test(actual), message || `Beklenen biçim bulunamadı: ${actual}`);
}

function routeByIntent(intent: string): RouteRecord {
  const route = publishedRoutes.find(item => item.intentKey === intent);
  assert(route, `Eksik yayımlanmış işlem: ${intent}`);
  return route;
}

const now = new Date("2026-09-18T12:00:00+03:00");
for (const route of publishedRoutes) {
  if (route.thresholdKey) {
    notEqual(costAnswer(route), formatThreshold(route.thresholdKey), `Görev sınırı ücret olarak sunuldu: ${route.slug}`);
  }
  if (route.applicationCost) {
    const cost = route.applicationCost;
    assert(cost.summary.trim() && cost.sourceUrls.length, `Ücret kanıtı eksik: ${route.slug}`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(cost.verifiedAt) && Number.isFinite(Date.parse(cost.verifiedAt)), `Ücret doğrulama tarihi eksik: ${route.slug}`);
    for (const url of cost.sourceUrls) assert(route.sources.some(source => source.url === url), `Ücret kaynağı rota kaynaklarında yok: ${route.slug}`);
  }
  if (route.applicationTiming) assert(["continuous", "event-relative", "periodic"].includes(route.applicationTiming));
}

const appeal = routeByIntent("consumer.thh-decision-appeal");
const enforcement = routeByIntent("consumer.thh-decision-enforcement");
const application = routeByIntent("consumer.thh-application");
const lostPhone = routeByIntent("telecom.lost-stolen-imei-block");
for (const route of [appeal, enforcement]) {
  assert(!route.thresholdKey, `Karar sonrası aşamaya yeni başvuru sınırı uygulandı: ${route.slug}`);
  assert(!route.steps.some(step => /satıcı\/sağlayıcıya|TÜBİS|arabuluculuk/.test(step)), `Karar sonrası aşama ilk şikâyete döndü: ${route.slug}`);
}
assert(appeal.steps.some(step => /tüketici mahkemesine/.test(step)));
assert(enforcement.steps.some(step => /icra dairesine/.test(step)));
match(application.competentAuthorities[0], /Tüketici Hakem Heyeti/);
match(application.applicationChannels[0].label, /TÜBİS/);
for (const route of [appeal, enforcement, application, lostPhone]) {
  const state = applicationState(route, now);
  assert(!["open", "closed", "periodic"].includes(state.className), `Kişisel süre dönem olarak sunuldu: ${route.slug}`);
  equal(state.detail, route.deadlineAndAppeal);
}
equal(applicationState(lostPhone, now).label, "Gecikmeden işlem yapın");
const unknownTiming = { ...lostPhone, applicationTiming: undefined, currentCycleNote: "Eski bir mevzuat açıklaması" };
equal(applicationState(unknownTiming, now).label, "İşleme özgü süreyi kontrol edin", "Güncellik riski veya not, dönem kanıtı sayılamaz.");

const sellerFirst = routeByIntent("consumer.defective-product");
const quick = renderRoutePreferenceLayer(sellerFirst);
const how = quick.match(/<b>Nasıl\?<\/b>(.*?)<\/div>/s)?.[1];
assert(how?.includes(sellerFirst.applicationChannels[0].label), "Hızlı cevap ilk kanalı atladı.");
assert(!how?.includes("nb-fast-action"), "URL'siz ilk adıma sonraki aşamanın bağlantısı eklendi.");

for (const suffix of ["msu-tercih-islemleri-nereye-basvurulur", "ikinci-secim-asamalari-nereye-basvurulur"]) {
  const route = publishedRoutes.find(item => item.slug.endsWith(suffix));
  assert(route);
  equal(route.applicationChannels[0].url, "https://personeltemin.msb.gov.tr/", "MSB aşaması ÖSYM sınav başvurusuna yönlendirildi.");
  match(route.competentAuthorities[0], /Millî Savunma/);
}

const cimer = publishedRoutes.find(route => route.slug === "cimer-cimer-basvurusu-nereye-basvurulur");
assert(cimer);
assert(!relatedRouteLinks(cimer).some(route => route.slug === "bedelli-askerlik-nereye-basvurulur"), "Genel başvuru kelimeleri ilgisiz işlem bağladı.");
assert(relatedRouteLinks(appeal).some(route => route.intentKey.startsWith("consumer.thh-")), "Kararın ilgili başvuru yolları kayboldu.");

const faqHtml = renderSeoGrowthLayer(appeal, now);
const scripts = [...faqHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
const faq = scripts.find(item => item["@type"] === "FAQPage");
assert(faq?.mainEntity.length === 4);
for (const item of faq.mainEntity) {
  equal((item.name.match(/\?/g) || []).length, 1, "SSS iki soruyu birbirine ekledi.");
  assert(faqHtml.includes(`<summary>${item.name}</summary>`), "Schema sorusu görünür SSS'de yok.");
  assert(faqHtml.includes(`<p>${item.acceptedAnswer.text}</p>`), "Schema cevabı görünür SSS'den farklı.");
}

const centers = new Set(["Ağrı", "Siirt", "Kilis", "Bartın", "Yozgat", "Tunceli"]);
let checkedBranches = 0;
for (const province of militaryProvinces) {
  for (const record of province.branches) {
    if (!(centers.has(province.name) && record.district === "Merkez") && !["/askerlik-subeleri/bartin/ulus/", "/askerlik-subeleri/hatay/iskenderun/"].includes(militaryBranchPath(record))) continue;
    const html = renderMilitaryBranch(record, province);
    assert(!html.includes("ayrı bir fiziksel şube görünmüyor"), `Ad farkından şube yokluğu çıkarıldı: ${militaryBranchPath(record)}`);
    assert(html.includes(`https://nereyebasvurulur.com${militaryBranchPath(record)}`), "Şube URL'si değişti.");
    assert(html.includes(record.branchName), "Resmî sorumlu şube kayboldu.");
    checkedBranches++;
  }
}
equal(checkedBranches, 8);

equal(queue.items.length, 20);
equal(new Set(queue.items.map((item: { path: string }) => item.path)).size, 20);
const validPaths = new Set([
  ...publishedRoutes.map(route => `/konu/${route.slug}/`),
  ...militaryProvinces.map(province => `/askerlik-subeleri/${province.slug}/`),
  ...militaryProvinces.flatMap(province => province.branches.map(militaryBranchPath))
]);
for (const [group, expected] of Object.entries({ district: 10, province: 3, msu: 4, other: 3 })) {
  equal(queue.items.filter((item: { group: string }) => item.group === group).length, expected);
}
for (const item of queue.items) {
  assert(validPaths.has(item.path), `Pilot URL mevcut canlı katalogda yok: ${item.path}`);
  assert(["pending", "blocked", "ready", "published", "observing", "reviewed"].includes(item.status));
  if (["published", "observing", "reviewed"].includes(item.status)) {
    assert(item.publishedAt && item.publishedCommit && item.evidence.length && item.changeSummary, `Yayın kanıtı eksik: ${item.path}`);
  }
}
console.log(`İçerik anlamı doğrulandı: ücret/süre/aşama, SSS, ilgili yollar, ${checkedBranches} şube örneği ve 20 pilot URL.`);
