import { publishedRoutes } from "../src/data";
import { searchMilitaryBranches } from "../src/military-branches";
import { renderHomeDeadlineRadar, renderRoutePreferenceLayer, smartSearchRoutes } from "../src/preference-layer";

const failures: string[] = [];
const bedelli = publishedRoutes.find(route => route.slug === "bedelli-askerlik-nereye-basvurulur");

if (!bedelli) {
  failures.push("Bedelli askerlik doğrulanmış rotası bulunamadı.");
} else {
  const html = renderRoutePreferenceLayer(bedelli);
  for (const expected of ["30 saniyede cevap", "Gitmeden / başvurmadan önce", "Şimdi ne yapmalısınız?", "Güncellik kaydı:"]) {
    if (!html.includes(expected)) failures.push(`Rota tercih katmanında eksik bölüm: ${expected}`);
  }
  if (!html.includes(bedelli.lastVerified)) failures.push("Rota tercih katmanında son doğrulama tarihi görünmüyor.");
}

const radar = renderHomeDeadlineRadar(new Date("2026-08-26T12:00:00+03:00"));
if (!radar.includes("Genel başvuru ve kayıt tarihleri")) failures.push("Genel son tarih radarı eksik.");
if (!radar.includes("ASAL / Askeralma yaklaşan tarihleri")) failures.push("ASAL son tarih radarı eksik.");
if (!radar.includes("2026-2027 GSB yurt başvuruları başladı")) failures.push("GSB yaklaşan son tarihi radarda görünmüyor.");
if (!radar.includes("Kasım 2026 sınıflandırma dönemi")) failures.push("ASAL Kasım sınıflandırma son tarihi radarda görünmüyor.");

const routeMatches = smartSearchRoutes("bedelli askerlik nasıl başvururum", publishedRoutes, 10);
if (!routeMatches.some(route => route.slug === "bedelli-askerlik-nereye-basvurulur")) failures.push("Doğal dil araması bedelli askerlik rotasını bulamıyor.");

for (const query of [
  "Ceyhan askerlik şubesi telefon numarası",
  "Ceyhan askerlik şubesi iletişim bilgileri",
  "Ceyhan askerlik şubesi konumu navigasyon"
]) {
  const matches = searchMilitaryBranches(query, 10);
  if (!matches.some(record => record.province === "Adana" && record.district === "Ceyhan")) failures.push(`Askerlik şubesi doğal dil araması Ceyhan kaydını bulamıyor: ${query}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Tercih katmanı doğrulaması başarılı: hızlı cevap, kontrol listesi, ayrı genel/ASAL son tarih radarı ve doğal dil araması çalışıyor.");
