import type { Announcement } from "./announcements";

export const officialAnnouncementsSeptember28: Announcement[] = [{
  slug: "2026-hmgs-iyos-kitapcik-goruntuleme",
  title: "HMGS/2 ve İYÖS: tam soru kitapçığı erişimi 7 Ekim'de sona erecek",
  authority: "ÖSYM", kind: "guide",
  publishedAt: "2026-09-27", verifiedAt: "2026-09-28", lastModified: "2026-09-28",
  startsAt: "2026-09-27T13:40:00+03:00", deadlineAt: "2026-10-07T23:59:00+03:00",
  deadlineLabel: "Tam kitapçığı görüntüleme: 27 Eylül 2026 13.40–7 Ekim 2026 23.59",
  summary: "27 Eylül'de yapılan HMGS/2 ve İYÖS sınavlarına başvuran adaylar, soruların tamamını ÖSYM AİS'te 7 Ekim saat 23.59'a kadar inceleyebilir. Kamuya açık yüzde 10'luk kitapçık ile aday erişimi farklıdır.",
  details: [
    "ÖSYM duyurusu ve AİS işlem takvimi, tam kitapçık erişiminin 27 Eylül 13.40'ta başladığını ve 7 Ekim 23.59'da biteceğini birlikte doğruluyor. Kendi sınavınızın Temel Soru Kitapçığı Görüntüleme işlemini seçin.",
    "Bu kayıt sonuç açıklaması veya yeni sınav başvurusu değildir. Görüntüleme son günü itiraz süresi değildir; başka bir işlem için ilgili sınav kılavuzundaki ayrı usulü kontrol edin. Sorular burada yeniden yayımlanmıyor; inceleme resmî ekrandan yapılır."
  ],
  actions: ["AİS'e kendi aday hesabınızla girip HMGS/2 veya İYÖS kitapçığını seçin.", "Tam kitapçığı 7 Ekim 23.59'dan önce inceleyin."],
  actionUrl: "https://ais.osym.gov.tr/", actionLabel: "AİS soru kitapçığını görüntüle",
  relatedPathKeys: [], relatedSearches: ["HMGS 2 soru kitapçığı", "İYÖS soru kitapçığı"],
  sources: [
    { title: "27 Eylül: HMGS/2 ve İYÖS kitapçıkları ve cevap anahtarları", authority: "ÖSYM", url: "https://www.osym.gov.tr/2026-hmgs2-ile-2026-iyos-temel-soru-kitapciklari-ve-cevap-anahtarlari-yayimlandi" },
    { title: "AİS kitapçık görüntüleme takvimi", authority: "ÖSYM", url: "https://ais.osym.gov.tr/" }
  ]
}];

export function refreshSeptember28(item: Announcement): Announcement {
  if (item.slug !== "2026-gsb-sozlesmeli-antrenor-sozlu-uygulamali-sinav") return item;
  return {
    ...item, lastModified: "2026-09-28", deadlineDate: "2026-09-25",
    deadlineLabel: "İlan edilen sınav dönemi 15–25 Eylül 2026 idi; kişisel sınav saati Kariyer Kapısı kaydındadır",
    summary: "GSB'nin 7 Eylül duyurusundaki sözlü ve uygulamalı antrenör sınavları için ilan edilen 15–25 Eylül 2026 dönemi sona erdi. Bu çağrı arşivdedir; kişisel kaydınızı ve sonraki duyuruları resmî kanallardan takip edin.",
    actions: ["Kariyer Kapısı'nda kendi sınav kaydınızı kontrol edin.", "Sonraki aşama için GSB Personel Genel Müdürlüğünün yeni duyurularını izleyin; bu geçmiş çağrıyı yeni başvuru dönemi saymayın."]
  };
}
