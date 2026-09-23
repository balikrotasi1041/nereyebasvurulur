import type { RouteRecord, Source } from "./data";

const source = (title: string, url: string, authority: string): Source => ({ title, url, authority });
const msuGuide = source("2026 ÖSYM/MSB kılavuzu, ikinci seçim aşamaları (bölüm 12-13)", "https://dokuman.osym.gov.tr/pdfdokuman/2026/MSU/kilavuz_msd06012026.pdf", "ÖSYM / Millî Savunma Bakanlığı");
const msbBridge = "https://www.turkiye.gov.tr/msb-personel-ve-ogrenci-temin-sistemi-5958";
const btkGuide = "https://static.turkiye.gov.tr/downloads/kurumlar/btk/BTK_KayipCalintiIhbarBildirimi_Kilavuz.pdf";
const btkFaq = "https://tuketici.btk.gov.tr/kayip-calinti-islemleri";
const btkReport = "https://www.turkiye.gov.tr/btk-kayip-calinti-ihbar-bildirimi";
const btkCancel = "https://www.turkiye.gov.tr/btk-kayip-calinti-ihbar-sorgulama-iptal";

// These are scoped content reviews, not a blanket re-verification of legislation.
export function applySeptember22PilotContent(route: RouteRecord): RouteRecord {
  if (route.slug === "milli-savunma-universitesi-ikinci-secim-asamalari-nereye-basvurulur") return {
    ...route,
    summary: "MSÜ ikinci seçim aşamasında ilk adres MSB Personel Temin Sistemindeki kişisel çağrıdır. Bu rehber çağrılan adayın evrak ve seçim hazırlığını anlatır; ÖSYM sınav başvurusunu yeniden yaptırmaz.",
    competentAuthorities: ["Millî Savunma Bakanlığı Personel Temin Daire Başkanlığı / Millî Savunma Üniversitesi"],
    applicationChannels: [
      { type: "official-portal", label: "MSB Personel Temin Sistemi: kişisel çağrı ve evrak", url: "https://personeltemin.msb.gov.tr/" },
      { type: "e-government", label: "e-Devlet MSB Personel ve Öğrenci Temin Sistemi", url: msbBridge }
    ],
    requiredDocuments: ["Fotoğraflı, T.C. kimlik numaralı kimlik", "Kişisel çağrı ve o çağrıda yayımlanan belge listesi", "Beyanları doğrulayan, MSB'nin istediği evrak"],
    evidenceChecklist: ["Çağrının yılı, okul grubu, tarih, saat ve yeri", "Evrakın eksiksizliği ve varsa tamamlama süresi", "Seçim sonucu ile kayıt hakkının ayrı kontrolü"],
    steps: [
      "MSB ekranında kendi çağrınızı kontrol edin; yalnız MSÜ puanına sahip olmak çağrılmak değildir.",
      "Çağrıdaki evrak listesini hazırlayın; eksik belge için bildirilen tamamlama süresini kaçırmayın.",
      "2026 kılavuzunda evrak, fiziki değerlendirme, kişilik testi, fiziki yeterlilik ve mülakat ayrı aşamalardır. Hava Harp Okulu ve Bando adaylarının ilave aşamalarını ayrıca okuyun.",
      "Sağlık sevki, seçim sonucu ve kayıt talimatını MSB'den izleyin; aşamaya katılmayı kesin kayıt saymayın."
    ],
    deadlineAndAppeal: "Çağrı, evrak ve itiraz süreleri aşamaya özgüdür. ÖSYM sınav itiraz süresini MSB seçimine uygulamayın; olumsuz işlemde güncel MSB kılavuzunu ve bildirilen başvuru yolunu gecikmeden kontrol edin.",
    escalation: ["MSB kişisel çağrı ve ilgili seçim aşaması açıklaması", "İşleme özgü resmî itiraz yolu; gerekiyorsa hukuki destek"],
    locationLogic: "Seçim yeri ve saati için kişisel MSB çağrısını esas alın; ÖSYM sınav merkeziyle karıştırmayın.",
    legalBasis: ["2026 ÖSYM/MSB askerî öğrenci temini kılavuzu, bölüm 12-13"],
    sources: [msuGuide, source("MSB Personel ve Öğrenci Temin Sistemi", msbBridge, "e-Devlet / MSB")],
    currentCycleNote: "22 Eylül 2026: 2026 kılavuzundaki aşamalar incelendi. MSB canlı duyuruları erişim hatası nedeniyle doğrulanamadı; yeni çağrı veya açık/kapalı dönem ilan edilmiyor.",
    caution: "Kişisel çağrı ve güncel ek duyuru ayrıca kontrol gerektirir; 2026 koşulları sonraki yıla taşınmaz.",
    verificationStatus: "local-check",
    lastVerified: "2026-09-22",
    applicationTiming: "periodic",
    eGovernmentAvailable: true,
    petitionRequired: false,
    sourceConflicts: []
  };

  if (route.intentKey === "telecom.lost-stolen-imei-block") return {
    ...route,
    summary: "Kayıp/çalıntı cihazı haberleşmeye kapatmak için hattın yasal sahibi e-Devlet BTK ihbar hizmetini veya 120'yi kullanır. IMEI ihbarı, SIM hattını kapatma ve cihazı buldurma ayrı işlemlerdir.",
    applicationChannels: [
      { type: "e-government", label: "BTK Kayıp/Çalıntı İhbar Bildirimi", url: btkReport },
      { type: "phone", label: "BTK Tüketici İletişim Merkezi 120", note: "Telefonla cihaz ihbarı; aynı kanaldan iptal" },
      { type: "e-government", label: "e-Devlet ihbarını sorgula veya iptal et", url: btkCancel },
      { type: "in-person", label: "Cihazın bulunması veya suç bildirimi için kolluk / adli merciler" }
    ],
    requiredDocuments: ["15 haneli IMEI", "Hattın yasal sahibinin kimlik doğrulaması ve operatör bilgisi", "Olay bilgileri; gerektiğinde sahiplik belgeleri"],
    evidenceChecklist: ["IMEI ve operatör eşleşmesi", "İhbarın yalnız gönderildiği değil onaylandığı", "İhbarın hangi kanaldan yapıldığı"],
    steps: [
      "IMEI'yi ve hattın yasal sahibini belirleyin; e-Devlet veya 120 üzerinden cihaz ihbarı yapın.",
      "SIM hattını kapatmak için operatörle ayrıca işlem yapın; IMEI ihbarı hattı kapatmaz. Hesaplarınızı güvene alın.",
      "İhbar sonucunu sorgulayın. BTK cihazı bulup teslim etmez; bu talep için kolluk/adli mercilere başvurun.",
      "Cihaz bulunursa e-Devlet ihbarını e-Devlet'ten, telefon ihbarını 120'den iptal ettirin. Adli kapatma için ilgili adli merci gerekir."
    ],
    locationLogic: "IMEI ihbarı BTK/e-Devlet üzerinden yürür; tüketici hakem heyeti başvurusu değildir. Operatör ayrı SIM hattı işleminin muhatabıdır.",
    deadlineAndAppeal: "Gecikmeden ihbar edin ve onayı kontrol edin. Açtırma işlemi ihbar kanalına bağlıdır; adli kapatmayı e-Devlet iptaliyle kaldırabileceğinizi varsaymayın.",
    escalation: ["İhbar durumu için e-Devlet sorgulama veya BTK 120", "Telefon ihbarının iptali için yine 120", "Adli kapatma veya cihazın bulunması için kolluk/adli merci"],
    caution: "Hiç SIM takılmamış cihazda standart ihbar yolu yetmeyebilir: BTK SSS'deki yazılı başvuru ve belge koşullarını kontrol edin.",
    applicationCost: { summary: "e-Devlet BTK ihbar kılavuzuna göre bu hizmet için ek ücret veya vergi alınmıyor. Operatörün ayrı SIM işlemleri bu açıklamanın kapsamında değildir.", sourceUrls: [btkGuide], verifiedAt: "2026-09-22" },
    sources: [source("BTK kayıp/çalıntı işlemleri SSS", btkFaq, "BTK"), source("Kayıp/Çalıntı İhbar Bildirimi kılavuzu", btkGuide, "e-Devlet / BTK"), source("İhbar hizmeti", btkReport, "e-Devlet / BTK"), source("İhbar sorgulama ve iptal hizmeti", btkCancel, "e-Devlet / BTK"), ...route.sources.filter(item => item.url.includes("mevzuat.gov.tr"))],
    currentCycleNote: "22 Eylül 2026: BTK uygulama SSS'si, e-Devlet hizmetleri ve kılavuzu doğrulandı. 5809 sayılı Kanunun güncel metnine erişim sonuçlandırılamadı; burada yeni yaptırım veya kanuni süre ilan edilmiyor.",
    verificationStatus: "local-check",
    lastVerified: "2026-09-22"
  };

  if (route.slug === "cimer-cimer-basvurusu-nereye-basvurulur") return {
    ...route,
    summary: "CİMER, kamu kurumuna iletilecek istek, şikâyet ve bilgi edinme başvurusunu alıp takip etmeyi sağlar. Resmî site/e-Devlet üzerinden başvurabilir, ALO 150'yi kullanabilirsiniz. Acil ihbar için CİMER cevabı beklenmez; 112 aranır.",
    applicationChannels: [...route.applicationChannels, { type: "phone", label: "ALO 150: CİMER başvuru ve takip" }],
    requiredDocuments: ["Resmî kanalda kimlik doğrulaması ve iletişim bilgileri", "Olayı, ilgili kurumu ve talebi açıklayan metin", "Varsa konuyu destekleyen belge"],
    evidenceChecklist: ["Başvuru türü ve somut talep", "Gönderilen metin ve eklerin son hâli", "Başvuru numarası, sevk edilen kurum ve cevap tarihi"],
    steps: [
      "Talebinizi ayırın: bir işlemin yapılmasını mı, yoksa kurumdaki bilgi/belgeye erişmeyi mi istiyorsunuz? CİMER özel hukuk uyuşmazlığını karara bağlayan bir mahkeme değildir.",
      "cimer.gov.tr veya e-Devlet'ten giriş yapın; konuyu ve istediğiniz sonucu açıkça yazıp ilgili belgeleri ekleyin.",
      "Ön izlemeyi kontrol ederek başvuruyu tamamlayın. Başvuru numarasını saklayın; formu açmak gönderim değildir.",
      "Başvuru Sorgula ekranından hangi kuruma sevk edildiğini ve cevabı izleyin; ALO 150'den de durum bilgisi alın."
    ],
    deadlineAndAppeal: "Resmî CİMER rehberi istek/şikâyette 30 gün, bilgi edinmede genel olarak 15 iş günü cevap süresini anlatır. Bunlar CİMER başvurusu için dönem sonu değildir. Uzama, ret ve itirazda güncel mevzuatı ayrıca kontrol edin; CİMER takibinin başka bir başvuru/dava süresini koruduğunu varsaymayın.",
    escalation: ["Başvuru numarasıyla sevk edilen kurum ve cevabı sorgulama", "Cevap verilmemişse bu durumu CİMER üzerinden bildirme", "Ret veya uyuşmazlıkta işleme özgü resmî başvuru yolunu ayrıca kontrol etme"],
    locationLogic: "CİMER kaydı ilgili kamu kurumuna yönlendirilir; kaydın hangi kuruma sevk edildiğini sorgulama ekranından izleyin.",
    legalBasis: [...route.legalBasis, "Bilgi edinme türündeki başvurular için 4982 sayılı Bilgi Edinme Hakkı Kanunu"],
    sources: [...route.sources, source("CİMER resmî başvuru, sorgulama ve güvenlik uyarıları", "https://www.cimer.gov.tr/", "Cumhurbaşkanlığı İletişim Başkanlığı"), source("CİMER e-Devlet hizmeti", "https://www.turkiye.gov.tr/cumhurbaskanligi-iletisim-merkezi", "e-Devlet / İletişim Başkanlığı")],
    caution: "CİMER, resmî sosyal medya hesabı olmadığını duyuruyor. Kimlik ve başvuru bilgilerinizi taklit hesaplara göndermeyin; yalnız resmî kanalı kullanın.",
    currentCycleNote: "22 Eylül 2026: resmî başvuru ekranı, e-Devlet köprüsü ve 50 Soruda CİMER rehberi incelendi. Güncel mevzuat erişimi sonuçlandırılamadı; özel süre ve hukuki uyuşmazlık ayrıca inceleme gerektirir.",
    verificationStatus: "local-check",
    lastVerified: "2026-09-22",
    applicationTiming: "continuous"
  };
  return route;
}
