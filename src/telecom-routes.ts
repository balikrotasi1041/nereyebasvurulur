import type { ApplicationChannel, Source } from "./data";
import type { RouteDraft } from "./route-catalog";

const src = (title: string, url: string, authority: string): Source => ({ title, url, authority });
const eGov = (label: string, url: string, note?: string): ApplicationChannel => ({ type: "e-government", label, url, note });
const portal = (label: string, url: string, note?: string): ApplicationChannel => ({ type: "official-portal", label, url, note });
const phone = (label: string, note?: string): ApplicationChannel => ({ type: "phone", label, note });
const office = (label: string, note?: string): ApplicationChannel => ({ type: "in-person", label, note });

const LAW_5809 = src("5809 sayılı Elektronik Haberleşme Kanunu", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5809.pdf", "Mevzuat Bilgi Sistemi");
const LAW_6502 = src("6502 sayılı Tüketicinin Korunması Hakkında Kanun", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6502.pdf", "Mevzuat Bilgi Sistemi");
const BTK_RULES = src("BTK Elektronik Haberleşme Tüketici Mevzuatı", "https://tuketici.btk.gov.tr/yonetmelik", "Bilgi Teknolojileri ve İletişim Kurumu");
const BTK_COMPLAINT_RULES = src("Tüketici ve Kullanıcı Şikâyetlerinin Çözümlenmesine İlişkin Usul ve Esaslar", "https://www.btk.gov.tr/uploads/boarddecisions/tuketici-ve-kullanici-sikayetlerinin-isletmeciler-ve-posta-hizmet-saglayicilari-tarafindan-cozumlenmesine-iliskin-usul-ve-esaslar/162-2018-web.pdf", "Bilgi Teknolojileri ve İletişim Kurumu");
const BTK_COMPLAINT = src("BTK Tüketici Şikâyet Bildirim Sistemi", "https://www.turkiye.gov.tr/btk-tuketici-sikayet-bildirim-sistemi-4764", "e-Devlet / Bilgi Teknolojileri ve İletişim Kurumu");
const BTK_INTERNET = src("İnternet Hizmetleri Tüketici Rehberi", "https://tuketici.btk.gov.tr/internet-hizmetleri", "Bilgi Teknolojileri ve İletişim Kurumu");
const BTK_MOBILE = src("Mobil Hizmetler Tüketici Rehberi", "https://tuketici.btk.gov.tr/mobil", "Bilgi Teknolojileri ve İletişim Kurumu");
const SUBSCRIPTION_GUIDE = src("Abonelik Sözleşmeleri Hakkında Bilgilendirme", "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/abonelik-sozlesmeleri-hakkinda-bilgilendirme", "Ticaret Bakanlığı");
const HIGH_BILL = src("Kullanım Miktarı Sınırlı Hizmetler ve Fatura Üst Sınırı", "https://tuketici.btk.gov.tr/haberler/kullanim-miktari-sinirli-hizmetler-ile-fatura-ust-sinir-uygulamasina-iliskin-usul-ve-esaslar", "Bilgi Teknolojileri ve İletişim Kurumu");
const VALUE_ADDED = src("Katma Değerli Elektronik Haberleşme Hizmetlerinde Tüketici Hakları", "https://tuketici.btk.gov.tr/haberler/katma-degerli-elektronik-haberlesme-hizmetlerinin-sunumunda-tuketici-haklarinin-korunmasina-iliskin-usul-ve-esaslar", "Bilgi Teknolojileri ve İletişim Kurumu");
const OPEN_LINES = src("Açık Hatlar ve Mobil Hat Sorgulama Rehberi", "https://tuketici.btk.gov.tr/haberler/acik-hatlar-aboneligin-guncellestirilmesi-ve-mobil-hat-sorgulama-hizmetine-iliskin-rehber-dokuman-yayimlandi", "Bilgi Teknolojileri ve İletişim Kurumu");
const IMEI_GUIDE = src("Kayıp/Çalıntı İhbar Bildirimi Kılavuzu", "https://static.turkiye.gov.tr/downloads/kurumlar/btk/BTK_KayipCalintiIhbarBildirimi_Kilavuz.pdf", "e-Devlet / Bilgi Teknolojileri ve İletişim Kurumu");
const TUBIS = src("Tüketici Hakem Heyetlerine Başvuru İşlemi", "https://www.turkiye.gov.tr/tuketici-sikayeti-uygulamasi", "e-Devlet / Ticaret Bakanlığı");
const THH_INFO = src("Tüketici Hakem Heyetlerine İlişkin Bilgilendirme", "https://ticaret.gov.tr/tuketici/tuketici-hakem-heyetleri/tuketici-hakem-heyetlerine-iliskin-bilgilendirme-metni", "Ticaret Bakanlığı");

const operator: ApplicationChannel = {
  type: "other",
  label: "İşletmecinin kendi ispatlanabilir yazılı şikâyet kanalı",
  note: "Önce abonesi olduğunuz işletmecinin resmî kanalında kayıt açın; tek bir ortak işletmeci başvuru bağlantısı yoktur."
};
const btkComplaint = eGov("BTK Tüketici Şikâyet Bildirim Sistemi", BTK_COMPLAINT.url, "İşletmeci kaydı ve cevabıyla BTK sürecini başlatın veya sürdürün");
const tubis = eGov("TÜBİS · parasal tüketici uyuşmazlığı", TUBIS.url, "İade/bedel uyuşmazlığı yıllık görev sınırının altındaysa");

const common = {
  parentHub: "telefon-internet-haberlesme",
  verificationStatus: "verified" as const,
  competentAuthorities: ["Yetkilendirilmiş elektronik haberleşme işletmecisi", "Bilgi Teknolojileri ve İletişim Kurumu", "Parasal tüketici uyuşmazlığında Tüketici Hakem Heyeti veya tüketici mahkemesi"],
  locationLogic: "İlk merci abone olunan veya hizmet talep edilen işletmecidir. BTK ve e-Devlet kanalları ülke genelindedir; Tüketici Hakem Heyeti için tüketicinin yerleşim yeri veya işlemin yapıldığı yer yetkisi uygulanır.",
  legalBasis: ["5809 sayılı Elektronik Haberleşme Kanunu", "Elektronik Haberleşme Sektörüne İlişkin Tüketici Hakları Yönetmeliği", "6502 sayılı Tüketicinin Korunması Hakkında Kanun"],
  freshnessRisk: "medium" as const,
  urgency: "time-limited" as const,
  reviewCadence: 90,
  eGovernmentAvailable: true,
  sourceConflicts: [] as string[],
  lastVerified: "2026-08-23"
};

export function telecomDraft(ctx: { label: string }): RouteDraft {
  if (ctx.label === "Altyapı") return {
    ...common,
    title: "Telefon veya internet altyapısı yoksa nereye başvurulur?",
    summary: "Adres için önce hizmet sunabilecek işletmeciye altyapı talebi açın; başvuru cevabı veya çözümsüz kayıtla BTK Tüketici Şikâyet Bildirim Sistemine geçin.",
    aliases: ["internet altyapısı yok", "fiber altyapı talebi", "telefon altyapısı başvurusu"],
    intentKey: "telecom.infrastructure-request",
    canonicalIntent: "telecom.infrastructure-request",
    applicationChannels: [operator, btkComplaint],
    requiredDocuments: ["Açık adres ve bina/bağımsız bölüm bilgisi", "Talep edilen hizmet", "İşletmeci başvuru numarası ve cevap", "Varsa komşu/bina altyapı bilgisi"],
    evidenceChecklist: ["Adres sorgu sonucunu kaydedin", "Her işletmeci başvurusunun numarasını alın", "Port/bina tesisatı gerekçesini yazılı isteyin", "BTK başvurusuna önceki cevabı ekleyin"],
    deadlineAndAppeal: "Genel altyapı talebi için tek hak düşürücü son gün yoktur. İşletmeci şikâyeti kural olarak 10 iş gününde; tekrarlanan şikâyet 5 iş gününde cevaplanır. Cevaptan sonra sistemdeki itiraz/tekrar penceresini kaçırmayın.",
    escalation: ["İşletmeci altyapı/şikâyet kaydı", "BTK Tüketici Şikâyet Bildirim Sistemi", "Somut sözleşme veya bedel uyuşmazlığında tüketici yolu"],
    steps: ["Açık adresle işletmecilerin altyapı sorgusunu yapın.", "Seçtiğiniz işletmeciye resmî talep açıp kayıt numarası alın.", "Teknik gerekçe ve öngörülen tarihi yazılı isteyin.", "Çözülmezse önceki kayıt ve cevapla BTK sistemine başvurun."],
    sources: [LAW_5809, BTK_RULES, BTK_COMPLAINT_RULES, BTK_COMPLAINT, BTK_INTERNET],
    petitionRequired: false,
    petitionReference: { subject: "Elektronik haberleşme altyapı talebi", authority: "İlgili Elektronik Haberleşme İşletmecisi", suggestedType: "Altyapı talep ve şikâyet dilekçesi" }
  };

  if (ctx.label === "Hizmet sorunu") return {
    ...common,
    title: "Telefon, internet veya fatura sorunu için nereye başvurulur?",
    summary: "Hatalı fatura, iptal, cayma bedeli, izinsiz taahhüt/servis, hız ve kesinti sorunlarında önce işletmeciye delilli kayıt açın; düzenleyici şikâyeti BTK'ya, para iadesi uyuşmazlığını yıllık sınıra göre tüketici yoluna taşıyın.",
    aliases: [
      "Telefon faturam haksız yere yüksek geldi",
      "GSM faturama kullanmadığım hizmet yansıtıldı",
      "İnternet faturam yanlış geldi",
      "İnternet aboneliğimi iptal edemiyorum",
      "Haksız cayma bedeli çıkarıldı",
      "Taahhüt bilgim dışında yenilendi",
      "İnternet hızı sözleşmedeki hızdan çok düşük",
      "İnternet sürekli kesiliyor",
      "Haberim olmadan ücretli servise abone edildim",
      "Paket aşımı nedeniyle yüksek fatura geldi"
    ],
    intentKey: "telecom.billing-service-disputes",
    canonicalIntent: "telecom.billing-service-disputes",
    applicationChannels: [
      operator,
      eGov("e-Devlet Abonelik Fesih Başvurusu", "https://www.turkiye.gov.tr/btk-abonelik-fesih-basvurusu", "Uygun işletmeci aboneliklerini doğrudan feshetme"),
      btkComplaint,
      eGov("Borç/Alacak Sorgulama ve Ödeme/İade İşlemleri", "https://www.turkiye.gov.tr/btk-mobil-sabit-internet-kablo-tv-uydu-isletmecilerinden-borc-ve-alacak-sorgulama", "İşletmecide görünen borç veya alacağı sorgulama"),
      tubis
    ],
    requiredDocuments: ["Abone/hizmet numarası", "Fatura ve ayrıntılı kullanım dökümü", "Sözleşme/taahhütname ve taahhüt özeti", "Hız/kesinti ölçümleri veya servis kayıtları", "İşletmeci şikâyet numarası ve cevap"],
    evidenceChecklist: ["Sorunlu fatura dönemini ve kalemini işaretleyin", "%80/%100 kullanım uyarılarını saklayın", "Fesih veya taahhüt onay kaydını isteyin", "Hız testlerini farklı gün/saatlerde tarihli alın", "Kesintileri ve arıza numaralarını kronolojik tutun"],
    deadlineAndAppeal: "Hatalı faturaya düzenlenme tarihinden itibaren bir yıl içinde itiraz edilebilir; sağlayıcı kural olarak 30 günde sonuçlandırır. Elektronik haberleşme fesih talebinde ücretlendirme 24 saat içinde durmalı ve fesih 7 gün içinde tamamlanmalıdır. İşletmeci şikâyeti 10 iş günü, tekrarı 5 iş günü içinde cevaplanır.",
    escalation: ["İşletmeciye yazılı itiraz/arıza/fesih kaydı", "BTK sisteminde şikâyet, tekrar ve itiraz", "Parasal iade için yıllık sınırın altında Tüketici Hakem Heyeti", "Sınırın üzerinde dava şartı arabuluculuk ve tüketici mahkemesi"],
    steps: ["Sorunu fatura, fesih, taahhüt, hız/kesinti veya izinsiz servis olarak sınıflandırın.", "Sözleşme, fatura, kullanım/ölçüm ve onay kayıtlarını indirin.", "İşletmeciye açık talep içeren yazılı şikâyet gönderin.", "Çözülmezse BTK sisteminde önceki kayıtla şikâyeti sürdürün.", "Bedel iadesi gerekiyorsa merkezi parasal sınıra göre TÜBİS veya arabuluculuk yoluna geçin."],
    sources: [LAW_5809, LAW_6502, BTK_RULES, BTK_COMPLAINT_RULES, BTK_COMPLAINT, BTK_INTERNET, BTK_MOBILE, SUBSCRIPTION_GUIDE, HIGH_BILL, VALUE_ADDED, TUBIS, THH_INFO],
    thresholdKey: "consumer-dispute-thh",
    petitionRequired: false,
    petitionReference: { subject: "Elektronik haberleşme hizmet/fatura itirazı", authority: "İlgili Elektronik Haberleşme İşletmecisi", suggestedType: "Abonelik itiraz ve iade talep dilekçesi", note: "BTK ve TÜBİS çevrim içi formları kullanılıyorsa alanlara uyarlayın." }
  };

  if (ctx.label === "Numara / hat işlemleri") return {
    ...common,
    title: "Telefon hattı, numara taşıma veya izinsiz abonelik için nereye başvurulur?",
    summary: "Hat iptali, numara taşıma ve adınıza bilginiz dışında açılan hatlarda önce e-Devlet sorgularıyla kaydı doğrulayın; işletmeciye düzeltme/fesih başvurusu ve gerekirse BTK şikâyeti yapın.",
    aliases: [
      "Telefon hattımı iptal edemiyorum",
      "Numara taşıma işlemi yapılmıyor",
      "Telefon hattım bilgim dışında açıldı"
    ],
    intentKey: "telecom.number-line-identity",
    canonicalIntent: "telecom.number-line-identity",
    applicationChannels: [
      eGov("Mobil Hat Sorgulama", "https://www.turkiye.gov.tr/mobil-hat-sorgulama", "Adınıza kayıtlı mobil hatları kontrol edin"),
      eGov("Numara Taşıma Sorgulama", "https://www.turkiye.gov.tr/btk-numara-tasima", "Taşıma durumunu görüntüleyin"),
      eGov("Abonelik Fesih Başvurusu", "https://www.turkiye.gov.tr/btk-abonelik-fesih-basvurusu"),
      operator,
      btkComplaint,
      tubis
    ],
    requiredDocuments: ["Kimlik ve e-Devlet hat sorgu sonucu", "Hat/numara ve işletmeci bilgisi", "Fesih veya numara taşıma talep formu", "İşletmeci kayıt numarası/ret gerekçesi", "Bilginiz dışındaki abonelikte imza/onay kayıt talebi"],
    evidenceChecklist: ["Adınıza kayıtlı tüm hatların ekran görüntüsünü alın", "Taşıma/fesih talep tarihini saklayın", "Ret kodu ve gerekçesini yazılı isteyin", "Bilginiz dışındaki abonelikte sözleşme ve kimlik doğrulama kaydını talep edin", "Maddi kayıp ve kimlik kötüye kullanımı belirtilerini ayrı listeleyin"],
    deadlineAndAppeal: "Fesih talebinde ücretlendirme 24 saat içinde durmalı ve fesih 7 gün içinde tamamlanmalıdır. İşletmeci şikâyeti 10 iş günü, tekrarı 5 iş gününde cevaplanır. Kimlik kötüye kullanımı veya icra tebligatı varsa ilgili özel süre beklenmeden kontrol edilmelidir.",
    escalation: ["İşletmeciye kayıt düzeltme/fesih/taşıma başvurusu", "BTK Tüketici Şikâyet Bildirim Sistemi", "Bedel uyuşmazlığında Tüketici Hakem Heyeti", "Kimlik kötüye kullanımı veya sahte abonelikte kolluk/Cumhuriyet başsavcılığı ve gerekiyorsa KVKK yolu"],
    steps: ["e-Devlet'ten hat veya taşıma kaydını doğrulayın.", "İşletmeciden sözleşme/onay/ret kaydını isteyin.", "Düzeltme, fesih veya taşıma talebini resmî kanaldan gönderin.", "Çözülmezse BTK'ya önceki kayıtla başvurun.", "Sahte abonelik veya kimlik kötüye kullanımı varsa ceza ve kişisel veri yollarını ayrıca değerlendirin."],
    sources: [LAW_5809, LAW_6502, BTK_RULES, BTK_COMPLAINT_RULES, BTK_COMPLAINT, BTK_MOBILE, OPEN_LINES, SUBSCRIPTION_GUIDE, TUBIS, THH_INFO],
    thresholdKey: "consumer-dispute-thh",
    urgency: "urgent",
    petitionRequired: false,
    petitionReference: { subject: "Hat/abonelik kaydına itiraz ve düzeltme", authority: "İlgili Mobil Elektronik Haberleşme İşletmecisi", suggestedType: "Abonelik kaydı itiraz ve fesih dilekçesi" },
    caution: "Bilginiz dışında hat açılması yalnız fatura uyuşmazlığı değildir; sahtecilik veya kimlik bilgilerinin kötüye kullanılması şüphesinde kolluk/savcılık başvurusu ve gelen tebligatların süreleri ayrıca ele alınmalıdır."
  };

  if (ctx.label === "BTK'ya taşınan başvurular") return {
    ...common,
    title: "Operatör veya internet sağlayıcısı BTK'ya nasıl şikâyet edilir?",
    summary: "İşletmeciye açılan kayıt çözülmez veya cevap yetersiz kalırsa e-Devlet BTK Tüketici Şikâyet Bildirim Sisteminde hizmet numarası, kayıt ve delillerle başvuru yapılır; sistemde tekrar/itiraz adımı izlenir.",
    aliases: ["BTK'ya operatör/internet sağlayıcısı şikâyeti nasıl yapılır?", "BTK tüketici şikayet başvurusu"],
    intentKey: "telecom.btk-complaint",
    canonicalIntent: "telecom.btk-complaint",
    applicationChannels: [operator, btkComplaint, phone("BTK Tüketici İletişim Merkezi 120", "Bilgi ve yönlendirme; elektronik şikâyetin yerine geçmeyebilir")],
    requiredDocuments: ["Abone/hizmet numarası", "İşletmeci şikâyet kayıt numarası", "İşletmeci cevabı", "Sözleşme/fatura/ölçüm veya ilgili diğer deliller", "Açık çözüm talebi"],
    evidenceChecklist: ["Önce işletmeci kaydını tamamlayın", "Aynı sorunu tek kronoloji halinde yazın", "Cevaba neden katılmadığınızı somutlaştırın", "Sistemdeki cevap, tekrar ve itiraz tarihlerini takip edin"],
    deadlineAndAppeal: "İşletmeci şikâyeti kural olarak 10 iş gününde, tekrarlanan şikâyet 5 iş gününde cevaplanır. İşletmeci cevabından sonra sistemde belirtilen 10 iş günlük tekrar/itiraz pencereleri kaçırılmamalıdır; parasal tüketici hakları ayrıca saklıdır.",
    escalation: ["İşletmeci şikâyet kaydı", "BTK sisteminde ilk şikâyet", "Aynı kayıt üzerinde tekrar ve Kuruma itiraz", "Parasal uyuşmazlıkta yıllık sınıra göre Tüketici Hakem Heyeti/mahkeme"],
    steps: ["İşletmeciye başvurup kayıt numarası ve cevap alın.", "e-Devlet BTK sisteminde doğru hizmet ve şikâyet başlığını seçin.", "Kronoloji, talep ve delilleri eksiksiz ekleyin.", "Cevap sonrası tekrar/itiraz seçeneğini süresinde kullanın.", "Para iadesi talebi varsa BTK şikâyetinden ayrı tüketici yolunu da değerlendirin."],
    sources: [LAW_5809, BTK_RULES, BTK_COMPLAINT_RULES, BTK_COMPLAINT, BTK_INTERNET, BTK_MOBILE],
    petitionRequired: false
  };

  if (ctx.label === "Kayıp/çalıntı telefon IMEI kapatma") return {
    ...common,
    title: "Kayıp veya çalıntı telefonun IMEI'si nasıl kapatılır?",
    summary: "Cihazın haberleşmeye kapatılması için e-Devlet Kayıp/Çalıntı İhbar Bildirimi veya BTK 120 kullanılabilir; çalınma şüphesinde kolluk başvurusu ve hesap güvenliği işlemleri ayrıca yapılmalıdır.",
    aliases: ["Kayıp/çalıntı telefonun IMEI'si nasıl kapatılır?", "çalıntı telefon kapatma", "IMEI kayıp ihbar"],
    intentKey: "telecom.lost-stolen-imei-block",
    canonicalIntent: "telecom.lost-stolen-imei-block",
    competentAuthorities: ["Bilgi Teknolojileri ve İletişim Kurumu", "Çalınma veya suç şüphesinde kolluk/Cumhuriyet başsavcılığı"],
    applicationChannels: [
      eGov("Kayıp/Çalıntı İhbar Bildirimi", "https://www.turkiye.gov.tr/btk-kayip-calinti-ihbar-bildirimi", "IMEI'yi elektronik haberleşmeye kapatma"),
      eGov("Kayıp/Çalıntı İhbar Sorgulama/İptal", "https://www.turkiye.gov.tr/btk-kayip-calinti-ihbar-sorgulama-iptal"),
      phone("BTK Tüketici İletişim Merkezi 120", "7/24 kayıp/çalıntı cihaz ihbarı"),
      office("Polis merkezi / jandarma veya Cumhuriyet başsavcılığı", "Çalınma, yağma veya başka suç şüphesinde")
    ],
    requiredDocuments: ["Cihazın 15 haneli IMEI numarası", "Hat ve iletişim bilgisi", "Cihaz marka/modeli", "Varsa fatura/kutu/garanti belgesi", "Çalınmada olay yeri ve zaman bilgisi"],
    evidenceChecklist: ["IMEI'yi kutu/fatura veya *#06# kaydından doğrulayın", "Son görülen yer ve saati kaydedin", "SIM, e-posta, banka ve uygulama hesaplarını güvene alın", "İhbar numarasını saklayın", "Çalınmada kamera/tanık bilgilerini kolluğa iletin"],
    deadlineAndAppeal: "Cihazı haberleşmeye kapatmak ve delilleri korumak için gecikmeden ihbar edin. Bulunan cihaz için e-Devlet sorgulama/iptal hizmeti kullanılabilir; ceza soruşturmasının süre ve usulü olayın niteliğine göre değişir.",
    escalation: ["e-Devlet veya 120 ile IMEI ihbarı", "Çalınma/suç şüphesinde kolluk veya Cumhuriyet başsavcılığı", "İhbar durumunu e-Devlet'ten sorgulama; cihaz bulunursa iptal işlemi"],
    steps: ["IMEI ve cihaz sahipliği bilgilerini hazırlayın.", "e-Devlet veya 120 üzerinden kayıp/çalıntı ihbarı yapın.", "SIM hattını ve cihazdaki hesapları güvene alın.", "Çalınma şüphesinde olay bilgileriyle kolluğa başvurun.", "İhbar numarasını saklayıp cihaz bulunursa e-Devlet'ten iptal edin."],
    legalBasis: ["5809 sayılı Elektronik Haberleşme Kanunu", "Bilgi Teknolojileri ve İletişim Kurumu cihaz kayıt/ihbar düzenlemeleri"],
    sources: [LAW_5809, BTK_MOBILE, IMEI_GUIDE, src("Kayıp/Çalıntı İhbar Bildirimi", "https://www.turkiye.gov.tr/btk-kayip-calinti-ihbar-bildirimi", "e-Devlet / Bilgi Teknolojileri ve İletişim Kurumu")],
    freshnessRisk: "high",
    urgency: "urgent",
    reviewCadence: 90,
    thresholdKey: undefined,
    petitionRequired: false
  };

  throw new Error(`Telefon/internet rota taslağı bulunamadı: ${ctx.label}`);
}
