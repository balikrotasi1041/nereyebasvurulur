import { officialAnnouncementsSeptember23 } from "../src/official-updates-20260923";
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
    assert(/^[a-f0-9]{40}$/.test(item.publishedCommit), `Yayın SHA geçersiz: ${item.path}`);
    assert(item.publicationEvidence?.pullRequest && item.publicationEvidence?.deploymentRun && item.publicationEvidence?.checkedAt, `PR/deploy/canlı kanıtı eksik: ${item.path}`);
    assert(item.publicationEvidence.checkedAt.slice(0, 10) >= item.publishedAt, `Canlı kanıtı yayından önce: ${item.path}`);
    equal(item.observationDue.length, 2);
    for (const [index, days] of [14, 28].entries()) {
      const due = new Date(Date.parse(`${item.publishedAt}T00:00:00Z`) + days * 86400000).toISOString().slice(0, 10);
      equal(item.observationDue[index], due, `Ölçüm günü yayın commit'i gününden türetilmedi: ${item.path}`);
    }
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
match(yurt.title, /9 Ekim/);
assert(yurt.sources.some(source => source.url.includes("09102026-tarihli")));
assert(!yurt.sources.some(source => source.url.includes("/302961/23092026-")), "Önceki yedek sonucu güncel kaynak olarak kaldı.");
assert(!yurt.sources.some(source => source.url.includes("/302961/21092026-")), "Önceki yedek sonucu güncel kaynak olarak kaldı.");
assert(!yurt.sources.some(source => source.url.includes("/302961/18092026-")), "Güncellenen resmî olayın eski URL'si güncel kaynak olarak kaldı.");
equal(yurt.verifiedAt, "2026-09-19", "Kısmi sonuç kontrolü bütün duyurunun kaynaklarını yeniden doğrulamış sayıldı.");
equal(yurt.lastModified, "2026-10-10");
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
equal(announcementState(ozyes, new Date("2026-09-24T15:00:00+03:00")).className, "guide");
equal(announcementState(ozyes, new Date("2026-09-24T15:29:59+03:00")).className, "guide");
equal(announcementState(ozyes, new Date("2026-09-24T15:30:00+03:00")).className, "open");
equal(announcementState(ozyes, new Date("2026-10-01T00:00:00+03:00")).className, "archive");
equal(ozyes.relatedPathKeys.length, 0, "ÖZYES ayrı aşaması genel YKS dönemini açtı.");
const originalDormitory = officialAnnouncementsSeptember23.find(item => item.slug === extraDormitory.slug)!;
equal(originalDormitory.kind, "guide");
assert(!originalDormitory.startsAt && !originalDormitory.deadlineAt && !originalDormitory.deadlineDate);
assert(originalDormitory.summary.includes("başlama veya bitiş tarihi yok"));
equal(announcementState(originalDormitory, new Date("2026-09-23T12:00:00+03:00")).className, "guide");
equal(extraDormitory.kind, "application");
equal(extraDormitory.deadlineAt, "2026-10-09T23:59:00+03:00");
assert(!extraDormitory.startsAt, "Kaynakta olmayan başlangıç saati üretildi.");
equal(announcementState(extraDormitory, new Date("2026-10-08T08:00:00+03:00")).className, "open");
equal(announcementState(extraDormitory, new Date("2026-10-10T00:00:00+03:00")).className, "archive");
assert(schoolAppointment.summary.includes("444 0 632") && schoolAppointment.details.some(text => text.includes("öğretmenlerin her saatte")));
equal(kpssBooklet.kind, "guide");
equal(announcementState(kpssBooklet, new Date("2026-09-24T00:00:00+03:00")).className, "archive");
assert(kpssBooklet.summary.includes("itiraz süresi değildir"));
for (const item of september23Items) {
  equal(item.verifiedAt, item.slug === extraDormitory.slug ? "2026-10-08" : item.slug === "2026-ozyes-tercihleri" ? "2026-09-25" : "2026-09-23");
  const path = `/duyuru/${item.slug}/`;
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com${path}`), {} as Env, ctx);
  equal(response.status, 200);
  const body = await response.text();
  assert(body.includes(`rel="canonical" href="https://nereyebasvurulur.com${path}"`));
  assert(body.includes('href="/duyurular/"'));
  assert(!/name="robots" content="[^"]*noindex/.test(body));
}
console.log("23 Eylül: 5 yeni duyuru, ÖZYES başlangıcı, DHBT ödeme ayrımı, belirsiz KYGM takvimi ve arşiv geçişleri doğrulandı.");

// 24 September: preference/payment are separate; EUS and STS are not one exam;
// a calendar-only opening in a guide is not an invented exact start or authenticated open claim.
const september24Slugs = ["2026-muhendislik-tamamlama-tercihleri", "2026-eus-sts-eczacilik-basvurulari", "2026-jandarma-sozlesmeli-ucak-pilotu-temini"];
const september24Items = september24Slugs.map(slug => {
  const matches = supplementalAnnouncements.filter(item => item.slug === slug);
  equal(matches.length, 1, `Eksik/tekrarlanan 24 Eylül kaydı: ${slug}`);
  return matches[0];
});
const [engineering, pharmacy, contractPilot] = september24Items;
equal(engineering.startsAt, "2026-09-23T14:30:00+03:00");
equal(engineering.deadlineAt, "2026-09-29T23:59:00+03:00");
equal(announcementState(engineering, new Date("2026-09-23T14:29:59+03:00")).className, "guide");
equal(announcementState(engineering, new Date("2026-09-23T14:30:00+03:00")).className, "open");
equal(announcementState(engineering, new Date("2026-09-30T12:00:00+03:00")).className, "archive");
assert(engineering.details.some(text => text.includes("170 TL") && text.includes("30 Eylül") && text.includes("mesai bitimi")));
equal(pharmacy.startsAt, "2026-09-23T10:30:00+03:00");
equal(pharmacy.deadlineAt, "2026-10-01T23:59:00+03:00");
equal(announcementState(pharmacy, new Date("2026-10-02T12:00:00+03:00")).className, "archive");
assert(pharmacy.details.some(text => text.includes("birine yapılan başvuru diğerini karşılamaz")));
assert(pharmacy.details.some(text => text.includes("8 Ekim") && text.includes("yüzde 50") && text.includes("aynı gün")));
assert(pharmacy.sources.filter(source => source.url.endsWith(".pdf")).length === 2);
equal(contractPilot.kind, "guide");
assert(!contractPilot.startsAt, "Kılavuzdan sahte başlangıç saati üretildi.");
equal(contractPilot.deadlineAt, "2026-10-11T23:59:00+03:00");
equal(announcementState(contractPilot, new Date("2026-09-24T09:00:00+03:00")).className, "guide");
equal(announcementState(contractPilot, new Date("2026-10-12T00:00:00+03:00")).className, "archive");
equal(contractPilot.actionUrl, "https://personeltemin.jandarma.gov.tr/");
assert(contractPilot.details.some(text => text.includes("Bilgilerim") && text.includes("tek başına başvuru değildir")));
for (const item of september24Items) {
  equal(item.verifiedAt, "2026-09-24");
  equal(item.relatedPathKeys.length, 0, "Özel sınav/temin genel başvuru dönemini açtı.");
  const path = `/duyuru/${item.slug}/`;
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com${path}`), {} as Env, ctx);
  equal(response.status, 200);
  const body = await response.text();
  assert(body.includes(`rel="canonical" href="https://nereyebasvurulur.com${path}"`));
  assert(body.includes('href="/duyurular/"'));
  assert(!/name="robots" content="[^"]*noindex/.test(body));
}
console.log("24 Eylül: 3 duyuru, ayrı ödeme süreleri, doğru başvuru kanalları ve tek yurt sonuç kaydı doğrulandı.");

