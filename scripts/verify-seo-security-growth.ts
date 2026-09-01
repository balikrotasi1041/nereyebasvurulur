import { publishedRoutes } from "../src/data";
import { applicationState, relatedRouteLinks, renderSeoGrowthLayer, seoCoverageSummary } from "../src/seo-growth";

const failures: string[] = [];
const sample = publishedRoutes.find(route => route.petitionRequired) || publishedRoutes[0];
if (!sample) throw new Error("Yayımlanmış örnek rota bulunamadı.");
const html = renderSeoGrowthLayer(sample, new Date("2026-09-01T12:00:00+03:00"));
for (const expected of ["FAQPage", "BreadcrumbList", "Bugün yapılabilir mi", "Başvuru ücreti ne kadar"]) {
  if (!html.includes(expected)) failures.push(`SEO büyüme katmanında eksik bölüm: ${expected}`);
}
if (!html.includes("İnsanlar bunu şöyle de arıyor") && !html.includes("Bu işlemle ilgili diğer başvuru yolları")) failures.push("Arama alias veya iç bağlantı alanı eksik.");
if (!applicationState(sample).label) failures.push("Canlı başvuru durumu üretilemedi.");
if (!Array.isArray(relatedRouteLinks(sample))) failures.push("İlgili rota grafiği üretilemedi.");
const coverage = seoCoverageSummary(publishedRoutes);
if (coverage.authorities <= 0) failures.push("Kurum kapsamı hesaplanamadı.");
if (coverage.aliasCount < publishedRoutes.length) failures.push("Alias kapsamı rota sayısından düşük.");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`SEO/security growth verification passed: ${coverage.authorities} authorities, ${coverage.aliasCount} aliases.`);
