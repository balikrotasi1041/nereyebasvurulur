import type { Announcement } from "./announcements";

const A = (value: Announcement): Announcement => value;

export const supplementalAnnouncements: Announcement[] = [
  A({
    slug: "2026-kpss-ortaogretim-basvurulari-basladi",
    title: "2026-KPSS Ortaöğretim başvuruları başladı",
    authority: "ÖSYM",
    kind: "application",
    publishedAt: "2026-08-27",
    verifiedAt: "2026-08-28",
    lastModified: "2026-08-28",
    summary: "ÖSYM, 25 Ekim 2026 tarihinde uygulanacak 2026-KPSS Ortaöğretim için başvuruları 27 Ağustos 2026 tarihinde açtı; normal başvuru dönemi 8 Eylül 2026 tarihinde sona erecek.",
    details: [
      "2026-KPSS Ortaöğretim 25 Ekim 2026 tarihinde uygulanacak ve normal başvurular 27 Ağustos-8 Eylül 2026 arasında alınacak.",
      "Adaylar başvurularını ÖSYM Başvuru Merkezleri aracılığıyla veya bireysel olarak ÖSYM Aday İşlemleri Sistemi ve ÖSYM Aday İşlemleri Mobil uygulamasından yapabilecek.",
      "1 Kasım 2026 tarihinde uygulanacak 2026-DHBT için ayrı başvuru dönemi 22-30 Eylül 2026 olacak; ortaöğretim düzeyinde DHBT'ye girecek adayların 2026-KPSS Ortaöğretim'e de başvurup sınava girmesi gerekiyor."
    ],
    actions: [
      "ÖSYM'nin 2026-KPSS Ortaöğretim duyurusunu ve güncel kılavuzu okuyun.",
      "Başvurunuzu 8 Eylül 2026 tarihini beklemeden AİS, ÖSYM mobil uygulaması veya yetkili başvuru merkezi üzerinden tamamlayın.",
      "DHBT'ye ortaöğretim düzeyinde katılacaksanız KPSS Ortaöğretim başvurusunu ayrıca tamamladığınızdan emin olun."
    ],
    deadlineAt: "2026-09-08T23:59:00+03:00",
    deadlineLabel: "Normal başvuru dönemi 8 Eylül 2026'da sona eriyor",
    actionUrl: "https://ais.osym.gov.tr/",
    actionLabel: "ÖSYM Aday İşlemleri Sistemini aç",
    relatedPathKeys: [],
    relatedSearches: ["KPSS Ortaöğretim", "KPSS", "kamu personeli sınavı"],
    sources: [
      { title: "2026-KPSS Ortaöğretim: Başvuruların Alınması", authority: "ÖSYM", url: "https://osym.gov.tr/2026-kpss-ortaogretim-basvurularin-alinmasi" }
    ]
  }),
  A({
    slug: "3713-terorle-mucadelede-yaralananlar-e-devlet-basvurusu",
    title: "Terörle mücadelede yaralanıp malul sayılmayanlar için e-Devlet başvurusu 1 Eylül'de açılıyor",
    authority: "Jandarma Genel Komutanlığı",
    kind: "guide",
    publishedAt: "2026-08-25",
    verifiedAt: "2026-08-28",
    lastModified: "2026-08-28",
    summary: "Jandarma Genel Komutanlığının resmî duyurusuna göre 3713 sayılı Kanun kapsamındaki yeni başvuru süreci 1 Eylül 2026 itibarıyla e-Devlet üzerinden erişime açılacak; birlik, kurum ve askerlik şubelerinden başvuru kabul edilmeyecek.",
    details: [
      "Duyuru; terörle mücadelede yaralanan TSK, Jandarma ve Sahil Güvenlik askerî personeli ile erbaş ve erleri, Emniyet Hizmetleri Sınıfı personelini ve güvenlik korucularını, muvazzaf ve emekliler dâhil olmak üzere kapsayan bir e-Devlet başvuru süreci açıklıyor.",
      "Başvuru ekranında terör sonucu yaralanma olayı özetlenecek ve başvuru sahibinin elinde varsa mevcut bilgi ve belgeler sisteme yüklenecek.",
      "Resmî duyuru, başvuru için kamu kurumlarından ayrıca belge talep edilmesine gerek olmadığını ve e-Devlet dışındaki birlik, kurum veya askerlik şubelerinden başvuru kabul edilmeyeceğini açıkça belirtiyor.",
      "Başvuru ekranının doğrudan e-Devlet bağlantısı duyuruda henüz verilmediği için bu kayıtta tahminî bir hizmet adresi kullanılmıyor; 1 Eylül'de açılacak resmî e-Devlet ekranı esas alınmalı."
    ],
    actions: [
      "1 Eylül 2026'dan itibaren e-Devlet'te açılacak resmî başvuru hizmetini kullanın.",
      "Elinizde bulunan olay ve yaralanmaya ilişkin bilgi veya belgeleri dijital olarak hazır bulundurun; sırf başvuru için kamu kurumlarından yeni belge istemeniz gerekmediği duyuruldu.",
      "Birlik, kurum veya askerlik şubesine başvuru yapmayın; resmî duyuru bu kanallardan başvuru kabul edilmeyeceğini belirtiyor."
    ],
    deadlineLabel: "Başvuru ekranı 1 Eylül 2026 itibarıyla e-Devlet'te açılacak; duyuruda kapanış tarihi belirtilmedi",
    actionUrl: "https://ankara.jandarma.gov.tr/terorle-mucadelede-yaralanip-malul-sayilmayanlara-yonelik-basvuru-sureci-hakkinda-duyuru25-merkezicerik",
    actionLabel: "Jandarma'nın resmî başvuru duyurusunu aç",
    relatedPathKeys: [],
    relatedSearches: ["3713", "terörle mücadelede yaralanma", "gazi hakları", "malul sayılmayan"],
    sources: [
      { title: "Terörle Mücadelede Yaralanıp Malul Sayılmayanlara Yönelik Başvuru Süreci Hakkında Duyuru", authority: "Jandarma Genel Komutanlığı / Ankara İl Jandarma Komutanlığı", url: "https://ankara.jandarma.gov.tr/terorle-mucadelede-yaralanip-malul-sayilmayanlara-yonelik-basvuru-sureci-hakkinda-duyuru25-merkezicerik" }
    ]
  })
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.slug.localeCompare(a.slug));

