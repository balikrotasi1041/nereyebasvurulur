import type { Announcement, AnnouncementSource } from "./announcements";

const checked = "2026-09-24";
const source = (title: string, url: string, authority = "ÖSYM"): AnnouncementSource => ({ title, url, authority });
const ais = source("ÖSYM AİS: başvuru/tercih saatleri ve sınav ücretleri", "https://ais.osym.gov.tr/");
const pilotNotice = "https://www.jandarma.gov.tr/2026-yili-sozlesmeli-pilot-ucak-temini";
const pilotGuide = "https://www.jandarma.gov.tr/kurumlar/jandarma.gov.tr/Duyurular/Sozlesmeli-Pilot-Temini-Basvuru-Kilavuzu.pdf";

export const officialAnnouncementsSeptember24: Announcement[] = [
  {
    slug: "2026-muhendislik-tamamlama-tercihleri",
    title: "Mühendislik tamamlama: tercih 29 Eylül'de, ödeme 30 Eylül'de bitiyor",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-09-23", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-09-23T14:30:00+03:00", deadlineAt: "2026-09-29T23:59:00+03:00",
    deadlineLabel: "Tercih: 23 Eylül 14.30–29 Eylül 23.59; ödeme: 30 Eylül banka mesai bitimi / ÖSYM kartlı ödeme 23.59",
    summary: "Teknik öğretmenler için 2026 mühendislik tamamlama tercihleri AİS'te 29 Eylül saat 23.59'a kadar alınacak. Yerleştirme ücreti 170 TL; 30 Eylül ödeme son günü tercih süresini uzatmıyor.",
    details: [
      "Bu işlem yeni ALES sınav başvurusu veya genel YKS tercihi değildir. Mezuniyet alanı, geçerli ALES puanı ve tercih edilebilecek programlar için bu yılın kılavuzunu, özellikle Tablo-1 ve Tablo-2'yi inceleyin. Eğitim bilginiz hatalıysa tercih süresi içinde üniversitenizle YÖKSİS kaydını düzeltin.",
      "Tercihler AİS veya ÖSYM Aday İşlemleri Mobil Uygulamasından bireysel olarak bildirilir. Tercih değişikliği de süre içinde elektronik ortamda yapılır; ÖSYM'ye dilekçe gönderilmesi tercih kaydının yerine geçmez.",
      "Ücret yükümlülüğünüz varsa tercih kaydından sonra 170 TL'yi ödeyin. Son gün 30 Eylül: bankada mesai bitimi, ÖSYM kartlı ödeme sisteminde 23.59. Süresinde ödenmeyen tercihler geçersiz sayılıp silinir; 30 Eylül'de yeni tercih oluşturulamaz."
    ],
    actions: ["Uygun programları kılavuzla belirleyip AİS'te tercihinizi 29 Eylül 23.59'dan önce kaydedin.", "Tercih çıktınızı saklayın; ayrı ödeme yükümlülüğünü ve varsa kılavuzdaki muafiyetinizi kontrol edin."],
    actionUrl: ais.url, actionLabel: "AİS mühendislik tamamlama tercihini aç",
    relatedPathKeys: [], relatedSearches: ["teknik öğretmen mühendislik tamamlama", "mühendislik tamamlama tercihi"],
    sources: [source("23 Eylül: mühendislik tamamlama tercihlerinin alınması", "https://www.osym.gov.tr/2026-muhendislik-tamamlama-tercihlerin-alinmasi"), source("2026 Teknik Öğretmenler İçin Mühendislik Tamamlama Tercih Kılavuzu", "https://dokuman.osym.gov.tr/web/2026/9/2026-teknik-ogretmenler-cin-muhendislik-tamamlama-programlari-tercih-kilavuzu-x3ihe9-23085953.pdf"), ais]
  },
  {
    slug: "2026-eus-sts-eczacilik-basvurulari",
    title: "2026 EUS ve STS Eczacılık: normal başvuru 1 Ekim'de sona eriyor",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-09-23", verifiedAt: checked, lastModified: checked,
    startsAt: "2026-09-23T10:30:00+03:00", deadlineAt: "2026-10-01T23:59:00+03:00",
    deadlineLabel: "Normal başvuru: 23 Eylül 10.30–1 Ekim 23.59; normal ücret son günü: 2 Ekim; ayrı geç başvuru günü: 8 Ekim",
    summary: "7 Kasım 2026'da yapılacak EUS ve STS Eczacılık için normal başvurular 1 Ekim saat 23.59'da bitecek. Her sınavın normal ücreti ayrı ayrı 2.500 TL; ödeme son günü 2 Ekim. Aynı takvim, aynı başvuru veya uygunluk koşulu anlamına gelmez.",
    details: [
      "EUS, eczacılıkta uzmanlık eğitimi giriş sınavıdır; STS Eczacılık ise yurt dışı diploma denkliği için seviye tespit sınavıdır. İşleminize uygun sınavın kendi kılavuzunu okuyun; birine yapılan başvuru diğerini karşılamaz.",
      "ÖSYM başvuru merkezleri, AİS veya Aday İşlemleri Mobil Uygulaması kullanılır. Başvuru kaydı ile ücret ayrı kontrol edilmelidir. Normal sınav ücreti için 2 Ekim son gününü ve kullandığınız ödeme kanalının saatini izleyin; ödeme günü normal başvuru penceresi açmaz.",
      "Her iki kılavuzda 8 Ekim ayrı geç başvuru günü olarak yer alır. Bu gündeki sınav ücreti yüzde 50 artırımlıdır ve aynı gün ödenir; normal dönemin 2.500 TL tutarını geç başvuruya taşımayın. Ücret muafiyeti varsa kılavuzdaki şart ve doğrulama işlemlerini ayrıca kontrol edin."
    ],
    actions: ["AİS'te EUS veya STS Eczacılık seçeneklerinden ihtiyacınıza uygun olanı seçin; kendi kılavuzundaki başvuru şartlarını doğrulayın.", "Normal başvuruyu 1 Ekim 23.59'dan önce tamamlayın; kayıt ve gerekiyorsa ücret ödeme durumunu ayrı ayrı kontrol edin."],
    actionUrl: ais.url, actionLabel: "ÖSYM AİS sınav başvurusunu aç",
    relatedPathKeys: [], relatedSearches: ["EUS başvurusu", "STS Eczacılık diploma denkliği"],
    sources: [source("23 Eylül: EUS ve STS Eczacılık başvuruları", "https://www.osym.gov.tr/2026-eus-ve-2026-sts-eczacilik-basvurularin-alinmasi"), source("2026 EUS Başvuru Kılavuzu", "https://dokuman.osym.gov.tr/web/2026/9/basvuru-kilavuzu-3pbw7l-22143130.pdf"), source("2026 STS Eczacılık Başvuru Kılavuzu", "https://dokuman.osym.gov.tr/web/2026/9/basvuru-kilavuzu-x1ss0b-22143159.pdf"), ais]
  },
  {
    slug: "2026-jandarma-sozlesmeli-ucak-pilotu-temini",
    title: "Jandarma sözleşmeli uçak pilotu kılavuzu: son başvuru 11 Ekim",
    authority: "Jandarma Genel Komutanlığı", kind: "guide", publishedAt: checked, verifiedAt: checked, lastModified: checked,
    // The guide names the opening day, not an opening time. Do not invent a startsAt or an authenticated open-state check.
    deadlineAt: "2026-10-11T23:59:00+03:00",
    deadlineLabel: "Kılavuzdaki başvuru aralığı: 24 Eylül–11 Ekim 2026 23.59; başlangıç saati belirtilmiyor",
    summary: "Jandarma, bir sözleşmeli uçak pilotu için 24 Eylül–11 Ekim 2026 başvuru takvimini yayımladı. Son saat 11 Ekim 23.59. Başvuru yalnız JSGA Personel Temin Sistemine e-Devlet ile giriş yapılarak alınır; posta veya şahsen başvuru kabul edilmez.",
    details: [
      "Bu ilan, 657 sayılı Kanunun 4/B kapsamındaki sözleşmeli uçak pilotu teminidir; Jandarma öğrenci veya genel subay/astsubay alımı değildir. Lisans, uçuş deneyimi, yaş ve diğer uygunluk şartları için kılavuzun tamamını inceleyin.",
      "Lisans ve uçuş kayıtları dahil kılavuzda istenen belgeler ile imzalı Sözleşmeli Pilot Nitelikleri Formu sisteme yüklenir. Bilgilerim alanını kaydetmek tek başına başvuru değildir; Başvuru Yap bölümünden bu ilanın seçilmesi gerekir.",
      "Kılavuz başlangıç gününü belirtir, saat vermez. Kişisel hesaba girilerek açık başvuru kontrolü yapılmadı. Sınav tarihi, yeri, ücreti ve seçme aşaması çağrısı Personel Temin Sisteminde ayrıca duyurulacak; şimdi tutar veya kişisel sınav günü üretilmiyor."
    ],
    actions: ["Resmî kılavuzu okuyun; şart ve belgelerinizi kontrol ederek JSGA Personel Temin Sistemini açın.", "İlgili uçak pilotu ilanındaki başvurunuzu 11 Ekim 23.59'dan önce tamamlayıp kaydını kontrol edin; sonraki sınav duyurusunu ayrıca izleyin."],
    actionUrl: "https://personeltemin.jandarma.gov.tr/", actionLabel: "JSGA Personel Temin Sistemini aç",
    relatedPathKeys: [], relatedSearches: ["Jandarma sözleşmeli uçak pilotu"],
    sources: [source("24 Eylül 2026 sözleşmeli uçak pilotu duyurusu", pilotNotice, "Jandarma Genel Komutanlığı"), source("2026 Sözleşmeli Pilot (Uçak) Temini Başvuru Kılavuzu", pilotGuide, "Jandarma Genel Komutanlığı")]
  }
];

