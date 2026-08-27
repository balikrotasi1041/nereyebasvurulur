export type AnnouncementKind = "application" | "result" | "guide" | "exam-call";

export type AnnouncementSource = {
  title: string;
  authority: string;
  url: string;
};

export type Announcement = {
  slug: string;
  title: string;
  authority: string;
  kind: AnnouncementKind;
  publishedAt: string;
  verifiedAt: string;
  lastModified: string;
  summary: string;
  details: string[];
  actions: string[];
  deadlineAt?: string;
  deadlineLabel?: string;
  actionUrl?: string;
  actionLabel?: string;
  relatedPathKeys: string[];
  relatedSearches?: string[];
  sources: AnnouncementSource[];
};

export type RelatedRoute = { slug: string; title: string; pathKey: string };

const A = (value: Announcement): Announcement => value;

export const announcements: Announcement[] = [
  A({
    slug: "2026-gsb-yurt-basvurulari-basladi",
    title: "2026-2027 GSB yurt başvuruları başladı",
    authority: "Gençlik ve Spor Bakanlığı / Kredi ve Yurtlar Genel Müdürlüğü",
    kind: "application",
    publishedAt: "2026-08-25",
    verifiedAt: "2026-08-27",
    lastModified: "2026-08-25",
    summary: "2026-2027 eğitim öğretim yılı için ilk kez yükseköğretim programına kayıt yaptıran öğrenciler ile ara sınıf öğrencilerinin GSB yurt başvuruları e-Devlet üzerinden alınmaya başladı.",
    details: [
      "Başvurular 25 Ağustos 2026 saat 10.00'da başladı ve 29 Ağustos 2026 saat 23.59'da sona erecek.",
      "Başvuru e-Devlet'teki öğrenim bilgileri üzerinden yürütülüyor; öğrenim bilgisi hatalı veya eksik olan öğrencilerin önce üniversite öğrenci işleriyle düzeltme yapması gerekiyor.",
      "Ek kontenjan, yatay-dikey geçiş, özel yetenek, lisansüstü, artık yıl ve ikinci üniversite öğrencileri için başvuruların yükseköğrenim kayıtları tamamlandıktan sonra ayrıca alınacağı duyuruldu."
    ],
    actions: [
      "e-Devlet'teki öğrenim bilgilerinizi kontrol edin.",
      "Başvurunuzu son güne bırakmadan GSB Yurt Başvurusu hizmetinden tamamlayın.",
      "Başvuru sonrasında beyan ve öğrenim bilgilerinizde değişiklik olursa süre bitmeden güncelleyin."
    ],
    deadlineAt: "2026-08-29T23:59:00+03:00",
    deadlineLabel: "29 Ağustos 2026 23.59",
    actionUrl: "https://www.turkiye.gov.tr/gsb-yurt-basvurusu",
    actionLabel: "e-Devlet GSB Yurt Başvurusu",
    relatedPathKeys: [
      "Eğitim ve Öğrenci İşlemleri > Üniversite > Kayıt",
      "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > Yerleştirme işlemleri"
    ],
    relatedSearches: ["KYK yurt", "üniversite kayıt"],
    sources: [
      { title: "Yurt Başvuruları Başladı", authority: "Kredi ve Yurtlar Genel Müdürlüğü", url: "https://kygm.gsb.gov.tr/HaberDetaylari/1/10008/302637/yurt-basvurulari-basladi.aspx" },
      { title: "Yurt Başvuruları Duyurusu", authority: "Gençlik ve Spor Bakanlığı", url: "https://www.gsb.gov.tr/tr/duyuru/302548-yurt-basvurulari-duyurusu" },
      { title: "Yurt Başvurusu", authority: "e-Devlet / Gençlik ve Spor Bakanlığı", url: "https://www.turkiye.gov.tr/gsb-yurt-basvurusu" }
    ]
  }),
  A({
    slug: "2026-yks-yerlestirme-sonuclari-aciklandi",
    title: "2026-YKS yerleştirme sonuçları açıklandı",
    authority: "ÖSYM",
    kind: "result",
    publishedAt: "2026-08-18",
    verifiedAt: "2026-08-27",
    lastModified: "2026-08-27",
    summary: "ÖSYM, 2026-YKS yükseköğretim programlarına merkezî yerleştirme işlemlerinin tamamlandığını ve sonuçların erişime açıldığını duyurdu.",
    details: [
      "Yerleştirme sonuçları 18 Ağustos 2026 saat 05.45'ten itibaren ÖSYM sonuç sistemi üzerinden erişime açıldı.",
      "Bir programa kayıt hakkı kazanan adaylar için üniversite kayıt tarihleri 24-28 Ağustos 2026 olarak açıklandı.",
      "Elektronik kayıt yapılabilen programlarda e-kayıt dönemi 24-26 Ağustos 2026. Elektronik kayıt sonrasında üniversitenin kendi belge ve kayıt duyuruları ayrıca izlenmeli."
    ],
    actions: [
      "ÖSYM sonuç ekranından yerleştirme sonucunuzu kontrol edin.",
      "Yerleştiğiniz üniversitenin resmî kayıt duyurusunu ve istediği belgeleri kontrol edin.",
      "Elektronik kayıt süresi 26 Ağustos'ta sona erdi. Henüz kaydınızı tamamlamadıysanız üniversitenizin 28 Ağustos 2026'ya kadar süren kayıt işlemi ve resmî kayıt duyurusunu hemen kontrol edin."
    ],
    deadlineAt: "2026-08-28T23:59:00+03:00",
    deadlineLabel: "Üniversite kayıtları için 28 Ağustos 2026",
    actionUrl: "https://ykssonuc.osym.gov.tr/",
    actionLabel: "ÖSYM YKS yerleştirme sonuçlarını görüntüle",
    relatedPathKeys: [
      "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > YKS",
      "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > Yerleştirme işlemleri",
      "Eğitim ve Öğrenci İşlemleri > Üniversite > Kayıt"
    ],
    relatedSearches: ["YKS", "üniversite kayıt"],
    sources: [
      { title: "2026-YKS: Yerleştirme Sonuçları Açıklandı", authority: "ÖSYM", url: "https://osym.gov.tr/2026-yks-yerlestirme-sonuclari-aciklandi" },
      { title: "ÖSYM Sonuç Açıklama Sistemi", authority: "ÖSYM", url: "https://sonuc.osym.gov.tr/" }
    ]
  }),
  A({
    slug: "2026-yks-tercih-kontenjan-kilavuzu-yayimlandi",
    title: "2026-YKS tercih ve kontenjan kılavuzu yayımlandı",
    authority: "ÖSYM",
    kind: "guide",
    publishedAt: "2026-07-29",
    verifiedAt: "2026-08-27",
    lastModified: "2026-08-25",
    summary: "ÖSYM, 2026-YKS Yükseköğretim Programları ve Kontenjanları Kılavuzunu tercih işlemleriyle birlikte yayımladı. Tercih dönemi sona ermiş olsa da kılavuz 2026 yerleştirme sürecinin resmî başvuru kaydı olarak arşivde tutuluyor.",
    details: [
      "2026-YKS tercihleri 29 Temmuz-10 Ağustos 2026 arasında ÖSYM Aday İşlemleri Sistemi veya ÖSYM Aday İşlemleri mobil uygulaması üzerinden alındı.",
      "ÖSYM, tercih yapacak adayların program kontenjanları, özel koşullar ve tercih kuralları için yayımlanan kılavuzu esas almasını istedi.",
      "Bu duyuru tercih süresi kapandığı için arşiv statüsündedir; yeni işlem için yerleştirme ve kayıt duyuruları takip edilmelidir."
    ],
    actions: [
      "2026 yerleştirme koşullarını geriye dönük doğrulamak için ÖSYM'nin resmî tercih duyurusunu ve kılavuzunu kullanın.",
      "Güncel kayıt veya ek yerleştirme işlemi için yeni ÖSYM duyurularını esas alın."
    ],
    deadlineAt: "2026-08-10T23:59:00+03:00",
    deadlineLabel: "Tercih dönemi 10 Ağustos 2026'da sona erdi",
    actionUrl: "https://www.osym.gov.tr/2026-yks-tercihlerin-alinmasi",
    actionLabel: "ÖSYM tercih ve kılavuz duyurusunu aç",
    relatedPathKeys: [
      "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > YKS",
      "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > Yerleştirme işlemleri"
    ],
    relatedSearches: ["YKS tercih", "YKS kılavuz"],
    sources: [
      { title: "2026-YKS: Tercihlerin Alınması", authority: "ÖSYM", url: "https://www.osym.gov.tr/2026-yks-tercihlerin-alinmasi" },
      { title: "YKS - 2026 resmî duyuru arşivi", authority: "ÖSYM", url: "https://www.osym.gov.tr/SinavGrubu/Index/2" }
    ]
  }),
  A({
    slug: "2026-msu-harp-okullari-sonuc-duyurusu",
    title: "2026 MSÜ Harp Okulları sonuç duyurusu yayımlandı",
    authority: "Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı",
    kind: "result",
    publishedAt: "2026-08-17",
    verifiedAt: "2026-08-27",
    lastModified: "2026-08-25",
    summary: "MSB Personel Temin Sistemi, 2026 Millî Savunma Üniversitesi Harp Okulları sonuç duyurusunu 17 Ağustos 2026 tarihinde yayımladı.",
    details: [
      "Duyuru MSB Personel Temin Sisteminin güncel duyurular bölümünde 17 Ağustos 2026 tarihli olarak yer alıyor.",
      "Adayların sonuç, kayıt ve çağrı bilgilerini Personel Temin Sistemi üzerinden kendi aday ekranlarından takip etmesi gerekiyor.",
      "Eski dönem başvuru veya seçim tarihleri yeni bir temin dönemi için kullanılmamalı; aday ekranındaki güncel çağrı ve kayıt bilgileri esas alınmalı."
    ],
    actions: [
      "MSB Personel Temin Sistemine girerek aday sonuç ve çağrı durumunuzu kontrol edin.",
      "Varsa kayıt/çağrı belgesindeki tarih, yer ve evrak listesini esas alın."
    ],
    actionUrl: "https://personeltemin.msb.gov.tr/",
    actionLabel: "MSB Personel Temin Sistemini aç",
    relatedPathKeys: [
      "Askerî Okullar ve TSK Personel Temini > Millî Savunma Üniversitesi > MSÜ askerî öğrenci başvurusu",
      "Askerî Okullar ve TSK Personel Temini > Millî Savunma Üniversitesi > Harp Okulları",
      "Askerî Okullar ve TSK Personel Temini > Millî Savunma Üniversitesi > Sonuç takibi"
    ],
    relatedSearches: ["MSÜ", "Harp Okulları"],
    sources: [
      { title: "2026 MSÜ Harp Okulları Sonuç Duyurusu", authority: "Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı", url: "https://personeltemin.msb.gov.tr/" }
    ]
  }),
  A({
    slug: "2026-msu-astsubay-myo-sonuc-duyurusu",
    title: "2026 MSÜ Astsubay Meslek Yüksekokulları sonuç duyurusu yayımlandı",
    authority: "Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı",
    kind: "result",
    publishedAt: "2026-08-17",
    verifiedAt: "2026-08-27",
    lastModified: "2026-08-25",
    summary: "MSB Personel Temin Sistemi, 2026 MSÜ Astsubay Meslek Yüksekokulları sonuç duyurusunu 17 Ağustos 2026 tarihinde yayımladı.",
    details: [
      "Resmî duyuru MSB Personel Temin Sisteminin güncel duyurular alanında yayımlandı.",
      "Sonuç, kayıt hakkı, çağrı, tarih ve gerekli belge bilgileri adayın Personel Temin Sistemi ekranından takip edilmeli.",
      "Kayıt veya yedek çağrılarında yalnız aday ekranında ve güncel MSB duyurusunda gösterilen tarihler esas alınmalı."
    ],
    actions: [
      "MSB Personel Temin Sistemindeki aday ekranınızı kontrol edin.",
      "Kayıt veya çağrı varsa duyurudaki tarih, yer ve evrak şartlarını kaydedin."
    ],
    actionUrl: "https://personeltemin.msb.gov.tr/",
    actionLabel: "MSB Personel Temin Sistemini aç",
    relatedPathKeys: [
      "Askerî Okullar ve TSK Personel Temini > Millî Savunma Üniversitesi > MSÜ askerî öğrenci başvurusu",
      "Askerî Okullar ve TSK Personel Temini > Millî Savunma Üniversitesi > Astsubay Meslek Yüksekokulları",
      "Askerî Okullar ve TSK Personel Temini > Millî Savunma Üniversitesi > Sonuç takibi"
    ],
    relatedSearches: ["MSÜ", "Astsubay MYO"],
    sources: [
      { title: "2026 MSÜ Astsubay Meslek Yüksekokulları Sonuç Duyurusu", authority: "Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı", url: "https://personeltemin.msb.gov.tr/" }
    ]
  }),
  A({
    slug: "2026-jsga-guvenlik-bilimleri-fakultesi-sinav-cagrisi",
    title: "2026 JSGA Güvenlik Bilimleri Fakültesi öğrenci temini sınav çağrısı yayımlandı",
    authority: "Jandarma Genel Komutanlığı / JSGA Personel ve Öğrenci Temin Sistemi",
    kind: "exam-call",
    publishedAt: "2026-08-17",
    verifiedAt: "2026-08-27",
    lastModified: "2026-08-25",
    summary: "Jandarma Personel ve Öğrenci Temin Sistemi, 2026 JSGA Güvenlik Bilimleri Fakültesi öğrenci temini için sınav çağrısını 17 Ağustos 2026 tarihinde yayımladı.",
    details: [
      "Faaliyet Jandarma Personel ve Öğrenci Temin Sisteminde devam eden faaliyetler arasında yer alıyor.",
      "Adayların sınav çağrı, tarih, yer ve belge bilgilerini e-Devlet üzerinden giriş yaptıkları aday ekranından kontrol etmesi gerekiyor.",
      "Personel Temin Sistemine girişte çok faktörlü kimlik doğrulaması zorunlu olduğundan adayların e-Devlet güvenlik ayarlarını önceden hazır etmesi yararlı."
    ],
    actions: [
      "Jandarma Personel ve Öğrenci Temin Sistemine e-Devlet ile giriş yapın.",
      "Sınav çağrı belgesindeki tarih, merkez ve istenen belgeleri kontrol edin.",
      "Aday ekranındaki yeni duyuruları sınav süreci tamamlanana kadar düzenli izleyin."
    ],
    actionUrl: "https://vatandas.jandarma.gov.tr/PTM/frmAdayGirisveDuyuru.aspx",
    actionLabel: "Jandarma Personel ve Öğrenci Temin Sistemini aç",
    relatedPathKeys: [
      "Jandarma ve Sahil Güvenlik Temin İşlemleri > JSGA Öğrenci Temini > Güvenlik Bilimleri Fakültesi"
    ],
    relatedSearches: ["JSGA", "Güvenlik Bilimleri Fakültesi"],
    sources: [
      { title: "2026 Yılı JSGA Güvenlik Bilimleri Fakültesi Öğrenci Temini Sınav Çağrısı", authority: "Jandarma Genel Komutanlığı", url: "https://vatandas.jandarma.gov.tr/PTM/frmAdayGirisveDuyuru.aspx" }
    ]
  }),
  A({
    slug: "2026-jsga-jandarma-astsubay-myo-sinav-cagrisi",
    title: "2026 Jandarma Astsubay MYO öğrenci temini sınav çağrısı yayımlandı",
    authority: "Jandarma Genel Komutanlığı / JSGA Personel ve Öğrenci Temin Sistemi",
    kind: "exam-call",
    publishedAt: "2026-08-17",
    verifiedAt: "2026-08-27",
    lastModified: "2026-08-25",
    summary: "Jandarma Personel ve Öğrenci Temin Sistemi, 2026 Jandarma Astsubay Meslek Yüksekokulu öğrenci temini sınav çağrısını 17 Ağustos 2026 tarihinde yayımladı.",
    details: [
      "Sınav çağrısı Jandarma Personel ve Öğrenci Temin Sisteminde devam eden faaliyet olarak listeleniyor.",
      "Adaya özel sınav tarihi, sınav merkezi ve evrak bilgileri aday ekranından kontrol edilmeli.",
      "Başvuru döneminin kapanmış olması, çağrılan adayların seçim sürecinin sona erdiği anlamına gelmez; güncel aday ekranı ve resmî duyurular takip edilmeli."
    ],
    actions: [
      "Jandarma Personel ve Öğrenci Temin Sistemine e-Devlet ile giriş yapın.",
      "Çağrı belgenizi ve sınav yerinizi kontrol edin.",
      "Sınava götürülecek belgeleri güncel çağrı ekranına göre hazırlayın."
    ],
    actionUrl: "https://vatandas.jandarma.gov.tr/PTM/frmAdayGirisveDuyuru.aspx",
    actionLabel: "Jandarma Personel ve Öğrenci Temin Sistemini aç",
    relatedPathKeys: [
      "Jandarma ve Sahil Güvenlik Temin İşlemleri > JSGA Öğrenci Temini > Jandarma Astsubay MYO"
    ],
    relatedSearches: ["JSGA", "Jandarma Astsubay MYO"],
    sources: [
      { title: "2026 Yılı Jandarma Astsubay Meslek Yüksekokulu Öğrenci Temini Sınav Çağrısı", authority: "Jandarma Genel Komutanlığı", url: "https://vatandas.jandarma.gov.tr/PTM/frmAdayGirisveDuyuru.aspx" }
    ]
  })
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.slug.localeCompare(a.slug));

