import type { Announcement } from "./announcements";
import { supplementalAnnouncements as previousAnnouncements } from "./supplemental-announcements-base";

const gsbCoachExamAnnouncement: Announcement = {
  slug: "2026-gsb-sozlesmeli-antrenor-sozlu-uygulamali-sinav",
  title: "2026 GSB sözleşmeli antrenör alımı sözlü ve uygulamalı sınav tarihleri açıklandı",
  authority: "Gençlik ve Spor Bakanlığı / Personel Genel Müdürlüğü",
  kind: "exam-call",
  publishedAt: "2026-09-07",
  verifiedAt: "2026-09-08",
  lastModified: "2026-09-08",
  summary: "GSB, 2026 sözleşmeli antrenör alımında sözlü ve uygulamalı sınava katılmaya hak kazanan adayların sınavlarının 15-25 Eylül 2026 arasında Ankara'da yapılacağını; kişisel tarih ve yer bilgisinin Kariyer Kapısı Sınavlarım/Mülakatlarım bölümünden öğrenileceğini duyurdu.",
  details: [
    "Gençlik ve Spor Bakanlığı Personel Genel Müdürlüğünün 7 Eylül 2026 tarihli resmî duyurusuna göre başvuruları onaylanan ve sözlü/uygulamalı sınava katılmaya hak kazanan adayların sınavları 15-25 Eylül 2026 tarihleri arasında Ankara'da yapılacak.",
    "Her adayın kişisel sınav tarihi, saati ve yeri Cumhurbaşkanlığı Kariyer Kapısı üzerinden Sınavlarım/Mülakatlarım başlığı altında ilan edildi. Genel tarih aralığı kişisel randevu yerine geçmiyor.",
    "Belirlenen tarih ve saatte sınava katılmayan aday sınav hakkını kaybetmiş sayılıyor ve ikinci sınav hakkı verilmiyor. Mücbir sebep varsa, ilgili spor dalının sınav tarihleri içinde kalmak kaydıyla değişiklik talebi mümkün; gerekçeyi kanıtlayan belge ve ıslak imzalı dilekçe en geç kişisel sınav tarihine kadar personel.sinavlar@gsb.gov.tr adresine gönderilmeli.",
    "Adayların sınava nüfus cüzdanı veya pasaport ile gelmesi gerekiyor; duyuru bu belgeler dışında başka bir kimlik belgesinin kabul edilmeyeceğini belirtiyor."
  ],
  actions: [
    "Kariyer Kapısı'nda Sınavlarım/Mülakatlarım bölümünü açarak size atanmış tarih, saat ve yeri kontrol edin.",
    "Sınava nüfus cüzdanı veya pasaportla gidin ve branşınıza uygun spor kıyafeti/varsa kişisel ekipmanınızı hazırlayın.",
    "Mücbir sebeple katılamayacaksanız kanıtlayıcı belge ve ıslak imzalı dilekçenizi en geç kişisel sınav tarihinize kadar Bakanlığın duyuruda verdiği e-posta adresine gönderin."
  ],
  deadlineLabel: "Sınavlar 15-25 Eylül 2026 arasında; bağlayıcı kişisel tarih, saat ve yer Kariyer Kapısı Sınavlarım/Mülakatlarım ekranında",
  actionUrl: "https://kariyerkapisi.gov.tr/isealim",
  actionLabel: "Kariyer Kapısı sınav bilgilerini kontrol et",
  relatedPathKeys: [],
  relatedSearches: ["GSB antrenör alımı", "sözleşmeli antrenör sınavı", "GSB sözlü uygulamalı sınav", "Kariyer Kapısı antrenör sınavı"],
  sources: [
    { title: "2026 Yılı Sözleşmeli Antrenör Alımı Sözlü ve Uygulamalı Sınav Duyurusu", authority: "Gençlik ve Spor Bakanlığı Personel Genel Müdürlüğü", url: "https://pgm.gsb.gov.tr/Duyuru/302875/2026-yili-sozlesmeli-antrenor-alimi-sozlu-ve-uygulamali-sinav-duyurusu.aspx" }
  ]
};

