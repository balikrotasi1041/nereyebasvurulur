import type { Announcement, AnnouncementSource } from "./announcements";

const checked = "2026-09-19";
const source = (title: string, url: string, authority: string): AnnouncementSource => ({ title, url, authority });
export const yksExtraSource = source("2026-YKS Ek Yerleştirme: Tercihlerin Alınması", "https://www.osym.gov.tr/2026-yks-ek-yerlestirme-tercihlerin-alinmasi", "ÖSYM");
export const yksExtraGuide = source("2026 YKS Ek Yerleştirme Kılavuzu, genel bilgiler ve tercih kuralları", "https://dokuman.osym.gov.tr/web//2026/9/2026-yuksekogretim-programlarina-ek-yerlestirme-kilavuzu-f2ttjv-17130413.pdf", "ÖSYM");
const ais = source("ÖSYM Aday İşlemleri Sistemi", "https://ais.osym.gov.tr/", "ÖSYM");
const yksPath = "Eğitim ve Öğrenci İşlemleri > Sınav ve Yerleştirme > YKS";
const yurtSource = source("18.09.2026 tarihli yurt yedek yerleştirme sonuçları", "https://kygm.gsb.gov.tr/Duyuru/302961/18092026-tarihli-yurt-yedek-yerlestirme-sonuclari.aspx", "GSB Kredi ve Yurtlar Genel Müdürlüğü");
const eydtsSource = source("e-YDTS/2 Türkçe: Sınava Giriş Belgeleri Erişime Açıldı", "https://www.osym.gov.tr/2026-elektronik-yabanci-dil-olarak-turkce-sinavi-e-ydts2-turkce-sinava-giris-belgeleri-erisime-acildi", "ÖSYM");