export const announcementBySlug = new Map(announcements.map(item => [item.slug, item]));

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char] || char));
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

export function announcementState(item: Announcement, now = new Date()): { label: string; className: string } {
  if (item.deadlineAt && now.getTime() > new Date(item.deadlineAt).getTime()) return { label: "Arşiv · süre sona erdi", className: "archive" };
  if (item.kind === "application") return { label: "Başvuru açık", className: "open" };
  if (item.kind === "result") return { label: "Sonuç açıklandı", className: "result" };
  if (item.kind === "guide") return { label: "Kılavuz", className: "guide" };
  return { label: "Aktif sınav çağrısı", className: "call" };
}

const extraStyles = `
.announcement-wrap{width:min(1160px,calc(100% - 28px));margin:28px auto 42px}
.announcement-hero{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;box-shadow:0 14px 36px rgba(15,23,42,.07)}
.announcement-kicker{font-size:.78rem;font-weight:850;letter-spacing:.1em;text-transform:uppercase;color:#2458d6}
.announcement-hero h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.05;letter-spacing:-.045em;margin:8px 0 12px}
.announcement-hero p{color:#697386;line-height:1.65;max-width:850px}
.announcement-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}
.announcement-card{display:block;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:18px;min-width:0}
.announcement-card:hover{border-color:#b9c7ea;box-shadow:0 8px 22px rgba(36,88,214,.07)}
.announcement-card h2,.announcement-card h3{margin:8px 0;font-size:1.08rem;line-height:1.35}
.announcement-card p{color:#697386;line-height:1.55;margin:8px 0 0}
.announcement-meta{display:flex;gap:8px;align-items:center;flex-wrap:wrap;color:#667085;font-size:.78rem}
.announcement-badge{display:inline-flex;padding:5px 8px;border-radius:999px;font-weight:800;background:#edf3ff;color:#2458d6}
.announcement-badge.open{background:#edf8f2;color:#176a42}.announcement-badge.result{background:#eef4ff;color:#2458d6}.announcement-badge.guide{background:#f6f2ff;color:#6941c6}.announcement-badge.call{background:#fff8e8;color:#7a5b00}.announcement-badge.archive{background:#f2f4f7;color:#475467}
.announcement-detail{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:14px;margin-top:16px;align-items:start}
.announcement-box{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:19px}
.announcement-box h2{font-size:1.08rem;margin:0 0 10px}.announcement-box ul{margin:0;padding-left:19px;color:#475467;line-height:1.62}.announcement-box li+li{margin-top:7px}
.announcement-source{display:block;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin-top:8px}.announcement-source strong{display:block}.announcement-source small{display:block;color:#697386;margin-top:4px}
.announcement-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:14px}.announcement-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;border-radius:11px;padding:10px 13px;border:1px solid #d9e1ef;font-weight:780}.announcement-btn.primary{background:#2458d6;color:#fff;border-color:#2458d6}
.announcement-note{border:1px solid #efd28a;background:#fff8e8;border-radius:13px;padding:13px 14px;color:#6c5200;line-height:1.55;margin-top:14px}
.announcement-related{display:grid;gap:8px}.announcement-related a{display:block;padding:11px 12px;border:1px solid #e2e8f0;border-radius:11px;background:#fbfcfe}.announcement-related a:hover{background:#edf3ff;border-color:#b9c7ea}
.home-announcements{width:min(1160px,calc(100% - 28px));margin:6px auto 38px}.home-announcements-head{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-bottom:12px}.home-announcements-head h2{margin:0;font-size:1.45rem}.home-announcements-head p{margin:4px 0 0;color:#697386}.home-announcements-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.home-announcements .announcement-card{padding:15px}.home-announcements .announcement-card h3{font-size:1rem}.route-announcements{margin:18px 0;padding:17px;border:1px solid #bfd0f5;background:#f7f9ff;border-radius:15px}.route-announcements h2{font-size:1.08rem;margin:0 0 10px}.route-announcements-list{display:grid;gap:8px}.route-announcements-list a{display:block;background:#fff;border:1px solid #dbe4f4;border-radius:11px;padding:11px 12px}.route-announcements-list strong{display:block}.route-announcements-list small{display:block;color:#697386;margin-top:4px}
@media(max-width:760px){.announcement-grid,.home-announcements-grid,.announcement-detail{grid-template-columns:1fr}.announcement-wrap,.home-announcements{width:min(100% - 20px,1160px)}.home-announcements-head{align-items:flex-start;flex-direction:column}}
`;

