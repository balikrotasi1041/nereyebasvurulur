import type { RouteRecord } from "./data";
import { announcements } from "./announcements";
import { militaryServiceAnnouncements } from "./military-service-announcements";

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function unique(values: string[]): string[] {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))];
}

function verificationLabel(route: RouteRecord): string {
  if (route.verificationStatus === "verified") return "Resmî kaynaklarla doğrulandı";
  if (route.verificationStatus === "local-check") return "Yerel uygulama kontrolü gerekli";
  return "Güncelleme incelemesi sürüyor";
}

function freshnessLabel(route: RouteRecord): string {
  if (route.freshnessRisk === "high") return "Sık değişebilir, işlem öncesi tekrar kontrol edin";
  if (route.freshnessRisk === "medium") return "Dönemsel olarak değişebilir";
  return "Düşük güncellik riski";
}

const routeStyles = `
.nb-fast{margin:0 0 16px;border:1px solid #c8d7f4;background:linear-gradient(180deg,#f7faff,#fff);border-radius:18px;padding:18px;box-shadow:0 12px 30px rgba(36,88,214,.06)}
.nb-fast-head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;margin-bottom:13px}.nb-fast-head h2{margin:0;font-size:1.25rem;letter-spacing:-.025em}.nb-fast-head p{margin:5px 0 0;color:#627084;line-height:1.5;font-size:.9rem}.nb-fast-badge{white-space:nowrap;border-radius:999px;background:#edf8f2;color:#176a42;font-weight:850;font-size:.76rem;padding:6px 9px}
.nb-fast-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.nb-fast-card{border:1px solid #dfe6f1;background:#fff;border-radius:13px;padding:13px;min-width:0}.nb-fast-card b{display:block;color:#536174;font-size:.74rem;text-transform:uppercase;letter-spacing:.075em;margin-bottom:5px}.nb-fast-card strong,.nb-fast-card span{display:block;line-height:1.45}.nb-fast-card span{color:#526174;font-size:.9rem}.nb-fast-action{display:inline-flex;margin-top:9px;min-height:40px;align-items:center;padding:8px 11px;border-radius:10px;background:#2458d6;color:#fff;font-weight:800;text-decoration:none}
.nb-check{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.nb-check-box{border:1px solid #e2e8f0;border-radius:13px;padding:14px;background:#fff}.nb-check-box h3{margin:0 0 8px;font-size:.98rem}.nb-check-box ul,.nb-check-box ol{margin:0;padding-left:20px;color:#475467;line-height:1.55}.nb-check-box li+li{margin-top:5px}.nb-proof{margin-top:10px;padding-top:10px;border-top:1px solid #e6ebf3;color:#667085;font-size:.82rem;line-height:1.5}
@media(max-width:760px){.nb-fast-grid{grid-template-columns:1fr}.nb-check{grid-template-columns:1fr}.nb-fast-head{flex-direction:column}.nb-fast-badge{white-space:normal}}
`;

