// @ts-nocheck -- This build-time report runs under Node through tsx; the Worker bundle intentionally omits Node typings.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { routes } from "../src/data";

const AUDIT_DATE = "2026-08-21";
const outputPath = resolve("docs/route-risk-audit-2026-08-21.md");
const inventory = routes.filter(route =>
  route.verificationStatus === "needs-review"
  || route.verificationStatus === "local-check"
  || route.freshnessRisk === "high"
);

const statusOrder = ["verified", "local-check", "needs-review"] as const;
const statusTitles: Record<(typeof statusOrder)[number], string> = {
  verified: "Resmî kaynaklarla doğrulandı — yayımlanabilir",
  "local-check": "Ulusal çerçeve doğrulandı — yerel teyit uyarısıyla yayımlanabilir",
  "needs-review": "Yapısal olarak eksik — yayıma kapalı"
};

const lines: string[] = [
  "# Riskli rota envanteri ve doğrulama sonucu",
  "",
  `Kontrol tarihi: ${AUDIT_DATE}`,
  "",
  "Kapsam: `verificationStatus=needs-review`, `verificationStatus=local-check` veya `freshnessRisk=high` koşullarından en az birini taşıyan RouteRecord kayıtları. `freshnessRisk=high` tek başına içeriğin yanlış olduğu anlamına gelmez; dönem/tutar/ilan değişebileceği için işlem gününde yeniden kontrol gerektirir.",
  "",
  `Toplam kapsam: ${inventory.length} / ${routes.length} rota.`,
  "",
  ...statusOrder.map(status => `- ${statusTitles[status]}: ${inventory.filter(route => route.verificationStatus === status).length}`),
  ""
];

const categories = Array.from(new Set(inventory.map(route => route.category)));
lines.push("## Kategori özeti", "", "| Kategori | Kapsam | Doğrulandı | Yerel teyit | Kapalı |", "|---|---:|---:|---:|---:|");
for (const category of categories) {
  const records = inventory.filter(route => route.category === category);
  lines.push(`| ${category} | ${records.length} | ${records.filter(route => route.verificationStatus === "verified").length} | ${records.filter(route => route.verificationStatus === "local-check").length} | ${records.filter(route => route.verificationStatus === "needs-review").length} |`);
}

for (const status of statusOrder) {
  lines.push("", `## ${statusTitles[status]}`, "");
  for (const route of inventory.filter(route => route.verificationStatus === status)) {
    const risk = ({ high: "yüksek", medium: "orta", low: "düşük" } as const)[route.freshnessRisk] + " güncellik riski";
    const blocker = route.publicationBlocker ? ` Yayımlama engeli: ${route.publicationBlocker}` : "";
    lines.push(`- ${route.pathKey} — ${risk}; ${route.sources.length} resmî kaynak.${blocker}`);
  }
}

lines.push(
  "",
  "## Yayın güvenliği kuralları",
  "",
  "- `needs-review` kayıtlar menü, arama, sitemap ve canlı konu rotalarına alınmaz.",
  "- `local-check` kayıtlar, belediye/il müdürlüğü/dağıtım şirketi gibi yere göre değişen merci ve belge bilgilerini işlem günü doğrulama uyarısıyla sunar.",
  "- Dönemsel sınav, destek, temin ve parasal tutarlar eski dönemden taşınmaz; resmî ilan veya işlem ekranı yoksa başvuru açık gösterilmez.",
  "- Her kapalı kayıtta yayımlanabilmesi için gereken daraltıcı bilgi `publicationBlocker` alanında tutulur.",
  ""
);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, lines.join("\n"), "utf8");
console.log(`${inventory.length} riskli rota ${outputPath} dosyasına yazıldı.`);