function pageShell(title: string, description: string, canonical: string, body: string, jsonLd?: unknown): string {
  const structured = jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>` : "";
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${esc(canonical)}">${structured}<style>:root{--ink:#172033;--muted:#697386;--line:#e2e8f0;--blue:#2458d6}*{box-sizing:border-box}body{margin:0;background:#f5f7fb;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow-wrap:anywhere}a{color:inherit;text-decoration:none}header{background:rgba(255,255,255,.96);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}.head{width:min(1160px,calc(100% - 28px));min-height:66px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:12px}.brand{font-weight:900;font-size:1.2rem;letter-spacing:-.04em}.brand span{color:var(--blue)}nav{display:flex;gap:6px;align-items:center;flex-wrap:wrap}nav a{font-size:.86rem;color:#526174;padding:9px 10px;border-radius:10px}nav a:hover{background:#f3f5f8}footer{border-top:1px solid var(--line);padding:28px 0 42px;color:var(--muted);font-size:.88rem}.foot{width:min(1160px,calc(100% - 28px));margin:auto}${extraStyles}</style></head><body><header><div class="head"><a class="brand" href="/">Nereye <span>Başvurulur?</span></a><nav aria-label="Ana menü"><a href="/">Başvuru rehberi</a><a href="/duyurular/">Duyurular</a><a href="/ara">Arama</a></nav></div></header>${body}<footer><div class="foot">Nereye Başvurulur? · Duyurular resmî kaynaklardan kısa yönlendirme özeti olarak kaydedilir. İşlem öncesinde resmî kaynağı kontrol edin.</div></footer></body></html>`;
}

