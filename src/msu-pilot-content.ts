import type { RouteRecord, Source } from "./data";

const guideUrl = "https://dokuman.osym.gov.tr/pdfdokuman/2026/MSU/kilavuz_msd06012026.pdf";
const guideSources: Source[] = [
  { title: "2026-MSÜ sınavı ve askerî öğrenci temini kılavuzu", url: guideUrl, authority: "ÖSYM / Millî Savunma Bakanlığı" },
  { title: "2026-MSÜ kılavuz ve başvuru bilgileri", url: "https://www.osym.gov.tr/2026msu-kilavuz-ve-basvuru-bilgileri", authority: "ÖSYM" },
  { title: "ÖSYM Aday İşlemleri Sistemi", url: "https://ais.osym.gov.tr/", authority: "ÖSYM" },
  { title: "MSB Personel ve Öğrenci Temin Sistemi e-Devlet köprüsü", url: "https://www.turkiye.gov.tr/msb-personel-ve-ogrenci-temin-sistemi-5958", authority: "e-Devlet / Millî Savunma Bakanlığı" }
];
const pilotSlugs = new Set([
  "msu-askeri-ogrenci-basvurusu-nereye-yapilir",
  "milli-savunma-universitesi-harp-okullari-nereye-basvurulur",
  "milli-savunma-universitesi-msu-tercih-islemleri-nereye-basvurulur"
]);