export function renderRoutePreferenceLayer(route: RouteRecord): string {
  const authority = route.competentAuthorities[0] || "Yetkili kurum bilgisi resmî kaynaklarda gösterilir.";
  const channel = route.applicationChannels.find(item => item.url) || route.applicationChannels[0];
  const checklist = unique([...route.requiredDocuments, ...route.evidenceChecklist]).slice(0, 6);
  const nextSteps = route.steps.slice(0, 3);
  const status = verificationLabel(route);
  const sourceCount = route.sources.length;
  const channelText = channel ? channel.label : "Başvuru kanalı için aşağıdaki ayrıntılı rotayı kontrol edin.";
  const channelAction = channel?.url ? `<a class="nb-fast-action" target="_blank" rel="noopener noreferrer" href="${esc(channel.url)}">Resmî kanalı aç ↗</a>` : "";
  const checklistHtml = checklist.length
    ? checklist.map(item => `<li>${esc(item)}</li>`).join("")
    : `<li>Kimlik ve işleminize ilişkin temel belgeleri hazır bulundurun.</li>`;
  const stepsHtml = nextSteps.length
    ? nextSteps.map(item => `<li>${esc(item)}</li>`).join("")
    : `<li>Aşağıdaki ayrıntılı başvuru rotasını takip edin.</li>`;
  return `<section class="nb-fast" aria-labelledby="nbFastAnswer"><div class="nb-fast-head"><div><h2 id="nbFastAnswer">30 saniyede cevap</h2><p>İlk bakışta ihtiyacınız olan merci, kanal, süre ve güncellik bilgisi.</p></div><span class="nb-fast-badge">✓ ${esc(status)}</span></div><div class="nb-fast-grid"><div class="nb-fast-card"><b>Nereye?</b><strong>${esc(authority)}</strong></div><div class="nb-fast-card"><b>Nasıl?</b><strong>${esc(channelText)}</strong>${channelAction}</div><div class="nb-fast-card"><b>Süre / itiraz</b><span>${esc(route.deadlineAndAppeal || "Özel bir süre belirtilmemiştir; işlem öncesi güncel resmî kaynağı kontrol edin.")}</span></div></div><div class="nb-check"><div class="nb-check-box"><h3>Gitmeden / başvurmadan önce</h3><ul>${checklistHtml}</ul></div><div class="nb-check-box"><h3>Şimdi ne yapmalısınız?</h3><ol>${stepsHtml}</ol></div></div><div class="nb-proof"><strong>Güncellik kaydı:</strong> Son doğrulama ${esc(route.lastVerified)} · ${sourceCount} resmî kaynak · ${esc(freshnessLabel(route))} · yeniden kontrol aralığı ${route.reviewCadence} gün.${route.caution ? ` <strong>Dikkat:</strong> ${esc(route.caution)}` : ""}</div><style>${routeStyles}</style></section>`;
}

type DeadlineItem = {
  slug: string;
  title: string;
  deadlineAt: string;
  deadlineLabel: string;
  authority: string;
};

function upcoming(items: Array<{ slug: string; title: string; authority: string; deadlineAt?: string; deadlineLabel?: string }>, now: Date, limit: number): DeadlineItem[] {
  const nowMs = now.getTime();
  return items
    .filter(item => item.deadlineAt && item.deadlineLabel && new Date(item.deadlineAt).getTime() >= nowMs)
    .map(item => ({ slug: item.slug, title: item.title, authority: item.authority, deadlineAt: item.deadlineAt!, deadlineLabel: item.deadlineLabel! }))
    .sort((a, b) => new Date(a.deadlineAt).getTime() - new Date(b.deadlineAt).getTime())
    .slice(0, limit);
}

function timeLabel(deadlineAt: string, now: Date): string {
  const diff = new Date(deadlineAt).getTime() - now.getTime();
  const days = Math.ceil(diff / 86_400_000);
  if (days <= 0) return "Bugün";
  if (days === 1) return "Yarın";
  return `${days} gün kaldı`;
}

const homeStyles = `
.nb-radar{width:min(1160px,calc(100% - 28px));margin:18px auto 34px}.nb-radar-head{margin-bottom:12px}.nb-radar-head h2{margin:0;font-size:1.35rem}.nb-radar-head p{margin:5px 0 0;color:#65758b;line-height:1.5}.nb-radar-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.nb-radar-box{border:1px solid #dfe6f1;background:#fff;border-radius:16px;padding:16px}.nb-radar-box h3{margin:0 0 10px;font-size:1rem}.nb-radar-item{display:block;border-top:1px solid #edf0f5;padding:11px 0}.nb-radar-item:first-of-type{border-top:0;padding-top:0}.nb-radar-item strong{display:block;line-height:1.4}.nb-radar-item span{display:block;color:#667085;font-size:.82rem;margin-top:4px;line-height:1.4}.nb-radar-time{font-weight:850;color:#2458d6!important}.nb-radar-empty{color:#667085;font-size:.9rem;line-height:1.5}.nb-radar-more{display:inline-flex;margin-top:9px;font-weight:800;color:#2458d6}
@media(max-width:760px){.nb-radar-grid{grid-template-columns:1fr}.nb-radar{width:min(100% - 20px,1160px)}}
`;