function stateBadge(item: Announcement): string {
  const state = announcementState(item);
  return `<span class="announcement-badge ${state.className}">${esc(state.label)}</span>`;
}

function card(item: Announcement, heading = "h2"): string {
  return `<a class="announcement-card" href="/duyuru/${esc(item.slug)}/"><div class="announcement-meta">${stateBadge(item)}<span>${esc(item.authority)}</span><span>${formatDate(item.publishedAt)}</span></div><${heading}>${esc(item.title)}</${heading}><p>${esc(item.summary)}</p></a>`;
}

export function renderAnnouncementList(): string {
  const cards = announcements.map(item => card(item)).join("");
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Resmî Duyurular", url: "https://nereyebasvurulur.com/duyurular/", mainEntity: { "@type": "ItemList", itemListElement: announcements.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: `https://nereyebasvurulur.com/duyuru/${item.slug}/`, name: item.title })) } };
  return pageShell("Resmî Duyurular | Nereye Başvurulur?", "ÖSYM, MSB, Jandarma/JSGA, GSB ve diğer kamu kurumlarının başvuru, kılavuz, sınav ve sonuç duyurularının doğrulanmış kısa akışı.", "https://nereyebasvurulur.com/duyurular/", `<main class="announcement-wrap"><section class="announcement-hero"><div class="announcement-kicker">Güncellik arşivi</div><h1>Resmî Duyurular</h1><p>Başvuru rehberlerimizi güncel tutarken tespit ettiğimiz önemli resmî değişiklikleri burada kayıt altına alıyoruz. Her kayıt kısa bir yönlendirme özetidir; asıl işlem ve karar için bağlantısı verilen resmî kurum duyurusu esastır.</p></section><section class="announcement-grid" aria-label="Resmî duyuru listesi">${cards}</section></main>`, jsonLd);
}

