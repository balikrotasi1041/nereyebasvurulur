import queue from "../docs/seo-quality-pilot.json";
import { publishedRoutes, routes, type RouteRecord } from "../src/data";
import { militaryBranchPath, militaryProvinces } from "../src/military-branches";
import { renderRoutePreferenceLayer } from "../src/preference-layer";
import { applicationState, costAnswer, relatedRouteLinks, renderSeoGrowthLayer } from "../src/seo-growth";
import { formatThreshold } from "../src/thresholds";
import { renderMilitaryBranch } from "../src/ui";
import baseHandler from "../src/index";
import liveHandler from "../src/index-v10";
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

// Exercise the deployed entrypoint, not only the detail renderer: it must pass
// published related routes through and keep needs-review routes out of links.
// Explicit expected pairs prevent an empty relation list from passing silently.
for (const [announcementSlug, routeSlug] of [
  ["2026-yks-ek-yerlestirme-tercihleri", "sinav-ve-yerlestirme-yks-nereye-basvurulur"],
  ["2027-cks-basvurulari-basladi", "ciftci-kayit-sistemi-cks-kaydi-nereye-basvurulur"]
]) {
  const item = supplementalAnnouncements.find(item => item.slug === announcementSlug);
  const route = publishedRoutes.find(route => route.slug === routeSlug);
  assert(item && route && item.relatedPathKeys.includes(route.pathKey), `Beklenen duyuru/rehber ilişkisi eksik: ${announcementSlug}`);
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com/konu/${routeSlug}/`), {} as Env, ctx);
  equal(response.status, 200);
  assert((await response.text()).includes(`href="/duyuru/${announcementSlug}/"`), `Rehberden duyuruya bağlantı yok: ${routeSlug}`);
}
equal(yurt.relatedPathKeys.length, 0, "Yurt sonucu üniversite kayıt/yerleştirme işlemiyle eşleştirildi.");
const yurtResponse = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com/duyuru/${yurt.slug}/`), {} as Env, ctx);
assert(!(await yurtResponse.text()).includes('href="/konu/universite-kayit-nereye-basvurulur/"'), "Yurt sonucundan ilgisiz üniversite kaydına dönüş var.");
const cks = supplementalAnnouncements.find(item => item.slug === "2027-cks-basvurulari-basladi");
assert(cks && !cks.deadlineAt && cks.deadlineDate === "2026-12-31", "ÇKS kaynağında bulunmayan kapanış saati üretildi.");
equal(announcementState(cks, new Date("2026-12-31T12:00:00+03:00")).label, "Son gün · kapanış saatini kontrol edin");
let directAnnouncementLinks = 0;
for (const item of supplementalAnnouncements) {
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com/duyuru/${item.slug}/`), {} as Env, ctx);
  equal(response.status, 200);
  const body = await response.text();
  for (const route of publishedRoutes.filter(route => item.relatedPathKeys.includes(route.pathKey))) {
    assert(body.includes(`href="/konu/${route.slug}/"`), `Duyurudan rehbere dönüş yok: ${item.slug} → ${route.slug}`);
    directAnnouncementLinks++;
  }
  for (const route of routes.filter(route => route.verificationStatus === "needs-review" && item.relatedPathKeys.includes(route.pathKey))) {
    assert(!body.includes(`href="/konu/${route.slug}/"`), `Yayıma kapalı rota duyuruya sızdı: ${route.slug}`);
  }
}
assert(directAnnouncementLinks > 0, "Ek duyurular yalnız arama köprüleriyle bırakıldı.");
console.log(`Canlı giriş noktası: ${supplementalAnnouncements.length} duyuruda ${directAnnouncementLinks} güvenli rehber bağlantısı doğrulandı.`);

// 22 September: scoped pilot content and a recurring result update.
const secondSelection = publishedRoutes.find(route => route.slug === "milli-savunma-universitesi-ikinci-secim-asamalari-nereye-basvurulur");
assert(secondSelection);
assert(secondSelection.applicationChannels.every(channel => !channel.url?.includes("ais.osym")), "İkinci seçim ilk ÖSYM sınavına gönderildi.");
assert(!/20\/B|14 Temmuz|7 Ağustos/.test(secondSelection.currentCycleNote || ""), "Eski sınav/çağrı bilgisi güncel MSB seçimi gibi sunuldu.");
assert(secondSelection.steps.some(step => step.includes("kişilik testi")));
assert(secondSelection.currentCycleNote?.includes("erişim hatası"));
assert(relatedRouteLinks(secondSelection).some(route => route.slug === msuPreference.slug));
assert(!/İlk merci abone|yerleşim yeri veya işlemin/.test(lostPhone.locationLogic), "IMEI ihbarı genel tüketici başvurusuna döndü.");
assert(lostPhone.steps.some(step => step.includes("telefon ihbarını 120")), "Telefon ihbarı yanlış iptal kanalına gönderildi.");
assert(lostPhone.steps.some(step => step.includes("IMEI ihbarı hattı kapatmaz")), "SIM ve cihaz kapatma karıştırıldı.");
const phoneRelations = relatedRouteLinks(lostPhone);
equal(phoneRelations.length, 1, "İlgisiz konularla kart sayısı dolduruldu.");
equal(phoneRelations[0].slug, "telefon-internet-numara-hat-islemleri-nereye-basvurulur");
assert(lostPhone.applicationCost?.sourceUrls.includes("https://static.turkiye.gov.tr/downloads/kurumlar/btk/BTK_KayipCalintiIhbarBildirimi_Kilavuz.pdf"));
equal(cimer.applicationTiming, "continuous");
assert(cimer.applicationChannels.some(channel => channel.type === "phone" && channel.label.includes("150")));
assert(cimer.summary.includes("112") && cimer.steps.some(step => step.includes("sevk")));
for (const route of [secondSelection, lostPhone, cimer]) {
  equal(route.lastVerified, "2026-09-22");
  equal(route.verificationStatus, "local-check");
  assert(!route.steps.some(step => step.startsWith("İşlemin kapsamını ve yerel yetkiyi")));
  const path = `/konu/${route.slug}/`;
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com${path}`), {} as Env, ctx);
  equal(response.status, 200);
  const body = await response.text();
  assert(body.includes(`rel="canonical" href="https://nereyebasvurulur.com${path}"`), `Pilot canonical değişti: ${path}`);
  assert(!/name="robots" content="[^"]*noindex/.test(body), `Pilot yanlışlıkla noindex oldu: ${path}`);
  const faq = [...body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1])).find(value => value["@type"] === "FAQPage");
  assert(faq?.mainEntity.length === 4, `Pilot SSS schema eksik: ${path}`);
  const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]!));
  for (const question of faq.mainEntity) {
    assert(body.includes(`<summary>${escape(question.name)}</summary>`));
    assert(body.includes(`<p>${escape(question.acceptedAnswer.text)}</p>`), "Görünür SSS ve schema ayrıştı.");
  }
}
match(yurt.title, /21 Eylül/);
assert(yurt.sources.some(source => source.url.includes("21092026-tarihli")));
assert(!yurt.sources.some(source => source.url.includes("/302961/18092026-")), "Güncellenen resmî olayın eski URL'si güncel kaynak olarak kaldı.");
equal(yurt.verifiedAt, "2026-09-19", "Kısmi sonuç kontrolü bütün duyurunun kaynaklarını yeniden doğrulamış sayıldı.");
equal(yurt.lastModified, "2026-09-22");
assert(!yurt.startsAt && !yurt.deadlineAt && !yurt.deadlineDate, "Kişisel yurt sonucundan genel başvuru dönemi üretildi.");
console.log("22 Eylül: 3 pilot, görünür SSS/canonical, IMEI kanal ayrımı ve tek yurt sonuç kaydı doğrulandı.");

