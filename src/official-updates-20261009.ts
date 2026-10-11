import type { Announcement } from "./announcements";

const checked = "2026-10-09";
const vgm = "https://www.vgm.gov.tr/sayfalar/burs-basvurulari";
const vgmNotice = "https://ihale.vgm.gov.tr/duyurular/vakiflar-genel-mudurlugu-2026-2027-egitim-yili-burslari-1";
const source = (title: string, url: string, authority: string) => ({ title, url, authority });
const extension = "https://www.osym.gov.tr/2026-yuksekogretim-kurumlarinin-oncelikli-alanlardaki-doktora-programlarina-ogrenci-secme-sinavi-yok-ykds-basvuru-suresinin-uzatilmasi";
const revisedGuide = "https://dokuman.osym.gov.tr/web//2026/10/basvuru-kilavuzu-7oeck0-08135106.pdf";
const identityNotice = "https://www.osym.gov.tr/2026-tr-yos2-sinavi-icin-sinav-gunu-acik-tutulacak-ililce-nufus-mudurlukleri";
const identityList = "https://dokuman.osym.gov.tr/web/2026/10/11-ekm-2026-pazar-gunu-0800-1100-saatler-arasinda-acik-olacak-llce-nufus-mudurlukler-fsgx0c-07111158.pdf";