const september25Slugs = ["2026-kpss-on-lisans-sinava-giris-belgeleri", "2026-e-yds-10-ingilizce-sinava-giris-belgeleri", "2026-sgk-bilisim-yerlesen-aday-belge-teslimi"];
const september25Items = september25Slugs.map(slug => {
  const matches = supplementalAnnouncements.filter(item => item.slug === slug);
  equal(matches.length, 1);
  return matches[0];
});
const [kpssAssociate, eydsEnglish, sgkDocuments] = september25Items;
equal(kpssAssociate.kind, "exam-call");
equal(kpssAssociate.deadlineAt, "2026-10-04T10:00:00+03:00");
assert(kpssAssociate.details.some(text => text.includes("23.59") && text.includes("ek süre vermez")));
equal(eydsEnglish.kind, "exam-call");
equal(eydsEnglish.deadlineAt, "2026-09-26T13:30:00+03:00");
assert(eydsEnglish.details.some(text => text.includes("e-YDTS Türkçe") && text.includes("karıştırmayın")));
assert(eydsEnglish.sources.some(source => source.url.includes("26-eylul-2026-cumartes")));
equal(sgkDocuments.kind, "guide");
equal(sgkDocuments.deadlineDate, "2026-10-09");
assert(!sgkDocuments.startsAt && !sgkDocuments.deadlineAt, "SGK belge teslimi için sayısal saat uyduruldu.");
assert(sgkDocuments.summary.includes("elden") && sgkDocuments.summary.includes("İl Müdürlüğü"));
equal(announcementState(sgkDocuments, new Date("2026-10-10T00:00:00+03:00")).className, "archive");
const injuryGuide = supplementalAnnouncements.find(item => item.slug === "3713-terorle-mucadelede-yaralananlar-e-devlet-basvurusu")!;
equal(injuryGuide.kind, "guide");
equal(injuryGuide.verifiedAt, "2026-09-01", "Yeni kılavuz bütün eski hukuki kaynakları yeniden doğrulamış sayıldı.");
equal(injuryGuide.lastModified, "2026-09-25");
assert(!injuryGuide.deadlineDate && !injuryGuide.deadlineAt && !injuryGuide.startsAt, "Korucu kılavuzundan ortak hak düşürücü süre üretildi.");
assert(injuryGuide.details.some(text => text.includes("İnceleme gerekli") && text.includes("Kanun metnine erişilemedi")));
assert(injuryGuide.sources.some(source => source.url.endsWith("GK_GKK.pdf")) && injuryGuide.sources.some(source => source.url.endsWith("JANDARMA.pdf")));
const hmgs = supplementalAnnouncements.find(item => item.slug === "2026-hmgs-iyos-sinava-giris-belgeleri")!;
assert(hmgs.sources.some(source => source.url.includes("27-eylul-2026-pazar")));
equal(hmgs.verifiedAt, "2026-09-19");
for (const slug of ["2026-kpss-alan-bilgisi-kitapcik-goruntuleme", "2026-dus-sts-dis-2-donem-basvurulari", "2026-sayistay-denetci-yardimcisi-eleme-basvurulari"]) {
  const item = supplementalAnnouncements.find(item => item.slug === slug)!;
  equal(announcementState(item, new Date("2026-09-25T00:00:00+03:00")).className, "archive", `Süresi geçen kayıt silinmedi/arşivlenmedi: ${slug}`);
}
for (const item of september25Items) {
  equal(item.verifiedAt, "2026-09-25");
  equal(item.relatedPathKeys.length, 0);
  const path = `/duyuru/${item.slug}/`;
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com${path}`), {} as Env, ctx);
  equal(response.status, 200);
  const body = await response.text();
  assert(body.includes(`rel="canonical" href="https://nereyebasvurulur.com${path}"`));
  assert(body.includes('href="/duyurular/"'));
  assert(!/name="robots" content="[^"]*noindex/.test(body));
}
console.log("25 Eylül: ÖZYES kesin saati, sınav/erişim ayrımı, SGK elden teslim, 3713 kaynak sınırı ve arşivler doğrulandı.");

// Different institutions and stages must not inherit each other's deadline/channel.
const september27Slugs = ["2026-sgk-3713-yerlesen-aday-belge-teslimi", "2026-tarim-3713-yerlesen-aday-belge-teslimi", "2026-kygm-burs-kredi-bilgi-kontrolu-nakil", "2026-e-yds-10-ingilizce-sinav-sonuclari", "2026-dus-sts-dis-2-donem-gec-basvuru"];
const september27Items = september27Slugs.map(slug => {
  const matches = supplementalAnnouncements.filter(item => item.slug === slug);
  equal(matches.length, 1);
  return matches[0];
});
const [sgkPlaced, tarimPlaced, bursTransfer, eydsResult, dentistryLate] = september27Items;
equal(sgkPlaced.deadlineDate, "2026-10-02");
equal(tarimPlaced.deadlineDate, "2026-10-16");
assert(sgkPlaced.summary.includes("elden") && tarimPlaced.summary.includes("posta yoluyla"));
for (const item of [sgkPlaced, tarimPlaced]) {
  equal(item.kind, "guide");
  assert(!item.startsAt && !item.deadlineAt, "Atama belgelerine sahte başlangıç/kapanış saati eklendi.");
}
equal(announcementState(sgkPlaced, new Date("2026-10-03T00:00:00+03:00")).className, "archive");
equal(announcementState(tarimPlaced, new Date("2026-10-17T00:00:00+03:00")).className, "archive");
equal(bursTransfer.kind, "guide");
assert(!bursTransfer.startsAt && !bursTransfer.deadlineAt && !bursTransfer.deadlineDate);
equal(bursTransfer.actionUrl, "https://www.turkiye.gov.tr/kyk-kredi-burs-nakil-basvurusu");
assert(bursTransfer.details.some(text => text.includes("ilk burs başvurusunun açıldığını göstermez")));
equal(eydsResult.kind, "result");
equal(eydsResult.actionUrl, "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10370");
assert(!eydsResult.startsAt && !eydsResult.deadlineAt && !eydsResult.deadlineDate);
equal(announcementState(eydsEnglish, new Date("2026-09-27T08:00:00+03:00")).className, "archive");
equal(dentistryLate.startsAt, "2026-10-01T10:00:00+03:00");
equal(dentistryLate.deadlineAt, "2026-10-01T23:59:00+03:00");
equal(announcementState(dentistryLate, new Date("2026-10-01T09:59:59+03:00")).className, "guide");
equal(announcementState(dentistryLate, new Date("2026-10-01T10:00:00+03:00")).className, "open");
equal(announcementState(dentistryLate, new Date("2026-10-02T00:00:00+03:00")).className, "archive");
for (const item of september27Items) {
  const path = `/duyuru/${item.slug}/`;
  const response = await liveHandler.fetch(new Request(`https://nereyebasvurulur.com${path}`), {} as Env, ctx);
  equal(response.status, 200);
  const body = await response.text();
  assert(body.includes(`rel="canonical" href="https://nereyebasvurulur.com${path}"`));
  assert(body.includes('href="/duyurular/"'));
  assert(!/name="robots" content="[^"]*noindex/.test(body));
}
console.log("27 Eylül: kurum bazlı atama süre/kanalları, burs nakli, e-YDS sonucu ve DUS geç başvuru geçişleri doğrulandı.");

