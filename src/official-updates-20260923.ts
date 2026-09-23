import type { Announcement, AnnouncementSource } from "./announcements";

const checked = "2026-09-23";
const source = (title: string, url: string, authority = "ÖSYM"): AnnouncementSource => ({ title, url, authority });
const ais = source("ÖSYM Aday İşlemleri Sistemi: güncel işlem takvimi", "https://ais.osym.gov.tr/");
const dhbtGuides = source("2026 DHBT: öğrenim düzeyine göre kılavuzlar", "https://www.osym.gov.tr/2026-kpss-din-hizmetleri-alan-bilgisi-dhbt-kilavuzlar-ve-basvuru-bilgileri");
const dormitoryNotice = "https://kygm.gsb.gov.tr/Duyuru/303162/2026-2027-egitim-ogretim-yili-ek-kontenjan-basvurularina-iliskin-duyuru.aspx";
const schoolNotice = "https://www.meb.gov.tr/ogretmen-veli-gorusmeleri-icin-mebim-uzerinden-telefonla-randevu-alinabilecek/haber/41975/tr";

export const officialAnnouncementsSeptember23: Announcement[] = [
  {
    slug: "2026-kpss-dhbt-basvurulari",
    title: "2026 DHBT: başvuru 30 Eylül'de, normal ücret ödemesi 1 Ekim'de bitiyor",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-09-22", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-09-22T10:40:00+03:00", deadlineAt: "2026-09-30T23:59:00+03:00",
    deadlineLabel: "Normal başvuru: 30 Eylül 2026 23.59; normal sınav ücreti son günü: 1 Ekim; ayrı geç başvuru günü: 5 Ekim",
    summary: "2026 KPSS Din Hizmetleri Alan Bilgisi sınavına başvurular 22 Eylül saat 10.40'ta açıldı ve 30 Eylül saat 23.59'da kapanacak. Sınav 1 Kasım'da; normal sınav ücreti 800 TL. Başvuru kaydı ile ücret ödeme son günü farklıdır.",
    details: [
      "ÖSYM duyurusu AİS, Aday İşlemleri Mobil Uygulaması ve başvuru merkezlerini gösteriyor. Adayın DHBT öğrenim düzeyi, katıldığı KPSS düzeyiyle aynı olmalıdır; uygunluk için kendi düzeyinin kılavuzu incelenmelidir.",
      "22 Eylül'de yayımlanan lisans, ön lisans ve ortaöğretim kılavuzları normal DHBT ücretinin son gününü 1 Ekim olarak belirtiyor. Ödeme için ek gün tanınması, 30 Eylül'den sonra normal başvuru kaydı oluşturma hakkı vermez; kanalın ödeme saatini ayrıca kontrol edin.",
      "Kılavuzlarda 5 Ekim ayrı geç başvuru günü olarak yer alıyor; o gün ücret yüzde 50 artırımlı ve aynı gün ödeniyor. Bu gelecek pencere bugün başlamış değildir. Sınav başvurusu Diyanet personel alımında atanma başvurusu veya atama garantisi değildir."
    ],
    actions: ["Öğrenim düzeyinizin resmî kılavuzunu okuyun ve AİS'te DHBT kaydını seçin.", "Normal başvuruyu 30 Eylül 23.59'dan önce tamamlayıp kaydınızı kontrol edin; ücret yükümlülüğünüz varsa ödeme işlemini 1 Ekim son gününü ve kanal saatini gözeterek ayrıca bitirin."],
    actionUrl: ais.url, actionLabel: "ÖSYM AİS DHBT başvurusunu aç",
    relatedPathKeys: [], relatedSearches: ["KPSS DHBT", "Din Hizmetleri Alan Bilgisi"],
    sources: [source("DHBT: başvuruların alınması, 22 Eylül 2026", "https://www.osym.gov.tr/2026-kpss-din-hizmetleri-alan-bilgisi-dhbt-basvurularinin-alinmasi"), dhbtGuides, ais,
      source("2026 KPSS Lisans kılavuzu: DHBT takvimi", "https://dokuman.osym.gov.tr/web/2026/9/2026-kpss-lisans-basvuru-kilavuzu-6v7v57-22101148.pdf"),
      source("2026 KPSS Ön Lisans kılavuzu: DHBT takvimi", "https://dokuman.osym.gov.tr/web/2026/9/2026-kpss-on-lisans-basvuru-kilavuzu-l21r5f-22101148.pdf"),
      source("2026 KPSS Ortaöğretim kılavuzu: DHBT takvimi", "https://dokuman.osym.gov.tr/web/2026/9/2026-kpss-ortaogretim-basvuru-kilavuzu-0k8595-22101148.pdf")]
  },
  {
    slug: "2026-ozyes-tercihleri",
    title: "2026 ÖZYES tercihleri 24 Eylül saat 15.00'te başlayacak",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-09-22", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-09-24T15:00:00+03:00", deadlineAt: "2026-09-30T23:59:00+03:00",
    deadlineLabel: "24 Eylül 2026 15.00 - 30 Eylül 2026 23.59",
    summary: "Spor bilimleri programları için 2026 ÖZYES sonuçlarına dayalı tercihler AİS'te 24 Eylül saat 15.00-30 Eylül saat 23.59 arasında alınacak. 22 Eylül'deki duyuru ve ön bilgi kılavuzu yayını tercih penceresini açmıyor.",
    details: ["Aday tercihini T.C. kimlik numarası ve aday şifresiyle AİS'ten bireysel olarak bildirir. Bu işlem, genel YKS ek yerleştirme tercihinden ayrı bir ÖZYES aşamasıdır.", "Yayımlanan tercih kılavuzu ön bilgi niteliğindedir. Tercih süresi içinde ÖSYM'nin yayımladığı güncel sürümü ve program koşullarını yeniden kontrol edin; önceki yılın taban puanını bu yıl için hak kazanma garantisi saymayın."],
    actions: ["Başlangıçtan önce resmî ön bilgi kılavuzunu inceleyin; tarih gelmeden tercih kaydı yapılabileceğini varsaymayın.", "24 Eylül 15.00'ten sonra güncel kılavuzla AİS'teki listenizi oluşturun; 30 Eylül 23.59'dan önce kaydedilmiş tercihlerinizi tekrar kontrol edin."],
    actionUrl: ais.url, actionLabel: "ÖSYM AİS tercih ekranını kontrol et",
    // No general-YKS relation: its status card must not call the distinct ÖZYES window a general YKS opening.
    relatedPathKeys: [], relatedSearches: ["ÖZYES tercih", "spor bilimleri özel yetenek"],
    sources: [source("ÖZYES tercih işlemleri duyurusu", "https://www.osym.gov.tr/2026-yks-kapsaminda-spor-bilimleri-icin-ozel-yetenek-sinavi-ozyes-tercih-islemleri"), source("2026 ÖZYES Tercih Kılavuzu (Ön Bilgi)", "https://dokuman.osym.gov.tr/web/2026/9/2026-ozyes-tercih-kilavuzu-on-bilgi-joy4tt-22144107.pdf")]
  },
  {
    slug: "2026-2027-gsb-yurt-ek-kontenjan-basvuru-duyurusu",
    title: "GSB yurt ek kontenjan başvuruları: tarihler henüz açıklanmadı",
    authority: "GSB / Kredi ve Yurtlar Genel Müdürlüğü", kind: "guide", publishedAt: "2026-09-22", verifiedAt: checked, lastModified: checked,
    summary: "KYGM, ek kontenjan ve diğer özel öğrenci gruplarının yurt başvurularını üniversite kayıtları tamamlandıktan sonra e-Devlet'ten alacağını bildirdi. 22 Eylül duyurusunda başlama veya bitiş tarihi yok; başvuru açık olarak gösterilmiyor.",
    details: ["Duyuru; ek kontenjan, yatay/dikey geçiş, özel yetenek, lisansüstü, artık yıl, ikinci üniversite, af ve Senato kararıyla YÖKSİS'te aktif öğrenci gruplarını kapsıyor. Genel gruba dahil olmak tek başına yurt hakkı veya yerleştirme garantisi değildir.", "Bu gelecek başvuru dönemi, ilk yerleştirme sonrası yedek sonuç sorgulamasından ayrıdır. Öğrenim bilgilerinizi kontrol edin; tarihleri KYGM'nin yeni resmî ilanından izleyin. Duyuru günü başvuru başlangıcı sayılmaz."],
    actions: ["e-Devlet'teki öğrenim bilgilerinizin doğruluğunu kontrol edin; hatalıysa üniversitenizin öğrenci işleriyle düzeltin.", "KYGM başvuru tarihini duyurduğunda resmî Yurt Başvurusu hizmetini kullanın; mevcut yedek sonucunuzu yeni başvuruyla karıştırmayın."],
    deadlineLabel: "Başlama ve bitiş tarihi henüz ilan edilmedi; üniversite kayıtlarının tamamlanması sonrasında ayrıca duyurulacak",
    actionUrl: dormitoryNotice, actionLabel: "KYGM ek kontenjan açıklamasını oku",
    relatedPathKeys: [], relatedSearches: ["GSB yurt ek kontenjan", "KYK yatay geçiş yurt başvurusu"],
    sources: [source("22 Eylül 2026 ek kontenjan başvuru duyurusu", dormitoryNotice, "GSB / KYGM"), source("Ek kontenjan başvuruları ilerleyen tarihlerde", "https://kygm.gsb.gov.tr/HaberDetaylari/10008/1/303163/ek-kontenjan-basvurulari-ilerleyen-tarihlerde.aspx", "GSB / KYGM"), source("Yurt Başvurusu hizmeti; hizmetin varlığı dönemin açık olduğunu göstermez", "https://www.turkiye.gov.tr/gsb-yurt-basvurusu", "e-Devlet / GSB")]
  },
  {
    slug: "2026-meb-ogretmen-veli-telefonla-randevu",
    title: "Öğretmen–veli görüşmesi için MEBİM'den telefonla randevu",
    authority: "Millî Eğitim Bakanlığı", kind: "guide", publishedAt: "2026-09-21", verifiedAt: checked, lastModified: checked,
    summary: "MEB, Okul Randevu Sistemine 444 0 632 MEBİM hattını ekledi. Veliler telefonla randevu oluşturma veya iptal işlemi yapabiliyor; talep okulca değerlendiriliyor ve sonuç SMS ya da e-posta ile bildiriliyor.",
    details: ["Telefon hattı 7 gün 24 saat işlem alıyor; bu, öğretmenlerin her saatte görüşme yaptığı anlamına gelmez. Randevu talebiyle okulun değerlendirme sonucunu ayrı takip edin.", "Alternatif kanallar okulrandevu.meb.gov.tr ve e-Okul Veli Bilgilendirme Sistemidir. MEB açıklaması veli/vasilerin görüşmelerinin randevu üzerinden planlandığını belirtiyor; bu işlem okul kaydı veya nakil başvurusu değildir."],
    actions: ["444 0 632'yi arayın veya resmî Okul Randevu Sistemini açarak görüşmek istediğiniz okul görevlisi için talep oluşturun.", "Okulun SMS/e-posta bildirimini ve görüşme saatini kontrol edin; katılamayacaksanız randevuyu iptal edin."],
    actionUrl: "https://okulrandevu.meb.gov.tr/", actionLabel: "MEB Okul Randevu Sistemini aç",
    relatedPathKeys: [], relatedSearches: ["öğretmen veli görüşmesi", "MEBİM okul randevusu"],
    sources: [source("21 Eylül: MEBİM üzerinden öğretmen–veli randevusu", schoolNotice, "Millî Eğitim Bakanlığı"), source("Okul Randevu Sistemi", "https://okulrandevu.meb.gov.tr/", "Millî Eğitim Bakanlığı")]
  },
  {
    slug: "2026-kpss-alan-bilgisi-kitapcik-goruntuleme",
    title: "KPSS Alan Bilgisi: soruların tamamını görüntüleme 23 Eylül'de bitiyor",
    authority: "ÖSYM", kind: "guide", publishedAt: "2026-09-13", verifiedAt: checked, lastModified: checked,
    deadlineAt: "2026-09-23T23:59:00+03:00", deadlineLabel: "AİS'te tam kitapçığı görüntüleme: 23 Eylül 2026 23.59'a kadar",
    summary: "12-13 Eylül KPSS Alan Bilgisi oturumlarına başvuran adaylar, soruların tamamını AİS'te 23 Eylül saat 23.59'a kadar görüntüleyebiliyor. Bu süre yeni sınav başvurusu ya da itiraz süresi değildir.",
    details: ["ÖSYM'nin 13 Eylül duyurusu, adaylara 14.40'tan itibaren 10 günlük erişim tanıyor ve son saati açıkça 23 Eylül 23.59 olarak belirtiyor. 23 Eylül AİS takvimi de aynı kapanışı gösteriyor.", "Kamuya açılan yüzde 10'luk soru kitapçığı ile adayın AİS'teki tam kitapçığı farklıdır. Sorular burada yeniden yayımlanmıyor; inceleme için resmî ekrana gidin. Sonuca veya soruya ilişkin başka işlemde ilgili kılavuzdaki ayrı usulü kontrol edin."],
    actions: ["AİS'te 2026 KPSS Alan Bilgisi için Temel Soru Kitapçığı Görüntüleme işlemini son saatten önce açın."],
    actionUrl: ais.url, actionLabel: "AİS soru kitapçığını görüntüle",
    relatedPathKeys: [], relatedSearches: ["KPSS Alan Bilgisi soru kitapçığı"],
    sources: [source("Alan Bilgisi kitapçıkları ve cevap anahtarları duyurusu", "https://www.osym.gov.tr/2026-kpss-alan-bilgisi-oturumlarinin-temel-soru-kitapciklari-ve-cevap-anahtarlari-yayimlandi"), ais]
  }
];