// 23 September: publication date is never an application start; each operation has its own window.
const september23Slugs = ["2026-kpss-dhbt-basvurulari", "2026-ozyes-tercihleri", "2026-2027-gsb-yurt-ek-kontenjan-basvuru-duyurusu", "2026-meb-ogretmen-veli-telefonla-randevu", "2026-kpss-alan-bilgisi-kitapcik-goruntuleme"];
const september23Items = september23Slugs.map(slug => {
  const item = supplementalAnnouncements.find(item => item.slug === slug);
  assert(item, `23 Eylül kaydı eksik: ${slug}`);
  return item;
});
const [dhbt, ozyes, extraDormitory, schoolAppointment, kpssBooklet] = september23Items;
equal(dhbt.startsAt, "2026-09-22T10:40:00+03:00");
equal(dhbt.deadlineAt, "2026-09-30T23:59:00+03:00");
assert(dhbt.details.some(text => text.includes("1 Ekim") && text.includes("30 Eylül")), "DHBT ödeme günü başvuru süresine karıştı.");
equal(announcementState(dhbt, new Date("2026-10-01T12:00:00+03:00")).className, "archive");
equal(announcementState(ozyes, new Date("2026-09-23T12:00:00+03:00")).label, "Başvuru henüz başlamadı");
equal(announcementState(ozyes, new Date("2026-09-24T14:59:59+03:00")).className, "guide");
equal(announcementState(ozyes, new Date("2026-09-24T15:00:00+03:00")).className, "open");
equal(announcementState(ozyes, new Date("2026-10-01T00:00:00+03:00")).className, "archive");
equal(ozyes.relatedPathKeys.length, 0, "ÖZYES ayrı aşaması genel YKS dönemini açtı.");
equal(extraDormitory.kind, "guide");
assert(!extraDormitory.startsAt && !extraDormitory.deadlineAt && !extraDormitory.deadlineDate);
assert(extraDormitory.summary.includes("başlama veya bitiş tarihi yok"));
equal(announcementState(extraDormitory, new Date("2026-09-23T12:00:00+03:00")).className, "guide");
assert(schoolAppointment.summary.includes("444 0 632") && schoolAppointment.details.some(text => text.includes("öğretmenlerin her saatte")));
equal(kpssBooklet.kind, "guide");
equal(announcementState(kpssBooklet, new Date("2026-09-24T00:00:00+03:00")).className, "archive");
assert(kpssBooklet.summary.includes("itiraz süresi değildir"));
for (const item of september23Items) {
  equal(item.verifiedAt, "2026-09-23");
  const path = `/duyuru/${item.slug}/`;
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com${path}`), {} as Env, ctx);
  equal(response.status, 200);
  const body = await response.text();
  assert(body.includes(`rel="canonical" href="https://nereyebasvurulur.com${path}"`));
  assert(body.includes('href="/duyurular/"'));
  assert(!/name="robots" content="[^"]*noindex/.test(body));
}
console.log("23 Eylül: 5 yeni duyuru, ÖZYES başlangıcı, DHBT ödeme ayrımı, belirsiz KYGM takvimi ve arşiv geçişleri doğrulandı.");