export function renderAnnouncementDetail(item: Announcement, relatedRoutes: RelatedRoute[]): string {
  const detailItems = item.details.map(value => `<li>${esc(value)}</li>`).join("");
  const actionItems = item.actions.map(value => `<li>${esc(value)}</li>`).join("");
  const sources = item.sources.map(source => `<a class="announcement-source" rel="noopener noreferrer" target="_blank" href="${esc(source.url)}"><strong>${esc(source.title)}</strong><small>${esc(source.authority)} · Resmî kaynak ↗</small></a>`).join("");
  const related = relatedRoutes.length ? relatedRoutes.map(route => `<a href="/konu/${esc(route.slug)}/"><strong>${esc(route.title)}</strong><small>İlgili başvuru rehberini aç →</small></a>`).join("") : (item.relatedSearches || []).map(query => `<a href="/ara?q=${encodeURIComponent(query)}"><strong>${esc(query)}</strong><small>İlgili doğrulanmış rotalarda ara →</small></a>`).join("");
  const state = announcementState(item);
  const deadline = item.deadlineLabel ? `<div class="announcement-note"><strong>Tarih / süre:</strong> ${esc(item.deadlineLabel)}${state.className === "archive" ? " · Bu kayıt artık arşiv statüsündedir." : ""}</div>` : "";
  const actionButton = item.actionUrl ? `<a class="announcement-btn primary" rel="noopener noreferrer" target="_blank" href="${esc(item.actionUrl)}">${esc(item.actionLabel || "Resmî işlemi aç")} ↗</a>` : "";
  const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", name: item.title, description: item.summary, url: `https://nereyebasvurulur.com/duyuru/${item.slug}/`, datePublished: item.publishedAt, dateModified: item.lastModified, isPartOf: { "@type": "WebSite", name: "Nereye Başvurulur?", url: "https://nereyebasvurulur.com/" }, about: { "@type": "GovernmentOrganization", name: item.authority } };
  return pageShell(`${item.title} | Nereye Başvurulur?`, item.summary, `https://nereyebasvurulur.com/duyuru/${item.slug}/`, `<main class="announcement-wrap"><article><section class="announcement-hero"><div class="announcement-meta">${stateBadge(item)}<span>${esc(item.authority)}</span><span>Yayın: ${formatDate(item.publishedAt)}</span><span>Doğrulama: ${formatDate(item.verifiedAt)}</span></div><h1>${esc(item.title)}</h1><p>${esc(item.summary)}</p>${deadline}<div class="announcement-actions">${actionButton}<a class="announcement-btn" href="/duyurular/">Tüm duyurular</a></div></section><div class="announcement-detail"><div><section class="announcement-box"><h2>Ne değişti?</h2><ul>${detailItems}</ul></section><section class="announcement-box" style="margin-top:12px"><h2>Ne yapmalısınız?</h2><ul>${actionItems}</ul></section><div class="announcement-note"><strong>Kaynak ilkesi:</strong> Bu sayfa resmî duyurunun kısa yönlendirme özetidir. Başvuru, sınav, kayıt, sonuç veya hak kaybı doğurabilecek işlemde resmî kurum ekranı ve güncel kılavuz esas alınmalıdır.</div></div><aside><section class="announcement-box"><h2>Resmî kaynaklar</h2>${sources}</section>${related ? `<section class="announcement-box" style="margin-top:12px"><h2>İlgili başvuru rehberleri</h2><div class="announcement-related">${related}</div></section>` : ""}</aside></div></article></main>`, jsonLd);
}

