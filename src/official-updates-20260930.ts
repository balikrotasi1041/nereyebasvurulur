import type { Announcement } from "./announcements";

const source = (title: string, url: string, authority: string) => ({ title, url, authority });
const yksResult = "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10372";
const tryos = "https://tryos.osym.gov.tr/";
const sgkService = "https://www.turkiye.gov.tr/sgk-esgkuyg-esgksifre-e-borcu-yoktur";
const aileNotice = "https://www.aile.gov.tr/duyurular/3713-sayili-terorle-mucadele-kanunu-kapsaminda-19-09-2026-tarihinde-gerceklestirilen-kura-sonucuna-gore-bakanligimiz-kadrosuna-atanmaya-hak-kazanan-adaylardan-istenilen-belgeler/";

export const officialAnnouncementsSeptember30: Announcement[] = [
  {
    slug: "2026-yks-ek-yerlestirme-sonuclari-kayit",
    title: "YKS ek yerleştirme: e-kayıt 2–4 Ekim, üniversite kaydı 2–9 Ekim",
    authority: "ÖSYM / Yükseköğretim Kurulu", kind: "result",
    publishedAt: "2026-09-28", verifiedAt: "2026-09-30", lastModified: "2026-09-30",
    deadlineDate: "2026-10-09",
    deadlineLabel: "Elektronik kayıt 2–4 Ekim; üniversitede kayıt 2–9 Ekim 2026, resmî iş günleri ve çalışma saatlerinde",
    summary: "2026-YKS ek yerleştirme sonuçları 28 Eylül saat 15.30'da açıldı. Yerleşen adaylar için elektronik kayıt 2–4 Ekim; üniversitedeki kayıt işlemleri 2–9 Ekim 2026 arasında yapılacak.",
    details: [
      "Önce ÖSYM Sonuç Açıklama Sisteminde kendi yerleştirme sonucunuzu öğrenin. Sonuç belgesi adrese gönderilmiyor; bu duyuru yeni tercih başvurusu açmıyor.",
      "Üniversite kayıtları resmî iş günleri ve çalışma saatlerinde yapılır. Elektronik kayıt yapanlar da üniversitelerinin istediği belgeleri ve sonraki işlemleri takip etmelidir. e-kayıt için 9 Ekim'e kadar beklemeyin: onun son günü 4 Ekim'dir. Duyuruda ortak sayısal kapanış saati belirtilmiyor."
    ],
    actions: ["Ek yerleştirme sonucunu kontrol edip üniversitenizin resmî kayıt duyurusunu okuyun.", "Size uygun kayıt kanalını kendi tarih aralığında tamamlayın; elektronik kayıt belgenizi kontrol edin."],
    actionUrl: yksResult, actionLabel: "ÖSYM ek yerleştirme sonucunu aç",
    relatedPathKeys: [], relatedSearches: ["YKS ek yerleştirme", "üniversite e-kayıt"],
    sources: [source("28 Eylül: YKS ek yerleştirme sonuçları ve kayıt takvimi", "https://www.osym.gov.tr/2026-yks-ek-yerlestirme-sonuclari-aciklandi", "ÖSYM"), source("2026-YKS ek yerleştirme sonuç ekranı", yksResult, "ÖSYM"), source("Üniversite e-Kayıt", "https://www.turkiye.gov.tr/yok-universite-ekayit", "e-Devlet / YÖK")]
  },
  {
    slug: "2026-tr-yos-2-sinava-giris-belgeleri",
    title: "TR-YÖS/2 giriş belgesi TR-YÖS sisteminde erişime açıldı",
    authority: "ÖSYM", kind: "exam-call",
    publishedAt: "2026-09-29", verifiedAt: "2026-09-30", lastModified: "2026-09-30",
    deadlineDate: "2026-10-11",
    deadlineLabel: "Sınav 11 Ekim 2026; binaya son giriş saati kişisel Sınava Giriş Belgesindedir",
    summary: "11 Ekim 2026 TR-YÖS/2 sınavına başvuranlar, giriş belgelerini 29 Eylül saat 14.30'dan itibaren ÖSYM'nin TR-YÖS sisteminden alabilir. Bina ve salonunuzu, belgenizdeki son giriş saatiyle birlikte kontrol edin.",
    details: [
      "Belge tryos.osym.gov.tr üzerinden T.C. kimlik, Y.U. veya TR-YÖS numarası ve aday şifresiyle alınır. Başka sınavın AİS ekranına veya saatine göre hareket etmeyin; bu işlem yeni sınav başvurusu değildir.",
      "ÖSYM, giriş belgesindeki saatten sonra binaya aday alınmayacağını belirtiyor. Fotoğrafı görünen basılı giriş belgesini ve temel kurallarda kabul edilen geçerli kimliğinizi hazırlayın. Genel takvim kişisel sınav yerini göstermez."
    ],
    actions: ["TR-YÖS sisteminden kendi giriş belgenizi indirip fotoğraflı çıktısını alın.", "Belgedeki bina, salon ve son giriş saatini okuyun; geçerli kimliğinizi hazırlayın."],
    actionUrl: tryos, actionLabel: "TR-YÖS giriş belgesini aç",
    relatedPathKeys: [], relatedSearches: ["TR-YÖS 2 giriş belgesi", "yurt dışından öğrenci kabul sınavı"],
    sources: [source("29 Eylül: TR-YÖS/2 sınava giriş belgeleri", "https://www.osym.gov.tr/2026-tr-yos2-sinava-giris-belgeleri-erisime-acildiaccess-to-documents-for-entry-to-the-2026-tr-yos2-exam-has-been-opened", "ÖSYM"), source("TR-YÖS aday sistemi", tryos, "ÖSYM"), source("Sınava giriş belgesindeki temel kurallar", "https://dokuman.osym.gov.tr/web/2026/7/temel-kurallar-28k39fdj.pdf", "ÖSYM")]
  },
  {
    slug: "2026-sgk-e-borcu-yoktur-sistem-guncellemesi",
    title: "SGK e-Borcu Yoktur sistemindeki güncellemeyi duyurdu",
    authority: "Sosyal Güvenlik Kurumu", kind: "guide",
    publishedAt: "2026-09-28", verifiedAt: "2026-09-30", lastModified: "2026-09-30",
    summary: "SGK'nın 28 Eylül duyurusu, e-Borcu Yoktur ve EKAP borç sorgusunda 17 Eylül mesai bitiminde kullanıma açılan yazılım güncellemesini açıklıyor. İşverenler belge işlemini resmî hizmet üzerinden kontrol edebilir.",
    details: [
      "Duyuru, yapılandırma veya tecil kapsamındaki ödemelerini düzenli yerine getiren işverenler için sorgu günü ile sorguya esas tarihin aynı olmasını ve geçerli borç limitlerinin kontrolünü açıklıyor. Duyurunun yayımlandığı 28 Eylül, uygulamanın başlangıcı değildir.",
      "Belge düzenlenmesi kişisel borç durumu ve yürürlükteki koşullara bağlıdır; güncelleme herkese borcu yoktur belgesi verileceği anlamına gelmez. İnceleme gerekli: ilgili kanun metinlerinin güncel doğrulaması tamamlanmadığından burada parasal eşik veya yeni bir uygunluk hakkı ilan edilmiyor."
    ],
    actions: ["SGK'nın resmî e-Borcu Yoktur hizmetinde kendi işveren kaydınızla işlem yapın.", "Borç veya belge sonucunda uyuşmazlık varsa duyuruyu ve kayıtlarınızı SGK ile kontrol edin."],
    actionUrl: sgkService, actionLabel: "SGK e-Borcu Yoktur hizmetini aç",
    relatedPathKeys: [], relatedSearches: ["SGK e-Borcu Yoktur", "işveren borç sorgulama"],
    sources: [source("28 Eylül: e-Borcu Yoktur sistem güncellemesi", "https://www.sgk.gov.tr/duyuru/detay/e-Borcu-Yoktur-Sisteminin-Guncellenmesi-Hakkinda-Duyuru-2026-09-28-02-15-39", "SGK"), source("SGK güncelleme duyurusu PDF", "https://www.sgk.gov.tr/Download/DownloadFile?d=70f9397b-e779-44dd-a0f6-3a5d3d00c2ae&f=47b6b75e-ddc0-4ff0-aa4e-3e920aee03f1.pdf", "SGK"), source("e-Borcu Yoktur", sgkService, "e-Devlet / SGK")]
  },
  {
    slug: "2026-aile-3713-yerlesen-aday-belge-teslimi",
    title: "Aile Bakanlığına 3713 kurasıyla yerleşenler: evrak teslimi 6 Kasım'a kadar",
    authority: "Aile ve Sosyal Hizmetler Bakanlığı", kind: "guide",
    publishedAt: "2026-09-28", verifiedAt: "2026-09-30", lastModified: "2026-09-30",
    deadlineDate: "2026-11-06", deadlineLabel: "6 Kasım 2026 mesai bitimine kadar belgelerin Bakanlığa ulaşması gerekir",
    summary: "19 Eylül kurasında Aile Bakanlığı kadro veya pozisyonlarına yerleşen adaylardan atama belgeleri istendi. Belgeler 6 Kasım 2026 mesai bitimine kadar Personel Genel Müdürlüğüne şahsen ya da posta/kargoyla ulaştırılmalı.",
    details: [
      "Bu çağrı yalnız Bakanlığa yerleşmiş adayların evrak aşamasıdır. İmzalı başvuru/beyan ve etik formları, öğrenim ve kişisel durum belgeleri ile üç biyometrik fotoğrafı resmî listeye göre hazırlayın. Mal bildirimi işçi kadrosuna yerleşenlerden istenmiyor. Diploma sureti koşulları teslim kanalına göre değişiyor.",
      "Duyuru, muvazzaf askerlik yapanlar için ilk aşamada muhtemel terhis tarihini gösteren birlik yazısı ve başvuru/beyan formunu; terhis sonrasında ayrı belge tamamlama usulünü açıklıyor. Bu durumdaysanız ayrıntıları resmî ekte kontrol edin. SGK veya Tarım Bakanlığının evrak tarihleri bu çağrıya uygulanmaz; duyuruda sayısal kapanış saati belirtilmiyor."
    ],
    actions: ["Resmî duyurudaki belge listesini ve kendi durumunuza ait istisnaları okuyun; formları doldurup imzalayın.", "Belgeleri duyurudaki Personel Genel Müdürlüğü adresine son güne kadar ulaştırın; posta/kargo süresini hesaba katın."],
    actionUrl: aileNotice, actionLabel: "Aile Bakanlığı belge ve formlarını aç",
    relatedPathKeys: [], relatedSearches: ["Aile Bakanlığı 3713 atama evrakı", "3713 kura sonrası belge teslimi"],
    sources: [source("28 Eylül: 19 Eylül kurasıyla yerleşen adayların belgeleri", aileNotice, "Aile ve Sosyal Hizmetler Bakanlığı"), source("Duyuru ve istenilen belgeler — resmî Word eki", "https://www.aile.gov.tr/media/373929/duyuru-ve-istenen-belgeler-1.docx", "Aile ve Sosyal Hizmetler Bakanlığı")]
  }
];