const gsbYurtResultAnnouncement: Announcement = {
  slug: "2026-gsb-yurt-basvuru-sonuclari-sorgulama",
  title: "2026-2027 GSB yurt başvuru sonucu sorgulama ekranı erişime açık",
  authority: "Gençlik ve Spor Bakanlığı / Kredi ve Yurtlar Genel Müdürlüğü",
  kind: "result",
  publishedAt: "2026-09-06",
  verifiedAt: "2026-09-06",
  lastModified: "2026-09-06",
  summary: "Gençlik ve Spor Bakanlığının resmî 2026-2027 yurt başvuru sonucu sayfası, öğrencileri e-Devlet'teki Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor; kişisel sonuç yalnız kimlik doğrulaması sonrasında görüntülenebiliyor.",
  details: [
    "Gençlik ve Spor Bakanlığının resmî sonuç sayfasında '2026-2027 Eğitim Öğretim Dönemi Yurt Başvuru Sonucu' başlığı yer alıyor ve sorgulama bağlantısı doğrudan e-Devlet'teki Gençlik ve Spor Bakanlığı Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor.",
    "e-Devlet sonuç hizmeti kişisel nitelikte olduğundan yurt yerleştirme sonucu, hak kazanılan yurt ve kişiye özel işlem bilgileri genel duyuru sayfasından değil kimlik doğrulaması yapılarak öğrenilmeli.",
    "6 Eylül 2026 denetiminde GSB/KYGM'nin güncel haber ve duyuru listelerinde 2026-2027 dönemi için herkese uygulanabilecek yeni bir genel kayıt son tarihi ayrıca doğrulanamadı. Bu nedenle önceki yılların kayıt tarihleri yeni dönem için kullanılmamalı; sonuç ekranındaki kişisel işlem bilgileri ile sonraki resmî GSB/KYGM duyuruları esas alınmalı."
  ],
  actions: [
    "e-Devlet'teki GSB Yurt Başvuru Sonucu Sorgulama hizmetine giriş yaparak kişisel sonucunuzu kontrol edin.",
    "Yurt hakkı kazandıysanız kişisel sonuç ekranında gösterilen kayıt, ücret veya taahhütname adımlarını ve varsa süreyi esas alın; önceki yıllara ait son tarihleri 2026 için kullanmayın.",
    "Yedek veya ek başvuru sürecindeyseniz GSB ve KYGM'nin yeni resmî duyurularını takip edin."
  ],
  deadlineLabel: "2026-2027 dönemi için genel kayıt son tarihi 6 Eylül 2026 denetiminde ayrıca doğrulanmadı; kişisel sonuç ekranındaki süre ve güncel GSB/KYGM duyurusu esas alınmalı",
  actionUrl: "https://www.turkiye.gov.tr/gsb-yurt-basvuru-sonucu-sorgulama",
  actionLabel: "e-Devlet GSB yurt başvuru sonucunu sorgula",
  relatedPathKeys: [
    "Eğitim ve Öğrenci İşlemleri > Üniversite > Kayıt",
    "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > Yerleştirme işlemleri"
  ],
  relatedSearches: ["GSB yurt sonucu", "KYK yurt sonucu", "yurt başvuru sonucu", "2026 yurt sonucu"],
  sources: [
    { title: "2026-2027 Eğitim Öğretim Dönemi Yurt Başvuru Sonucu", authority: "Gençlik ve Spor Bakanlığı", url: "https://www.gsb.gov.tr/Featured/YurtSonuc" },
    { title: "Yurt Başvuru Sonucu Sorgulama", authority: "e-Devlet Kapısı / Gençlik ve Spor Bakanlığı", url: "https://www.turkiye.gov.tr/gsb-yurt-basvuru-sonucu-sorgulama" }
  ]
};

