import type { Announcement } from "./announcements";
import { supplementalAnnouncements as previousAnnouncements } from "./supplemental-announcements-base";

const newAnnouncement: Announcement = {
  slug: "2026-hayvancilik-destekleri-1-donem-basvurulari",
  title: "2026 büyükbaş ve küçükbaş hayvancılık destekleri 1. dönem başvuruları başladı",
  authority: "Tarım ve Orman Bakanlığı / Hayvancılık Genel Müdürlüğü",
  kind: "application",
  publishedAt: "2026-09-01",
  verifiedAt: "2026-09-05",
  lastModified: "2026-09-05",
  summary: "2026 yılı 1. dönem buzağı/malak ve kuzu/oğlak hayvancılık destekleme başvuruları 1 Eylül 2026'da başladı; resmî il müdürlüğü duyurularında son başvuru tarihi 1 Aralık 2026 olarak açıklandı ve başvuru kanalı destek türü ile yetiştirici örgütü üyeliğine göre değişiyor.",
  details: [
    "Hayvancılık Genel Müdürlüğü, 1 Eylül 2026 tarihinde hem 2026 Yılı Büyükbaş Hayvancılık (Buzağı/Malak) hem de 2026 Yılı Küçükbaş Hayvancılık (Kuzu/Oğlak) Desteklemeleri Talimatlarını yayımladı. Resmî il müdürlüğü uygulama duyuruları 1. dönem başvurularını 1 Eylül-1 Aralık 2026 aralığında gösteriyor.",
    "Büyükbaş buzağı/malak desteğinde yetiştirici örgütü üyesi olan yetiştiriciler başvuruyu ilgili yetiştirici örgütü üzerinden; üye olmayan yetiştiriciler ise il/ilçe Tarım ve Orman Müdürlüğüne şahsen yapıyor. İlinizdeki uygulama ayrıntısı için bağlı bulunduğunuz müdürlüğün güncel duyurusunu kontrol edin.",
    "Küçükbaş kuzu/oğlak desteğinde resmî il müdürlüğü duyuruları başvurunun Damızlık Koyun-Keçi Yetiştiricileri Birliği üzerinden yürütüldüğünü belirtiyor. Yerel uygulamada belge ve kabul noktası ayrıntısını ilgili birlik ve İl/İlçe Tarım ve Orman Müdürlüğünden doğrulayın."
  ],
  actions: [
    "Başvuracağınız desteğin buzağı/malak mı yoksa kuzu/oğlak mı olduğunu belirleyin ve Hayvancılık Genel Müdürlüğünün 2026 talimatını kontrol edin.",
    "Büyükbaş desteğinde yetiştirici örgütü üyesiyseniz ilgili örgüt üzerinden, üye değilseniz İl/İlçe Tarım ve Orman Müdürlüğü üzerinden başvurun; küçükbaş desteğinde ilgili Damızlık Koyun-Keçi Yetiştiricileri Birliğinin başvuru kanalını kullanın.",
    "Başvuruyu 1 Aralık 2026 tarihini geçirmeden tamamlayın; fizikî başvuruda ilgili kurum veya birliğin mesai/kabul saatini esas alın."
  ],
  deadlineAt: "2026-12-02T00:00:00+03:00",
  deadlineLabel: "1. dönem başvuruları 1 Aralık 2026 tarihinde sona eriyor; fizikî kabul için ilgili birimin mesai saatini esas alın",
  actionUrl: "https://www.tarimorman.gov.tr/haygem/Sayfalar/Detay.aspx?Liste=Duyuru",
  actionLabel: "HAYGEM 2026 hayvancılık destekleme talimatlarını aç",
  relatedPathKeys: ["Tarım, Hayvancılık, Orman ve Kırsal > Hayvancılık > Hayvancılık destekleri"],
  relatedSearches: ["hayvancılık destekleri", "buzağı malak desteği", "kuzu oğlak desteği", "2026 hayvancılık desteği"],
  sources: [
    { title: "2026 Yılı Büyükbaş ve Küçükbaş Hayvancılık Desteklemeleri Talimatları", authority: "Tarım ve Orman Bakanlığı Hayvancılık Genel Müdürlüğü", url: "https://www.tarimorman.gov.tr/haygem/Sayfalar/Detay.aspx?Liste=Duyuru" },
    { title: "2026 Yılı 1. Dönem Büyükbaş Hayvancılık Destekleme Başvuru İşlemleri", authority: "Tarım ve Orman Bakanlığı Kütahya İl Müdürlüğü", url: "https://kutahya.tarimorman.gov.tr/Duyuru/733/2026-Yili-1-Donem-Buyukbas-Hayvancilik-Destekleme-Basvuru-Islemleri" },
    { title: "2026 Yılı 1. Dönem Büyükbaş ve Küçükbaş Hayvancılık Desteklemeleri Başvuruları Başladı", authority: "Tarım ve Orman Bakanlığı İstanbul İl Müdürlüğü", url: "https://istanbul.tarimorman.gov.tr/Duyuru/483/2026-Yili-1-Donem-Buyukbas-Ve-Kucukbas-Hayvancilik-Desteklemeleri-Basvurulari-Basladi" }
  ]
};

export const supplementalAnnouncements: Announcement[] = [newAnnouncement, ...previousAnnouncements]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.slug.localeCompare(a.slug));

export const supplementalAnnouncementBySlug = new Map(supplementalAnnouncements.map(item => [item.slug, item]));

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#039;" }[char] || char));
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
