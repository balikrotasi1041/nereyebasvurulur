import { countLeaves, countLinkedLeaves, menuTree, publishedRoutes, routes } from "../src/data";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const expectedLeaves = 226;
const publishedSlugs = new Set(publishedRoutes.map(route => route.slug));
const pathKeys = new Set(routes.map(route => route.pathKey));
const slugs = new Set(routes.map(route => route.slug));

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

  for (const source of route.sources) {
    const url = new URL(source.url);
    assert(url.protocol === "https:", `HTTPS olmayan kaynak: ${source.url}`);
    assert(url.hostname === "turkiye.gov.tr" || url.hostname.endsWith(".gov.tr"), `Resmî/kamusal alan adı dışında kaynak: ${source.url}`);
  }

  if (route.verificationStatus === "needs-review") {
    assert(!publishedSlugs.has(route.slug), `Doğrulanmamış rota canlıya sızdı: ${route.pathKey}`);
  } else {
    assert(publishedSlugs.has(route.slug), `Doğrulanmış rota canlı listede yok: ${route.pathKey}`);
  }
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
  lastVerified: Array.from(new Set(routes.map(route => route.lastVerified)))
};

console.log(JSON.stringify(report, null, 2));