const hmgsBooklet = supplementalAnnouncements.find(item => item.slug === "2026-hmgs-iyos-kitapcik-goruntuleme")!;
equal(hmgsBooklet.kind, "guide");
equal(hmgsBooklet.startsAt, "2026-09-27T13:40:00+03:00");
equal(hmgsBooklet.deadlineAt, "2026-10-07T23:59:00+03:00");
assert(hmgsBooklet.details.some(text => text.includes("Görüntüleme son günü itiraz süresi değildir")));
equal(announcementState(hmgsBooklet, new Date("2026-09-28T08:00:00+03:00")).className, "guide");
equal(announcementState(hmgsBooklet, new Date("2026-10-08T00:00:00+03:00")).className, "archive");
equal(announcementState(hmgs, new Date("2026-09-28T08:00:00+03:00")).className, "archive");
const coachCall = supplementalAnnouncements.find(item => item.slug === "2026-gsb-sozlesmeli-antrenor-sozlu-uygulamali-sinav")!;
equal(coachCall.deadlineDate, "2026-09-25");
assert(!coachCall.deadlineAt, "Kişisel sınav saati yerine ortak kapanış saati üretildi.");
equal(coachCall.verifiedAt, "2026-09-08", "Arşiv metaverisi tüm içerik doğrulamasını yenileyemez.");
equal(announcementState(coachCall, new Date("2026-09-26T00:00:00+03:00")).className, "archive");
console.log("28 Eylül: HMGS/İYÖS kitapçık süresi ile itiraz ayrımı ve biten GSB sınav çağrısının arşivi doğrulandı.");