export function applyMsuPilotContent(route: RouteRecord): RouteRecord {
  if (!pilotSlugs.has(route.slug)) return route;
  const common: RouteRecord = {
    ...route,
    sources: guideSources,
    lastVerified: "2026-09-19",
    verificationStatus: "local-check",
    applicationTiming: "periodic",
    legalBasis: ["ÖSYM ile MSB arasında yürütülen 2026-MSÜ sınavı ve askerî öğrenci temini kılavuzu", "İşlem türüne göre ilgili yılın ÖSYM/MSB düzenlemeleri"],
    deadlineAndAppeal: "ÖSYM sınav işlemi, MSB okul tercihi ve kişisel seçim çağrısı ayrı aşamalardır. Süre veya itirazda işlemi yapan kurumun o aşamaya ait güncel kılavuzunu/duyurusunu gecikmeden kontrol edin; başka aşamanın süresi uygulanmaz. İdari başvurunun dava süresini koruduğunu varsaymayın.",
    escalation: ["ÖSYM sınav başvurusu veya sonucu için ilgili sınav kılavuzundaki inceleme kanalı", "MSB tercih, çağrı ve kayıt uyuşmazlığı için Personel Temin Sistemi duyurusundaki iletişim/başvuru yolu", "Hukuki süre veya ret halinde işleme özgü resmî düzenleme ve gerekiyorsa hukuki destek"],
    currentCycleNote: "19 Eylül 2026: içerikteki aşama ayrımı 2026 ÖSYM/MSB kılavuzundan yeniden incelendi. Kılavuzdaki 5-29 Ocak başvurusu ve 1 Mart sınavı geçmiş dönem bilgileridir. MSB Personel Temin canlı duyuruları erişim hatası nedeniyle bu kontrolde sonuçlandırılamadı; yeni tercih, ek çağrı veya kayıt döneminin açık/kapalı olduğu burada ilan edilmiyor. Kişisel işlem için MSB ekranını kontrol edin.",
    caution: "2026 kılavuzundaki koşullar sonraki yıla taşınmaz. Güncel MSB ek duyuruları ve kişisel çağrı/kayıt süresi ayrıca kontrol gerektirir.",
    locationLogic: "ÖSYM sınav merkezi ile MSB seçim aşamasının yeri aynı şey değildir. Yer ve saat kişisel sınava giriş/çağrı belgesinden öğrenilir.",
    eGovernmentAvailable: true,
    petitionRequired: false,
    sourceConflicts: []
  };
  const msbChannel = { type: "official-portal" as const, label: "MSB Personel Temin Sistemi (okul tercihi ve çağrı)", url: "https://personeltemin.msb.gov.tr/" };
  const msbBridge = { type: "e-government" as const, label: "e-Devlet MSB Personel ve Öğrenci Temin Sistemi", url: "https://www.turkiye.gov.tr/msb-personel-ve-ogrenci-temin-sistemi-5958" };
  const osymChannel = { type: "official-portal" as const, label: "ÖSYM AİS (MSÜ ve YKS sınav işlemleri)", url: "https://ais.osym.gov.tr/" };

  if (route.slug === "msu-askeri-ogrenci-basvurusu-nereye-yapilir") return {
    ...common,
    summary: "MSÜ'ye ilk kez aday olacak kişi sınav başvurusunu ÖSYM AİS'ten yapar. Okul tercihi, ikinci seçim çağrısı ve askerî okul kaydı ise ayrı MSB aşamalarıdır. MSÜ sınavına girmek veya ücret yatırmak tek başına askerî okula başvurunun bütün aşamalarını tamamlamaz.",
    competentAuthorities: ["ÖSYM (ilk MSÜ sınav başvurusu)", "Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı (tercih ve seçim)"] ,
    applicationChannels: [osymChannel, msbChannel, msbBridge],
    requiredDocuments: ["ÖSYM aday kaydı ve kimlik bilgileri", "AİS'te geçerli fotoğraf ve eğitim bilgisi; sistemin yönlendirdiği durumda başvuru merkezine sunulacak belgeler", "Başvuru kayıt bilgisi ve varsa ilgili sınav ücretinin ödeme kaydı"],
    evidenceChecklist: ["MSÜ başvurusu ile YKS başvurusunun ayrı ayrı tamamlandığı", "Hedef okul için gereken YKS oturumlarının seçildiği", "Sonraki MSB tercih duyurusunun ve kişisel çağrının ayrıca takip edildiği"],
    steps: [
      "Önce ilgili yılın MSÜ kılavuzunda adaylık şartlarını ve AİS bilgilerinizin durumunu kontrol edin; gerekiyorsa ÖSYM başvuru merkezine başvurun.",
      "AİS'te MSÜ başvurunuzu tamamlayın. Ücret yükümlülüğünüz varsa süresinde ödeyin; yalnız ödeme yapmak başvuru yerine geçmez.",
      "YKS başvurusunu ayrıca yürütün: 2026 kılavuzunda Harp Okulları için TYT ve AYT, Astsubay MYO için TYT aranıyor.",
      "MSB'nin ilan ettiği dönemde okul tercihinizi yapın; ardından kendi seçim çağrınızı, evrakınızı ve kayıt aşamanızı izleyin."
    ],
    applicationCost: { summary: "2026 MSÜ kılavuzunda sınav ücreti 700 TL, geç başvuru ücreti yüzde 50 artırımlıdır; bunlar geçmiş dönemin tutarlarıdır. Muafiyet ve sonraki yıl ücretini kendi aday kaydınızdan ve yeni kılavuzdan doğrulayın. YKS ayrı sınav işlemidir.", sourceUrls: [guideUrl], verifiedAt: "2026-09-19" }
  };
  if (route.slug === "milli-savunma-universitesi-harp-okullari-nereye-basvurulur") return {
    ...common,
    summary: "Harp Okulları için okul seçimi ve askerî öğrenci temini MSB Personel Temin Sistemi üzerinden izlenir. Kara, Deniz ve Hava Harp Okulları lisans düzeyinde subay yetiştirir; Astsubay Meslek Yüksekokulları ayrı bir eğitim ve yerleştirme grubudur. İlk sınav başvurusu için ayrıca MSÜ genel rehberini kullanın.",
    competentAuthorities: ["Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı / Millî Savunma Üniversitesi", "ÖSYM (MSÜ ve gerekli YKS sınavları)"] ,
    applicationChannels: [msbChannel, msbBridge, osymChannel],
    requiredDocuments: ["Kimlik ve MSÜ aday/sonuç bilgileri", "İlgili yıl TYT ve AYT bilgileri", "Lise mezuniyet bilgisi veya kılavuzdaki tarihe kadar mezun olabilecek öğrenci kaydı"],
    evidenceChecklist: ["Yaş, öğrenim ve diğer adaylık koşullarının ilgili yıl kılavuzuna uygunluğu", "Tercih edilecek okulun çağrı puan türü", "Sağlık ve seçim koşullarının okul türüne göre kontrolü"],
    steps: [
      "Hedefinizi belirleyin: Kara, Deniz veya Hava Harp Okulu. 2026 kılavuzunda Kara Ankara'da, Deniz ve Hava İstanbul'da; hazırlık dâhil eğitim süresi beş yıl olarak açıklanıyor.",
      "MSÜ sınav puanıyla seçim aşamasına çağrılmayı YKS yerleştirme değerlendirmesiyle karıştırmayın. Harp Okulları için TYT ve AYT şartını kontrol edin.",
      "Okul tercihlerinizi MSB ekranından yapın. 2026 çağrı tablosunda Kara için sayısal/eşit ağırlık/sözel, Deniz ve Hava için sayısal MSÜ puan türleri gösteriliyor; kişisel çağrı için güncel taban puan ve kontenjan duyurusu gerekir.",
      "Çağrılıysanız okulunuza özgü seçim, sağlık ve kayıt belgelerini kişisel duyurudan hazırlayın. Genel okul bilgisi kayıt hakkı vermez."
    ]
  };
  return {
    ...common,
    summary: "MSÜ okul tercihi ÖSYM'nin YKS tercih ekranında değil, MSB Personel Temin Sisteminde yapılır. Bu sayfa MSÜ sınavına katılıp puanı hesaplanan adayın okul tercih aşamasını anlatır; yeniden MSÜ sınav başvurusuna yönlendirmez.",
    competentAuthorities: ["Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı / Millî Savunma Üniversitesi"],
    applicationChannels: [msbChannel, msbBridge],
    requiredDocuments: ["MSB/e-Devlet aday girişi için kimlik doğrulama bilgileri", "MSÜ sonuç ve aday kaydı", "Öncelik sırasına konmuş okul tercih listesi", "Özel statü beyan ediliyorsa kılavuzun istediği doğrulayıcı belge"],
    evidenceChecklist: ["Doğru yıl ve okul grubunun seçildiği", "Tercihlerin ekranda kaydedilmiş son hâlinin kontrol edildiği", "Tercih sonrası kişisel seçim çağrısının ayrıca izlendiği"],
    steps: [
      "MSB'nin ilgili yıl tercih duyurusunda başlangıç, bitiş ve aday koşullarını kontrol edin; ilan yayımlandı diye ekranın açıldığını varsaymayın.",
      "MSB Personel Temin Sisteminde okul tercihlerinizi öncelik sırasına koyun. Harp Okulları ve Astsubay MYO kendi içinde ayrı değerlendiriliyor.",
      "Tercih kaydını tamamlayıp yeniden görüntüleyin; yalnız giriş yapmak veya MSÜ sınav sonucuna sahip olmak tercih yapmak değildir.",
      "Tercihten sonra MSB'nin kişisel çağrısını izleyin. 2026 kılavuzuna göre ilan edilen sürede tercih yapmayan aday ikinci seçim aşamalarına çağrılmıyor; posta çağrısı beklemeyin."
    ]
  };
}
