import type { Announcement } from "./announcements";
import { announcementState } from "./announcements";
import { officialAnnouncementsSeptember19, refreshSeptember19 } from "./official-updates-20260919";
import { refreshSeptember20 } from "./official-updates-20260920";
import { refreshSeptember22 } from "./official-updates-20260922";
import { officialAnnouncementsSeptember23 } from "./official-updates-20260923";
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
  title: "2026-2027 GSB yurt sonuçları: ilk kayıt süresi sona erdi, yedek yerleştirmeler sürüyor",
  authority: "Gençlik ve Spor Bakanlığı / Kredi ve Yurtlar Genel Müdürlüğü",
  kind: "result",
  publishedAt: "2026-09-08",
  verifiedAt: "2026-09-11",
  lastModified: "2026-09-11",
  summary: "2026-2027 GSB yurtlarında ilk yerleştirmeye hak kazanan öğrenciler için genel kayıt süresi 10 Eylül 2026 saat 23.00'te sona erdi. KYGM, yedek sıradaki öğrencilerin belirli aralıklarla yerleştirilmeye devam edeceğini ve kişisel yedek yerleştirme tarihlerinin e-Devlet sonuç ekranından takip edilmesi gerektiğini duyurdu.",
  details: [
    "Kredi ve Yurtlar Genel Müdürlüğünün 8 Eylül 2026 tarihli resmî duyurusuna göre 2026-2027 eğitim öğretim yılı yurt başvuru sonuçları açıklandı. Kişisel sonuç e-Devlet'teki Gençlik ve Spor Bakanlığı Yurt Başvuru Sonucu Sorgulama hizmetinden öğreniliyor.",
    "İlk yerleştirmede yurt hakkı kazanan öğrenciler için genel kayıt süresi 10 Eylül 2026 Perşembe günü saat 23.00'te sona erdi. Kayıt işlemi ilk kayıt ücretinin ödenmesi ve e-Devlet'te yer alan taahhütnamenin onaylanmasıyla tamamlanıyordu.",
    "KYGM'nin 9 Eylül 2026 tarihli Yurt Yerleştirmelerine İlişkin Duyurusuna göre ilk yerleştirme sonrasında yedek sırada bulunan öğrenciler belirli aralıklarla yerleştirilmeye devam ediliyor. Bakanlık, yedek yerleştirme tarihlerini genel bir takvimden değil e-Devlet Yurt Başvuru Sonucu Sorgulama ekranından düzenli takip etmelerini istiyor.",
    "Yedekten yerleşen öğrenci için bağlayıcı kayıt süresi ve yapılacak işlemler kişisel e-Devlet ekranında gösterilen bilgiye göre takip edilmeli. Kayıt sürecinde sorun yaşayan öğrenciler GSB'nin 444 0 472 numaralı çağrı merkezi veya KYK_Destek kanalı üzerinden destek isteyebilir."
  ],
  actions: [
    "Yedek sıradaysanız e-Devlet'teki GSB Yurt Başvuru Sonucu Sorgulama hizmetini düzenli kontrol edin; kişisel yedek yerleştirme tarihlerini bu ekrandan takip edin.",
    "Yedekten yerleştirildiğinizde kişisel ekranda gösterilen kayıt süresi içinde ilk kayıt ücretini ödeyin ve taahhütname onayını tamamlayın.",
    "Kayıt veya sonuç ekranında sorun yaşarsanız GSB'nin 444 0 472 çağrı merkezini veya KYK_Destek kanalını kullanın; genel internet paylaşımları yerine kişisel e-Devlet ekranını esas alın."
  ],
  deadlineLabel: "İlk yerleştirme kayıt süresi 10 Eylül 2026 saat 23.00'te sona erdi; yedek yerleştirmelerde e-Devlet ekranındaki kişisel tarih ve işlem adımları esas alınır",
  actionUrl: "https://www.turkiye.gov.tr/gsb-yurt-basvuru-sonucu-sorgulama",
  actionLabel: "e-Devlet GSB yurt başvuru sonucunu sorgula",
  relatedPathKeys: [
    "Eğitim ve Öğrenci İşlemleri > Üniversite > Kayıt",
    "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > Yerleştirme işlemleri"
  ],
  relatedSearches: ["GSB yurt sonucu", "KYK yurt sonucu", "yurt başvuru sonucu", "2026 yurt sonucu", "GSB yurt yedek", "KYK yurt yedek yerleştirme", "yurt yedek yerleştirme tarihi"],
  sources: [
    { title: "Yurt Başvuru Sonuçları Açıklandı", authority: "Gençlik ve Spor Bakanlığı Kredi ve Yurtlar Genel Müdürlüğü", url: "https://kygm.gsb.gov.tr/HaberDetaylari/1/10008/302886/yurt-basvuru-sonuclari-aciklandi.aspx" },
    { title: "Yurt Yerleştirmelerine İlişkin Duyuru", authority: "Gençlik ve Spor Bakanlığı Kredi ve Yurtlar Genel Müdürlüğü", url: "https://kygm.gsb.gov.tr/Duyuru/302909/yurt-yerlestirmelerine-iliskin-duyuru.aspx" },
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

const kpssSecondaryLateApplication: Announcement = {
  slug: "2026-kpss-ortaogretim-gec-basvuru",
  title: "2026-KPSS Ortaöğretim geç başvurusu 15-16 Eylül'de",
  authority: "ÖSYM",
  kind: "application",
  publishedAt: "2026-08-27",
  verifiedAt: "2026-09-14",
  lastModified: "2026-09-14",
  summary: "2026-KPSS Ortaöğretim normal başvuru dönemi sona erdi; ÖSYM kılavuzu ve güncel AİS işlem ekranına göre geç başvuru 15 Eylül saat 10.00'da başlayacak ve 16 Eylül 2026 saat 23.59'da sona erecek.",
  details: [
    "ÖSYM'nin 2026-KPSS Ortaöğretim kılavuzunda normal başvuru dönemi 27 Ağustos-8 Eylül 2026, geç başvuru günleri ise 15-16 Eylül 2026 olarak ilan edildi. Sınav 25 Ekim 2026 tarihinde yapılacak.",
    "Kılavuza göre normal sınav ücreti 800 TL; geç başvuru günlerinde ücret yüzde 50 artırımlı ödeniyor. ÖSYM AİS güncel işlem ekranı geç başvuru için 1.200 TL ücret ve 15 Eylül 10.00-16 Eylül 23.59 işlem aralığını gösteriyor.",
    "Geç başvuru, normal başvuru dönemini kaçıran adaylar için ayrı ve kısa bir işlem penceresidir. Başvuru şartları ve eğitim düzeyi koşulları için ÖSYM kılavuzu esas alınmalıdır."
  ],
  actions: [
    "15 Eylül 2026 saat 10.00'dan itibaren ÖSYM AİS'e girerek 2026-KPSS Ortaöğretim geç başvuru işlemini kontrol edin.",
    "Başvuru ve yüzde 50 artırımlı 1.200 TL sınav ücreti işlemini 16 Eylül 2026 saat 23.59'dan önce tamamlayın.",
    "Başvuru öncesinde ÖSYM kılavuzundaki mezuniyet/eğitim durumu ve adaylık koşullarını yeniden kontrol edin."
  ],
  deadlineAt: "2026-09-16T23:59:00+03:00",
  deadlineLabel: "Geç başvuru 15 Eylül saat 10.00'da başlıyor ve 16 Eylül 2026 saat 23.59'da sona eriyor",
  actionUrl: "https://ais.osym.gov.tr/",
  actionLabel: "ÖSYM AİS geç başvuru ekranını aç",
  relatedPathKeys: [],
  relatedSearches: ["KPSS Ortaöğretim geç başvuru", "KPSS lise geç başvuru", "2026 KPSS ortaöğretim", "KPSS geç başvuru ücreti"],
  sources: [
    { title: "2026-KPSS Ortaöğretim: Başvuruların Alınması", authority: "ÖSYM", url: "https://www.osym.gov.tr/2026-kpss-ortaogretim-basvurularin-alinmasi" },
    { title: "ÖSYM Aday İşlemleri Sistemi", authority: "ÖSYM", url: "https://ais.osym.gov.tr/" }
  ]
};

const sayistayApplication: Announcement = {
  slug: "2026-sayistay-denetci-yardimcisi-eleme-basvurulari",
  title: "2026 Sayıştay Denetçi Yardımcısı Eleme Sınavı başvuruları 17 Eylül'de sona eriyor",
  authority: "ÖSYM / Sayıştay Başkanlığı",
  kind: "application",
  publishedAt: "2026-09-09",
  verifiedAt: "2026-09-14",
  lastModified: "2026-09-14",
  summary: "2026 Sayıştay Denetçi Yardımcısı Adaylığı Eleme Sınavı başvuruları ÖSYM AİS üzerinden devam ediyor; güncel işlem ekranına göre normal başvuru 17 Eylül 2026 saat 23.59'da sona erecek ve sınav 31 Ekim'de yapılacak.",
  details: [
    "ÖSYM'nin güncel sınav takvimi ve Aday İşlemleri Sistemi, 2026 Sayıştay Denetçi Yardımcısı Adaylığı Eleme Sınavı normal başvurularını 9-17 Eylül 2026 arasında gösteriyor. AİS'teki işlem başlangıcı 9 Eylül saat 10.30, son saat 17 Eylül 23.59.",
    "ÖSYM AİS işlem ekranında sınav ücreti 1.900 TL olarak gösteriliyor. Eleme sınavı 31 Ekim 2026 tarihinde yapılacak; normal dönemi kaçıranlar için ÖSYM takviminde 24 Eylül 2026 saat 23.59'a kadar tek günlük geç başvuru penceresi de yer alıyor.",
    "Adaylık şartları, mezuniyet ve diğer özel koşullar için sınavın güncel kılavuzu esas alınmalı; yalnız takvim bilgisinden başvuru hakkı bulunduğu sonucu çıkarılmamalıdır."
  ],
  actions: [
    "ÖSYM AİS'te 2026-Sayıştay Eleme başvuru ekranını açın ve kılavuzdaki adaylık şartlarını kontrol edin.",
    "Normal başvuruyu ve 1.900 TL sınav ücreti işlemini 17 Eylül 2026 saat 23.59'dan önce tamamlayın.",
    "Normal dönemi kaçırırsanız 24 Eylül'deki geç başvuru penceresinin koşul ve ücretini ÖSYM'nin güncel ekranından ayrıca doğrulayın."
  ],
  deadlineAt: "2026-09-17T23:59:00+03:00",
  deadlineLabel: "Normal başvuru 17 Eylül 2026 saat 23.59'da sona eriyor; ÖSYM takviminde 24 Eylül için ayrıca geç başvuru günü bulunuyor",
  actionUrl: "https://ais.osym.gov.tr/",
  actionLabel: "ÖSYM AİS başvuru ekranını aç",
  relatedPathKeys: [],
  relatedSearches: ["Sayıştay denetçi yardımcısı", "Sayıştay Eleme", "2026 Sayıştay başvuru", "Sayıştay denetçi yardımcılığı sınavı"],
  sources: [
    { title: "ÖSYM Sınav Takvimi - 2026 Sayıştay Eleme", authority: "ÖSYM", url: "https://www.osym.gov.tr/Sayfa/SinavTakvimi/tr-TR" },
    { title: "ÖSYM Aday İşlemleri Sistemi", authority: "ÖSYM", url: "https://ais.osym.gov.tr/" }
  ]
};

const refreshedPreviousAnnouncements: Announcement[] = previousAnnouncements.map(item => {
  if (item.slug !== "2026-e-ydts-2-turkce-basvurulari") return item;
  return {
    ...item,
    title: "2026 e-YDTS/2 Türkçe başvurularında son gün 14 Eylül",
    verifiedAt: "2026-09-14",
    lastModified: "2026-09-14",
    summary: "ÖSYM Aday İşlemleri Sisteminin güncel işlem ekranında 2026 e-YDTS/2 Türkçe başvurusu 14 Eylül 2026 saat 23.59'a kadar devam ediyor; sınav 19 Eylül'de yapılacak ve sınav ücreti 1.000 TL olarak gösteriliyor.",
    details: [
      "ÖSYM'nin Aday İşlemleri Sisteminde 2026 e-YDTS/2 Türkçe için güncel başvuru aralığı 1 Eylül 2026 saat 14.00-14 Eylül 2026 saat 23.59 olarak gösteriliyor.",
      "AİS ekranında sınav tarihi 19 Eylül 2026 ve sınav ücreti 1.000 TL olarak yer alıyor. Mevcut site kaydındaki 10 Eylül son tarihi bu güncel operasyonel ekranla uyumlu olacak şekilde düzeltildi.",
      "Bu denetimde son tarihin neden değiştiğini açıklayan ayrı bir ÖSYM duyurusu doğrulanamadığı için değişiklik 'süre uzatımı' olarak etiketlenmedi; güncel AİS işlem aralığı esas alındı."
    ],
    actions: [
      "ÖSYM AİS'te e-YDTS 2026/2 Türkçe başvuru kaydını açın.",
      "Başvuru ve 1.000 TL sınav ücreti işlemini 14 Eylül 2026 saat 23.59'dan önce tamamlayın.",
      "İşlemden önce AİS ekranındaki güncel durum ve ilgili dosyaları yeniden kontrol edin."
    ],
    deadlineAt: "2026-09-14T23:59:00+03:00",
    deadlineLabel: "ÖSYM AİS güncel işlem ekranına göre başvuru 14 Eylül 2026 saat 23.59'da sona eriyor",
    actionUrl: "https://ais.osym.gov.tr/",
    actionLabel: "ÖSYM AİS e-YDTS başvuru ekranını aç",
    sources: [
      { title: "ÖSYM Aday İşlemleri Sistemi - e-YDTS 2026/2 Türkçe", authority: "ÖSYM", url: "https://ais.osym.gov.tr/" },
      ...item.sources
    ]
  };
});

export const supplementalAnnouncements: Announcement[] = [
  kpssSecondaryLateApplication,
  sayistayApplication,
  gsbCoachExamAnnouncement,
  gsbYurtResultAnnouncement,
  newAnnouncement,
  ...refreshedPreviousAnnouncements,
  ...officialAnnouncementsSeptember19,
  ...officialAnnouncementsSeptember23
].map(refreshSeptember19).map(refreshSeptember20).map(refreshSeptember22).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.slug.localeCompare(a.slug));

export const supplementalAnnouncementBySlug = new Map(supplementalAnnouncements.map(item => [item.slug, item]));

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#039;" }[char] || char));
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function badge(item: Announcement): { label: string; className: string } {
  return announcementState(item);
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