export function refreshSeptember24(item: Announcement): Announcement {
  if (item.slug !== "2026-gsb-yurt-basvuru-sonuclari-sorgulama") return item;
  return {
    ...item,
    title: "GSB yurt yedek sonuçları: 23 Eylül yerleştirmesini kontrol edin",
    summary: "KYGM, 23 Eylül 2026 yurt yedek yerleştirme sonuçlarını duyurdu. Kişisel sonucunuzu ve kayıt sürenizi e-Devlet'ten kontrol edin; ilk yerleştirmenin 10 Eylül son tarihi bu yeni sonuca uygulanmaz.",
    lastModified: checked,
    // Only the result notice was rechecked. Keep the older full-record verification and unresolved payment-source warning.
    details: ["24 Eylül kontrolü: KYGM'nin 23 Eylül tarihli sonuç duyurusu e-Devlet Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor. Genel duyuruda ortak yeni kayıt saati bulunmuyor; kişisel sonuç ekranını esas alın.", ...item.details.map(detail => detail.startsWith("22 Eylül kontrolü:") ? "Önceki 21 Eylül yedek sonucu 22 Eylül'de kontrol edilmişti; en son sonuç için yukarıdaki 23 Eylül duyurusunu ve kişisel e-Devlet ekranınızı kullanın." : detail)],
    sources: [source("23.09.2026 tarihli yurt yedek yerleştirme sonuçları (24 Eylül kontrolü)", "https://kygm.gsb.gov.tr/Duyuru/302961/23092026-tarihli-yurt-yedek-yerlestirme-sonuclari.aspx", "GSB / KYGM"), ...item.sources.filter(source => !source.url.includes("/302961/21092026-"))]
  };
}