export const officialAnnouncementsOctober9: Announcement[] = [
  {
    slug: "2026-2027-vgm-ortaogrenim-egitim-yardimi", title: "VGM ortaöğrenim eğitim yardımı: başvurular 20 Ekim'e kadar",
    authority: "Vakıflar Genel Müdürlüğü", kind: "application", publishedAt: "2026-10-07", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-10-06T10:00:00+03:00", deadlineAt: "2026-10-20T23:59:00+03:00",
    deadlineLabel: "6 Ekim 10.00–20 Ekim 2026 23.59",
    summary: "İlkokul, ortaokul ve lise öğrencileri için VGM eğitim yardımı başvurusu 6 Ekim'de başladı. Başvuru, VGM'nin resmî burs sayfasındaki Ortaöğrenim Burs Başvurusu bağlantısından 20 Ekim 23.59'a kadar yapılır.",
    details: ["Kılavuzu okuyup öğrenciye ait bilgileri başvuru ekranında kontrol edin. 2026-2027 dönemi için açıklanan aylık yardım 1.750 TL'dir; bu tutar başvuru ücreti değildir ve başvuru destek hakkını garanti etmez.", "Sonuçları VGM duyurularından izleyin. Üniversite bursunun 22–31 Ekim takvimi bu başvuruya uygulanmaz. VGM, WhatsApp üzerinden belge veya para istemediğini belirtiyor."],
    actions: ["Resmî burs sayfasında ortaöğrenim başvurusunu ve kılavuzunu açın.", "Başvurunuzu süre içinde tamamlayıp başvuru kaydınızı kontrol edin."],
    actionUrl: "https://burs.vgm.gov.tr/Login.aspx?BasvuruTuru=OO", actionLabel: "VGM ortaöğrenim başvurusunu aç", relatedPathKeys: [], relatedSearches: ["VGM ortaöğrenim eğitim yardımı"],
    sources: [source("2026-2027 burs başvuru takvimi ve yardım tutarı", vgm, "VGM"), source("7 Ekim burs duyurusu", vgmNotice, "VGM")]
  },
  {
    slug: "2026-2027-vgm-yuksekogrenim-burs-basvurulari", title: "VGM yükseköğrenim bursu: başvurular 22–31 Ekim'de",
    authority: "Vakıflar Genel Müdürlüğü", kind: "application", publishedAt: "2026-10-07", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-10-22T10:00:00+03:00", deadlineAt: "2026-10-31T23:59:00+03:00",
    deadlineLabel: "22 Ekim 10.00–31 Ekim 2026 23.59",
    summary: "Ön lisans ve lisans öğrencilerine yönelik VGM burs başvurusu 22 Ekim saat 10.00'da açılacak, 31 Ekim 23.59'da kapanacak. İşlem VGM'nin resmî burs başvuru sayfasından elektronik olarak yapılacak.",
    details: ["2026-2027 dönemi aylık burs tutarı 4.000 TL olarak açıklanıyor. Bu tutar başvuru ücreti değildir; koşullar ve kontenjan değerlendirmesi sonucunda hak kazanılır.", "Başvuru açıldığında yükseköğrenim bağlantısını ve ilgili kılavuzu kullanın. Açık olan ortaöğrenim formunu üniversite bursu için doldurmayın; sonuçlar yine VGM tarafından duyurulacak."],
    actions: ["VGM sayfasından yükseköğrenim burs takvimini kontrol edin.", "22 Ekim 10.00'dan sonra ilgili formu açıp 31 Ekim 23.59'a kadar işlemi tamamlayın."],
    actionUrl: vgm, actionLabel: "VGM yükseköğrenim burs takvimini aç", relatedPathKeys: [], relatedSearches: ["VGM yükseköğrenim bursu"],
    sources: [source("VGM burs başvuru kanalı ve tutarı", vgm, "VGM"), source("7 Ekim yükseköğrenim burs takvimi", vgmNotice, "VGM")]
  },
  {
    slug: "2026-tubitak-2205-2210-2211-ikinci-donem-burs-cagrilari", title: "TÜBİTAK 2205, 2210 ve 2211 bursları: son başvuru 27 Ekim 17.30",
    authority: "TÜBİTAK / BİDEB", kind: "application", publishedAt: "2026-10-07", verifiedAt: checked, lastModified: checked,
    deadlineAt: "2026-10-27T17:30:00+03:00", deadlineLabel: "5–27 Ekim 2026; son saat 17.30",
    summary: "TÜBİTAK'ın 2026 ikinci dönem lisans (2205), yurt içi yüksek lisans (2210) ve doktora (2211) burs çağrıları açıldı. Başvurular 27 Ekim saat 17.30'a kadar TÜBİTAK Yönetim Bilgi Sistemi üzerinden alınacak.",
    details: ["Takvim 5 Ekim'de başladı; 7 Ekim duyuru tarihi başlama tarihi değildir. Eğitim düzeyinize uygun programın güncel çağrı metnini okuyun: 2210 için A/C/D/E, 2211 için A/C/E alt programları duyuruluyor.", "Her programın uygunluk ve belge koşulları ayrı olduğundan tek bir ortak belge listesi veya burs tutarı kullanılmaz. TYBS'de doğru programı seçip başvurunuzun tamamlandığını kontrol edin. Bu başvurular GSB burs/kredi başvuru ekranından yapılmaz."],
    actions: ["Eğitim düzeyinize uygun çağrı metnindeki koşulları inceleyin.", "TYBS'de ilgili program başvurusunu 27 Ekim 17.30'a kadar tamamlayın."],
    actionUrl: "https://tybs.tubitak.gov.tr/", actionLabel: "TÜBİTAK TYBS başvurusunu aç", relatedPathKeys: [], relatedSearches: ["TÜBİTAK 2205 burs", "TÜBİTAK 2210", "TÜBİTAK 2211"],
    sources: [source("2205 lisans burs çağrısı", "https://tubitak.gov.tr/tr/duyuru/2205-lisans-burs-programi-2026-yili-2-donem-cagrisi-acildi", "TÜBİTAK"), source("2210 yüksek lisans burs çağrıları", "https://tubitak.gov.tr/tr/duyuru/2210-yurt-ici-yuksek-lisans-burs-programlari-2026-yili-2-donem-cagrilari-acildi", "TÜBİTAK"), source("2211 doktora burs çağrıları", "https://tubitak.gov.tr/tr/duyuru/2211-yurt-ici-doktora-burs-programlari-2026-yili-2-donem-cagrilari-basvuruya-acildi", "TÜBİTAK")]
  },
  {
    slug: "2026-kygm-ogrenim-kredisi-resmi-odeme-kanallari", title: "KYGM: öğrenim kredisi borcunu resmî ödeme kanalından kontrol edin",
    authority: "GSB / Kredi ve Yurtlar Genel Müdürlüğü", kind: "guide", publishedAt: "2026-10-08", verifiedAt: checked, lastModified: checked,
    summary: "KYGM'nin 8 Ekim duyurusu, öğrenim kredisi borcu için telefon veya mesajla avukat adına ödeme isteyenlere karşı resmî kanalların kullanılmasını istiyor. Kurum, tahsilat kanalları olarak Ziraat Bankası ve Gelir İdaresi Başkanlığını gösteriyor.",
    details: ["KYGM'nin resmî sayfasındaki Kredi/Yurt E-Ödeme bağlantısı Ziraat Bankasının ödeme ekranına gider. Borç kaydınıza uygun resmî kanalı kontrol edin; gelen mesajdaki kişisel hesaba ödeme yapmayın.", "Bu açıklama yeni burs/kredi başvurusu, borç silme veya genel ödeme süresi uzatımı değildir. Kişisel borç ve ödeme takviminizi yetkili kurumun ekranında inceleyin."],
    actions: ["KYGM duyurusundan resmî ödeme bağlantısını açın.", "Borç kaydınızla uyuşmayan ödeme taleplerini kurumdan doğrulayın."],
    actionUrl: "https://kyk.ziraatbank.com.tr/", actionLabel: "Resmî GSB yurt ve kredi ödeme ekranını aç", relatedPathKeys: [], relatedSearches: ["öğrenim kredisi borcu ödeme", "KYK kredi borcu"],
    sources: [source("8 Ekim: kredi borcu ödeme kanalları", "https://kygm.gsb.gov.tr/Duyuru/303588/kredi-borcu-odeme-kanallarina-dikkat.aspx", "GSB / KYGM"), source("GSB yurt ve kredi ödemeleri", "https://kyk.ziraatbank.com.tr/", "Ziraat Bankası")]
  }
];

