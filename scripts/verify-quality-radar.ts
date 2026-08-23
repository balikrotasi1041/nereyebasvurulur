import { publishedRoutes } from "../src/data";
import { firstWaveProblemIntents } from "../src/problem-intents";
import { assessRouteQuality, summarizeQuality } from "../src/quality-radar";
import { annualThresholds } from "../src/thresholds";
import { renderRoute } from "../src/ui";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const firstWaveSlugs = new Set(firstWaveProblemIntents.map(mapping => mapping.canonicalSlug));
const firstWave = publishedRoutes.filter(route => firstWaveSlugs.has(route.slug));
const consumer = firstWave.filter(route => route.parentHub === "tuketici-haklari");
assert(consumer.length === 25, "25 tüketici rotası kalite radarında bulunamadı.");
assert(firstWave.length === 29, "İlk dalganın 40 problemini karşılayan 29 kanonik rota bulunamadı.");
assert(firstWave.every(route => assessRouteQuality(route, "2026-08-23").length === 0), "İlk dalga rotalarında kalite eksiği var.");
assert(firstWave.every(route => route.lastVerified === "2026-08-23"), "İlk dalga son doğrulama tarihi tutarsız.");

for (const route of firstWave) {
  assert(route.intentKey && route.parentHub && route.canonicalIntent, `Niyet modeli eksik: ${route.slug}`);
  assert(route.evidenceChecklist.length > 0, `Kanıt kontrol listesi eksik: ${route.slug}`);
  assert(route.reviewCadence > 0, `Kontrol periyodu eksik: ${route.slug}`);
  const html = renderRoute(route);
  assert(html.includes(route.lastVerified), `Son doğrulama tarihi sayfada görünmüyor: ${route.slug}`);
  if (route.eGovernmentAvailable) assert(html.includes("turkiye.gov.tr"), `e-Devlet köprüsü sayfada görünmüyor: ${route.slug}`);
  if (route.petitionRequired) assert(html.includes("/dilekce-olustur/?merci="), `Dilekçe oluşturucu köprüsü sayfada görünmüyor: ${route.slug}`);
  if (route.thresholdKey) assert(html.includes(annualThresholds[route.thresholdKey].sourceUrl), `Merkezî eşik kaynağı sayfada görünmüyor: ${route.slug}`);
}

const sample = { ...consumer[0], sources: [], applicationChannels: [], escalation: [], eGovernmentAvailable: true, petitionRequired: true, petitionReference: undefined, sourceConflicts: ["örnek çelişki"], lastVerified: "2025-01-01", reviewCadence: 30 };
const sampleCodes = new Set(assessRouteQuality(sample, "2026-08-23").map(issue => issue.code));
for (const expected of ["missing-official-source", "missing-direct-application-link", "missing-appeal-route", "missing-e-government-bridge", "missing-petition-reference", "stale-verification", "conflicting-sources"]) {
  assert(sampleCodes.has(expected as Parameters<typeof sampleCodes.has>[0]), `Kalite radarı eksiği yakalamadı: ${expected}`);
}

const summary = summarizeQuality(publishedRoutes, "2026-08-23");
console.log(JSON.stringify({ firstWaveRoutes: firstWave.length, firstWaveIssues: 0, consumerRoutes: consumer.length, ...summary, rows: undefined }, null, 2));
