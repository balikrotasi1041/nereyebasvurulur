import { publishedRoutes } from "../src/data";
import { firstWaveProblemIntents } from "../src/problem-intents";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const expectedIds = [...Array.from({ length: 25 }, (_, index) => index + 1), ...Array.from({ length: 15 }, (_, index) => index + 96)];
const actualIds = firstWaveProblemIntents.map(item => item.backlogId).sort((a, b) => a - b);
assert(JSON.stringify(actualIds) === JSON.stringify(expectedIds), "İlk dalga 1-25 ve 96-110 konularını eksiksiz kapsamıyor.");
assert(new Set(firstWaveProblemIntents.map(item => item.backlogId)).size === 40, "İlk dalgada mükerrer backlog kimliği var.");
assert(firstWaveProblemIntents.filter(item => item.disposition === "new-route").length === 26, "İlk dalga net yeni rota sayısı 26 değil.");

const bySlug = new Map(publishedRoutes.map(route => [route.slug, route]));
for (const mapping of firstWaveProblemIntents) {
  const route = bySlug.get(mapping.canonicalSlug);
  assert(route, `Kanonik rota bulunamadı: ${mapping.backlogId} -> ${mapping.canonicalSlug}`);
  assert(route.intentKey === mapping.intentKey, `Niyet anahtarı eşleşmiyor: ${mapping.backlogId}`);
  assert(route.aliases.includes(mapping.label), `Arama alias'ı eksik: ${mapping.backlogId} ${mapping.label}`);
}

const unique = <T>(values: T[]) => new Set(values).size === values.length;
assert(unique(publishedRoutes.map(route => route.slug)), "Yayımlanan slug değerlerinde çakışma var.");
assert(unique(publishedRoutes.map(route => route.intentKey)), "Birden fazla sayfa aynı intentKey değerini kullanıyor.");
assert(unique(publishedRoutes.map(route => route.canonicalIntent)), "Birden fazla sayfa aynı canonicalIntent değerini kullanıyor; cannibalization riski var.");

const normalizedTitles = publishedRoutes.map(route => route.title.toLocaleLowerCase("tr-TR").replace(/[^\p{L}\p{N}]+/gu, " ").trim());
assert(unique(normalizedTitles), "Aynı normalleştirilmiş başlıkla birden fazla yayımlanmış rota var.");

console.log(JSON.stringify({
  checkedRoutes: publishedRoutes.length,
  firstWaveTopics: firstWaveProblemIntents.length,
  newRoutes: firstWaveProblemIntents.filter(item => item.disposition === "new-route").length,
  matchedToExisting: firstWaveProblemIntents.filter(item => item.disposition === "existing-route").length,
  collisions: 0,
  canonicalIntentConflicts: 0
}, null, 2));