export function refreshOctober9(item: Announcement): Announcement {
  if (item.slug === "2026-yok-ykds-basvurulari") return {
    ...item, title: "YÖK-YKDS başvurusu 14 Ekim 23.59'a uzatıldı", verifiedAt: checked, lastModified: checked,
    deadlineAt: "2026-10-14T23:59:00+03:00", deadlineLabel: "Başvuru 14 Ekim 23.59; normal ücret son günü 15 Ekim; geç başvuru 22 Ekim",
    summary: "ÖSYM, YÖK-YKDS başvurusunu 14 Ekim 23.59'a uzattı. İşlem, önceden YÖK'e başvurup bilgileri ÖSYM'ye bildirilen adaylar içindir. Normal ücret ödemesi 15 Ekim, geç başvuru 22 Ekim olarak güncellendi.",
    details: ["8 Ekim tarihli uzatma duyurusu ve yenilenen kılavuz birlikte kontrol edildi. Bildirilen adaylar AİS, ÖSYM mobil uygulaması veya başvuru merkezinden işlemlerini tamamlar. Sınav 28 Kasım'da; bu işlem herkese açık yeni bir doktora başvurusu değildir.", "3.000 TL normal ücret 15 Ekim'e kadar ÖSYM'nin kartlı ödeme kanalından yatırılır; banka/ATM kullanılmaz. Ödeme günü yeni normal başvuru günü değildir. Geç başvuru 22 Ekim 10.00–23.59 arasında; yüzde 50 artırımlı ücret aynı gün 23.59'a kadar ödenir."],
    sources: [source("8 Ekim: başvuru süresi uzatımı", extension, "ÖSYM"), source("8 Ekim güncellenmiş YÖK-YKDS kılavuzu", revisedGuide, "ÖSYM"), source("Güncel başvuru ve geç başvuru saatleri", "https://www.osym.gov.tr/", "ÖSYM")]
  };
  if (item.slug === "2026-tr-yos-2-sinava-giris-belgeleri") return {
    ...item, lastModified: checked,
    details: [...item.details, "ÖSYM'nin 8 Ekim açıklamasına göre, T.C. kimliği eksik veya uygun olmayan adaylar için yalnız resmî ekte listelenen nüfus müdürlükleri 11 Ekim 08.00–11.00 arasında açık olacak. Geçici Kimlik Belgesi işlemi için sınava giriş belgesi ve biyometrik fotoğraf gerekir. Bu çalışma saatleri sınav binasına son giriş saatini uzatmaz."],
    actions: [...item.actions, "Geçici kimlik belgesine ihtiyaç varsa resmî listedeki müdürlüğü ve kendi sınav belgenizdeki giriş saatini birlikte kontrol edin."],
    sources: [...item.sources, source("8 Ekim: TR-YÖS/2 geçici kimlik işlemi", identityNotice, "ÖSYM / Nüfus ve Vatandaşlık İşleri"), source("11 Ekim açık nüfus müdürlükleri listesi", identityList, "ÖSYM")]
  };
  return item;
}