export function refreshSeptember30(item: Announcement): Announcement {
  if (item.slug !== "2026-gsb-yurt-basvuru-sonuclari-sorgulama") return item;
  return {
    ...item, lastModified: "2026-09-30",
    title: "GSB yurt yedek sonuçları: 28 Eylül yerleştirmesini kontrol edin",
    summary: "KYGM, 28 Eylül 2026 yurt yedek yerleştirme sonuçlarını duyurdu. Kişisel sonucu ve kayıt sürenizi e-Devlet'ten kontrol edin; ilk yerleştirmenin 10 Eylül son tarihi bu yeni sonuca uygulanmaz.",
    details: ["30 Eylül kontrolü: KYGM'nin 28 Eylül sonuç duyurusu e-Devlet Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor. Ortak yeni kayıt saati açıklanmıyor; kişisel sonuç ekranını esas alın.", ...item.details.filter(detail => !detail.startsWith("24 Eylül kontrolü:") && !detail.startsWith("Önceki 21 Eylül"))],
    sources: [source("28.09.2026 tarihli yurt yedek yerleştirme sonuçları (30 Eylül kontrolü)", "https://kygm.gsb.gov.tr/Duyuru/302961/28092026-tarihli-yurt-yedek-yerlestirme-sonuclari.aspx", "GSB / KYGM"), ...item.sources.filter(source => !source.url.includes("/302961/23092026-"))]
  };
}
