import type { Announcement } from "./announcements";

const checked = "2026-10-08";
const ais = "https://ais.osym.gov.tr/";
const osym = (title: string, url: string) => ({ title, url, authority: "ÖSYM" });
const dormitoryNotice = "https://kygm.gsb.gov.tr/Duyuru/303533/2026-2027-ek-kontenjan-yurt-basvurulari-baslamistir.aspx";
const dormitoryNews = "https://kygm.gsb.gov.tr/HaberDetaylari/10008/1/303532/ek-kontenjanla-yerlesen-ogrencilerin-yurt-basvurulari-basladi.aspx";
const reserveNotice = "https://kygm.gsb.gov.tr/Duyuru/302961/07102026-tarihli-yurt-yedek-yerlestirme-sonuclari.aspx";
const answersNotice = "https://www.osym.gov.tr/2026-kpss-lisans-sinavi-genel-yetenek-genel-kultur-ve-alan-bilgisi-cevap-kgitlari-ve-aday-cevaplari-erisime-acildi";

export const officialAnnouncementsOctober8: Announcement[] = [
  {
    slug: "2026-ales-3-basvurulari", title: "2026 ALES/3 başvuruları 15 Ekim'e kadar",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-10-07", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-10-07T16:00:00+03:00", deadlineAt: "2026-10-15T23:59:00+03:00",
    deadlineLabel: "Başvuru: 7 Ekim 16.00–15 Ekim 23.59; normal dönem ücret ödemesi 16 Ekim'de biter",
    summary: "29 Kasım 2026 ALES/3 için başvurular 7 Ekim saat 16.00'da başladı. AİS, ÖSYM mobil uygulaması veya başvuru merkezinden 15 Ekim 23.59'a kadar başvurun; 1.200 TL sınav ücretinin son ödeme günü 16 Ekim'dir.",
    details: [
      "AİS'teki eğitim ve fotoğraf bilgilerinizin durumuna göre kılavuzda size uygun başvuru yolunu izleyin. Kaydınızın ÖSYM'ye bildirildiğini ve ücret ödemenizin tamamlandığını kontrol edin.",
      "16 Ekim ödeme günü yeni normal başvuru süresi değildir. Bankada ödeme mesai bitiminde, kartlı ödeme ve çevrimiçi bankacılıkta 23.59'da sona erer. Geç başvuru 21 Ekim'de 10.00–23.59 arasında; artırımlı 1.800 TL ücret aynı gün ödenir."
    ],
    actions: ["Kılavuzu inceleyip başvuru bilgilerinizi AİS veya başvuru merkezi üzerinden kaydedin.", "Başvuru ve ücret ödeme işlemlerini ayrı ayrı tamamlayıp kayıt dökümünüzü saklayın."],
    actionUrl: ais, actionLabel: "AİS ALES/3 başvurusunu aç", relatedPathKeys: [], relatedSearches: ["ALES başvurusu", "ALES 3"],
    sources: [osym("7 Ekim: ALES/3 başvuru duyurusu", "https://www.osym.gov.tr/2026-ales3-basvurularin-alinmasi"), osym("2026 ALES/3 başvuru kılavuzu", "https://dokuman.osym.gov.tr/web//2026/10/basvuru-kilavuzu-pijez5-06105839.pdf"), osym("Başvuru saatleri ve ücret: ÖSYM takvimi", "https://www.osym.gov.tr/Home/KarsilamaSonrasiIndex")]
  },
  {
    slug: "2026-muhendislik-tamamlama-yerlestirme-sonuclari-kayit", title: "Mühendislik Tamamlama sonuçları: üniversite kaydı 9–15 Ekim",
    authority: "ÖSYM / Yerleşilen üniversite", kind: "result", publishedAt: "2026-10-07", verifiedAt: checked, lastModified: checked,
    deadlineDate: "2026-10-15", deadlineLabel: "Üniversite kaydı: 9–15 Ekim, resmî iş günlerinde ve çalışma saatlerinde",
    summary: "Teknik Öğretmenler İçin Mühendislik Tamamlama yerleştirme sonuçları 7 Ekim saat 15.20'de açıldı. Kayıt hakkı kazanan adayların 9–15 Ekim'de yerleştikleri üniversiteye başvurması gerekiyor.",
    details: ["Bu sonuç, 23–29 Eylül'de alınan tercihlerin yerleştirme aşamasıdır; yeni tercih dönemi değildir. Kişisel program bilgisi ÖSYM sonuç ekranından öğrenilir.", "Kayıtlar üniversitede resmî iş günleri ve çalışma saatleri içinde yapılır. Duyuru ortak bir saat veya e-Devlet e-kayıt takvimi vermiyor; belgeler ve yerel kayıt yöntemi için üniversitenizin resmî duyurusunu kontrol edin."],
    actions: ["Kişisel yerleştirme sonucunuzu açın.", "9–15 Ekim kayıt dönemi için yerleştiğiniz üniversitenin kayıt birimi ve belge listesini kontrol edin."],
    actionUrl: "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10377", actionLabel: "Mühendislik Tamamlama sonucunu aç", relatedPathKeys: [], relatedSearches: ["mühendislik tamamlama kayıt"],
    sources: [osym("7 Ekim: Mühendislik Tamamlama sonuç ve kayıt duyurusu", "https://www.osym.gov.tr/2026-muhendislik-tamamlama-yerlestirme-sonuclari-aciklandi"), osym("Kişisel yerleştirme sonucu", "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10377")]
  },
  {
    slug: "2026-ozyes-yerlestirme-sonuclari-kayit", title: "2026 ÖZYES yerleştirme sonuçları: kayıtlar 12–16 Ekim",
    authority: "ÖSYM / Yerleşilen üniversite", kind: "result", publishedAt: "2026-10-07", verifiedAt: checked, lastModified: checked,
    deadlineDate: "2026-10-16", deadlineLabel: "Üniversite kaydı: 12–16 Ekim; kesin saat ve belgeler için üniversite duyurusunu kontrol edin",
    summary: "ÖZYES ile spor bilimleri programlarına yerleştirme sonuçları 7 Ekim saat 15.00'te açıklandı. Yerleşen adayların kayıtları 12–16 Ekim'de ilgili üniversite tarafından yapılacak.",
    details: ["Adaylar ÖSYM Sonuç Açıklama Sisteminden kendi programlarını öğrenir. Yerleştirme belgesi adrese gönderilmez; sonuç açıklanması yeni tercih dönemi açmaz.", "Üniversitenizin resmî kayıt açıklamasındaki belge ve işlem yolunu izleyin. Genel YKS ek yerleştirme e-kayıt tarihlerini ÖZYES'e uygulamayın; bu duyuruda ayrı bir elektronik kayıt penceresi belirtilmiyor."],
    actions: ["ÖZYES kişisel yerleştirme sonucunu kontrol edin.", "Yerleştiğiniz üniversitenin kayıt birimine 12–16 Ekim dönemi içinde başvurun."],
    actionUrl: "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10378", actionLabel: "ÖZYES yerleştirme sonucunu aç", relatedPathKeys: [], relatedSearches: ["ÖZYES üniversite kayıt", "spor bilimleri yerleştirme"],
    sources: [osym("7 Ekim: ÖZYES sonuç ve kayıt duyurusu", "https://www.osym.gov.tr/2026-yks-kapsaminda-spor-bilimleri-icin-ozel-yetenek-sinavi-ozyes-yerlestirme-sonuclari-aciklandi"), osym("ÖZYES kişisel yerleştirme sonucu", "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10378")]
  },
  {
    slug: "2828-2026-ekim-istihdam-yerlestirme-sonuclari", title: "2828 kapsamında 7 Ekim istihdam yerleştirme sonuçları açıklandı",
    authority: "Aile ve Sosyal Hizmetler Bakanlığı", kind: "result", publishedAt: "2026-10-07", verifiedAt: checked, lastModified: checked,
    summary: "Sosyal hizmet modellerinden yararlananların 2828 kapsamındaki 7 Ekim 2026 kura sonuçları e-Devlet'te sorgulanabiliyor. Bakanlık, alternatif olarak e-Ailem sonuç sayfasını da gösteriyor; duyuru yeni tercih başvurusu açmıyor.",
    details: ["Bakanlığın sonuç duyurusundaki e-Devlet hizmetinden kendi yerleşim bilginizi kontrol edin. Hak sahipliği, atama ve göreve başlama birbirinden ayrı aşamalardır.", "Sonuç duyurusunda tüm kurumlar için ortak bir belge teslim tarihi açıklanmıyor. Yerleştirildiğiniz kurumun evrak ve atama duyurusunu takip edin; başka kurum veya 3713 kapsamındaki teslim tarihini kendi işleminize taşımayın."],
    actions: ["e-Devlet 2828 Kurayla Yerleşim Sorgulama hizmetini açın.", "Yerleştiğiniz kurumun güncel atama duyurusundaki evrak ve teslim kanalını kontrol edin."],
    actionUrl: "https://turkiye.gov.tr/ashb-2828-sayili-sosyal-hizmetler-kanuna-gore-kurayla-yerlesim-sorgulama", actionLabel: "2828 kişisel yerleşim sonucunu sorgula", relatedPathKeys: [], relatedSearches: ["2828 istihdam yerleştirme", "sosyal hizmetler kura sonucu"],
    sources: [{ title: "7 Ekim 2026 yerleştirme sonuç duyurusu", authority: "Aile ve Sosyal Hizmetler Bakanlığı", url: "https://www.aile.gov.tr/duyurular/2828-sayili-kanun-kapsaminda-sosyal-hizmet-modellerinden-yararlananlarin-istihdamina-iliskin-yerlestirme-sonuclari-7-10-2026/" }, { title: "2828 Kurayla Yerleşim Sorgulama", authority: "e-Devlet / Aile ve Sosyal Hizmetler Bakanlığı", url: "https://turkiye.gov.tr/ashb-2828-sayili-sosyal-hizmetler-kanuna-gore-kurayla-yerlesim-sorgulama" }]
  }
];