// Late-September/October notices must preserve the candidate's actual stage.
const currentNotice = (slug: string) => {
  const items = supplementalAnnouncements.filter(item => item.slug === slug);
  equal(items.length, 1, `Duyuru eksik veya tekrarlı: ${slug}`);
  return items[0];
};
const ekYks = currentNotice("2026-yks-ek-yerlestirme-sonuclari-kayit");
equal(ekYks.kind, "result");
equal(ekYks.deadlineDate, "2026-10-09");
assert(!ekYks.startsAt && !ekYks.deadlineAt);
assert(ekYks.summary.includes("2–4 Ekim") && ekYks.summary.includes("2–9 Ekim"));
assert(ekYks.actionUrl?.includes("SonucID=10372"));
const trYos = currentNotice("2026-tr-yos-2-sinava-giris-belgeleri");
equal(trYos.actionUrl, "https://tryos.osym.gov.tr/");
assert(!trYos.deadlineAt, "Kişisel giriş saati yerine ortak saat üretildi.");
const borc = currentNotice("2026-sgk-e-borcu-yoktur-sistem-guncellemesi");
assert(!borc.startsAt && !borc.deadlineAt && !borc.deadlineDate);
assert(borc.summary.includes("17 Eylül") && borc.details.some(text => text.includes("İnceleme gerekli")));
const ailePlaced = currentNotice("2026-aile-3713-yerlesen-aday-belge-teslimi");
equal(ailePlaced.deadlineDate, "2026-11-06");
assert(!ailePlaced.startsAt && !ailePlaced.deadlineAt);
assert(ailePlaced.summary.includes("şahsen") && ailePlaced.summary.includes("posta/kargo"));
equal(announcementState(ailePlaced, new Date("2026-11-07T00:00:00+03:00")).className, "archive");
const tusChoice = currentNotice("2026-tus-2-donem-tercihleri");
equal(tusChoice.deadlineAt, "2026-10-07T23:59:00+03:00");
const yds2 = currentNotice("2026-yds-2-basvurulari");
equal(yds2.deadlineAt, "2026-10-08T23:59:00+03:00");
assert(yds2.details.some(text => text.includes("9 Ekim") && text.includes("yeni normal başvuru süresi değildir")));
equal(announcementState(yds2, new Date("2026-10-09T00:00:00+03:00")).className, "archive");
const eyds11 = currentNotice("2026-e-yds-11-farsca-ingilizce-basvurulari");
equal(announcementState(eyds11, new Date("2026-10-02T08:00:00+03:00")).className, "guide", "Kontenjan bilinmeden koşulsuz açık etiketi üretildi.");
assert(eyds11.deadlineLabel?.includes("kontenjan dolarsa"));
equal(eyds11.actionUrl, "https://sanalpos.osym.gov.tr/");
const tircus = currentNotice("2026-tircus-e-devlet-e-imza-giris");
assert(!tircus.startsAt && !tircus.deadlineAt && !tircus.deadlineDate, "Giriş kanalı duyurusundan dönem üretildi.");
const ticaretResult = currentNotice("2026-ticaret-bilisim-basvuru-sonuclari-sinav-cagrisi");
assert(!ticaretResult.startsAt && !ticaretResult.deadlineAt && !ticaretResult.deadlineDate);
assert(ticaretResult.details.some(text => text.includes("nihai işe yerleşme sonucu değildir")));
for (const slug of ["2026-ozyes-tercihleri", "2026-kpss-dhbt-basvurulari", "2026-eus-sts-eczacilik-basvurulari", "2026-dus-sts-dis-2-donem-gec-basvuru", "2828-2026-eylul-istihdam-tercihleri"]) {
  equal(announcementState(currentNotice(slug), new Date("2026-10-02T08:00:00+03:00")).className, "archive", `Biten aşama aktif kaldı: ${slug}`);
}
console.log("30 Eylül–2 Ekim: kayıt/ödeme kanalları, kişisel çağrılar, kontenjan ve arşiv sınırları doğrulandı.");

