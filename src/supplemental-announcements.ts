import type { Announcement } from "./announcements";

const A = (value: Announcement): Announcement => value;

export const supplementalAnnouncements: Announcement[] = [
  A({
    slug: "2027-cks-basvurulari-basladi",
    title: "2027 üretim yılı ÇKS başvuruları başladı",
    authority: "Tarım ve Orman Bakanlığı",
    kind: "application",
    publishedAt: "2026-09-01",
    verifiedAt: "2026-09-02",
    lastModified: "2026-09-02",
    summary: "2027 üretim yılı Çiftçi Kayıt Sistemi başvuruları 1 Eylül 2026'da başladı; genel başvuru dönemi 31 Aralık 2026'da sona erecek.",
    details: [
      "Tarım ve Orman Bakanlığının il müdürlüklerince yayımlanan resmî duyurular, 2027 üretim yılı ÇKS başvurularının 1 Eylül-31 Aralık 2026 tarihleri arasında alınacağını doğruluyor.",
      "Tapu, kira/taahhütname ve arazi mülkiyet bilgilerinde değişiklik olmayan mevcut kayıtlı üreticiler kayıt yenilemesini e-Devlet üzerinden yapabiliyor; Bakanlığın il müdürlüğü duyuruları ayrıca yerel başvuru kanalını gösteriyor.",
      "İlk kayıt, arazi edinim/mülkiyet değişikliği veya yerelde protokole bağlanan işlemlerde başvuru mercii il/ilçe müdürlüğü ya da ilgili yerel resmî kanal olabilir; bu nedenle bulunduğunuz ilin Tarım ve Orman Müdürlüğü duyurusunu kontrol edin."
    ],
    actions: [
      "Mevcut ÇKS kaydınız ve arazi bilgileriniz değişmediyse e-Devlet üzerinden yenileme ekranını kontrol edin.",
      "İlk kayıt veya arazi/mülkiyet değişikliği varsa il/ilçe Tarım ve Orman Müdürlüğünün güncel yönlendirmesini izleyin.",
      "Başvurunuzu 31 Aralık 2026 tarihinden önce tamamlayın."
    ],
    deadlineAt: "2026-12-31T23:59:00+03:00",
    deadlineLabel: "Genel başvuru dönemi 31 Aralık 2026'da sona eriyor",
    actionUrl: "https://www.turkiye.gov.tr/tarim-ve-orman-bakanligi",
    actionLabel: "e-Devlet Tarım ve Orman hizmetlerini aç",
    relatedPathKeys: [],
    relatedSearches: ["ÇKS", "Çiftçi Kayıt Sistemi", "2027 ÇKS", "çiftçi kayıt yenileme"],
    sources: [
      { title: "2027 Üretim Yılı Çiftçi Kayıt Sistemi Başvuruları 1 Eylül 2026 Tarihi itibari ile başlamıştır", authority: "Tarım ve Orman Bakanlığı Bolu İl Müdürlüğü", url: "https://bolu.tarimorman.gov.tr/Duyuru/701/2027-Uretim-Yili-Ciftci-Kayit-Sistemi-Basvurulari-1-Eylul-2026-Tarihi-Itibari-Ile-Baslamistir" },
      { title: "2027 Yılı ÇKS Kayıtları Başladı", authority: "Tarım ve Orman Bakanlığı Rize İl Müdürlüğü", url: "https://rize.tarimorman.gov.tr/Duyuru/355/2027-Yili-Cks-Kayitlari-Basladi" }
    ]
  }),
  A({
    slug: "2026-e-ydts-2-turkce-basvurulari",
    title: "2026 e-YDTS/2 Türkçe başvuruları başladı",
    authority: "ÖSYM",
    kind: "application",
    publishedAt: "2026-09-01",
    verifiedAt: "2026-09-02",
    lastModified: "2026-09-02",
    summary: "19 Eylül 2026'da yapılacak 2026 e-YDTS/2 Türkçe için başvurular 1-10 Eylül 2026 arasında ÖSYM ödeme sistemi üzerinden alınıyor; kontenjan dolarsa başvuru daha erken kapanabilir.",
    details: [
      "Sınav 19 Eylül 2026 tarihinde Ankara, İstanbul, İzmir ve Adana'daki e-Sınav Uygulama Binalarında yapılacak.",
      "Başvurular 1 Eylül 2026 saat 14.00'ten itibaren ÖSYM'nin ödeme sistemi üzerinden alınmaya başladı ve ilan edilen dönem 10 Eylül 2026'da sona eriyor.",
      "Kontenjan Ankara'da 658, İstanbul'da 202, İzmir'de 49 ve Adana'da 102 kişiyle sınırlı; adaylar sınav ücretini ödeme sırasına göre kontenjana dâhil ediliyor ve kontenjan dolarsa ödeme sistemi başvuruyu kapatıyor."
    ],
    actions: [
      "ÖSYM'nin 2026 e-YDTS kılavuzunu okuyun.",
      "Kontenjan sınırlı olduğu için başvuruyu son günü beklemeden ÖSYM ödeme sistemi üzerinden tamamlayın."
    ],
    deadlineAt: "2026-09-10T23:59:00+03:00",
    deadlineLabel: "İlan edilen başvuru dönemi 10 Eylül 2026'da sona eriyor; kontenjan dolarsa daha erken kapanabilir",
    actionUrl: "https://sanalpos.osym.gov.tr/",
    actionLabel: "ÖSYM ödeme sistemini aç",
    relatedPathKeys: [],
    relatedSearches: ["e-YDTS", "e-YDTS Türkçe", "Türkçe yeterlilik sınavı"],
    sources: [
      { title: "2026 Elektronik Yabancı Dil Olarak Türkçe Sınavı (e-YDTS/2 Türkçe): Başvuruların Alınması", authority: "ÖSYM", url: "https://osym.gov.tr/2026-elektronik-yabanci-dil-olarak-turkce-sinavi-e-ydts2-turkce-basvurularin-alinmasi" }
    ]
  }),
  A({
    slug: "2026-dgs-tercihleri-basladi",
    title: "2026-DGS tercihleri başladı",
    authority: "ÖSYM",
    kind: "application",
    publishedAt: "2026-08-27",
    verifiedAt: "2026-08-31",
    lastModified: "2026-08-31",
    summary: "ÖSYM, 2026-DGS tercih işlemlerini 27 Ağustos 2026 tarihinde açtı; adaylar tercihlerini 3 Eylül 2026 saat 23.59'a kadar Aday İşlemleri Sistemi üzerinden elektronik olarak yapabilecek.",
    details: [
      "2026-DGS tercih işlemleri 27 Ağustos-3 Eylül 2026 tarihleri arasında yürütülüyor ve son saat 3 Eylül 2026 saat 23.59 olarak açıklandı.",
      "Tercihler ÖSYM Aday İşlemleri Sistemi üzerinden T.C. kimlik numarası ve aday şifresiyle bireysel olarak yapılıyor.",
      "Yerleştirmede 2026-DGS Başvuru Kılavuzu ile ÖSYM'nin yayımladığı tercih bilgileri ve tablolar esas alınacak; tercih kodları ve program koşulları gönderimden önce kontrol edilmeli."
    ],
    actions: [
      "ÖSYM'nin 2026-DGS tercih duyurusunu ve tercih tablolarını inceleyin.",
      "Tercihlerinizi 3 Eylül 2026 saat 23.59'dan önce AİS üzerinden kaydedip son hâlini kontrol edin."
    ],
    deadlineAt: "2026-09-03T23:59:00+03:00",
    deadlineLabel: "Tercihler 3 Eylül 2026 saat 23.59'da sona eriyor",
    actionUrl: "https://ais.osym.gov.tr/",
    actionLabel: "ÖSYM Aday İşlemleri Sistemini aç",
    relatedPathKeys: [],
    relatedSearches: ["DGS tercih", "Dikey Geçiş Sınavı", "ön lisans lisans geçiş"],
    sources: [
      { title: "2026-DGS: Tercihlerin Alınması", authority: "ÖSYM", url: "https://osym.gov.tr/2026-dgs-tercihlerin-alinmasi" }
    ]
  }),
  A({
    slug: "2026-kpss-lisans-sinava-giris-belgeleri",
    title: "2026-KPSS Lisans sınava giriş belgeleri erişime açıldı",
    authority: "ÖSYM",
    kind: "exam-call",
    publishedAt: "2026-08-27",
    verifiedAt: "2026-08-31",
    lastModified: "2026-08-31",
    summary: "ÖSYM, 6 Eylül 2026 tarihinde yapılacak 2026-KPSS Lisans Genel Yetenek-Genel Kültür oturumu için bina ve salon atamalarını tamamladı; sınava giriş belgeleri AİS üzerinden alınabiliyor.",
    details: [
      "2026-KPSS Lisans Genel Yetenek-Genel Kültür oturumu 6 Eylül 2026 tarihinde uygulanacak.",
      "Adayların sınava girecekleri bina ve salon bilgilerini gösteren sınava giriş belgeleri 27 Ağustos 2026 saat 11.00'den itibaren ÖSYM AİS üzerinden erişime açıldı.",
      "ÖSYM duyurusuna göre adaylar 6 Eylül 2026 tarihinde saat 10.00'dan sonra sınav binalarına alınmayacak."
    ],
    actions: [
      "Sınava giriş belgenizi ÖSYM AİS'ten alın ve bina/salon bilginizi sınav gününden önce kontrol edin.",
      "6 Eylül'de sınav binasına giriş için ÖSYM'nin ilan ettiği saat sınırını dikkate alarak erken ulaşın."
    ],
    deadlineAt: "2026-09-06T10:00:00+03:00",
    deadlineLabel: "6 Eylül 2026 tarihinde saat 10.00'dan sonra sınav binasına giriş yapılmayacak",
    actionUrl: "https://ais.osym.gov.tr/",
    actionLabel: "Sınava giriş belgesini ÖSYM AİS'ten al",
    relatedPathKeys: [],
    relatedSearches: ["KPSS Lisans", "KPSS sınava giriş belgesi", "KPSS 6 Eylül"],
    sources: [
      { title: "2026-KPSS Lisans Sınavı Genel Yetenek-Genel Kültür Oturumu: Sınava Giriş Belgeleri Erişime Açıldı", authority: "ÖSYM", url: "https://osym.gov.tr/2026-kpss-lisans-sinavi-genel-yetenek-genel-kultur-oturumu-sinava-giris-belgeleri-erisime-acildi" }
    ]
  }),
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
    title: "Terörle mücadelede yaralanıp malul sayılmayanlar için elektronik başvuru açıldı",
    authority: "Jandarma Genel Komutanlığı / e-Devlet Kapısı",
    kind: "application",
    publishedAt: "2026-08-25",
    verifiedAt: "2026-09-01",
    lastModified: "2026-09-01",
    summary: "3713 sayılı Kanunun geçici 20'nci maddesi kapsamındaki elektronik başvuru süreci 1 Eylül 2026 itibarıyla erişime açıldı; resmî e-Devlet hizmetleri çevrimiçi ve birlik, kurum veya askerlik şubesinden başvuru kabul edilmiyor.",
    details: [
      "Jandarma'nın resmî duyurusu; terörle mücadelede yaralanan TSK, Jandarma ve Sahil Güvenlik askerî personeli ile erbaş ve erleri, Emniyet Hizmetleri Sınıfı personelini ve güvenlik korucularını, muvazzaf ve emekliler dâhil olmak üzere kapsayan elektronik başvuru sürecini açıklıyor.",
      "1 Eylül 2026 kontrolünde e-Devlet'te Millî Savunma Bakanlığı ve İçişleri Bakanlığı adına '3713 sayılı Kanunun Geçici 20'nci Maddesi Kapsamında Terörle Mücadelede Malul Kalmayacak Şekilde Yaralananlara İlişkin Başvuru' hizmetlerinin erişilebilir olduğu doğrulandı.",
      "Başvuru ekranında terör sonucu yaralanma olayı özetleniyor ve başvuru sahibinin elinde varsa mevcut bilgi ve belgeler sisteme yükleniyor.",
      "Resmî duyuru, başvuru için kamu kurumlarından ayrıca belge talep edilmesine gerek olmadığını ve e-Devlet dışındaki birlik, kurum veya askerlik şubelerinden başvuru kabul edilmeyeceğini belirtiyor."
    ],
    actions: [
      "e-Devlet'te 3713 sayılı Kanunun geçici 20'nci maddesi kapsamındaki resmî başvuru hizmetini kurumunuza uygun seçenek üzerinden açın.",
      "Elinizde bulunan olay ve yaralanmaya ilişkin bilgi veya belgeleri dijital olarak hazır bulundurun; sırf başvuru için kamu kurumlarından yeni belge istemeniz gerekmediği duyuruldu.",
      "Birlik, kurum veya askerlik şubesine başvuru yapmayın; resmî duyuru bu kanallardan başvuru kabul edilmeyeceğini belirtiyor."
    ],
    deadlineLabel: "Başvuru 1 Eylül 2026 itibarıyla elektronik ortamda açık; resmî duyuruda kapanış tarihi belirtilmedi",
    actionUrl: "https://www.turkiye.gov.tr/arama?aranan=3713",
    actionLabel: "e-Devlet'te 3713 başvuru hizmetlerini aç",
    relatedPathKeys: [],
    relatedSearches: ["3713", "terörle mücadelede yaralanma", "gazi hakları", "malul sayılmayan"],
    sources: [
      { title: "Terörle Mücadelede Yaralanıp Malul Sayılmayanlara Yönelik Başvuru Süreci Hakkında Duyuru", authority: "Jandarma Genel Komutanlığı / İl Jandarma Komutanlığı", url: "https://afyonkarahisar.jandarma.gov.tr/terorle-mucadelede-yaralanip-malul-sayilmayanlara-yonelik-basvuru-sureci-hakkinda-duyuru25-merkezicerik" },
      { title: "3713 sayılı Kanunun Geçici 20'nci Maddesi Kapsamında Terörle Mücadelede Malul Kalmayacak Şekilde Yaralananlara İlişkin Başvuru", authority: "e-Devlet Kapısı / Millî Savunma Bakanlığı", url: "https://www.turkiye.gov.tr/milli-savunma-3713-sayili-kanunun-gecici-20nci-maddesi-kapsaminda-terorle-mucadelede-malul-kalmayacak-sekilde-yaralananlara-iliskin-basvuru" },
      { title: "3713 sayılı Kanunun Geçici 20'nci Maddesi Kapsamında Terörle Mücadelede Malul Kalmayacak Şekilde Yaralananlara İlişkin Başvuru", authority: "e-Devlet Kapısı / İçişleri Bakanlığı", url: "https://www.turkiye.gov.tr/icisleri-3713-sayili-kanunun-gecici-20nci-maddesi-kapsaminda-terorle-mucadelede-malul-kalmayacak-sekilde-yaralananlara-iliskin-basvuru" }
    ]
  })
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.slug.localeCompare(a.slug));

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