export const supplementalAnnouncementBySlug = new Map(supplementalAnnouncements.map(item => [item.slug, item]));

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char] || char));
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function badge(item: Announcement): { label: string; className: string } {
  if (item.deadlineAt && Date.now() > new Date(item.deadlineAt).getTime()) return { label: "Arşiv · süre sona erdi", className: "archive" };
  if (item.kind === "application") return { label: "Başvuru açık", className: "open" };
  if (item.kind === "result") return { label: "Sonuç açıklandı", className: "result" };
  if (item.kind === "exam-call") return { label: "Aktif sınav çağrısı", className: "call" };
  return { label: "Resmî başvuru duyurusu", className: "guide" };
}

function card(item: Announcement, heading = "h2"): string {
  const state = badge(item);
  return `<a class="announcement-card supplemental-announcement" href="/duyuru/${esc(item.slug)}/"><div class="announcement-meta"><span class="announcement-badge ${state.className}">${esc(state.label)}</span><span>${esc(item.authority)}</span><span>${formatDate(item.publishedAt)}</span></div><${heading}>${esc(item.title)}</${heading}><p>${esc(item.summary)}</p></a>`;
}

export function injectSupplementalAnnouncementList(body: string): string {
  const marker = '<section class="announcement-grid" aria-label="Resmî duyuru listesi">';
  if (!body.includes(marker)) return body;
  return body.replace(marker, `${marker}${supplementalAnnouncements.map(item => card(item)).join("")}`);
}

export function renderSupplementalHomeSection(): string {
  const cards = supplementalAnnouncements.map(item => card(item, "h3")).join("");
  return `<section class="home-announcements supplemental-home" aria-labelledby="latestVerifiedAnnouncements"><div class="home-announcements-head"><div><h2 id="latestVerifiedAnnouncements">Yeni doğrulanan resmî duyurular</h2><p>Bugünkü taramada işlem değeri taşıdığı doğrulanan başvuru ve süre değişiklikleri.</p></div><a class="announcement-btn" href="/duyurular/">Tüm duyurular →</a></div><div class="home-announcements-grid">${cards}</div></section>`;
}

export function injectSupplementalSitemap(xml: string): string {
  if (!xml.includes("</urlset>")) return xml;
  const entries = supplementalAnnouncements
    .map(item => `<url><loc>https://nereyebasvurulur.com/duyuru/${item.slug}/</loc><lastmod>${item.lastModified}</lastmod></url>`)
    .join("");
  return xml.replace("</urlset>", `${entries}</urlset>`);
}