// October deadlines describe distinct actions, including already closed stages.
assert(ekYks.summary.includes("sona erdi") && ekYks.summary.includes("sürüyor"));
equal(ekYks.verifiedAt, "2026-09-30", "Takvim geçişi tüm kaynakları yeniden doğrulamış sayılmaz.");
const dhbtLate = currentNotice("2026-kpss-dhbt-gec-basvuru");
const pharmacyLate = currentNotice("2026-eus-sts-eczacilik-gec-basvuru");
for (const [notice, day] of [[dhbtLate, "2026-10-05"], [pharmacyLate, "2026-10-08"]] as const) {
  equal(announcementState(notice, new Date(`${day}T09:59:59+03:00`)).className, "guide");
  equal(announcementState(notice, new Date(`${day}T10:00:00+03:00`)).className, "open");
  equal(announcementState(notice, new Date(`${day}T23:59:01+03:00`)).className, "archive");
}
const kpssOnLisansBooklet = currentNotice("2026-kpss-on-lisans-kitapcik-goruntuleme");
equal(kpssOnLisansBooklet.kind, "guide");
equal(kpssOnLisansBooklet.deadlineAt, "2026-10-14T23:59:00+03:00");
assert(kpssOnLisansBooklet.details.some(text => /itiraz/.test(text)));
equal(announcementState(kpssOnLisansBooklet, new Date("2026-10-15T00:00:00+03:00")).className, "archive");
const ykds = currentNotice("2026-yok-ykds-basvurulari");
assert(ykds.summary.includes("bildirilen") && ykds.details.some(text => text.includes("banka/ATM kullanılmaz")));
const denetmen = currentNotice("2026-sgk-denetmen-yardimcisi-belge-teslimi");
equal(denetmen.deadlineAt, "2026-10-16T17:00:00+03:00");
assert(denetmen.summary.includes("elden") && denetmen.details.some(text => text.includes("askerlik şubesi belgesi")));
const youthExam = currentNotice("2026-gsb-yurt-yonetimi-genclik-calisani-sozlu-sinav");
equal(youthExam.deadlineDate, "2026-10-16");
assert(!youthExam.startsAt && !youthExam.deadlineAt);
assert(youthExam.details.some(text => text.includes("kendi sınav gününe")));
equal(announcementState(youthExam, new Date("2026-10-17T00:00:00+03:00")).className, "archive");
const osymInterview = currentNotice("2026-osym-bilisim-personeli-mulakat-sonuclari");
equal(osymInterview.kind, "result");
assert(!osymInterview.startsAt && !osymInterview.deadlineAt && !osymInterview.deadlineDate);
const latestYurt = currentNotice("2026-gsb-yurt-basvuru-sonuclari-sorgulama");
assert(latestYurt.summary.includes("9 Ekim 2026"));
assert(!latestYurt.deadlineAt && !latestYurt.deadlineDate);
equal(latestYurt.verifiedAt, "2026-09-19", "Kısmi sonuç güncellemesi tüm yurt içeriğini yeniden doğrulayamaz.");
console.log("3–6 Ekim: geç başvuru, kitapçık, kişisel çağrı, evrak ve yedek sonuç aşamaları doğrulandı.");

