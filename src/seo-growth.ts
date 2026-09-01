import type { Announcement } from "./announcements";
import { announcements } from "./announcements";
import type { RouteRecord } from "./data";
import { publishedRoutes } from "./data";
import { militaryServiceAnnouncements } from "./military-service-announcements";
import { supplementalAnnouncements } from "./supplemental-announcements";
import { formatThreshold } from "./thresholds";

const SITE_ORIGIN = "https://nereyebasvurulur.com";

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] || char));
}

function unique(values: string[]): string[] {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))];
}

function normalize(value: string): string {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
}

function relatedAnnouncements(route: RouteRecord): Announcement[] {
  return [...announcements, ...militaryServiceAnnouncements, ...supplementalAnnouncements]
    .filter(item => item.relatedPathKeys.includes(route.pathKey));
}

export type LiveApplicationState = {
  label: string;
  detail: string;
  className: "open" | "closed" | "periodic" | "evergreen";
  url?: string;
};

export function applicationState(route: RouteRecord, now = new Date()): LiveApplicationState {
  const linked = relatedAnnouncements(route).sort((a, b) => b.lastModified.localeCompare(a.lastModified));
  const open = linked.find(item => item.kind === "application" && (!item.deadlineAt || new Date(item.deadlineAt).getTime() >= now.getTime()));
  if (open) return { label: "Başvuru açık", detail: open.deadlineLabel || "Resmî duyuruda kapanış tarihi belirtilmedi.", className: "open", url: `/duyuru/${open.slug}/` };
  const expired = linked.find(item => item.kind === "application" && item.deadlineAt && new Date(item.deadlineAt).getTime() < now.getTime());
  if (expired) return { label: "Bu dönem sona erdi", detail: expired.deadlineLabel || "Son doğrulanan başvuru dönemi kapandı.", className: "closed", url: `/duyuru/${expired.slug}/` };
  if (route.timeSensitive || route.urgency === "time-limited") return { label: "Dönemsel işlem", detail: route.currentCycleNote || "Güncel ilan ve son tarihi işlem öncesi kontrol edin.", className: "periodic" };
  return { label: "Sürekli işlem rotası", detail: "Belirli bir ilan dönemine bağlı olmayan genel başvuru yolu.", className: "evergreen" };
}

export function costAnswer(route: RouteRecord): string {
  if (route.thresholdKey) return formatThreshold(route.thresholdKey);
  return "Ücret, harç veya ödeme varsa tutarı resmî işlem ekranında ya da güncel kurum tarifesinde doğrulayın.";
}

export function relatedRouteLinks(route: RouteRecord, limit = 6): RouteRecord[] {
  const routeTerms = new Set(normalize(`${route.title} ${route.aliases.join(" ")}`).split(" ").filter(term => term.length > 3));
  return publishedRoutes.filter(candidate => candidate.slug !== route.slug).map(candidate => {
    let score = 0;
    if (candidate.category === route.category) score += 8;
    if (candidate.section === route.section) score += 7;
    if (candidate.parentHub === route.parentHub) score += 4;
    if (candidate.competentAuthorities.some(authority => route.competentAuthorities.includes(authority))) score += 5;
    score += normalize(`${candidate.title} ${candidate.aliases.join(" ")}`).split(" ").filter(term => routeTerms.has(term)).length;
    return { candidate, score };
  }).filter(item => item.score >= 5).sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title, "tr-TR")).slice(0, limit).map(item => item.candidate);
}

function routeFaq(route: RouteRecord): Array<{ question: string; answer: string }> {
  const authority = route.competentAuthorities.join("; ");
  const channel = route.applicationChannels[0]?.label || "Ayrıntılı başvuru kanalını sayfadaki resmî kaynaklardan kontrol edin.";
  return [
    { question: `${route.title.replace(/\?$/, "")} nereye yapılır?`, answer: `Yetkili merci: ${authority}.` },
    { question: `${route.title.replace(/\?$/, "")} nasıl yapılır?`, answer: `İlk başvuru kanalı: ${channel}. Sayfadaki adımlar ve resmî bağlantılar izlenmelidir.` },
    { question: "Başvuru veya itiraz süresi nedir?", answer: route.deadlineAndAppeal },
    { question: "Başvuru ücreti ne kadar?", answer: costAnswer(route) }
  ];
}