export const officialAnnouncementsSeptember19: Announcement[] = [
  {
    slug: "2026-2027-acik-ogretim-ilk-donem-kayitlari",
    title: "Açık öğretim okulları: yeni kayıt ve yenileme 12 Ekim'e kadar",
    authority: "Millî Eğitim Bakanlığı", kind: "application", publishedAt: "2026-09-11", verifiedAt: checked, lastModified: checked,
    deadlineDate: "2026-10-12", deadlineLabel: "11 Eylül-12 Ekim 2026; ortak kapanış saati duyuruda belirtilmiyor",
    summary: "MEB açık öğretim okullarının 2026-2027 ilk dönem yeni kayıt ve kayıt yenileme işlemleri 11 Eylül-12 Ekim arasında yürütülüyor. Başvuru yeri okul türüne ve yeni kayıt/yenileme aşamasına göre değişiyor.",
    details: ["Açık Öğretim Ortaokulu ve Açık Öğretim Lisesi için halk eğitimi merkezi müdürlüklerine; Açık Öğretim İmam Hatip Lisesi ve Mesleki Açık Öğretim Lisesi için yüz yüze eğitim verilen okul/kuruma başvurulur.", "MEB duyurusu, hâlen kayıtlı öğrenciler için MEBİM veya ilgili bilgi yönetim sistemi üzerinden kayıt yenileme kanalı da gösteriyor. Bu olanak yeni kayıtla aynı işlem değildir. Belge, uygunluk ve varsa ödeme koşullarını okul türünüzün resmî kılavuzundan kontrol edin."],
    actions: ["Yeni kayıt mı, kayıt yenileme mi yapacağınızı ve okul türünüzü belirleyin.", "Resmî duyurudaki ilgili okul bağlantısını kullanın; yerel çalışma saati veya elektronik kapanış saati varsaymadan 12 Ekim'i beklemeyin."],
    actionUrl: "https://www.meb.gov.tr/acik-ogretim-okullari-2026-2027-egitim-ogretim-yili-1donem-yeni-kayit-ve-kayit-yenileme-islemleri-duyurusu/duyuru/41885/tr",
    actionLabel: "MEB kayıt kanallarını ve okul bağlantılarını aç", relatedPathKeys: [], relatedSearches: ["açık öğretim kayıt", "açık lise kayıt yenileme"],
    sources: [source("2026-2027 Açık Öğretim Okulları 1. dönem kayıt duyurusu", "https://www.meb.gov.tr/acik-ogretim-okullari-2026-2027-egitim-ogretim-yili-1donem-yeni-kayit-ve-kayit-yenileme-islemleri-duyurusu/duyuru/41885/tr", "Millî Eğitim Bakanlığı")]
  },
  {
    slug: "2026-yks-ek-yerlestirme-tercihleri",
    title: "2026 YKS ek tercihleri: tercih 21 Eylül, ücret 22 Eylül'de bitiyor",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-09-17", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-09-17T16:00:00+03:00", deadlineAt: "2026-09-21T23:59:00+03:00",
    deadlineLabel: "Tercih: 21 Eylül 2026 23.59; ek yerleştirme ücreti: 22 Eylül 2026 23.59",
    summary: "2026 YKS ek yerleştirme tercihleri ÖSYM AİS'te 17 Eylül saat 16.00-21 Eylül saat 23.59 arasında alınıyor. Tercih bildirme süresiyle 170 TL ek yerleştirme ücretinin 22 Eylül saat 23.59 ödeme son tarihi farklıdır.",
    details: [
      "ÖSYM duyurusu tercih kanalını AİS ve Aday İşlemleri Mobil Uygulaması olarak gösteriyor. Kılavuz, tercihlerin ve ödemenin ayrı ayrı tamamlanmasını istiyor; ödeme için tanınan ek gün yeni tercih yapma süresini uzatmıyor.",
      "Ek tercihte adayın 2026 YKS yerleştirme puanı, merkezî yerleştirme durumu ve programın özel koşulları birlikte değerlendirilir. Merkezî yerleştirmede bir programa yerleşmiş olmak ile kayıt yaptırmamış olmak aynı şey değildir; kayıt yaptırmamak tek başına ek tercih hakkı sağlamaz.",
      "Programın puan ve kontenjan şartlarını kılavuzdan kontrol edin. Ücret muafiyetine ilişkin özel durumlar da kılavuzdaki koşullara ve aday kaydına bağlıdır; herkes için otomatik muafiyet varsayılmamalıdır."
    ],
    actions: ["AİS'te ek tercih hakkınızı ve kılavuzdaki program koşullarını kontrol edin.", "Tercih listenizi 21 Eylül 23.59'dan önce kaydedip tekrar açarak kontrol edin.", "Ücret yükümlülüğünüz varsa 22 Eylül 23.59'a kadar ödeyin; tercih ve ödeme kaydınızı saklayın."],
    actionUrl: ais.url, actionLabel: "ÖSYM AİS ek tercih işlemlerini aç", relatedPathKeys: [yksPath], relatedSearches: ["YKS ek tercih", "ek yerleştirme ücreti"], sources: [yksExtraSource, yksExtraGuide, ais]
  },
  {
    slug: "2026-dus-sts-dis-2-donem-basvurulari",
    title: "2026 DUS ve STS Diş 2. dönem başvuruları 24 Eylül'de bitiyor",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-09-16", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-09-16T16:45:00+03:00", deadlineAt: "2026-09-24T23:59:00+03:00", deadlineLabel: "Normal başvuru: 24 Eylül 2026 saat 23.59",
    summary: "DUS 2. dönem ile STS Diş Hekimliği 2. dönem başvuruları 16-24 Eylül 2026 arasında alınıyor. Her iki sınav 1 Kasım'da yapılacak; adaylar kendi sınavlarının ayrı kılavuzunu ve başvuru koşullarını kullanmalıdır.",
    details: ["Başvuru 16 Eylül saat 16.45'te açıldı. ÖSYM AİS, Aday İşlemleri Mobil Uygulaması ve kılavuzda gösterilen başvuru merkezleri kullanılabilir.", "ÖSYM takviminde geç başvuru günü 1 Ekim olarak yer alıyor. Normal başvuru, ücret ödeme ve geç başvuru koşulları aynı işlem değildir; ödeme tutarı ve son saat ilgili sınavın kılavuzundan/AİS kaydından kontrol edilmelidir."],
    actions: ["DUS veya STS Diş Hekimliği için doğru başvuru kaydını seçin.", "24 Eylül 23.59'dan önce başvuruyu tamamlayın; kılavuzdaki ödeme adımını ve aday kayıt bilgilerinizi ayrıca kontrol edin."],
    actionUrl: ais.url, actionLabel: "ÖSYM AİS başvurularını aç", relatedPathKeys: [], relatedSearches: ["DUS 2 dönem", "STS Diş Hekimliği"],
    sources: [source("DUS ve STS Diş 2. dönem: Başvuruların Alınması", "https://www.osym.gov.tr/2026-dus-2-donem-sinavi-ile-2026-sts-dis-hekimligi-2-donem-sinavi-basvurularin-alinmasi", "ÖSYM"), ais]
  },
  {
    slug: "2026-tus-sts-tip-2-donem-sonuclari",
    title: "2026 TUS ve STS Tıp 2. dönem sonuçları açıklandı",
    authority: "ÖSYM", kind: "result", publishedAt: "2026-09-17", verifiedAt: checked, lastModified: checked,
    summary: "23 Ağustos'ta uygulanan TUS 2. dönem ve STS Tıp Doktorluğu 2. dönem sınavlarının sonuçları 17 Eylül 2026 saat 11.30'da ÖSYM sonuç sisteminde açıldı. Sonuç açıklanması, yeni tercih döneminin başladığı anlamına gelmiyor.",
    details: ["Adaylar T.C. kimlik numarası ve aday şifresiyle kendi sınav sonucunu sorgulayabilir. Sonuç, kişinin aday kaydından öğrenilir; genel duyuru kişisel başarı veya yerleştirme bilgisi vermez.", "Tercih, yerleştirme ve sonuç inceleme işlemlerinin koşulları ayrı duyuru ve ilgili sınav kılavuzundan takip edilmelidir. Başka bir sınavın itiraz süresi örnek alınmamalıdır."],
    actions: ["ÖSYM sonuç sisteminde doğru sınav ve dönemi seçip sonucunuzu inceleyin.", "Sonuca ilişkin işlem yapmak istiyorsanız kendi kılavuzunuzdaki inceleme yolunu gecikmeden kontrol edin."],
    actionUrl: "https://sonuc.osym.gov.tr/", actionLabel: "ÖSYM sınav sonucunu sorgula", relatedPathKeys: [], relatedSearches: ["TUS sonuç", "STS Tıp sonuç"],
    sources: [source("TUS ve STS Tıp 2. dönem: Sınav Sonuçları Açıklandı", "https://www.osym.gov.tr/2026-tus-2-donem-ve-2026-sts-tip-doktorlugu-2-donem-sinav-sonuclari-aciklandi", "ÖSYM")]
  },
  {
    slug: "2026-hmgs-iyos-sinava-giris-belgeleri",
    title: "27 Eylül HMGS/2 ve İYÖS sınava giriş belgeleri açıldı",
    authority: "ÖSYM", kind: "exam-call", publishedAt: "2026-09-17", verifiedAt: checked, lastModified: checked,
    deadlineAt: "2026-09-27T10:00:00+03:00", deadlineLabel: "27 Eylül 2026: saat 10.00'dan sonra sınav binasına alınmayacak",
    summary: "27 Eylül 2026 HMGS/2 ve İYÖS adaylarının sınava giriş belgeleri 17 Eylül saat 10.30'da AİS'te açıldı. ÖSYM, sınav günü saat 10.00'dan sonra adayların binaya alınmayacağını duyurdu; bu saat sınavın başlama saati değildir.",
    details: ["Bina ve salon bilgisi adayın kendi Sınava Giriş Belgesinde bulunur. Belgeye T.C. kimlik numarası ve aday şifresiyle AİS üzerinden erişilir.", "Bu duyuru yalnız kayıtlı adayların sınava giriş belgesine ilişkindir; yeni sınav başvurusu açmaz. Kabul edilen kimlik ve sınav kuralları için ÖSYM'nin belgeye bağlı temel kurallarını kontrol edin."],
    actions: ["AİS'ten Sınava Giriş Belgenizi edinip bina, salon ve kimlik koşullarını kontrol edin.", "27 Eylül'de belge üzerindeki yerde, binaya alınma sınırından önce hazır bulunun."],
    actionUrl: ais.url, actionLabel: "AİS sınava giriş belgesini aç", relatedPathKeys: [], relatedSearches: ["HMGS giriş belgesi", "İYÖS sınav yeri"],
    sources: [source("HMGS/2 ve İYÖS: Sınava Giriş Belgeleri", "https://www.osym.gov.tr/2026-hmgs2-ile-2026-iyos-sinava-giris-belgeleri-erisime-acildi", "ÖSYM"), ais]
  },
  {
    slug: "2026-gsb-sozlesmeli-bilisim-personeli-basvurulari",
    title: "GSB bilişim personeli başvuruları 21-25 Eylül'de alınacak",
    authority: "Gençlik ve Spor Bakanlığı", kind: "application", publishedAt: "2026-09-18", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-09-21T00:00:00+03:00", deadlineAt: "2026-09-25T17:00:00+03:00", deadlineLabel: "21 Eylül 2026 00.00 - 25 Eylül 2026 17.00",
    summary: "GSB'nin 18 Eylül tarihli ilanına göre sözleşmeli bilişim personeli başvuruları 21 Eylül saat 00.00'da başlayıp 25 Eylül saat 17.00'de kapanacak. Başvuru yalnız e-Devlet aracılığıyla Kariyer Kapısı üzerinden yapılacak.",
    details: ["İlan tarihi başvuru başlangıcı değildir. Aday, koşullarını taşıdığı pozisyonlardan yalnız biri için başvurabilir; şahsen veya posta yoluyla başvuru kabul edilmiyor.", "Özgeçmiş, gereken denklik/dil belgeleri, programlama dili ve mesleki deneyim belgeleri ilandaki pozisyona göre hazırlanmalıdır. Önlü arkalı belgelerin iki yüzü de istenen alana yüklenmelidir; başvuru sonrasında bilgi değişikliğine izin verilmiyor."],
    actions: ["İlandaki genel ve pozisyona özgü koşulları okuyup deneyim belgelerinizi hazırlayın.", "21-25 Eylül aralığında Kariyer Kapısı'nda tek pozisyon için başvurun; kayıt ve eklerinizi 25 Eylül saat 17.00'den önce kontrol edin."],
    actionUrl: "https://kariyerkapisi.gov.tr/isealim", actionLabel: "Kariyer Kapısı işe alım ekranını aç", relatedPathKeys: [], relatedSearches: ["GSB bilişim personeli", "Kariyer Kapısı"],
    sources: [source("GSB sözleşmeli bilişim personeli alımı", "https://pgm.gsb.gov.tr/Duyuru/302962/2026-yili-sozlesmeli-bilisim-personeli-alimi-duyurusu.aspx", "GSB Personel Genel Müdürlüğü"), source("GSB 2026 bilişim personeli ilanı: başvuru tarihleri ve belgeler", "https://pgm.gsb.gov.tr/Public/Edit/images/PGM/012014/2026%20bili%C5%9Fim/GSB%20-%202026%20S%C3%96ZLE%C5%9EMEL%C4%B0%20B%C4%B0L%C4%B0%C5%9E%C4%B0M%20PERSONEL%C4%B0%20ALIMI%20DUYURUSU%20-%202.pdf", "GSB")]
  },
  {
    slug: "2828-2026-eylul-istihdam-tercihleri",
    title: "2828 kapsamındaki Eylül tercihleri 24 Eylül 23.59'da bitiyor",
    authority: "Aile ve Sosyal Hizmetler Bakanlığı", kind: "application", publishedAt: "2026-09-14", verifiedAt: checked, lastModified: checked,
    deadlineAt: "2026-09-24T23:59:00+03:00", deadlineLabel: "14-24 Eylül 2026; son saat 24 Eylül 23.59",
    summary: "2828 sayılı Kanunun Ek 1. maddesi kapsamında istihdam hakkı bulunanlar için Eylül dönemi tercihleri 14-24 Eylül 2026 arasında e-Devlet'ten alınıyor. Bu işlem genel bir kamu personeli alımı değil, ilgili hak sahiplerinin tercih aşamasıdır.",
    details: ["Bakanlık duyurusu, e-Devlet'teki '2828 Sayılı Sosyal Hizmetler Kanunu Kapsamında İşe Yerleştirme İşlemleri' hizmetini gösteriyor. Son saat 24 Eylül 23.59.", "Hak sahipliği, öğrenim düzeyi ve tercih edilebilecek kadrolar Bakanlığın Eylül 2026 kılavuzuna göre kontrol edilmelidir. Başvuru ekranına girebilmek veya listeden kadro seçmek tek başına atanma garantisi değildir."],
    actions: ["Bakanlık duyurusundaki güncel tercih kılavuzunu inceleyin.", "e-Devlet'te duyuruda adı verilen hizmeti bulun; tercih kaydınızı son saatten önce tamamlayıp kontrol edin."],
    actionUrl: "https://www.aile.gov.tr/duyurular/sosyal-hizmetler-kanunu-kapsaminda-istihdam-edilecekler-icin-2026-yili-eylul-donemi-tercih-islemleri-basliyor/", actionLabel: "Resmî tercih duyurusu ve e-Devlet yönlendirmesini aç", relatedPathKeys: [], relatedSearches: ["2828 istihdam tercih", "sosyal hizmetler işe yerleştirme"],
    sources: [source("2026 Eylül dönemi 2828 istihdam tercih duyurusu", "https://www.aile.gov.tr/duyurular/sosyal-hizmetler-kanunu-kapsaminda-istihdam-edilecekler-icin-2026-yili-eylul-donemi-tercih-islemleri-basliyor/", "Aile ve Sosyal Hizmetler Bakanlığı"), source("2828 Eylül 2026 tercih kılavuzu", "https://www.aile.gov.tr/media/366372/2828-atamasi-eylul-2026-tercih-kilavuzu.pdf", "Aile ve Sosyal Hizmetler Bakanlığı")]
  },
  {
    slug: "jandarma-emekli-personel-2026-2027-kis-kamp-basvurulari",
    title: "Emekli Jandarma personeli kış kampı başvurusu: son gün 16 Ekim",
    authority: "Jandarma Genel Komutanlığı", kind: "application", publishedAt: "2026-09-17", verifiedAt: checked, lastModified: checked,
    deadlineDate: "2026-10-16", deadlineLabel: "Son başvuru günü 16 Ekim 2026; duyuruda kapanış saati belirtilmiyor, son günü beklemeyin",
    summary: "Emekli Jandarma personelinin 2026-2027 kış eğitim merkezleri başvurularının 16 Ekim 2026'ya kadar sürdüğü duyuruldu. Başvuru e-Devlet'teki emekli personel kamp hizmetinden yapılabiliyor; duyuruda son saat belirtilmiyor.",
    details: ["Duyuru emekli Jandarma personeline yöneliktir; tüm vatandaşlar için açık bir konaklama başvurusu değildir. e-Devlet'te kimlik doğrulama gerekir.", "669 sayılı KHK'nin 107. maddesi gereği Sağlık Bakanlığına naklen geçen personel için duyuruda ayrı müracaat formu bulunuyor. Kendi statünüze uygun form ve kanalı kurumdan kontrol edin."],
    actions: ["Emekli personel iseniz resmî e-Devlet kamp başvuru hizmetini kontrol edin.", "16 Ekim gününü beklemeden başvurun; son saat ve statünüze özgü kabul koşullarını kurumdan teyit edin."],
    actionUrl: "https://www.turkiye.gov.tr/jandarma-emekli-personel-kamp-basvuru", actionLabel: "e-Devlet emekli Jandarma kamp başvurusunu aç", relatedPathKeys: [], relatedSearches: ["Jandarma emekli kamp", "kış eğitim merkezi"],
    sources: [source("2026-2027 Kış Eğitim Merkezleri Başvuruları", "https://www.jandarma.gov.tr/emekli-jandarma-personelinin-2026-2027-yili-kis-egitim-merkezleri-basvurulari-16-ekim-2026-tarihine-kadar-devam-etmektedir", "Jandarma Genel Komutanlığı"), source("Emekli Personel Kamp Başvuru İşlemleri", "https://www.turkiye.gov.tr/jandarma-emekli-personel-kamp-basvuru", "e-Devlet / Jandarma Genel Komutanlığı")]
  },
  {
    slug: "sgk-7594-aylik-farki-uygulama-duyurusu",
    title: "SGK 7594 kapsamındaki aylık farkları için uygulama duyurusu yayımladı",
    authority: "Sosyal Güvenlik Kurumu", kind: "guide", publishedAt: "2026-09-10", verifiedAt: checked, lastModified: checked,
    summary: "SGK'nin 10 Eylül açıklaması, 7594 kapsamındaki belirli aylık farklarının ödeme sürecini anlatıyor. Açıklamadaki 4/c-primsiz ödemeler ile çalışması süren 4/a-4/b dosyaları farklı; her gazi için aynı tutar veya aynı ödeme tarihi çıkarılamaz.",
    details: ["SGK, açıklamada saydığı 4/c ve primsiz ödeme gruplarının farklarını 11 Eylül'de mevcut ödeme hesaplarına aktaracağını duyurmuştu. Bu bildirim yeni bir genel başvuru süresi açmıyor; kişisel hesabın ödeme aldığı burada doğrulanmış değildir.", "Açıklamada kapsam içindeki 4/a-4/b dosyaları üzerindeki çalışmaların Ekim başına kadar tamamlanmasının planlandığı, sonrasında ayrıca bilgi verileceği belirtiliyor. Planlanan tarih kesin kişisel ödeme günü değildir.", "Kanunun güncel birleşik metni bu kontrolde erişim nedeniyle birlikte doğrulanamadı. Bu kayıt yalnız SGK'nin ödeme duyurusunu aktarır; hak sahipliği, derece, statü değişimi veya kişisel aylık hesabı hakkında yeni hukuki sonuç üretmez."],
    actions: ["SGK duyurusundaki kapsamı kendi aylık statünüzle karşılaştırın.", "Ödeme veya hak sahipliği uyuşmazlığında aylığı bağlayan SGK birimine dosyanız üzerinden başvurun; sosyal medyadaki toplu tutarları kişisel alacak kabul etmeyin."],
    actionUrl: "https://www.sgk.gov.tr/duyuru/detay/7594-Sayili-Kanun-ile-Yapilan-Degisiklikler-ve-Uygulama-Sureci-Hakkinda-Duyuru-2026-09-10-07-40-36", actionLabel: "SGK açıklamasını ve ekini incele", relatedPathKeys: [], relatedSearches: ["7594 aylık farkı", "vazife malullüğü ödeme"],
    sources: [source("7594 sayılı Kanun: SGK uygulama duyurusu", "https://www.sgk.gov.tr/duyuru/detay/7594-Sayili-Kanun-ile-Yapilan-Degisiklikler-ve-Uygulama-Sureci-Hakkinda-Duyuru-2026-09-10-07-40-36", "SGK Emeklilik Hizmetleri Genel Müdürlüğü"), source("SGK ödeme süreci açıklaması (taranmış PDF)", "https://www.sgk.gov.tr/Download/DownloadFile?f=c3e501ee-be7c-44d0-a1d3-1c33e7f01dd7.pdf&d=be7c5f8b-5982-45e0-8445-ebb4f8a28fa9", "SGK")]
  }
];