const kpssLisansResult = currentNotice("2026-kpss-lisans-sinav-sonuclari");
equal(kpssLisansResult.kind, "result");
equal(kpssLisansResult.actionUrl, "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10376");
assert(!kpssLisansResult.startsAt && !kpssLisansResult.deadlineAt && !kpssLisansResult.deadlineDate);
const customsGuide = currentNotice("2026-gumruk-musavirligi-sinav-kilavuzu");
equal(customsGuide.kind, "guide");
equal(customsGuide.deadlineDate, "2026-10-30");
assert(!customsGuide.startsAt && !customsGuide.deadlineAt, "Saat verilmeyen takvimden kesin zaman üretildi.");
equal(announcementState(customsGuide, new Date("2026-10-07T09:00:00+03:00")).className, "guide");
equal(announcementState(customsGuide, new Date("2026-10-31T00:00:00+03:00")).className, "archive");
const teacherGrant = currentNotice("2026-2027-meb-ogretmenlik-bursu-sonuclari");
equal(teacherGrant.kind, "result");
assert(!teacherGrant.startsAt && !teacherGrant.deadlineAt && !teacherGrant.deadlineDate);
assert(teacherGrant.actionUrl?.startsWith("https://akademi.meb.gov.tr/"));
console.log("7 Ekim: KPSS sonuç aşaması, gümrük kayıt takvimi ve MEB burs sonuç kanalı doğrulandı.");

