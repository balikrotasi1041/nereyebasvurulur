import type { Announcement } from "./announcements";

const ais = "https://ais.osym.gov.tr/";
const source = (title: string, url: string) => ({ title, url, authority: "ÖSYM" });

export const officialAnnouncementsOctober1: Announcement[] = [
  {
    slug: "2026-tus-2-donem-tercihleri",
    title: "TUS 2. dönem tercihleri 7 Ekim'e kadar AİS'ten alınacak",
    authority: "ÖSYM", kind: "application",
    publishedAt: "2026-09-30", verifiedAt: "2026-10-01", lastModified: "2026-10-01",
    startsAt: "2026-09-30T14:30:00+03:00", deadlineAt: "2026-10-07T23:59:00+03:00",
    deadlineLabel: "Tercih: 30 Eylül 2026 14.30–7 Ekim 2026 23.59",
    summary: "2026-TUS 2. dönem yerleştirme tercihleri 30 Eylül saat 14.30'da başladı. Tercih yapabilecek adaylar işlemlerini ÖSYM AİS üzerinden 7 Ekim 2026 saat 23.59'a kadar tamamlamalı.",
    details: [
      "Bu aşama yeni sınav başvurusu değildir. Kendi sonuç ve adaylık durumunuzu, başvuru kılavuzunu ve tercih tablolarındaki program koşullarını birlikte inceleyin.",
      "Tercihlerinizi T.C. kimlik numaranız ve aday şifrenizle AİS'te kaydedin. Süre bitmeden sistemde görünen son tercih listenizi kontrol edin; listedeki bir programı seçmek yerleşme garantisi vermez."
    ],
    actions: ["Resmî duyurudaki tercih bilgileri ve tabloları okuyun.", "AİS'te tercih listenizi kaydedip son hâlini kontrol edin."],
    actionUrl: ais, actionLabel: "AİS TUS tercih işlemini aç",
    relatedPathKeys: [], relatedSearches: ["TUS 2 dönem tercih", "tıpta uzmanlık yerleştirme"],
    sources: [source("30 Eylül: TUS 2. dönem tercihleri", "https://www.osym.gov.tr/2026-tus-2-donem-tercihlerin-alinmasi"), source("TUS tercih genel bilgi ve kuralları", "https://dokuman.osym.gov.tr/web//2026/9/genel-bilgiler-temel-lke-ve-kurallar-oy59j5-29153248.pdf"), source("AİS tercih takvimi", ais)]
  },
  {
    slug: "2026-yds-2-basvurulari",
    title: "YDS/2 başvurusu 8 Ekim'de, normal ücret ödemesi 9 Ekim'de bitiyor",
    authority: "ÖSYM", kind: "application",
    publishedAt: "2026-09-30", verifiedAt: "2026-10-01", lastModified: "2026-10-01",
    startsAt: "2026-09-30T10:00:00+03:00", deadlineAt: "2026-10-08T23:59:00+03:00",
    deadlineLabel: "Başvuru 8 Ekim 2026 23.59; normal ücret ödeme son günü 9 Ekim",
    summary: "22 Kasım 2026'da yapılacak YDS/2 için başvurular 30 Eylül'de açıldı. Adaylar 8 Ekim saat 23.59'a kadar başvurmalı; 1.200 TL normal sınav ücretini kılavuzdaki ödeme kanalının süresinde yatırmalı.",
    details: [
      "Başvuru ÖSYM başvuru merkezleri, AİS veya ÖSYM Aday İşlemleri Mobil Uygulaması üzerinden yapılabilir. Normal ücret ödemesinin son günü 9 Ekim'dir; bu ek ödeme günü yeni normal başvuru süresi değildir. Yalnız bilgileri kaydetmek başvuruyu tamamlamaz.",
      "Kılavuzda geç başvuru günü 14 Ekim olarak belirtiliyor; o gün başvuranlar ücreti aynı gün yüzde 50 artırımlı öder. Normal ve geç başvuru aşamalarını karıştırmayın. Başvuru ve ödeme durumunuzu AİS'ten kontrol edin."
    ],
    actions: ["Kılavuzu inceleyip başvurunuzu 8 Ekim 23.59'dan önce tamamlayın.", "Ücreti resmî ödeme kanalından süresinde ödeyip başvuru kaydınızı kontrol edin."],
    actionUrl: ais, actionLabel: "AİS YDS/2 başvurusunu aç",
    relatedPathKeys: [], relatedSearches: ["YDS 2 başvurusu", "YDS sınav ücreti"],
    sources: [source("30 Eylül: YDS/2 başvuruları", "https://www.osym.gov.tr/2026-yds2-basvurularin-alinmasi"), source("2026-YDS/2 başvuru kılavuzu", "https://dokuman.osym.gov.tr/web//2026/9/basvuru-kilavuzu-8g5h1l-29160339.pdf"), source("AİS YDS/2 takvimi ve ücret bilgisi", ais)]
  },
  {
    slug: "2026-e-yds-11-farsca-ingilizce-basvurulari",
    title: "e-YDS/11 Farsça ve İngilizce: ödeme sırasına bağlı kontenjanı kontrol edin",
    authority: "ÖSYM", kind: "guide",
    publishedAt: "2026-09-30", verifiedAt: "2026-10-01", lastModified: "2026-10-01",
    startsAt: "2026-09-30T14:00:00+03:00", deadlineAt: "2026-10-08T23:59:00+03:00",
    deadlineLabel: "İlan edilen dönem 30 Eylül 14.00–8 Ekim 23.59; kontenjan dolarsa ödeme daha önce kapanır",
    summary: "17 Ekim 2026 e-YDS/11 Farsça ve İngilizce sınavı için başvuru dönemi ilan edildi. Kontenjan ödeme sırasına göre doluyor; 8 Ekim'i beklemeden resmî ödeme ekranında kendi dil ve merkez seçeneğinizi kontrol edin.",
    details: [
      "ÖSYM duyurusu başvuru için odeme.osym.gov.tr adresine, AİS ise ÖSYM kartlı ödeme sistemine yönlendiriyor. AİS'te görünen sınav ücreti 2.150 TL. Kontenjan dolunca sistem ödeme almayı durdurur; takvimdeki son gün yer kaldığı anlamına gelmez.",
      "Sınav Ankara, İstanbul, İzmir ve Adana'daki e-Sınav binalarında uygulanacak. ÖSYM, 17 Ekim saat 13.30'dan sonra binaya aday alınmayacağını belirtiyor. Kişisel sınav yerini daha sonra kendi giriş belgenizden öğrenin."
    ],
    actions: ["Resmî kartlı ödeme ekranında sınav, dil ve merkez seçimini kontrol edin.", "Kontenjan varsa başvuru/ödeme işlemini tamamlayıp kendi kaydınızı kontrol edin."],
    actionUrl: "https://sanalpos.osym.gov.tr/", actionLabel: "ÖSYM kartlı ödeme ekranını aç",
    relatedPathKeys: [], relatedSearches: ["e YDS 11 Farsça İngilizce", "e YDS kontenjan"],
    sources: [source("30 Eylül: e-YDS/11 başvuru ve erken kapanma koşulu", "https://www.osym.gov.tr/e-yds-202611-farscaingilizce-basvurularin-alinmasi"), source("AİS e-YDS/11 ücret ve ödeme bağlantısı", ais)]
  }
];