const newAnnouncement: Announcement = {
  slug: "2026-hayvancilik-destekleri-1-donem-basvurulari",
  title: "2026 hayvancılık destekleri: 1. dönem başvuruları sürüyor, destek tutarları güncellendi",
  authority: "Tarım ve Orman Bakanlığı / Hayvancılık Genel Müdürlüğü",
  kind: "application",
  publishedAt: "2026-09-01",
  verifiedAt: "2026-09-09",
  lastModified: "2026-09-09",
  summary: "2026 yılı 1. dönem buzağı/malak ve kuzu/oğlak hayvancılık destekleme başvuruları 1 Aralık 2026'ya kadar sürüyor. 8 Eylül 2026 tarihli 11782 sayılı Cumhurbaşkanı Kararıyla 2026 hayvancılık destek tutarları ve bazı ilave katsayılar güncellendi; başvuru kanalı ve 1. dönem son tarihi değişmedi.",
  details: [
    "Hayvancılık Genel Müdürlüğü, 1 Eylül 2026 tarihinde 2026 Yılı Büyükbaş Hayvancılık (Buzağı/Malak) ve Küçükbaş Hayvancılık (Kuzu/Oğlak) Desteklemeleri Talimatlarını yayımladı. Resmî il müdürlüğü uygulama duyuruları 1. dönem başvurularını 1 Eylül-1 Aralık 2026 aralığında gösteriyor.",
    "8 Eylül 2026 tarihli ve 33364 sayılı Resmî Gazete'de yayımlanan 11782 sayılı Cumhurbaşkanı Kararı 1 Ocak 2026'dan geçerli olmak üzere destek tutarlarını değiştirdi. Buzağı temel desteği 2.000 TL/baş, malak 4.000 TL/baş, kuzu/oğlak 430 TL/baş oldu. Atık desteği sığır ve manda için 20.000 TL/baş, koyun ve keçi için 4.000 TL/baş; arıcılık desteği birlik üyesine 250 TL/kovan, üye olmayana 200 TL/kovan olarak düzenlendi.",
    "Karar ayrıca suni tohumlama, embriyo transferi/cinsiyeti belirli sperma, soy kütüğü, ari işletme, göçer sevk kontrol noktası ve bazı diğer destek kalemlerine ilişkin ilave katsayıları güncelledi. Destek kapsamı teknik şartlara bağlı olduğundan yalnız özet tutara bakarak hak kazanıldığı varsayılmamalı; Bakanlığın güncel talimatı ve başvuru kaydı birlikte kontrol edilmeli.",
    "Büyükbaş buzağı/malak desteğinde yetiştirici örgütü üyesi olan yetiştiriciler başvuruyu ilgili yetiştirici örgütü üzerinden; üye olmayan yetiştiriciler ise il/ilçe Tarım ve Orman Müdürlüğüne şahsen yapıyor. Küçükbaş kuzu/oğlak desteğinde resmî il müdürlüğü duyuruları başvurunun Damızlık Koyun-Keçi Yetiştiricileri Birliği üzerinden yürütüldüğünü belirtiyor."
  ],
  actions: [
    "Başvuracağınız desteğin buzağı/malak mı yoksa kuzu/oğlak mı olduğunu belirleyin ve Hayvancılık Genel Müdürlüğünün 2026 talimatını kontrol edin.",
    "Hak kazanma ve tutar hesabında 11782 sayılı Kararın güncel 2026 tutarlarını ve ilave katsayılarını esas alın; yalnız temel tutarı nihai ödeme tutarı olarak kabul etmeyin.",
    "Büyükbaş desteğinde yetiştirici örgütü üyesiyseniz ilgili örgüt üzerinden, üye değilseniz İl/İlçe Tarım ve Orman Müdürlüğü üzerinden başvurun; küçükbaş desteğinde ilgili Damızlık Koyun-Keçi Yetiştiricileri Birliğinin başvuru kanalını kullanın.",
    "Başvuruyu 1 Aralık 2026 tarihini geçirmeden tamamlayın; fizikî başvuruda ilgili kurum veya birliğin mesai/kabul saatini esas alın."
  ],
  deadlineAt: "2026-12-02T00:00:00+03:00",
  deadlineLabel: "1. dönem başvuruları 1 Aralık 2026 tarihinde sona eriyor; 11782 sayılı Karar bu son tarihi değiştirmedi",
  actionUrl: "https://www.tarimorman.gov.tr/HHGM/Haber/263/2024-2026-Yillarinda-Yapilacak-Hayvancilik-Desteklemelerine-Iliskin-Kararda-Degisiklik-Yapilmasina-Dair-Karar",
  actionLabel: "Tarım ve Orman Bakanlığının 11782 sayılı Karar duyurusunu aç",
  relatedPathKeys: ["Tarım, Hayvancılık, Orman ve Kırsal > Hayvancılık > Hayvancılık destekleri"],
  relatedSearches: ["hayvancılık destekleri", "buzağı malak desteği", "kuzu oğlak desteği", "2026 hayvancılık desteği", "11782 hayvancılık destekleri"],
  sources: [
    { title: "2024-2026 Yıllarında Yapılacak Hayvancılık Desteklemelerine İlişkin Kararda Değişiklik Yapılmasına Dair Karar", authority: "Tarım ve Orman Bakanlığı Hayvancılık Genel Müdürlüğü", url: "https://www.tarimorman.gov.tr/HHGM/Haber/263/2024-2026-Yillarinda-Yapilacak-Hayvancilik-Desteklemelerine-Iliskin-Kararda-Degisiklik-Yapilmasina-Dair-Karar" },
    { title: "11782 sayılı Cumhurbaşkanı Kararı - Resmî Gazete PDF", authority: "T.C. Resmî Gazete", url: "https://www.resmigazete.gov.tr/eskiler/2026/09/20260908-8.pdf" },
    { title: "2026 Yılı Büyükbaş ve Küçükbaş Hayvancılık Desteklemeleri Talimatları", authority: "Tarım ve Orman Bakanlığı Hayvancılık Genel Müdürlüğü", url: "https://www.tarimorman.gov.tr/haygem/Sayfalar/Detay.aspx?Liste=Duyuru" },
    { title: "2026 Yılı 1. Dönem Büyükbaş Hayvancılık Destekleme Başvuru İşlemleri", authority: "Tarım ve Orman Bakanlığı Kütahya İl Müdürlüğü", url: "https://kutahya.tarimorman.gov.tr/Duyuru/733/2026-Yili-1-Donem-Buyukbas-Hayvancilik-Destekleme-Basvuru-Islemleri" },
    { title: "2026 Yılı 1. Dönem Büyükbaş ve Küçükbaş Hayvancılık Desteklemeleri Başvuruları Başladı", authority: "Tarım ve Orman Bakanlığı İstanbul İl Müdürlüğü", url: "https://istanbul.tarimorman.gov.tr/Duyuru/483/2026-Yili-1-Donem-Buyukbas-Ve-Kucukbas-Hayvancilik-Desteklemeleri-Basvurulari-Basladi" }
  ]
};

export const supplementalAnnouncements: Announcement[] = [gsbCoachExamAnnouncement, gsbYurtResultAnnouncement, newAnnouncement, ...previousAnnouncements]
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