// Updated records must keep result access, future registration and fee payment distinct.
const ales3 = currentNotice("2026-ales-3-basvurulari");
equal(announcementState(ales3, new Date("2026-10-07T15:59:59+03:00")).className, "guide");
equal(announcementState(ales3, new Date("2026-10-07T16:00:00+03:00")).className, "open");
equal(announcementState(ales3, new Date("2026-10-16T00:00:00+03:00")).className, "archive");
assert(ales3.details.some(text => text.includes("16 Ekim ödeme günü yeni normal başvuru süresi değildir")));
for (const slug of ["2026-muhendislik-tamamlama-yerlestirme-sonuclari-kayit", "2026-ozyes-yerlestirme-sonuclari-kayit"]) {
  const record = currentNotice(slug);
  equal(record.kind, "result");
  assert(!record.startsAt && !record.deadlineAt, "Üniversite kaydına ortak saat uyduruldu.");
  equal(announcementState(record, new Date("2026-10-08T08:00:00+03:00")).className, "result");
}
const socialPlacement = currentNotice("2828-2026-ekim-istihdam-yerlestirme-sonuclari");
assert(!socialPlacement.startsAt && !socialPlacement.deadlineAt && !socialPlacement.deadlineDate);
assert(socialPlacement.details.some(text => text.includes("3713")));
assert(kpssLisansResult.details.some(text => text.includes("13.40") && text.includes("itiraz süresi değildir")));
console.log("8 Ekim: ALES ödeme ayrımı, yurt açılışı, kişisel sonuçlar ve üniversite kayıt aşamaları doğrulandı.");

// 9 Ekim: extension replaces the previous deadline, payment does not reopen registration.
equal(ykds.deadlineAt, "2026-10-14T23:59:00+03:00");
equal(announcementState(ykds, new Date("2026-10-09T08:00:00+03:00")).className, "open");
equal(announcementState(ykds, new Date("2026-10-15T00:00:00+03:00")).className, "archive");
assert(ykds.details.some(text => text.includes("15 Ekim") && text.includes("22 Ekim")));
assert(!ykds.details.some(text => /8 Ekim saat 23|9 Ekim'e kadar|Geç başvuru 14/.test(text)));
const vgmSchool = currentNotice("2026-2027-vgm-ortaogrenim-egitim-yardimi");
const vgmUniversity = currentNotice("2026-2027-vgm-yuksekogrenim-burs-basvurulari");
equal(announcementState(vgmSchool, new Date("2026-10-09T08:00:00+03:00")).className, "open");
equal(announcementState(vgmUniversity, new Date("2026-10-09T08:00:00+03:00")).className, "guide");
equal(announcementState(vgmUniversity, new Date("2026-10-22T10:00:00+03:00")).className, "open");
equal(announcementState(vgmUniversity, new Date("2026-11-01T00:00:00+03:00")).className, "archive");
for (const n of [vgmSchool, vgmUniversity]) assert(n.details.some(text => text.includes("başvuru ücreti değildir")));
const tubitakBurs = currentNotice("2026-tubitak-2205-2210-2211-ikinci-donem-burs-cagrilari");
assert(!tubitakBurs.startsAt, "Yalnız başlama günü biliniyorsa saat uydurulmaz.");
equal(tubitakBurs.deadlineAt, "2026-10-27T17:30:00+03:00");
equal(tubitakBurs.actionUrl, "https://tybs.tubitak.gov.tr/");
const loanPayment = currentNotice("2026-kygm-ogrenim-kredisi-resmi-odeme-kanallari");
equal(loanPayment.kind, "guide");
assert(!loanPayment.startsAt && !loanPayment.deadlineAt && !loanPayment.deadlineDate);
const tryosIdentity = currentNotice("2026-tr-yos-2-sinava-giris-belgeleri");
equal(tryosIdentity.verifiedAt, "2026-09-30");
assert(tryosIdentity.details.some(text => text.includes("08.00–11.00") && text.includes("uzatmaz")));
console.log("9 Ekim: YÖK-YKDS uzatımı, ayrı burs takvimleri, ödeme kanalı ve kişisel sınav saati korundu.");