export function renderSeoGrowthLayer(route: RouteRecord, now = new Date()): string {
  const aliases = unique(route.aliases.filter(alias => ![route.title, route.category, route.section].includes(alias))).slice(0, 12);
  const related = relatedRouteLinks(route);
  const state = applicationState(route, now);
  const faq = routeFaq(route);
  const canonical = `${SITE_ORIGIN}/konu/${route.slug}/`;
  const petitionUrl = route.petitionReference ? `/dilekce-olustur/?merci=${encodeURIComponent(route.petitionReference.authority)}&konu=${encodeURIComponent(route.petitionReference.subject)}&tur=${encodeURIComponent(route.petitionReference.suggestedType)}&kaynak=${encodeURIComponent(`/konu/${route.slug}/`)}` : `/dilekce-olustur/?konu=${encodeURIComponent(route.title)}&kaynak=${encodeURIComponent(`/konu/${route.slug}/`)}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebPage", name: route.title, description: route.summary, url: canonical, dateModified: route.lastVerified, about: route.competentAuthorities.map(name => ({ "@type": "GovernmentOrganization", name })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: route.category, item: `${SITE_ORIGIN}/ara?q=${encodeURIComponent(route.category)}` },
      { "@type": "ListItem", position: 3, name: route.title, item: canonical }
    ] }
  ];
  const aliasHtml = aliases.length ? `<section class="seo-box"><h2>İnsanlar bunu şöyle de arıyor</h2><div class="seo-chips">${aliases.map(alias => `<a href="/ara?q=${encodeURIComponent(alias)}">${esc(alias)}</a>`).join("")}</div></section>` : "";
  const relatedHtml = related.length ? `<section class="seo-box"><h2>Bu işlemle ilgili diğer başvuru yolları</h2><div class="seo-related">${related.map(item => `<a href="/konu/${esc(item.slug)}/"><strong>${esc(item.title)}</strong><span>${esc(item.competentAuthorities[0] || item.category)}</span></a>`).join("")}</div></section>` : "";
  const petition = route.petitionRequired ? `<a class="seo-petition" href="${esc(petitionUrl)}">Bu işlem için ücretsiz dilekçe oluştur →</a>` : "";
  return `<section class="seo-growth" aria-label="Arama ve ilgili işlemler"><div class="seo-live ${state.className}"><div><b>Bugün yapılabilir mi?</b><strong>${esc(state.label)}</strong><span>${esc(state.detail)}</span></div>${state.url ? `<a href="${esc(state.url)}">Güncel duyuruyu aç →</a>` : ""}</div>${aliasHtml}${relatedHtml}${petition}<section class="seo-box"><h2>Sık sorulan sorular</h2>${faq.map(item => `<details><summary>${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`).join("")}</section><style>
.seo-growth{margin:0 0 18px}.seo-live,.seo-box{border:1px solid #dfe6f1;border-radius:16px;background:#fff;padding:16px;margin-top:12px}.seo-live{display:flex;justify-content:space-between;gap:14px;align-items:center}.seo-live b,.seo-live strong,.seo-live span{display:block}.seo-live b{font-size:.76rem;text-transform:uppercase;letter-spacing:.06em;color:#65758b}.seo-live strong{font-size:1.08rem;margin-top:4px}.seo-live span{font-size:.88rem;color:#59677a;margin-top:4px;line-height:1.45}.seo-live.open{border-color:#a8d8bd;background:#f2fbf6}.seo-live.closed{border-color:#e2c5c5;background:#fff8f8}.seo-live.periodic{border-color:#ead59a;background:#fffaf0}.seo-live a,.seo-petition{font-weight:850;color:#2458d6}.seo-box h2{font-size:1.05rem;margin:0 0 11px}.seo-chips{display:flex;gap:7px;flex-wrap:wrap}.seo-chips a{padding:7px 10px;border-radius:999px;background:#f1f5fb;color:#31435f;font-size:.84rem}.seo-related{display:grid;grid-template-columns:1fr 1fr;gap:8px}.seo-related a{border:1px solid #e4e9f1;border-radius:11px;padding:11px}.seo-related strong,.seo-related span{display:block}.seo-related span{font-size:.78rem;color:#697386;margin-top:4px}.seo-petition{display:flex;justify-content:center;padding:13px;border-radius:12px;background:#2458d6;color:#fff;margin-top:12px}.seo-box details{border-top:1px solid #edf0f5;padding:10px 0}.seo-box details:first-of-type{border-top:0}.seo-box summary{cursor:pointer;font-weight:800}.seo-box details p{color:#526174;line-height:1.55;margin:8px 0 0}@media(max-width:700px){.seo-live{align-items:flex-start;flex-direction:column}.seo-related{grid-template-columns:1fr}}
</style>${jsonLd.map(value => `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`).join("")}</section>`;
}

export function seoCoverageSummary(routes: RouteRecord[]) {
  const published = routes.filter(route => route.verificationStatus !== "needs-review");
  const authorities = new Set(published.flatMap(route => route.competentAuthorities));
  const aliasCount = published.reduce((sum, route) => sum + route.aliases.length, 0);
  const petitionLinks = published.filter(route => route.petitionRequired).length;
  const localCandidates = published.filter(route => route.verificationStatus === "local-check").length;
  const categories = new Map<string, number>();
  for (const route of published) categories.set(route.category, (categories.get(route.category) || 0) + 1);
  const thinCategories = [...categories.entries()].filter(([, count]) => count < 3).map(([category, count]) => ({ category, count }));
  return { authorities: authorities.size, aliasCount, petitionLinks, localCandidates, thinCategories };
}

export function renderSeoOpsPanel(routes: RouteRecord[]): string {
  const summary = seoCoverageSummary(routes);
  const gaps = summary.thinCategories.slice(0, 12).map(item => `<li><strong>${esc(item.category)}</strong> · ${item.count} canlı rota</li>`).join("") || "<li>Üç rotanın altında kalan kategori yok.</li>";
  return `<section class="card content" style="margin:0 0 18px"><h2>SEO kapsam ve yerel sayfa radarı</h2><p>Kurum × işlem kapsamı otomatik sayılır. Yerel sayfa yalnız merci, adres, görev alanı veya iletişim verisi gerçekten değişiyorsa açılmalıdır; 81 il için kopya içerik üretilmez.</p><div class="admin-grid"><div class="metric"><strong>${summary.authorities}</strong><span>Yetkili kurum</span></div><div class="metric"><strong>${summary.aliasCount}</strong><span>Arama ifadesi</span></div><div class="metric"><strong>${summary.petitionLinks}</strong><span>Dilekçe bağlantılı rota</span></div><div class="metric"><strong>${summary.localCandidates}</strong><span>Yerel veri adayı</span></div></div><h3>Kurum–işlem genişletme öncelikleri</h3><ul>${gaps}</ul></section>`;
}
