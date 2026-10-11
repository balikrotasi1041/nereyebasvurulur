import type { Announcement } from "./announcements";

const gumrukNotice = "https://ticaret.gov.tr/duyurular/2026-yili-gumruk-musavirligi-ve-gumruk-musavir-yardimciligi-sinavi-duyurusu";
const gumrukGuide = "https://sinav.hacettepe.edu.tr/2026%20Gumruk%20Mu%C2%A8savir%20ve%20Mu%C2%A8savir%20Yard%C4%B1mc%C4%B1l%C4%B1g%C4%B1%20S%C4%B1nav%20Uygulama%20K%C4%B1lavuzu_30092026.pdf.pdf";
const bursNotice = "https://akademi.meb.gov.tr/www/2026-2027-egitim-ogretim-yili-ogretmenlik-bursu-sonuclari-aciklandi/icerik/248";
const kpssNotice = "https://www.osym.gov.tr/2026-kpss-lisans-sinavi-genel-yetenek-genel-kultur-ve-alan-bilgisi-sinav-sonuclari-aciklandi";
const kpssResult = "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10376";

export const officialAnnouncementsOctober7: Announcement[] = [
  {
    slug: "2026-kpss-lisans-sinav-sonuclari",
    title: "2026 KPSS Lisans sonuçları 7 Ekim'de açıklandı",
    authority: "ÖSYM", kind: "result",
    publishedAt: "2026-10-07", verifiedAt: "2026-10-07", lastModified: "2026-10-07",
    summary: "KPSS Lisans Genel Yetenek–Genel Kültür ve Alan Bilgisi sonuçları 7 Ekim 2026 saat 06.00'da erişime açıldı. Adaylar kendi sonuçlarını ÖSYM Sonuç Açıklama Sisteminden kimlik numarası ve aday şifresiyle öğrenebilir.",
    details: [
      "Duyuru, 6 Eylül Genel Yetenek–Genel Kültür ve 12–13 Eylül Alan Bilgisi oturumlarını kapsıyor. Ön lisans, ortaöğretim ve DHBT sonuçlarını bu kayıtla karıştırmayın.",
      "Bu aşama sınav sonucunu öğrenme işlemidir; yeni sınav başvurusu, tercih dönemi veya kamu kadrosuna yerleşme sonucu değildir. Duyuruda ortak bir sonuç görüntüleme son günü açıklanmadı."
    ],
    actions: ["ÖSYM'nin kişisel sonuç ekranını açıp sınav ve oturum adını kontrol edin.", "Sonuç belgenizi inceleyin; tercih veya personel alımı için ilgili kurumun ayrı duyurusunu izleyin."],
    actionUrl: kpssResult, actionLabel: "KPSS Lisans kişisel sonucunu aç",
    relatedPathKeys: [], relatedSearches: ["KPSS Lisans sonuç", "KPSS Alan Bilgisi sonuç"],
    sources: [{ title: "7 Ekim: KPSS Lisans sonuç duyurusu", authority: "ÖSYM", url: kpssNotice }, { title: "2026 KPSS Lisans kişisel sonuç ekranı", authority: "ÖSYM", url: kpssResult }]
  },
  {
    slug: "2026-gumruk-musavirligi-sinav-kilavuzu",
    title: "Gümrük müşavirliği sınav kılavuzu: kayıt dönemi 19–30 Ekim",
    authority: "Ticaret Bakanlığı / Hacettepe Üniversitesi", kind: "guide",
    publishedAt: "2026-10-05", verifiedAt: "2026-10-07", lastModified: "2026-10-07",
    deadlineDate: "2026-10-30",
    deadlineLabel: "Sınav kaydı 19–30 Ekim; kesin açılış/kapanış saati kılavuzda belirtilmiyor",
    summary: "15 Kasım gümrük müşavirliği ve müşavir yardımcılığı sınavlarının uygulama kılavuzu yayımlandı. Hacettepe sınav kaydı 19–30 Ekim'de yapılacak; kılavuzun yayımlanması bugün kayıt açıldığı anlamına gelmiyor.",
    details: [
      "Ticaret Bakanlığındaki ön başvuru ile Hacettepe'deki sınav kaydı ayrı aşamalardır. Aday, uygunluğunu kontrol ettikten sonra Hacettepe sistemindeki bilgilerini tamamlayıp imzalı başvuru formunu yüklemeli ve ilgili sınavı seçmelidir.",
      "Kılavuz sınav ücretini 3.275 TL olarak belirtiyor. Başvuru döneminde ödeme ve belge yükleme talimatlarını resmî sistemden izleyin. Sınava giriş belgesi 9 Kasım saat 09.00'dan itibaren açılacak; sınav 15 Kasım'da Ankara Beytepe'de, müşavirlik için 09.30, yardımcılık için 14.30'da yapılacak. Kişisel salon ve sıra bilgisi giriş belgesindedir."
    ],
    actions: ["Resmî kılavuzdan ön başvuru durumunuzu ve sınav türünüzü kontrol edin.", "19–30 Ekim döneminde Hacettepe sistemindeki kayıt, imzalı form ve ödeme adımlarını tamamlayın."],
    actionUrl: "https://sinav.hacettepe.edu.tr/", actionLabel: "Hacettepe resmî sınav sayfasını aç",
    relatedPathKeys: [], relatedSearches: ["gümrük müşavirliği sınavı", "gümrük müşavir yardımcılığı kayıt"],
    sources: [{ title: "5 Ekim: Bakanlık kılavuz duyurusu", authority: "Ticaret Bakanlığı", url: gumrukNotice }, { title: "2026 sınav uygulama kılavuzu", authority: "Hacettepe Üniversitesi / Ticaret Bakanlığı", url: gumrukGuide }]
  },
  {
    slug: "2026-2027-meb-ogretmenlik-bursu-sonuclari",
    title: "2026–2027 MEB öğretmenlik bursu sonuçları açıklandı",
    authority: "Millî Eğitim Bakanlığı / Millî Eğitim Akademisi", kind: "result",
    publishedAt: "2026-09-30", verifiedAt: "2026-10-07", lastModified: "2026-10-07",
    summary: "Millî Eğitim Akademisi, 2026–2027 öğretmenlik bursu sonuçlarını resmî duyurusundaki bağlantıdan sorgulamaya açtı. Bu sonuç, GSB'nin genel burs/kredi başvurusundan ayrı bir süreçtir.",
    details: [
      "Kaynak sayfada ilk yayın 30 Eylül, son güncelleme 1 Ekim 2026 olarak gösteriliyor. MEB ana sayfasındaki daha sonraki listeleme tarihi yeni başvuru başlangıcı sayılmadı.",
      "Kişisel sonuca Bakanlığın duyurusundaki sonuç bağlantısından gidin. Hedef sonuç bağlantısı bu kontrolde açılamadığından sonuç içeriği, ödeme günü veya kişisel hak sahipliği doğrulanmış kabul edilmedi; duyuruda ortak bir yeni başvuru/itiraz son tarihi verilmiyor."
    ],
    actions: ["MEB'nin resmî duyurusunu açarak sonuç bağlantısını izleyin.", "Kendi sonuç ekranınızdaki açıklamaları okuyun; genel GSB burs başvurusu yerine bu sonucu kullanmayın."],
    actionUrl: bursNotice, actionLabel: "MEB öğretmenlik bursu sonuç duyurusunu aç",
    relatedPathKeys: [], relatedSearches: ["MEB öğretmenlik bursu", "öğretmenlik burs sonucu"],
    sources: [{ title: "Öğretmenlik bursu sonuç duyurusu (yayın 30 Eylül, güncelleme 1 Ekim)", authority: "Millî Eğitim Akademisi", url: bursNotice }, { title: "MEB resmî duyuru listesi", authority: "Millî Eğitim Bakanlığı", url: "https://www.meb.gov.tr/" }]
  }
];