function deadlineCards(items: DeadlineItem[], now: Date): string {
  if (!items.length) return `<p class="nb-radar-empty">Yaklaşan doğrulanmış bir son tarih bulunmuyor.</p>`;
  return items.map(item => `<a class="nb-radar-item" href="/duyuru/${esc(item.slug)}/"><strong>${esc(item.title)}</strong><span>${esc(item.authority)}</span><span class="nb-radar-time">${esc(timeLabel(item.deadlineAt, now))} · ${esc(item.deadlineLabel)}</span></a>`).join("");
}

export function renderHomeDeadlineRadar(now = new Date()): string {
  const general = upcoming(announcements, now, 4);
  const asal = upcoming(militaryServiceAnnouncements, now, 4);
  return `<section class="nb-radar" aria-labelledby="nbDeadlineRadar"><div class="nb-radar-head"><h2 id="nbDeadlineRadar">Yaklaşan resmî tarihler</h2><p>Son günü yaklaşan doğrulanmış işlemleri ayrı akışlarda gösteriyoruz. Genel duyurular ile ASAL verileri birbirine karıştırılmaz.</p></div><div class="nb-radar-grid"><section class="nb-radar-box"><h3>Genel başvuru ve kayıt tarihleri</h3>${deadlineCards(general, now)}<a class="nb-radar-more" href="/duyurular/">Genel duyuruları aç →</a></section><section class="nb-radar-box"><h3>ASAL / Askeralma yaklaşan tarihleri</h3>${deadlineCards(asal, now)}<a class="nb-radar-more" href="/askerlik-subeleri/duyurular/">ASAL duyurularını aç →</a></section></div><style>${homeStyles}</style></section>`;
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const stopwords = new Set([
  "nereye", "nereden", "nerde", "nerede", "nasil", "hangi", "kim", "ne", "icin", "bir", "ben", "bana", "benim",
  "yapilir", "yapmam", "yapmaliyim", "gerekiyor", "gerekir", "istiyorum", "isterim", "gidecegim", "gitmem", "gidebilirim",
  "basvurulur", "basvuracagim", "basvurabilirim", "etmeliyim", "edilir", "olur", "mi", "mu", "miyim", "miyim"
]);

const synonymMap: Record<string, string[]> = {
  sikayet: ["itiraz", "basvuru", "ihbar"],
  ihbar: ["bildirim", "sikayet"],
  iade: ["para", "geri", "cayma"],
  iptal: ["cayma", "itiraz"],
  kayip: ["calinti"],
  calinti: ["kayip"],
  telefon: ["iletisim"],
  konum: ["adres", "yol", "tarifi"],
  navigasyon: ["adres", "yol", "tarifi"],
  maas: ["aylik"],
  ogrenci: ["universite", "egitim"],
  askerlik: ["askeralma"]
};

export function smartSearchRoutes(query: string, routes: RouteRecord[], limit = 60): RouteRecord[] {
  const normalized = normalize(query);
  if (!normalized) return routes.slice(0, limit);
  const rawTerms = normalized.split(" ").filter(Boolean);
  const meaningful = rawTerms.filter(term => !stopwords.has(term));
  const baseTerms = meaningful.length ? meaningful : rawTerms;
  const expanded = unique(baseTerms.flatMap(term => [term, ...(synonymMap[term] || [])]));
  const normalizedPhrase = baseTerms.join(" ");

  return routes
    .map(route => {
      const title = normalize(route.title);
      const aliases = normalize(route.aliases.join(" "));
      const summary = normalize(route.summary);
      const category = normalize(`${route.category} ${route.section}`);
      const authorities = normalize(route.competentAuthorities.join(" "));
      const steps = normalize(route.steps.join(" "));
      let score = 0;
      for (const term of expanded) {
        if (title.includes(term)) score += 9;
        if (aliases.includes(term)) score += 8;
        if (summary.includes(term)) score += 4;
        if (category.includes(term)) score += 3;
        if (authorities.includes(term)) score += 2;
        if (steps.includes(term)) score += 1;
      }
      const fullHaystack = `${title} ${aliases} ${summary}`;
      if (normalizedPhrase.length >= 4 && fullHaystack.includes(normalizedPhrase)) score += 15;
      return { route, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.route.title.localeCompare(b.route.title, "tr-TR"))
    .slice(0, limit)
    .map(item => item.route);
}