export function refreshSeptember19(item: Announcement): Announcement {
  if (item.slug === "2026-gsb-yurt-basvuru-sonuclari-sorgulama") return {
    ...item, verifiedAt: checked, lastModified: checked,
    title: "GSB yurt yedek sonuçları: 18 Eylül yerleştirmesini kontrol edin",
    summary: "KYGM, 18 Eylül 2026 yurt yedek yerleştirme sonuçlarını duyurdu. Sonucunuzu ve size tanınan kayıt süresini e-Devlet'ten kontrol edin; ilk yerleştirmenin sona eren 10 Eylül tarihi yeni yedek yerleştirmeye uygulanmaz.",
    details: ["18 Eylül tarihli yeni sonuç duyurusu doğrudan GSB Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor. Genel duyuruda herkes için ortak yeni kayıt saati verilmediğinden kişisel sonuç ekranı esas alınmalıdır.", ...item.details],
    sources: [yurtSource, ...item.sources]
  };
  if (item.slug === "2026-kpss-ortaogretim-gec-basvuru") return {
    ...item, lastModified: checked,
    title: "2026 KPSS Ortaöğretim geç başvuru dönemi sona erdi",
    summary: "Önceden doğrulanan 15-16 Eylül 2026 KPSS Ortaöğretim geç başvuru süresi sona erdi. Kayıt arşivde korunuyor; bu sayfa yeni başvuru veya ek süre verildiği anlamına gelmiyor. Kayıtlı adaylar ÖSYM'nin sonraki sınav duyurularını izlemelidir.",
    actions: ["Başvuru yaptıysanız AİS'teki kayıt ve ödeme durumunuzu kontrol edin.", "Yeni ek süre varsaymayın; sınav ve giriş belgesi için ÖSYM'nin ayrı duyurularını izleyin."],
    deadlineLabel: "Geç başvuru 16 Eylül 2026 saat 23.59'da sona erdi", actionLabel: "ÖSYM aday kaydını kontrol et"
  };
  if (item.slug === "2026-sayistay-denetci-yardimcisi-eleme-basvurulari") return {
    ...item, verifiedAt: checked, lastModified: checked,
    title: "Sayıştay Eleme: normal dönem bitti, geç başvuru 24 Eylül'de",
    summary: "2026 Sayıştay Denetçi Yardımcısı Eleme Sınavının normal başvurusu 17 Eylül'de sona erdi. ÖSYM takvimindeki geç başvuru penceresi 24 Eylül 2026 saat 10.00-23.59; bu pencere 19 Eylül itibarıyla henüz başlamadı.",
    startsAt: "2026-09-24T10:00:00+03:00", deadlineAt: "2026-09-24T23:59:00+03:00",
    deadlineLabel: "Geç başvuru: 24 Eylül 2026 10.00-23.59",
    details: ["Normal başvuru 9-17 Eylül arasında alındı. ÖSYM'nin güncel takvimi sınavı 31 Ekim, geç başvuruyu 24 Eylül olarak gösteriyor.", "ÖSYM'nin güncel takvim kartında geç başvuru ücreti 2.850 TL görünüyor. Başvuru öncesi ilgili kılavuzdan ve AİS'ten adaylık koşullarını, ödeme tutarını ve kayıt durumunu kontrol edin."],
    actions: ["24 Eylül'deki pencere için adaylık şartlarınızı ve belgelerinizi hazırlayın.", "24 Eylül 10.00-23.59 arasında AİS'te başvuru ve geç başvuru ödemesini kontrol ederek tamamlayın."],
    sources: [source("ÖSYM güncel sınav takvimi: Sayıştay Eleme", "https://www.osym.gov.tr/", "ÖSYM"), ais]
  };
  if (item.slug === "2026-e-ydts-2-turkce-basvurulari") return {
    ...item, kind: "exam-call", verifiedAt: checked, lastModified: checked,
    title: "19 Eylül e-YDTS/2 Türkçe: giriş belgenizi kontrol edin",
    summary: "19 Eylül 2026 e-YDTS/2 Türkçe sınavının giriş belgesi AİS'te açık. ÖSYM duyurusuna göre saat 13.30'dan sonra sınav binasına aday alınmayacak; bu kayıt yeni başvuru değil, kayıtlı adayların sınava giriş aşamasıdır.",
    deadlineAt: "2026-09-19T13:30:00+03:00", deadlineLabel: "19 Eylül 2026 saat 13.30'dan sonra sınav binasına alınmayacak",
    details: ["Başvuru dönemi 14 Eylül'de sona erdi. ÖSYM 17 Eylül saat 14.00'te Sınava Giriş Belgesini AİS'te erişime açtı.", "Bina, salon ve kişisel sınav bilgisi kendi belgenizden öğrenilir. Duyurudaki 13.30 sınav binasına alınma sınırıdır; sınav saati ve diğer kurallar belgeden kontrol edilmelidir."],
    actions: ["AİS'ten Sınava Giriş Belgenizi edinip kimlik ve bina bilgilerinizi kontrol edin.", "19 Eylül'de binaya alınma sınırından önce sınav yerinde olun."],
    actionLabel: "AİS sınava giriş belgesini aç", sources: [eydtsSource, ais]
  };
  return item;
}