export function renderHomeAnnouncementSection(limit = 4): string {
  const items = announcements.slice(0, limit).map(item => card(item, "h3")).join("");
  return `<section class="home-announcements" aria-labelledby="latestAnnouncements"><div class="home-announcements-head"><div><h2 id="latestAnnouncements">Son resmî duyurular</h2><p>Başvuru, sonuç, sınav çağrısı ve kılavuz değişiklikleri.</p></div><a class="announcement-btn" href="/duyurular/">Tüm duyurular →</a></div><div class="home-announcements-grid">${items}</div><style>${extraStyles}</style></section>`;
}

export function renderRouteAnnouncementSection(items: Announcement[]): string {
  if (!items.length) return "";
  const links = items.slice(0, 4).map(item => { const state = announcementState(item); return `<a href="/duyuru/${esc(item.slug)}/"><strong>${esc(item.title)}</strong><small>${esc(state.label)} · ${formatDate(item.publishedAt)} · ayrıntıyı gör →</small></a>`; }).join("");
  return `<section class="route-announcements"><h2>Bu konuyla ilgili güncel resmî duyurular</h2><div class="route-announcements-list">${links}</div><style>${extraStyles}</style></section>`;
}

export function insertBeforeFooter(html: string, fragment: string): string {
  if (!fragment) return html;
  const marker = "<footer>";
  return html.includes(marker) ? html.replace(marker, `${fragment}${marker}`) : html.replace("</body>", `${fragment}</body>`);
}
