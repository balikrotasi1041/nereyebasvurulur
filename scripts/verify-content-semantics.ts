import queue from "../docs/seo-quality-pilot.json";
import { publishedRoutes, type RouteRecord } from "../src/data";
import { militaryBranchPath, militaryProvinces } from "../src/military-branches";
import { renderRoutePreferenceLayer } from "../src/preference-layer";
import { applicationState, costAnswer, relatedRouteLinks, renderSeoGrowthLayer } from "../src/seo-growth";
import { formatThreshold } from "../src/thresholds";
import { renderMilitaryBranch } from "../src/ui";
import baseHandler from "../src/index";
import { announcementState } from "../src/announcements";
import { supplementalAnnouncements } from "../src/supplemental-announcements";

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

const gsbFuture = supplementalAnnouncements.find(item => item.slug === "2026-gsb-sozlesmeli-bilisim-personeli-basvurulari");
const camp = supplementalAnnouncements.find(item => item.slug === "jandarma-emekli-personel-2026-2027-kis-kamp-basvurulari");
const yksExtra = supplementalAnnouncements.find(item => item.slug === "2026-yks-ek-yerlestirme-tercihleri");
assert(gsbFuture && camp && yksExtra);
equal(announcementState(gsbFuture, new Date("2026-09-19T08:00:00+03:00")).label, "Başvuru henüz başlamadı");
equal(announcementState(gsbFuture, new Date("2026-09-21T00:00:00+03:00")).className, "open");
equal(announcementState(gsbFuture, new Date("2026-09-25T17:00:01+03:00")).className, "archive");
assert(!camp.deadlineAt && camp.deadlineDate === "2026-10-16", "Kapanış saati uyduruldu.");
equal(announcementState(camp, new Date("2026-10-16T12:00:00+03:00")).label, "Son gün · kapanış saatini kontrol edin");
equal(announcementState(camp, new Date("2026-10-17T00:00:00+03:00")).className, "archive");
equal(announcementState(yksExtra, new Date("2026-09-22T12:00:00+03:00")).className, "archive", "Ödeme günü tercih penceresini uzattı.");
const yks = publishedRoutes.find(item => item.pathKey === yksExtra.relatedPathKeys[0]);
assert(yks);
const synthetic = { ...gsbFuture, relatedPathKeys: [yks.pathKey] };
supplementalAnnouncements.push(synthetic);
try {
  // A future application cannot turn a route open when the older application has ended.
  const oldStart = synthetic.startsAt;
  synthetic.startsAt = "2026-09-24T00:00:00+03:00";
  equal(applicationState(yks, new Date("2026-09-23T12:00:00+03:00")).label, "Başvuru henüz başlamadı");
  synthetic.startsAt = oldStart;
} finally { supplementalAnnouncements.pop(); }
equal(applicationState(yks, new Date("2026-09-19T12:00:00+03:00")).className, "open");
for (const slug of ["msu-askeri-ogrenci-basvurusu-nereye-yapilir", "milli-savunma-universitesi-harp-okullari-nereye-basvurulur", "milli-savunma-universitesi-msu-tercih-islemleri-nereye-basvurulur"]) {
  const route = publishedRoutes.find(item => item.slug === slug);
  assert(route && route.lastVerified === "2026-09-19");
  assert(!route.steps.some(step => step.startsWith("İşlemin kapsamını ve yerel yetkiyi")), "Pilot özgün adımlarla geliştirilmedi.");
  assert(route.currentCycleNote?.includes("erişim hatası"), "Canlı MSB doğrulama sınırı gizlendi.");
  assert(relatedRouteLinks(route).some(item => item.slug.includes("ikinci-secim")), "İlgili MSÜ aşamasına bağlantı yok.");
}
const msuPreference = publishedRoutes.find(item => item.slug === "milli-savunma-universitesi-msu-tercih-islemleri-nereye-basvurulur");
assert(msuPreference && msuPreference.applicationChannels.every(channel => !channel.url?.includes("ais.osym")), "Tercih aşamasına ÖSYM sınav kanalı karıştı.");
console.log("19 Eylül pilotu ve başvuru başlangıcı / kesin olmayan son saat / ayrı ödeme günü doğrulandı.");
const yurt = supplementalAnnouncements.find(item => item.slug === "2026-gsb-yurt-basvuru-sonuclari-sorgulama");
assert(yurt, "Yurt sonuç duyurusu bulunamadı.");
assert(yurt.details.some(detail => detail.includes("SSS ise ayın son gününü")), "Yurt ücretindeki kaynak farkı görünür değil.");
assert(!yurt.deadlineAt, "Çelişkili aylık ödeme kaynağından kesin son saat üretildi.");
const tus = supplementalAnnouncements.find(item => item.slug === "2026-tus-sts-tip-2-donem-sonuclari");
assert(tus?.details.some(detail => detail.includes("10 gün") && detail.includes("itiraz veya dava süresi")), "Cevap görüntüleme ile itiraz süresi ayrılmadı.");

// A warm cache from the previous deployment must not serve the incorrect body.
const cacheWrites = new Map<string, Response>();
const pendingWrites: Promise<unknown>[] = [];
Object.defineProperty(globalThis, "caches", { configurable: true, value: { default: {
  async match(key: Request) {
    const url = new URL(key.url);
    if (!url.searchParams.has("__content_revision")) return new Response("STALE_INCORRECT_CONTENT");
    return cacheWrites.get(key.url)?.clone();
  },
  async put(key: Request, response: Response) { cacheWrites.set(key.url, response.clone()); }
} } });
const ctx = { waitUntil(promise: Promise<unknown>) { pendingWrites.push(promise); }, passThroughOnException() {}, props: {} } as ExecutionContext;
const request = new Request("https://nereyebasvurulur.com/askerlik-subeleri/siirt/merkez/");
const fresh = await baseHandler.fetch(request, {} as Env, ctx);
equal(fresh.status, 200);
equal(fresh.headers.get("x-edge-cache"), "MISS");
const freshBody = await fresh.text();
assert(!freshBody.includes("STALE_INCORRECT_CONTENT") && !freshBody.includes("ayrı bir fiziksel şube görünmüyor"));
await Promise.all(pendingWrites);
const cached = await baseHandler.fetch(request, {} as Env, ctx);
equal(cached.headers.get("x-edge-cache"), "HIT", "Yeni içerik önbelleği kullanılamıyor.");
equal(await cached.text(), freshBody);
console.log("Önceki sürümün önbelleği atlandı; düzeltilmiş içerikte MISS → HIT doğrulandı.");
