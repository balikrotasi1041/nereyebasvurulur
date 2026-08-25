import type { Announcement, RelatedRoute } from "./announcements";
import { announcementState } from "./announcements";

export type MilitaryServiceTrack = "normal-tertip" | "bedelli";

export type MilitaryCalendarRow = {
  period: string;
  resultDate?: string;
  group1?: string;
  group2?: string;
  group3?: string;
  sevkDate?: string;
  oathDate?: string;
  dischargeDate?: string;
};

export type MilitaryServiceAnnouncement = Announcement & {
  track: MilitaryServiceTrack;
  calendarTitle?: string;
  calendarRows?: MilitaryCalendarRow[];
};

const M = (value: MilitaryServiceAnnouncement): MilitaryServiceAnnouncement => value;

export const militaryServiceAnnouncements: MilitaryServiceAnnouncement[] = [
  M({
    slug: "kasim-2026-siniflandirma-donemi-duyurusu",
    title: "Kasım 2026 sınıflandırma dönemi: tercih için son tarih 31 Ağustos",
    authority: "Millî Savunma Bakanlığı / Askeralma Genel Müdürlüğü",
    kind: "application",
    track: "normal-tertip",
    publishedAt: "2026-07-27",
    verifiedAt: "2026-08-25",
    lastModified: "2026-08-25",
    summary: "Kasım 2026 sınıflandırma döneminde silahaltına alınmak isteyen yükümlülerin yoklama, askerlik hizmet tercihi ve celp tercihini 31 Ağustos 2026 dâhil tamamlaması gerekiyor.",
    details: [
      "Kasım 2026 döneminde silahaltına alınmak isteyen yükümlüler yoklama, askerlik hizmet tercihi ve celp tercihini 31 Ağustos 2026 (dâhil) tarihine kadar e-Devlet veya en yakın askerlik şubesi üzerinden tamamlamalıdır.",
      "Seçim ve sınıflandırma sonuçları 27 Ekim 2026 tarihinde e-Devlet üzerinden duyurulacaktır.",
      "Yedek subay/astsubay adayları ile 1'inci grup erlerin sevki 5 Kasım 2026, 2'nci grup erlerin sevki 3 Aralık 2026, 3'üncü grup erlerin sevki 7 Ocak 2027 olarak ilan edilmiştir.",
      "Sevk belgesi sevk tarihinden 10 gün önce e-Devlet veya askerlik şubesinden alınabilir. MSB duyurusu 7179 sayılı Kanun gereğince tebliğ mahiyetindedir."
    ],
    actions: [
      "Kasım 2026 dönemini hedefliyorsanız 31 Ağustos sona ermeden Askerliğim ekranındaki yoklama, hizmet tercihi ve celp tercihinizi kontrol edin.",
      "27 Ekim 2026'da sınıflandırma sonucunuzu e-Devlet Askerliğim hizmetinden veya askerlik şubesinden kontrol edin.",
      "Sınıflandırma sonucunda gösterilen grup ve sevk tarihini esas alın; yıllık takvim kişisel sevk belgesinin yerine geçmez."
    ],
    deadlineAt: "2026-08-31T23:59:59+03:00",
    deadlineLabel: "31 Ağustos 2026 (dâhil)",
    actionUrl: "https://www.turkiye.gov.tr/mill-savunma-askerligim",
    actionLabel: "e-Devlet Askerliğim hizmetini aç",
    relatedPathKeys: [
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Askerlik hizmet tercihi",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Celp tercihi",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Sevk belgesi"
    ],
    relatedSearches: ["askerlik hizmet tercihi", "celp tercihi", "sevk belgesi", "YÜSEM"],
    sources: [
      { title: "Kasım 2026 Sınıflandırma Dönemi Duyurusu", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/Duyuru/a090cba01d3949ca8948978b87ee5f54" },
      { title: "2026 Yılı Yedek Subay, Yedek Astsubay ve Er Celp-Sevk Takvimi", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Content/Upload/Docs/asal/2026_Y%C4%B1l%C4%B1_S%C4%B1n%C4%B1fland%C4%B1rma_Faaliyet_Takvimi_02012026.pdf" },
      { title: "Askerliğim", authority: "e-Devlet / Millî Savunma Bakanlığı", url: "https://www.turkiye.gov.tr/mill-savunma-askerligim" }
    ]
  }),
  M({
    slug: "2026-normal-tertip-er-celp-sevk-takvimi",
    title: "2026 normal tertip er ve yedek subay/astsubay celp-sevk takvimi",
    authority: "Millî Savunma Bakanlığı / Askeralma Genel Müdürlüğü",
    kind: "guide",
    track: "normal-tertip",
    publishedAt: "2026-01-02",
    verifiedAt: "2026-08-25",
    lastModified: "2026-08-25",
    summary: "MSB'nin 2026 yıllık sınıflandırma faaliyet takvimi, yedek subay/yedek astsubay adayları ve erler için Şubat, Mayıs, Ağustos ve Kasım sınıflandırma dönemlerinin sonuç ve sevk tarihlerini gösteriyor.",
    details: [
      "Kullanıcıların 'normal tertip' veya 'YÜSEM' diye aradığı süreç güncel resmî duyurularda sınıflandırma sonucu, celp-sevk dönemi ve sevk belgesi başlıklarıyla yürütülmektedir.",
      "2026 sınıflandırma dönemleri Şubat, Mayıs, Ağustos ve Kasım olarak planlanmıştır. Her dönemde yedek subay/yedek astsubay adayları ile 1'inci grup erler ilk sevk tarihinde; 2'nci ve 3'üncü grup erler sonraki tarihlerde sevk edilmektedir.",
      "25 Ağustos 2026 itibarıyla Ağustos sınıflandırma döneminin kalan er sevkleri 3 Eylül ve 1 Ekim 2026'dır. Bir sonraki Kasım döneminin sonuçları 27 Ekim 2026'da açıklanacaktır.",
      "MSB, TSK ihtiyaçları ve günün gelişen şartları nedeniyle açıklama ve sevk tarihlerinde değişiklik yapılabileceğini belirttiğinden kişisel işlemde güncel duyuru ve Askerliğim ekranı birlikte kontrol edilmelidir."
    ],
    actions: [
      "Aşağıdaki yıllık takvimi genel plan olarak kullanın.",
      "Kendi kuvvet, sınıf, branş, celp ve eğitim birliğinizi yalnız kişisel sınıflandırma sonucunuzdan öğrenin.",
      "Barkodlu sevk belgesini e-Devlet Askerliğim hizmetinden veya askerlik şubesinden alın; ekran görüntüsü sevk belgesi yerine geçmez."
    ],
    actionUrl: "https://www.turkiye.gov.tr/mill-savunma-askerligim",
    actionLabel: "e-Devlet Askerliğim hizmetini aç",
    relatedPathKeys: [
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Askerlik hizmet tercihi",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Yedek subay",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Yedek astsubay",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Celp tercihi",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Sevk belgesi"
    ],
    relatedSearches: ["YÜSEM", "normal tertip askerlik", "sınıflandırma sonucu", "sevk belgesi"],
    calendarTitle: "2026 yedek subay, yedek astsubay ve er celp-sevk takvimi",
    calendarRows: [
      { period: "Şubat 2026", resultDate: "29 Ocak 2026", group1: "5 Şubat 2026", group2: "5 Mart 2026", group3: "2 Nisan 2026" },
      { period: "Mayıs 2026", resultDate: "17 Nisan 2026", group1: "22 Nisan 2026", group2: "4 Haziran 2026", group3: "2 Temmuz 2026" },
      { period: "Ağustos 2026", resultDate: "30 Temmuz 2026", group1: "6 Ağustos 2026", group2: "3 Eylül 2026", group3: "1 Ekim 2026" },
      { period: "Kasım 2026", resultDate: "27 Ekim 2026", group1: "5 Kasım 2026", group2: "3 Aralık 2026", group3: "7 Ocak 2027" }
    ],
    sources: [
      { title: "2026 Yılı Sevk Takvimi", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/Duyuru/458a201d36774beb8aa5721e0be7cc98" },
      { title: "2026 Yılı Yedek Subay, Yedek Astsubay ve Er Celp-Sevk Takvimi", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Content/Upload/Docs/asal/2026_Y%C4%B1l%C4%B1_S%C4%B1n%C4%B1fland%C4%B1rma_Faaliyet_Takvimi_02012026.pdf" },
      { title: "Askerlik Başvurusu Nasıl Yapılır?", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/icerik/askerlik-basvurusu-nasil-yapilir" },
      { title: "Askerliğim", authority: "e-Devlet / Millî Savunma Bakanlığı", url: "https://www.turkiye.gov.tr/mill-savunma-askerligim" }
    ]
  }),
  M({
    slug: "agustos-2026-siniflandirma-sonuclari-er-sevkleri",
    title: "Ağustos 2026 sınıflandırma sonuçları açıklandı: kalan er sevkleri 3 Eylül ve 1 Ekim",
    authority: "Millî Savunma Bakanlığı / Askeralma Genel Müdürlüğü",
    kind: "result",
    track: "normal-tertip",
    publishedAt: "2026-07-30",
    verifiedAt: "2026-08-25",
    lastModified: "2026-08-25",
    summary: "Ağustos, Eylül ve Ekim 2026 dönemlerinde silahaltına alınacak yedek subay/astsubay adayları ile erlerin sınıflandırma sonuçları 30 Temmuz'da açıklandı; 25 Ağustos itibarıyla 2'nci ve 3'üncü grup er sevkleri sırada.",
    details: [
      "Sınıflandırma sonuçları 30 Temmuz 2026 tarihinde e-Devlet ve askerlik şubeleri üzerinden erişime açıldı.",
      "1'inci grup sevki 6 Ağustos 2026'da yapıldı. 2'nci grup erlerin sevki 3 Eylül 2026, 3'üncü grup erlerin sevki 1 Ekim 2026 olarak ilan edilmiştir.",
      "2'nci ve 3'üncü grupta sevke tabi yükümlüler sevk belgelerini sevk tarihlerinin 10 gün öncesinden itibaren e-Devlet veya askerlik şubesinden alabilir.",
      "Kişinin kesin eğitim birliği, sınıfı ve sevk grubu kendi sınıflandırma sonucunda yer alır."
    ],
    actions: [
      "Askerliğim ekranından sınıflandırma sonucunuzu ve sevk grubunuzu kontrol edin.",
      "3 Eylül grubundaysanız sevk belgesi erişimini gecikmeden kontrol edin; 1 Ekim grubundaysanız sevkten 10 gün önce belge erişimini yeniden kontrol edin.",
      "Belgedeki katılış tarihi ve yol süresini esas alın."
    ],
    deadlineAt: "2026-10-01T23:59:59+03:00",
    deadlineLabel: "Kalan sevkler: 3 Eylül ve 1 Ekim 2026",
    actionUrl: "https://www.turkiye.gov.tr/mill-savunma-askerligim",
    actionLabel: "Sınıflandırma sonucunu e-Devlet'ten kontrol et",
    relatedPathKeys: [
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Sevk belgesi",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Celp tercihi"
    ],
    relatedSearches: ["askere gideceğim yer", "YÜSEM", "sevk belgesi"],
    sources: [
      { title: "Yedek Subay/Astsubay Adayları ile Erlerin Sınıflandırma Sonuçları Açıklandı", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/Duyuru/79af4c6f8b6742fd8113bc2fc927d60b" },
      { title: "Ağustos 2026 Sınıflandırma Dönemi Duyurusu", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/Duyuru/311260d14f334dddadbfa4c27ce50f8a" },
      { title: "Askerliğim", authority: "e-Devlet / Millî Savunma Bakanlığı", url: "https://www.turkiye.gov.tr/mill-savunma-askerligim" }
    ]
  }),
  M({
    slug: "2026-bedelli-askerlik-celp-sevk-faaliyet-takvimi",
    title: "2026 bedelli askerlik celp, sevk, yemin ve terhis takvimi",
    authority: "Millî Savunma Bakanlığı / Askeralma Genel Müdürlüğü",
    kind: "guide",
    track: "bedelli",
    publishedAt: "2026-01-20",
    verifiedAt: "2026-08-25",
    lastModified: "2026-08-25",
    summary: "MSB'nin 2026 bedelli askerlik faaliyet takviminde 10 celp dönemi için sevk, yemin töreni ve terhis tarihleri yayımlandı. 25 Ağustos itibarıyla kalan sevkler 3 Eylül, 1 Ekim, 5 Kasım ve 3 Aralık 2026.",
    details: [
      "2026 bedelli askerlik hizmetinde Şubat, Mart, Nisan, Haziran, Temmuz, Ağustos, Eylül, Ekim, Kasım ve Aralık olmak üzere 10 sevk dönemi planlanmıştır.",
      "25 Ağustos 2026 itibarıyla ileri tarihli sevk dönemleri 3 Eylül, 1 Ekim, 5 Kasım ve 3 Aralık 2026'dır.",
      "Celp/sevk dönemi değişikliği yalnız 2026 yılı içindeki açık kontenjanlar için, sevk tarihinden 10 gün öncesine kadar e-Devlet Askerliğim veya en yakın askerlik şubesi üzerinden ve en fazla üç defa yapılabilir.",
      "Yemin ve terhis tarihleri resmî faaliyet takvimindeki planlamadır. Birliğe geç katılma gibi kişisel durumlar terhis tarihini etkileyebileceğinden kişisel belge ve birlik işlemleri esas alınmalıdır."
    ],
    actions: [
      "Kendi bedelli celp ve birlik yerinizi Askerliğim ekranından kontrol edin.",
      "Celp değişikliği istiyorsanız mevcut kontenjanları sevk tarihinizden en geç 10 gün önce kontrol edin.",
      "Sevk belgenizi tabi olduğunuz sevk döneminden 10 gün önce e-Devlet veya askerlik şubesinden alın."
    ],
    actionUrl: "https://www.turkiye.gov.tr/mill-savunma-askerligim",
    actionLabel: "e-Devlet Askerliğim hizmetini aç",
    relatedPathKeys: [
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Bedelli ve Dövizle Askerlik > Bedelli askerlik başvurusu",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Bedelli ve Dövizle Askerlik > Bedelli celp değişikliği",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Sevk belgesi"
    ],
    relatedSearches: ["bedelli askerlik", "bedelli sevk", "bedelli birlik yeri"],
    calendarTitle: "2026 bedelli askerlik faaliyet takvimi",
    calendarRows: [
      { period: "Şubat 2026", sevkDate: "5 Şubat 2026", oathDate: "3 Mart 2026", dischargeDate: "5 Mart 2026" },
      { period: "Mart 2026", sevkDate: "5 Mart 2026", oathDate: "1 Nisan 2026", dischargeDate: "5 Nisan 2026" },
      { period: "Nisan 2026", sevkDate: "2 Nisan 2026", oathDate: "29 Nisan 2026", dischargeDate: "2 Mayıs 2026" },
      { period: "Haziran 2026", sevkDate: "4 Haziran 2026", oathDate: "1 Temmuz 2026", dischargeDate: "4 Temmuz 2026" },
      { period: "Temmuz 2026", sevkDate: "2 Temmuz 2026", oathDate: "29 Temmuz 2026", dischargeDate: "2 Ağustos 2026" },
      { period: "Ağustos 2026", sevkDate: "6 Ağustos 2026", oathDate: "2 Eylül 2026", dischargeDate: "6 Eylül 2026" },
      { period: "Eylül 2026", sevkDate: "3 Eylül 2026", oathDate: "30 Eylül 2026", dischargeDate: "3 Ekim 2026" },
      { period: "Ekim 2026", sevkDate: "1 Ekim 2026", oathDate: "28 Ekim 2026", dischargeDate: "1 Kasım 2026" },
      { period: "Kasım 2026", sevkDate: "5 Kasım 2026", oathDate: "2 Aralık 2026", dischargeDate: "5 Aralık 2026" },
      { period: "Aralık 2026", sevkDate: "3 Aralık 2026", oathDate: "30 Aralık 2026", dischargeDate: "3 Ocak 2027" }
    ],
    sources: [
      { title: "2026 Yılı Bedelli Askerlik Faaliyet Takvimi", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Content/Upload/Docs/asal/2026_Yili_Bedelli_Askerlik_Faaliyet_Takvimi.pdf" },
      { title: "2026 Yılı Bedelli Askerlik Celp ve Sevk Duyurusu", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/Duyuru/eb23c6fe23b34e528d7ad824fad5b58c" },
      { title: "Bedelli Askerlik", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/icerik/bedelli-askerlik" },
      { title: "Askerliğim", authority: "e-Devlet / Millî Savunma Bakanlığı", url: "https://www.turkiye.gov.tr/mill-savunma-askerligim" }
    ]
  }),
  M({
    slug: "2026-bedelli-askerlik-siniflandirma-sonuclari",
    title: "2026 bedelli askerlik sınıflandırma sonuçları ve birlik yerleri açıklandı",
    authority: "Millî Savunma Bakanlığı / Askeralma Genel Müdürlüğü",
    kind: "result",
    track: "bedelli",
    publishedAt: "2026-01-22",
    verifiedAt: "2026-08-25",
    lastModified: "2026-08-25",
    summary: "2026 yılında bedelli askerlik kapsamında silahaltına alınacak yükümlülerin celp dönemleri ve birlik yerleri 22 Ocak 2026'da belirlendi; kişisel sonuç e-Devlet veya askerlik şubesinden öğreniliyor.",
    details: [
      "MSB, 2026 bedelli askerlik celp dönemleri ile birlik yerlerinin 22 Ocak 2026 tarihinde belirlendiğini duyurdu.",
      "Sonuçlar e-Devlet Askerliğim hizmetinden veya askerlik şubelerinden öğrenilebilir.",
      "Celp dönemi değişikliği kontenjan durumuna göre Askerliğim uygulamasından yapılabilir; 2026 yılı celp ve sevk duyurusundaki süre ve değişiklik sınırları uygulanır.",
      "Bu sayfadaki genel takvim kişisel birlik yeri değildir; kesin birlik ve sevk bilgisi kişisel sınıflandırma sonucunda görülür."
    ],
    actions: [
      "Askerliğim ekranından bedelli celp döneminizi ve birliğinizi kontrol edin.",
      "Sevk döneminiz yaklaşınca barkodlu sevk belgesini alın.",
      "Değişiklik istiyorsanız kontenjanı ve 10 günlük son süreyi kontrol edin."
    ],
    actionUrl: "https://www.turkiye.gov.tr/mill-savunma-askerligim",
    actionLabel: "Bedelli sınıflandırma sonucunu kontrol et",
    relatedPathKeys: [
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Bedelli ve Dövizle Askerlik > Bedelli askerlik başvurusu",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Bedelli ve Dövizle Askerlik > Bedelli celp değişikliği",
      "Askerlik Yükümlülüğü ve Askeralma İşlemleri > Sınıflandırma ve Sevk > Sevk belgesi"
    ],
    relatedSearches: ["bedelli askerlik birlik yeri", "bedelli sınıflandırma", "bedelli sevk belgesi"],
    sources: [
      { title: "2026 Yılı Bedelli Askerlik Sınıflandırma Sonuçları Açıklandı", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/Duyuru/c059ad2b8bd8415e9de7d3c5c31889ee" },
      { title: "2026 Yılı Bedelli Askerlik Celp ve Sevk Duyurusu", authority: "MSB Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma/Duyuru/eb23c6fe23b34e528d7ad824fad5b58c" },
      { title: "Askerliğim", authority: "e-Devlet / Millî Savunma Bakanlığı", url: "https://www.turkiye.gov.tr/mill-savunma-askerligim" }
    ]
  })
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.slug.localeCompare(a.slug));

export const militaryServiceAnnouncementBySlug = new Map(militaryServiceAnnouncements.map(item => [item.slug, item]));

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char] || char));
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function trackLabel(track: MilitaryServiceTrack): string {
  return track === "bedelli" ? "Bedelli" : "Normal tertip / sınıflandırma";
}

const styles = `
.asal-feed{width:min(1160px,calc(100% - 28px));margin:18px auto 34px;padding:20px;border:1px solid #cfdcf5;background:#f6f9ff;border-radius:18px}.asal-feed-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:12px}.asal-feed-head h2{margin:0;font-size:1.35rem}.asal-feed-head p{margin:5px 0 0;color:#65758b;line-height:1.55;max-width:800px}.asal-feed-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.asal-card{display:block;background:#fff;border:1px solid #dbe4f4;border-radius:13px;padding:14px}.asal-card:hover{border-color:#9fb7e8;box-shadow:0 6px 18px rgba(36,88,214,.08)}.asal-card strong{display:block;line-height:1.4}.asal-card small{display:block;color:#697386;margin-top:5px;line-height:1.45}.asal-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:7px}.asal-tag{font-size:.72rem;font-weight:800;padding:4px 7px;border-radius:999px;background:#edf3ff;color:#2458d6}.asal-tag.bedelli{background:#eef8f2;color:#176a42}.asal-btn{display:inline-flex;min-height:42px;align-items:center;justify-content:center;padding:9px 12px;border:1px solid #cdd9ee;border-radius:10px;background:#fff;font-weight:800;text-decoration:none;color:#22324d}.asal-btn.primary{background:#2458d6;color:#fff;border-color:#2458d6}.asal-page{width:min(1160px,calc(100% - 28px));margin:26px auto 42px}.asal-hero{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;box-shadow:0 14px 36px rgba(15,23,42,.06)}.asal-hero h1{font-size:clamp(1.8rem,5vw,3rem);line-height:1.08;margin:8px 0 12px;letter-spacing:-.035em}.asal-hero p{color:#667085;line-height:1.65;max-width:900px}.asal-meta{display:flex;gap:7px;flex-wrap:wrap;align-items:center;color:#667085;font-size:.8rem}.asal-state{font-weight:850;padding:5px 8px;border-radius:999px;background:#edf3ff;color:#2458d6}.asal-detail{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:14px;margin-top:14px}.asal-box{background:#fff;border:1px solid #e2e8f0;border-radius:15px;padding:18px}.asal-box h2{font-size:1.08rem;margin:0 0 10px}.asal-box ul{margin:0;padding-left:20px;color:#475467;line-height:1.62}.asal-box li+li{margin-top:7px}.asal-source{display:block;padding:11px 12px;border:1px solid #e2e8f0;border-radius:11px;margin-top:8px}.asal-source strong,.asal-related strong{display:block}.asal-source small,.asal-related small{display:block;color:#697386;margin-top:4px}.asal-related a{display:block;padding:10px 11px;border:1px solid #e2e8f0;border-radius:11px;margin-top:8px}.asal-table-wrap{overflow:auto;margin-top:12px}.asal-table{width:100%;border-collapse:collapse;background:#fff;min-width:650px}.asal-table th,.asal-table td{border:1px solid #dfe6f1;padding:10px;text-align:left;font-size:.86rem}.asal-table th{background:#f5f8fd}.asal-note{margin-top:12px;padding:12px 13px;border:1px solid #efd28a;background:#fff8e8;border-radius:12px;color:#6c5200;line-height:1.55}@media(max-width:760px){.asal-feed-grid,.asal-detail{grid-template-columns:1fr}.asal-feed,.asal-page{width:min(100% - 20px,1160px)}.asal-feed-head{flex-direction:column}}
`;

function card(item: MilitaryServiceAnnouncement): string {
  const state = announcementState(item);
  return `<a class="asal-card" href="/duyuru/${esc(item.slug)}/"><div class="asal-tags"><span class="asal-tag ${item.track === "bedelli" ? "bedelli" : ""}">${esc(trackLabel(item.track))}</span><span class="asal-tag">${esc(state.label)}</span></div><strong>${esc(item.title)}</strong><small>${formatDate(item.publishedAt)} · ${esc(item.summary)}</small></a>`;
}

function pageShell(title: string, description: string, canonical: string, body: string): string {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${esc(canonical)}"><style>:root{--ink:#172033;--muted:#697386;--line:#e2e8f0;--blue:#2458d6}*{box-sizing:border-box}body{margin:0;background:#f5f7fb;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow-wrap:anywhere}a{color:inherit;text-decoration:none}header{background:rgba(255,255,255,.96);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}.head{width:min(1160px,calc(100% - 28px));min-height:66px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:12px}.brand{font-weight:900;font-size:1.2rem;letter-spacing:-.04em}.brand span{color:var(--blue)}nav{display:flex;gap:6px;align-items:center;flex-wrap:wrap}nav a{font-size:.86rem;color:#526174;padding:9px 10px;border-radius:10px}nav a:hover{background:#f3f5f8}footer{border-top:1px solid var(--line);padding:28px 0 42px;color:var(--muted);font-size:.88rem}.foot{width:min(1160px,calc(100% - 28px));margin:auto}${styles}</style></head><body><header><div class="head"><a class="brand" href="/">Nereye <span>Başvurulur?</span></a><nav aria-label="Ana menü"><a href="/askerlik-subeleri/">Askerlik şubeleri</a><a href="/askerlik-subeleri/duyurular/">Askeralma takvimi</a><a href="/duyurular/">Tüm duyurular</a></nav></div></header>${body}<footer><div class="foot">Nereye Başvurulur? · Askeralma takvimleri MSB Askeralma Genel Müdürlüğünün resmî duyurularından özetlenir. Kişisel sınıflandırma ve sevk belgesi e-Devlet Askerliğim veya askerlik şubesi kaydından kontrol edilmelidir.</div></footer></body></html>`;
}

function calendarTable(item: MilitaryServiceAnnouncement): string {
  if (!item.calendarRows?.length) return "";
  const normal = item.track === "normal-tertip";
  const head = normal ? `<tr><th>Dönem</th><th>Sonuç açıklama</th><th>1. grup / Yedek Sb.-Astsb.</th><th>2. grup er</th><th>3. grup er</th></tr>` : `<tr><th>Dönem</th><th>Sevk</th><th>Yemin töreni</th><th>Terhis</th></tr>`;
  const rows = item.calendarRows.map(row => normal
    ? `<tr><td>${esc(row.period)}</td><td>${esc(row.resultDate || "-")}</td><td>${esc(row.group1 || "-")}</td><td>${esc(row.group2 || "-")}</td><td>${esc(row.group3 || "-")}</td></tr>`
    : `<tr><td>${esc(row.period)}</td><td>${esc(row.sevkDate || "-")}</td><td>${esc(row.oathDate || "-")}</td><td>${esc(row.dischargeDate || "-")}</td></tr>`
  ).join("");
  return `<section class="asal-box" style="margin-top:12px"><h2>${esc(item.calendarTitle || "Takvim")}</h2><div class="asal-table-wrap"><table class="asal-table">${head}${rows}</table></div><div class="asal-note">Takvim genel planlamadır. Kişisel sınıflandırma sonucu, sevk grubu, eğitim birliği, sevk tarihi ve yol süresi için e-Devlet Askerliğim ekranı veya askerlik şubesinden alınan güncel sevk belgesi esastır.</div></section>`;
}

export function renderMilitaryServiceFeedSection(limit = 5): string {
  const items = militaryServiceAnnouncements.slice(0, limit).map(card).join("");
  return `<section class="asal-feed" aria-labelledby="asalAnnouncements"><div class="asal-feed-head"><div><h2 id="asalAnnouncements">Askeralma takvimi ve sınıflandırma duyuruları</h2><p>Normal tertip er/yedek subay-astsubay sınıflandırması, sevk belgesi (YÜSEM diye de aranır) ve bedelli askerlik celp-dağıtım takvimlerini MSB'nin resmî kaynaklarından takip ediyoruz.</p></div><a class="asal-btn" href="/askerlik-subeleri/duyurular/">Tüm askerlik takvimleri →</a></div><div class="asal-feed-grid">${items}</div><style>${styles}</style></section>`;
}

export function renderMilitaryServiceGeneralFeedSection(limit = 4): string {
  const items = militaryServiceAnnouncements.slice(0, limit).map(card).join("");
  return `<section class="asal-feed" aria-labelledby="asalGeneralAnnouncements"><div class="asal-feed-head"><div><h2 id="asalGeneralAnnouncements">Askeralma ve sevk takvimleri</h2><p>MSB Askeralma'nın normal tertip sınıflandırma, er sevk ve bedelli celp takvimlerinden güncel kayıtlar.</p></div><a class="asal-btn" href="/askerlik-subeleri/duyurular/">Askeralma akışını aç →</a></div><div class="asal-feed-grid">${items}</div><style>${styles}</style></section>`;
}

export function renderMilitaryServiceListPage(): string {
  const normal = militaryServiceAnnouncements.filter(item => item.track === "normal-tertip").map(card).join("");
  const paid = militaryServiceAnnouncements.filter(item => item.track === "bedelli").map(card).join("");
  return pageShell(
    "Askeralma Takvimi, YÜSEM/Sevk ve Bedelli Duyuruları | Nereye Başvurulur?",
    "MSB Askeralma Genel Müdürlüğünün 2026 normal tertip sınıflandırma, er sevk, YÜSEM/sevk belgesi ve bedelli askerlik celp-dağıtım takvimlerinin doğrulanmış özeti.",
    "https://nereyebasvurulur.com/askerlik-subeleri/duyurular/",
    `<main class="asal-page"><section class="asal-hero"><div class="asal-meta"><span class="asal-state">MSB Askeralma doğrulandı</span><span>Son kontrol: 25.08.2026</span></div><h1>Askeralma takvimi ve sevk duyuruları</h1><p>Bu bölüm askerlik şubeleri rehberini güncel takvimle birleştirir. Normal tertip er/yedek subay-yedek astsubay sınıflandırma sonuçları, sevk belgesi (YÜSEM olarak da aranır), celp grupları ve bedelli askerlik sevk/yemin/terhis planı resmî MSB kaynaklarından özetlenir. Kişisel birlik ve sevk bilgisi için daima Askerliğim ekranını veya askerlik şubenizi esas alın.</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><a class="asal-btn primary" target="_blank" rel="noopener noreferrer" href="https://www.turkiye.gov.tr/mill-savunma-askerligim">e-Devlet Askerliğim ↗</a><a class="asal-btn" target="_blank" rel="noopener noreferrer" href="https://www.msb.gov.tr/Askeralma">MSB Askeralma ↗</a><a class="asal-btn" href="/askerlik-subeleri/">Askerlik şubeleri</a></div></section><section class="asal-box" style="margin-top:14px"><h2>Normal tertip / sınıflandırma ve er sevkleri</h2><div class="asal-feed-grid">${normal}</div></section><section class="asal-box" style="margin-top:14px"><h2>Bedelli askerlik celp ve dağıtım takvimi</h2><div class="asal-feed-grid">${paid}</div></section></main>`
  );
}

export function renderMilitaryServiceDetail(item: MilitaryServiceAnnouncement, relatedRoutes: RelatedRoute[]): string {
  const state = announcementState(item);
  const detailItems = item.details.map(value => `<li>${esc(value)}</li>`).join("");
  const actionItems = item.actions.map(value => `<li>${esc(value)}</li>`).join("");
  const sources = item.sources.map(source => `<a class="asal-source" target="_blank" rel="noopener noreferrer" href="${esc(source.url)}"><strong>${esc(source.title)}</strong><small>${esc(source.authority)} · Resmî kaynak ↗</small></a>`).join("");
  const related = relatedRoutes.length
    ? relatedRoutes.map(route => `<a href="/konu/${esc(route.slug)}/"><strong>${esc(route.title)}</strong><small>İlgili başvuru rehberini aç →</small></a>`).join("")
    : (item.relatedSearches || []).map(query => `<a href="/ara?q=${encodeURIComponent(query)}"><strong>${esc(query)}</strong><small>İlgili başvuru rehberlerinde ara →</small></a>`).join("");
  const deadline = item.deadlineLabel ? `<div class="asal-note"><strong>Tarih / süre:</strong> ${esc(item.deadlineLabel)}${state.className === "archive" ? " · Bu kayıt arşiv statüsündedir." : ""}</div>` : "";
  return pageShell(
    `${item.title} | Nereye Başvurulur?`,
    item.summary,
    `https://nereyebasvurulur.com/duyuru/${item.slug}/`,
    `<main class="asal-page"><article><section class="asal-hero"><div class="asal-meta"><span class="asal-state">${esc(state.label)}</span><span>${esc(trackLabel(item.track))}</span><span>${esc(item.authority)}</span><span>Yayın: ${formatDate(item.publishedAt)}</span><span>Doğrulama: ${formatDate(item.verifiedAt)}</span></div><h1>${esc(item.title)}</h1><p>${esc(item.summary)}</p>${deadline}<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">${item.actionUrl ? `<a class="asal-btn primary" target="_blank" rel="noopener noreferrer" href="${esc(item.actionUrl)}">${esc(item.actionLabel || "Resmî işlemi aç")} ↗</a>` : ""}<a class="asal-btn" href="/askerlik-subeleri/duyurular/">Askeralma takvimi</a><a class="asal-btn" href="/askerlik-subeleri/">Askerlik şubeleri</a></div></section><div class="asal-detail"><div><section class="asal-box"><h2>Ne bilmelisiniz?</h2><ul>${detailItems}</ul></section><section class="asal-box" style="margin-top:12px"><h2>Ne yapmalısınız?</h2><ul>${actionItems}</ul></section>${calendarTable(item)}<div class="asal-note"><strong>YÜSEM / sevk belgesi notu:</strong> YÜSEM ifadesi bazı askerlik kayıt ve kullanım kılavuzlarında görülebilir. Güncel vatandaş işleminde kişisel sınıflandırma sonucu ve barkodlu sevk belgesi e-Devlet Askerliğim veya askerlik şubesi üzerinden kontrol edilmelidir.</div></div><aside><section class="asal-box"><h2>Resmî kaynaklar</h2>${sources}</section>${related ? `<section class="asal-box" style="margin-top:12px"><h2>İlgili başvuru rehberleri</h2><div class="asal-related">${related}</div></section>` : ""}</aside></div></article></main>`
  );
}

export function renderMilitaryRouteAnnouncementSection(items: MilitaryServiceAnnouncement[]): string {
  if (!items.length) return "";
  const links = items.slice(0, 5).map(item => { const state = announcementState(item); return `<a class="asal-card" href="/duyuru/${esc(item.slug)}/"><div class="asal-tags"><span class="asal-tag ${item.track === "bedelli" ? "bedelli" : ""}">${esc(trackLabel(item.track))}</span><span class="asal-tag">${esc(state.label)}</span></div><strong>${esc(item.title)}</strong><small>${formatDate(item.publishedAt)} · ayrıntıyı ve resmî takvimi gör →</small></a>`; }).join("");
  return `<section class="asal-feed"><div class="asal-feed-head"><div><h2>Bu işlemle ilgili askerlik takvimi</h2><p>Sınıflandırma, sevk ve bedelli tarihlerinde güncel MSB duyurusunu esas alın.</p></div><a class="asal-btn" href="/askerlik-subeleri/duyurular/">Tüm takvim →</a></div><div class="asal-feed-grid">${links}</div><style>${styles}</style></section>`;
}