export function refreshOctober8(item: Announcement): Announcement {
  if (item.slug === "2026-2027-gsb-yurt-ek-kontenjan-basvuru-duyurusu") return {
    ...item, title: "GSB ek kontenjan yurt başvuruları 9 Ekim 23.59'da bitiyor", kind: "application", verifiedAt: checked, lastModified: checked,
    // The source explicitly confirms opening on 7 October, but gives no opening hour.
    deadlineAt: "2026-10-09T23:59:00+03:00", deadlineLabel: "Başvuru: 7–9 Ekim 2026; kapanış 9 Ekim 23.59",
    summary: "KYGM'nin 7 Ekim ilanıyla ek kontenjan ve belirtilen diğer öğrenci gruplarının yurt başvuruları açıldı. e-Devlet GSB Yurt Başvurusu hizmetinden 9 Ekim 2026 saat 23.59'a kadar işlem yapılabiliyor.",
    details: ["Dönem; ek kontenjan, yatay/dikey geçiş, özel yetenek, lisansüstü, artık yıl, ikinci üniversite, af ve Senato kararıyla YÖKSİS'te aktif öğrenci gruplarını kapsıyor. Kişisel başvuru koşullarınızı resmî hizmette kontrol edin; başvuru yerleşme garantisi değildir.", "Başvuru öğrenim bilgileri üzerinden alınıyor. Eksik veya hatalı bilgiyi üniversitenizin öğrenci işleriyle düzeltin. Bu başvuru, daha önce başvurmuş öğrencilerin yedek yerleştirme sonucunu sorgulamasından ayrıdır."],
    actions: ["e-Devlet'teki öğrenim bilgilerinizi kontrol edin; hata varsa öğrenci işleriyle düzeltin.", "GSB Yurt Başvurusu hizmetinde 9 Ekim 23.59'dan önce işleminizi tamamlayıp kaydınızı kontrol edin."],
    actionUrl: "https://www.turkiye.gov.tr/gsb-yurt-basvurusu", actionLabel: "e-Devlet ek kontenjan yurt başvurusunu aç",
    sources: [{ title: "7 Ekim: ek kontenjan yurt başvuruları ve son gün", authority: "GSB / KYGM", url: dormitoryNotice }, { title: "Başvuru grupları ve öğrenim bilgisi kontrolü", authority: "GSB / KYGM", url: dormitoryNews }, { title: "Yurt Başvurusu", authority: "e-Devlet / GSB", url: "https://www.turkiye.gov.tr/gsb-yurt-basvurusu" }]
  };
  if (item.slug === "2026-gsb-yurt-basvuru-sonuclari-sorgulama") return {
    ...item, title: "GSB yurt yedek sonuçları: 7 Ekim yerleştirmesini kontrol edin", lastModified: checked,
    summary: "KYGM, 7 Ekim 2026 yurt yedek yerleştirme sonuçlarını duyurdu. Kişisel sonucu ve kayıt sürenizi e-Devlet'ten kontrol edin; ilk yerleştirmenin 10 Eylül son tarihi bu yeni sonuca uygulanmaz.",
    details: ["8 Ekim kontrolü: KYGM'nin 7 Ekim sonuç duyurusu e-Devlet Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor. Ortak yeni kayıt saati açıklanmıyor; kişisel sonuç ekranını esas alın.", ...item.details.slice(1)],
    sources: [{ title: "7 Ekim 2026 yurt yedek yerleştirme sonuçları; kontrol 8 Ekim", authority: "GSB / KYGM", url: reserveNotice }, ...item.sources.filter(source => !source.url.includes("/Duyuru/302961/"))]
  };
  if (item.slug === "2026-kpss-lisans-sinav-sonuclari") return {
    ...item, lastModified: checked,
    details: [...item.details, "7 Ekim saat 13.40'tan itibaren 10 gün süreyle AİS'te Cevap Kâğıdı Görüntüleme erişimi de açıldı. Bu görüntüleme süresi sonuç erişimi veya itiraz süresi değildir; sayfa bilgilendirme amaçlıdır ve sonuç belgesi yerine geçmez."],
    actions: [...item.actions, "Cevap kâğıdı, işaretlemeler ve doğru cevapları görmek için AİS'te ilgili sınavın Cevap Kâğıdı Görüntüleme ekranını seçin."],
    sources: [...item.sources, osym("7 Ekim cevap kâğıdı görüntüleme duyurusu; kontrol 8 Ekim", answersNotice), osym("Cevap Kâğıdı Görüntüleme: AİS", ais)]
  };
  return item;
}
