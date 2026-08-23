import type { ApplicationChannel, PetitionReference, Source } from "./data";
import type { RouteDraft } from "./route-catalog";

const src = (title: string, url: string, authority: string): Source => ({ title, url, authority });
const eGov = (label: string, url: string, note?: string): ApplicationChannel => ({ type: "e-government", label, url, note });
const portal = (label: string, url: string, note?: string): ApplicationChannel => ({ type: "official-portal", label, url, note });
const office = (label: string, note?: string): ApplicationChannel => ({ type: "in-person", label, note });

const LAW_6502 = src("6502 sayılı Tüketicinin Korunması Hakkında Kanun", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6502.pdf", "Mevzuat Bilgi Sistemi");
const LAW_6098 = src("6098 sayılı Türk Borçlar Kanunu", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6098.pdf", "Mevzuat Bilgi Sistemi");
const LAW_2004 = src("2004 sayılı İcra ve İflas Kanunu", "https://www.mevzuat.gov.tr/MevzuatMetin/1.3.2004.pdf", "Mevzuat Bilgi Sistemi");
const THH_REGULATION = src("Tüketici Hakem Heyetleri Yönetmeliği", "https://www.resmigazete.gov.tr/eskiler/2022/09/20220921-1.htm", "Resmî Gazete");
const THH_THRESHOLD = src("2026 Tüketici Hakem Heyeti parasal sınır Tebliği", "https://www.resmigazete.gov.tr/eskiler/2025/12/20251223-5.htm", "Resmî Gazete");
const THH_INFO = src("Tüketici Hakem Heyetlerine İlişkin Bilgilendirme", "https://ticaret.gov.tr/tuketici/tuketici-hakem-heyetleri/tuketici-hakem-heyetlerine-iliskin-bilgilendirme-metni", "Ticaret Bakanlığı");
const TUBIS = src("Tüketici Hakem Heyetlerine Başvuru İşlemi (TÜBİS)", "https://www.turkiye.gov.tr/tuketici-sikayeti-uygulamasi", "e-Devlet / Ticaret Bakanlığı");
const DEFECT_GUIDE = src("Ayıplı Mal ve Hizmetler Hakkında Bilgilendirme", "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/ayipli-mal-ve-hizmetler-hakkinda-bilgilendirme", "Ticaret Bakanlığı");
const DISTANCE_GUIDE = src("Mesafeli Sözleşmeler Hakkında Bilgilendirme", "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme", "Ticaret Bakanlığı");
const DISTANCE_REGULATION = src("Mesafeli Sözleşmeler Yönetmeliği", "https://tuketici.ticaret.gov.tr/data/5e819a8e13b876a1b04c7a4a/Mesafeli%20S%C3%B6zle%C5%9Fmeler%20Y%C3%B6netmeli%C4%9Fi.pdf", "Ticaret Bakanlığı");
const WARRANTY_GUIDE = src("Garanti Belgeleri Hakkında Bilgilendirme", "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/garanti-belgeleri-hakkinda-bilgilendirme", "Ticaret Bakanlığı");
const SERVICE_GUIDE = src("Satış Sonrası Hizmetler Hakkında Bilgilendirme", "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/satis-sonrasi-hizmetler-hakkinda-bilgilendirme", "Ticaret Bakanlığı");
const SERBIS = src("SERBİS Yetkili Servis Sorgulama", "https://www.servis.gov.tr/Genel/Sorgu", "Ticaret Bakanlığı");
const ETBIS = src("ETBİS Kayıtlı Site Sorgulama", "https://www.eticaret.gov.tr/sirketsorgula", "Ticaret Bakanlığı");
const AD_COMPLAINT = src("Reklam ve Haksız Ticari Uygulama Şikâyeti", "https://www.turkiye.gov.tr/gtb-reklam-ve-haksiz-ticari-uygulama-sikayeti", "e-Devlet / Ticaret Bakanlığı");
const MEDIATION = src("Tüketici uyuşmazlıklarında dava şartı arabuluculuk", "https://adb.adalet.gov.tr/Home/SSSorularDetay/2", "Adalet Bakanlığı");
const UYAP = src("UYAP Vatandaş Portal Girişi", "https://www.turkiye.gov.tr/uyap-portali-vatandas-girisi", "e-Devlet / Adalet Bakanlığı");

const tubisChannel = eGov("TÜBİS · Tüketici Hakem Heyetine doğrudan başvur", TUBIS.url, "Uyuşmazlık tutarı yıllık görev sınırının altındaysa ücretsiz elektronik başvuru");
const thhOffice = office("Ticaret İl Müdürlüğü / Kaymakamlık Tüketici Hakem Heyeti irtibatı", "Tüketicinin yerleşim yeri veya işlemin yapıldığı yerde yazılı başvuru");
const sellerChannel: ApplicationChannel = {
  type: "other",
  label: "Satıcı/sağlayıcının kendi ispatlanabilir yazılı talep kanalı",
  note: "Satıcıya özgü e-posta, hesap içi talep formu, KEP veya iadeli taahhütlü posta yolunu kullanın; bu adım için tek bir kamu bağlantısı yoktur."
};

type ConsumerConfig = {
  title: string;
  backlogAlias: string;
  intentKey: string;
  summary: string;
  requiredDocuments: string[];
  evidenceChecklist: string[];
  deadline: string;
  legalBasis?: string[];
  sources?: Source[];
  caution?: string;
  authorities?: string[];
  channels?: ApplicationChannel[];
  escalation?: string[];
  petition?: PetitionReference;
  urgency?: "normal" | "time-limited" | "urgent";
};

const configs: Record<string, ConsumerConfig> = {
  "Bozuk veya kusurlu ürün": {
    title: "Bozuk veya kusurlu ürün kabul edilmiyorsa nereye başvurulur?",
    backlogAlias: "Aldığım ürün bozuk/kusurlu çıktı, satıcı kabul etmiyor",
    intentKey: "consumer.defective-product",
    summary: "Ayıplı üründe ücretsiz onarım, ayıpsız misliyle değişim, bedel indirimi veya sözleşmeden dönme haklarından uygun olanı yazılı olarak satıcıya yöneltin; reddedilirse uyuşmazlık değerine göre resmî çözüm yoluna geçin.",
    requiredDocuments: ["Fatura, fiş veya sipariş belgesi", "Ürünün marka/model/seri numarası", "Ayıbı gösteren fotoğraf, video veya servis raporu", "Satıcıya iletilen seçimlik hak ve cevap"],
    evidenceChecklist: ["Ayıbın ilk fark edildiği tarihi kaydedin", "Ürünü ve ambalajı fotoğraflayın", "Talebinizi sözlü değil ispatlanabilir yazılı kanaldan gönderin", "Kargo/servis teslim tutanaklarını saklayın"],
    deadline: "Ayıplı mal sorumluluğu kural olarak teslimden itibaren iki yıllık zamanaşımına tabidir; ağır kusur veya hileyle gizlenen ayıpta bu sınırlama uygulanmaz.",
    legalBasis: ["6502 sayılı Kanun m. 8-12"],
    sources: [DEFECT_GUIDE]
  },
  "İnternetten alınan ürünü iade": {
    title: "İnternetten alınan ürün iade edilmiyorsa nereye başvurulur?",
    backlogAlias: "İnternetten aldığım ürünü iade edemiyorum",
    intentKey: "consumer.distance-return",
    summary: "Mesafeli satışta istisna yoksa teslimden itibaren 14 gün içinde gerekçe göstermeden cayma bildirimi yapılabilir; platformdaki iade kaydı ve yazışmalar saklanmalıdır.",
    requiredDocuments: ["Sipariş ve ödeme kaydı", "Ön bilgilendirme formu/mesafeli sözleşme", "Teslim tarihi", "Cayma bildirimi ve iade kargo belgesi"],
    evidenceChecklist: ["14 günlük süre içinde tarihli bildirim gönderin", "Platformdaki iade talebinin ekran görüntüsünü alın", "Kargo takip numarasını ve teslim kaydını saklayın", "Ürünün cayma hakkı istisnasında olup olmadığını kontrol edin"],
    deadline: "Cayma bildirimi kural olarak teslimden itibaren 14 gün içinde yapılır; tüketici bildirimden sonra malı 14 gün içinde geri göndermelidir. Hijyen, kişiye özel üretim ve mevzuattaki diğer istisnalar ayrıca kontrol edilmelidir.",
    legalBasis: ["6502 sayılı Kanun m. 48", "Mesafeli Sözleşmeler Yönetmeliği m. 9-15"],
    sources: [DISTANCE_GUIDE, DISTANCE_REGULATION]
  },
  "Para iadesinin yapılmaması": {
    title: "Para iadesi yapılmıyorsa nereye başvurulur?",
    backlogAlias: "Para iadesi yapılmıyor",
    intentKey: "consumer.refund-nonpayment",
    summary: "İadenin dayanağını (cayma, ayıp, fesih veya siparişin ifa edilmemesi) yazılı talepte açıkça belirtin; ödeme yapılmazsa tutara göre Tüketici Hakem Heyeti veya dava şartı arabuluculuk yolu kullanılır.",
    requiredDocuments: ["Ödeme dekontu/kart ekstresi", "Sipariş veya sözleşme", "İade hakkını doğuran bildirim ve tarih", "Satıcının iade vaadi veya ret cevabı"],
    evidenceChecklist: ["İadenin hangi hakka dayandığını yazın", "Banka hareketinde iadenin gelmediğini gösterin", "Vadedilen iade tarihini kaydedin", "Platform ve satıcı yazışmalarını birlikte saklayın"],
    deadline: "Mesafeli satışta cayma veya teslim edememe nedeniyle doğan iadelerde Yönetmelikteki 14 günlük süre; ayıplı malda sözleşmeden dönme veya indirim bedeli için derhâl iade kuralı uygulanabilir. Somut sebep mutlaka ayrıştırılmalıdır.",
    legalBasis: ["6502 sayılı Kanun m. 11 ve 48"],
    sources: [DEFECT_GUIDE, DISTANCE_GUIDE]
  },
  "Garanti kapsamında ücretsiz onarım": {
    title: "Garanti kapsamındaki ürün ücretsiz tamir edilmiyorsa nereye başvurulur?",
    backlogAlias: "Garanti kapsamındaki ürün ücretsiz tamir edilmiyor",
    intentKey: "consumer.warranty-free-repair",
    summary: "Garanti içindeki ücretsiz onarım talebinde işçilik, parça, kargo veya başka adla ücret istenemez; talebi servis teslim belgesine açıkça yazdırın.",
    requiredDocuments: ["Fatura ve varsa garanti belgesi", "Seri numarası", "Servis teslim/iş emri", "Ücret talebi veya ret cevabı"],
    evidenceChecklist: ["Garanti başlangıç tarihini doğrulayın", "Ücretsiz onarım seçiminizi teslim belgesine yazdırın", "Servisin yetkisini SERBİS'ten kontrol edin", "İstenen her ücret için yazılı belge alın"],
    deadline: "Garanti süresi kural olarak teslimden itibaren en az iki yıldır. Azami tamir süresi ürüne göre Satış Sonrası Hizmetler Yönetmeliği ekinde değişir; ürün satırı işlem günü kontrol edilmelidir.",
    legalBasis: ["6502 sayılı Kanun m. 56", "Garanti Belgesi Yönetmeliği"],
    sources: [WARRANTY_GUIDE, SERVICE_GUIDE, SERBIS]
  },
  "Yetkili servisin tamir etmemesi": {
    title: "Yetkili servis ürünü tamir etmiyorsa nereye başvurulur?",
    backlogAlias: "Yetkili servis ürünü tamir etmiyor",
    intentKey: "consumer.authorized-service-no-repair",
    summary: "Servisin gerçekten yetkili olduğunu SERBİS'ten doğrulayın; teslim belgesi ve seçilen hakkı yazılılaştırın. Azami süre aşılır veya tamir mümkün olmazsa diğer seçimlik haklar gündeme gelir.",
    requiredDocuments: ["Fatura/garanti kaydı", "SERBİS servis sorgu sonucu", "Servis teslim belgesi ve iş emri", "Arıza ve başvuru tarihleri"],
    evidenceChecklist: ["Servis unvanını SERBİS'te eşleştirin", "Teslim belgesine arızayı ve talebi yazdırın", "Tamirde geçen günleri takvimle kaydedin", "Cihazın teslim anındaki durumunu fotoğraflayın"],
    deadline: "Azami tamir süresi ürün grubuna göre değişir ve Yönetmelik ekinden kontrol edilir. Süre aşımı, tekrar arıza veya tamirin imkânsızlığı halinde bedel iadesi/değişim/indirim istenebilir.",
    legalBasis: ["6502 sayılı Kanun m. 56 ve 58", "Satış Sonrası Hizmetler Yönetmeliği"],
    sources: [SERVICE_GUIDE, SERBIS, WARRANTY_GUIDE]
  },
  "Serviste ürünün kaybolması veya zarar görmesi": {
    title: "Serviste ürün kaybolur veya zarar görürse nereye başvurulur?",
    backlogAlias: "Serviste ürün kayboldu veya zarar gördü",
    intentKey: "consumer.service-loss-damage",
    summary: "Servise teslim edilen ürünün kaybı veya yeni hasarı ayıplı hizmet ve tazminat talebi doğurabilir; teslim belgesi ile ürünün önceki/sonraki durumunu karşılaştırın.",
    requiredDocuments: ["Servis teslim belgesi", "Ürünün seri numarası", "Teslim öncesi ve sonrası fotoğraflar", "Servis yazışmaları ve değer belgesi"],
    evidenceChecklist: ["Teslim belgesindeki aksesuar ve hasar kayıtlarını kontrol edin", "Yeni hasarı teslim alırken tutanağa yazdırın", "Kayıp iddiasında seri numarasını sunun", "Onarım/teslim vaatlerini tarihleriyle saklayın"],
    deadline: "Ayıplı hizmetten sorumluluk kural olarak hizmetin ifasından itibaren iki yıldır; zararı teslim anında tutanağa bağlamak ispatı güçlendirir.",
    legalBasis: ["6502 sayılı Kanun m. 13-16", "Satış Sonrası Hizmetler Yönetmeliği"],
    sources: [SERVICE_GUIDE, DEFECT_GUIDE]
  },
  "Değişim talebinin reddi": {
    title: "Değişim talebi kabul edilmiyorsa nereye başvurulur?",
    backlogAlias: "Değişim talebim kabul edilmiyor",
    intentKey: "consumer.replacement-refused",
    summary: "Ayıplı malda ayıpsız misliyle değişim seçimlik haklardan biridir; satıcı ancak kanundaki orantısızlık değerlendirmesine dayanabilir, talebi otomatik olarak onarıma çeviremez.",
    requiredDocuments: ["Satış belgesi", "Ayıp/arıza kaydı", "Yazılı değişim talebi", "Satıcı veya servis ret gerekçesi"],
    evidenceChecklist: ["Seçtiğiniz hakkı açıkça 'ayıpsız misliyle değişim' diye yazın", "Ret gerekçesini yazılı alın", "Aynı arızanın tekrarını servis kayıtlarıyla gösterin", "Ürünün güncel model/tedarik bilgisini saklayın"],
    deadline: "Garanti rejiminde değişim talebinin kabul edildiği durumda talep azami 30 iş günü içinde yerine getirilmelidir. Ayıplı mal zamanaşımı ve orantısızlık koşulları ayrıca değerlendirilir.",
    legalBasis: ["6502 sayılı Kanun m. 11", "Garanti Belgesi Yönetmeliği m. 9"],
    sources: [DEFECT_GUIDE, WARRANTY_GUIDE]
  },
  "Siparişin gönderilmemesi": {
    title: "Sipariş gönderilmiyorsa nereye başvurulur?",
    backlogAlias: "Sipariş ettiğim ürün gönderilmiyor",
    intentKey: "consumer.order-not-delivered",
    summary: "Satıcı siparişi taahhüt ettiği sürede; kişiye özel olmayan mal satışında her hâlükârda 30 gün içinde ifa etmelidir. Süre aşılırsa sözleşme feshedilip ödeme ve teslim masrafları istenebilir.",
    requiredDocuments: ["Sipariş tarihi ve numarası", "Vadedilen teslim tarihi", "Ödeme kaydı", "Satıcı/platform yazışmaları"],
    evidenceChecklist: ["Sipariş durumunun ekran görüntüsünü alın", "Vadedilen teslim tarihini saklayın", "Fesih/iade talebini kalıcı veri saklayıcısıyla gönderin", "Kargo numarası verildiyse hareketlerini kaydedin"],
    deadline: "Kişisel ihtiyaçlara göre hazırlanan mallar hariç mesafeli mal satışında ifa süresi her hâlükârda 30 günü geçemez; fesih sonrası ödemeler 14 gün içinde kanuni faiziyle iade edilmelidir.",
    legalBasis: ["6502 sayılı Kanun m. 48", "Mesafeli Sözleşmeler Yönetmeliği m. 16"],
    sources: [DISTANCE_GUIDE, DISTANCE_REGULATION]
  },
  "Yanlış ürün teslimi": {
    title: "Yanlış ürün gönderildiyse nereye başvurulur?",
    backlogAlias: "Yanlış ürün gönderildi",
    intentKey: "consumer.wrong-product",
    summary: "Sipariş edilenden farklı ürün teslimi sözleşmeye aykırı/ayıplı ifadır; ürünü kullanmadan kayıt altına alın ve seçtiğiniz iade, değişim veya diğer hakkı yazılı bildirin.",
    requiredDocuments: ["Sipariş özeti", "Kutu etiketi ve teslim kaydı", "Gelen ürünün fotoğrafları", "İade/değişim talebi"],
    evidenceChecklist: ["Paket açılışını mümkünse görüntüleyin", "Ürün kodlarını siparişle karşılaştırın", "Kargo etiketini atmayın", "Satıcıya hangi hakkı seçtiğinizi yazın"],
    deadline: "Mesafeli satışta ayrıca 14 günlük cayma hakkı bulunabilir; ayıplı mala ilişkin genel sorumluluk süresi kural olarak teslimden itibaren iki yıldır.",
    legalBasis: ["6502 sayılı Kanun m. 8-12 ve 48"],
    sources: [DEFECT_GUIDE, DISTANCE_GUIDE]
  },
  "Eksik ürün teslimi": {
    title: "Sipariş eksik gönderildiyse nereye başvurulur?",
    backlogAlias: "Eksik ürün gönderildi",
    intentKey: "consumer.incomplete-delivery",
    summary: "Siparişin parça, adet veya aksesuar bakımından eksik teslimi sözleşmeye aykırıdır; paket içeriğini ve sipariş satırlarını belgeleyerek tamamlama, indirim veya diğer uygun hakkı isteyin.",
    requiredDocuments: ["Sipariş kalemleri ve fatura", "Paket/kargo ağırlık bilgisi varsa", "Açılış ve içerik fotoğrafları", "Eksik kalemlerin yazılı listesi"],
    evidenceChecklist: ["Eksik her kalemi ayrı yazın", "Kutu etiketi ve ambalajı saklayın", "Kargo ağırlık kaydını isteyin", "Platform başvuru numarasını kaydedin"],
    deadline: "Eksik teslim fark edilir edilmez yazılı bildirim yapılması ispatı kolaylaştırır; ayıplı mala ilişkin genel iki yıllık süre saklıdır.",
    legalBasis: ["6502 sayılı Kanun m. 8-12"],
    sources: [DEFECT_GUIDE, DISTANCE_GUIDE]
  },
  "Kargoda ürün kaybı": {
    title: "Kargoda ürün kaybolursa nereye başvurulur?",
    backlogAlias: "Kargoda ürün kayboldu",
    intentKey: "consumer.cargo-lost",
    summary: "Mesafeli satışta satıcının belirlediği taşıyıcıyla teslimata kadar oluşan kayıp tüketiciye karşı kural olarak satıcının sorumluluğundadır; yalnız kargo şirketine yönlendirilmekle yetinmeyin.",
    requiredDocuments: ["Sipariş ve ödeme kaydı", "Kargo takip numarası/hareketleri", "Teslim vaadi", "Satıcı ve kargo başvuru kayıtları"],
    evidenceChecklist: ["Takip hareketlerini ekran görüntüsüyle saklayın", "Satıcıya teslim veya iade için yazılı süre verin", "Kargo araştırma numarasını alın", "Kargoyu kendiniz seçtiyseniz bu durumu ayrıca belgeleyin"],
    deadline: "Kişiye özel olmayan mal satışında 30 günlük azami ifa süresi ve fesih sonrası 14 günlük iade süresi uygulanabilir. Tüketicinin satıcının belirlediğinden farklı taşıyıcı seçmesi sorumluluğu değiştirebilir.",
    legalBasis: ["Mesafeli Sözleşmeler Yönetmeliği m. 16-17"],
    sources: [DISTANCE_GUIDE, DISTANCE_REGULATION]
  },
  "Kargoda ürün hasarı": {
    title: "Kargoda ürün hasar görürse nereye başvurulur?",
    backlogAlias: "Kargoda ürün hasar gördü",
    intentKey: "consumer.cargo-damaged",
    summary: "Satıcının belirlediği taşıyıcıyla teslimata kadar oluşan hasardan tüketiciye karşı kural olarak satıcı sorumludur; teslimde hasar tutanağı süreci hızlandırır ancak tüketici hakkının tek şartı olarak görülmemelidir.",
    requiredDocuments: ["Sipariş/fatura", "Kargo etiketi ve takip kaydı", "Kutu ve ürün fotoğrafları", "Varsa hasar tespit tutanağı"],
    evidenceChecklist: ["Ambalajı teslim anında görüntüleyin", "Belirgin hasarı kurye tutanağına yazdırın", "Ürünü kullanmadan satıcıya bildirin", "İade kargosunu ve teslimini takip edin"],
    deadline: "Hasarı gecikmeden bildirin; mesafeli satıştaki 14 günlük cayma hakkı ve ayıplı mala ilişkin genel iki yıllık süre somut olaya göre ayrıca uygulanabilir.",
    legalBasis: ["6502 sayılı Kanun m. 8-12", "Mesafeli Sözleşmeler Yönetmeliği m. 17"],
    sources: [DISTANCE_GUIDE, DISTANCE_REGULATION, DEFECT_GUIDE]
  },
  "Teslim edildi görünen kargonun ulaşmaması": {
    title: "Kargo teslim edildi görünüyor ama ulaşmadıysa nereye başvurulur?",
    backlogAlias: "Kargo teslim edildi görünüyor ama bana ulaşmadı",
    intentKey: "consumer.false-delivery-record",
    summary: "Teslim kaydı size veya belirlediğiniz kişiye ait değilse satıcıdan teslim kanıtını isteyin; satıcının belirlediği taşıyıcıdaki kayıp bakımından satıcıya yazılı teslim/iade talebi yöneltin.",
    requiredDocuments: ["Sipariş ve takip numarası", "Teslim edildi ekranı", "Teslim alan adı/imza/konum bilgisi talebi", "Satıcı ve kargo kayıt numaraları"],
    evidenceChecklist: ["Teslim saatinde adreste kimlerin olduğunu not edin", "Komşu/güvenlik teslimini kontrol edin", "Teslim belgesini yazılı isteyin", "Takip ekranını değişmeden kaydedin"],
    deadline: "Kayıt görünür görünmez aynı gün satıcı ve taşıyıcıya bildirim yapmak ispatı korur; 30 günlük ifa ve 14 günlük iade kuralları somut duruma göre uygulanabilir.",
    legalBasis: ["Mesafeli Sözleşmeler Yönetmeliği m. 16-17"],
    sources: [DISTANCE_GUIDE, DISTANCE_REGULATION]
  },
  "Sahte veya ayıplı ürün": {
    title: "Sahte veya ayıplı ürün satıldıysa nereye başvurulur?",
    backlogAlias: "Sahte/ayıplı ürün satıldı",
    intentKey: "consumer.counterfeit-product",
    summary: "Ürünün sahte olması ayıplı mal haklarını ve yanıltıcı ticari uygulama şikâyetini gündeme getirir; dolandırıcılık şüphesi varsa ceza başvurusu tüketici uyuşmazlığından ayrıdır.",
    requiredDocuments: ["İlan/reklam görüntüsü", "Fatura ve ödeme", "Ürün, ambalaj, seri/barkod fotoğrafları", "Marka/uzman/servis doğrulaması varsa"],
    evidenceChecklist: ["İlanı ve satıcı profilini kaydedin", "Ürünü delil niteliğini bozacak şekilde değiştirmeyin", "Seri numarasını doğrulatın", "Satıcıya ayıplı mal talebini ayrıca iletin"],
    deadline: "Ayıplı mala ilişkin genel süre kural olarak teslimden itibaren iki yıldır; suç şüphesinde gecikmeden kolluk veya Cumhuriyet başsavcılığına başvurulması delillerin korunması açısından önemlidir.",
    legalBasis: ["6502 sayılı Kanun m. 8-12 ve 62"],
    sources: [DEFECT_GUIDE, AD_COMPLAINT],
    channels: [sellerChannel, portal("ETBİS kayıtlı site sorgulama", ETBIS.url, "Kayıt güvenlik garantisi değildir; satıcı kimliğini doğrulamaya yardımcı olur"), tubisChannel, eGov("Reklam ve Haksız Ticari Uygulama Şikâyeti", AD_COMPLAINT.url), thhOffice],
    caution: "Tüketici Hakem Heyeti bedel/değişim uyuşmazlığını çözer; suç soruşturması yapmaz. Dolandırıcılık şüphesi için ayrıca kolluk veya Cumhuriyet başsavcılığı değerlendirilmelidir.",
    urgency: "urgent"
  },
  "Ayakkabı veya kıyafet iadesi": {
    title: "Ayakkabı veya kıyafet iadesi kabul edilmiyorsa nereye başvurulur?",
    backlogAlias: "Ayakkabı veya kıyafet iadesi kabul edilmiyor",
    intentKey: "consumer.clothing-footwear-return",
    summary: "İnternetten alınan ayakkabı ve kıyafette kural olarak 14 günlük cayma hakkı vardır; mağaza alışverişinde ayıp veya satıcının iade taahhüdü yoksa sebepsiz iade hakkı bulunmayabilir.",
    requiredDocuments: ["Fiş/fatura veya sipariş", "Satışın mağaza mı mesafeli mi olduğu", "Teslim tarihi", "Ayıp varsa fotoğraf ve inceleme/ret formu"],
    evidenceChecklist: ["Satış kanalını doğru belirleyin", "İnternet alışverişinde 14 gün içinde bildirim yapın", "Mağazanın ilan ettiği iade politikasını kaydedin", "Ayıp varsa kullanım izleri oluşmadan fotoğraflayın"],
    deadline: "Mesafeli satışta kural olarak teslimden itibaren 14 günlük cayma; ayıplı malda genel olarak iki yıllık sorumluluk süresi uygulanır. Hijyen istisnası yalnız mevzuattaki koşullarla değerlendirilir.",
    legalBasis: ["6502 sayılı Kanun m. 8-12 ve 48"],
    sources: [DISTANCE_GUIDE, DEFECT_GUIDE]
  },
  "Kusurlu veya eksik mobilya teslimi": {
    title: "Mobilya kusurlu veya eksik teslim edilirse nereye başvurulur?",
    backlogAlias: "Mobilya kusurlu veya eksik teslim edildi",
    intentKey: "consumer.furniture-defect-incomplete",
    summary: "Mobilyanın ölçü, renk, parça, montaj veya kalite bakımından siparişe aykırı olması halinde ayıplı mal hakları kullanılabilir; sipariş formu ile teslim/montaj tutanağı belirleyicidir.",
    requiredDocuments: ["Sipariş formu ve ölçü/renk özellikleri", "Fatura ve ödeme", "Teslim/montaj tutanağı", "Kusur veya eksikleri gösteren fotoğraflar"],
    evidenceChecklist: ["Sipariş özelliklerini teslim edilenle karşılaştırın", "Eksikleri tutanağa tek tek yazın", "Montaj ekibinin açıklamasını kaydedin", "Seçtiğiniz hakkı satıcıya yazılı bildirin"],
    deadline: "Ayıplı maldan sorumluluk kural olarak teslimden itibaren iki yıldır; teslimde görülebilen kusurları tutanağa bağlamak ispatı güçlendirir.",
    legalBasis: ["6502 sayılı Kanun m. 8-12"],
    sources: [DEFECT_GUIDE]
  },
  "Arızalı cep telefonu": {
    title: "Cep telefonu arızalı çıktıysa nereye başvurulur?",
    backlogAlias: "Cep telefonu arızalı çıktı",
    intentKey: "consumer.defective-mobile-phone",
    summary: "Arızalı telefonda ayıplı mal ve garanti hakları birlikte değerlendirilir; IMEI/seri numarası, servis kayıtları ve seçilen hak açıkça belgelenmelidir.",
    requiredDocuments: ["Fatura ve garanti kaydı", "IMEI/seri numarası", "Arızayı gösteren kayıt", "Servis iş emri ve raporları"],
    evidenceChecklist: ["IMEI'yi fatura ve cihazla eşleştirin", "Arızayı tarihli video ile kaydedin", "Servis teslim formuna seçtiğiniz hakkı yazdırın", "Tekrar arızaları ayrı servis fişleriyle gösterin"],
    deadline: "Garanti süresi kural olarak en az iki yıl; ayıplı mal sorumluluğu genel olarak teslimden itibaren iki yıldır. Azami tamir süresi Satış Sonrası Hizmetler Yönetmeliği ekinden doğrulanır.",
    legalBasis: ["6502 sayılı Kanun m. 8-12 ve 56", "Garanti Belgesi Yönetmeliği", "Satış Sonrası Hizmetler Yönetmeliği"],
    sources: [DEFECT_GUIDE, WARRANTY_GUIDE, SERVICE_GUIDE]
  },
  "İkinci el üründe gizli ayıp": {
    title: "İkinci el araç veya üründe gizli ayıp çıkarsa nereye başvurulur?",
    backlogAlias: "İkinci el araç/üründe gizli ayıp çıktı",
    intentKey: "consumer.second-hand-hidden-defect",
    summary: "Satıcı ticari/mesleki amaçla hareket ediyorsa tüketici yolu kullanılabilir; iki özel kişi arasındaki satışta Tüketici Hakem Heyeti değil Türk Borçlar Kanunu ve görevli yargı yolu değerlendirilir.",
    requiredDocuments: ["Satış sözleşmesi/fatura/devir belgesi", "İlan ve satıcının beyanları", "Ekspertiz/servis/uzman raporu", "Ayıbın öğrenildiği tarih ve satıcı bildirimi"],
    evidenceChecklist: ["Satıcının ticari mi özel kişi mi olduğunu belirleyin", "İlanı silinmeden saklayın", "Ayıbı bağımsız raporla belgeleyin", "Satıcıya gecikmeden yazılı ihbar yapın"],
    deadline: "Tüketici işlemindeki ikinci el satışlarda satıcının ayıptan sorumluluğu bir yıldan az olamaz; ağır kusur veya hileyle gizlenen ayıpta zamanaşımı savunması uygulanmaz. Özel kişiler arasındaki satışın süreleri ayrıca incelenmelidir.",
    legalBasis: ["6502 sayılı Kanun m. 12", "6098 sayılı Türk Borçlar Kanunu satış hükümleri"],
    sources: [DEFECT_GUIDE, LAW_6098],
    caution: "Tüketici sıfatı ve satıcının ticari/mesleki faaliyeti görevli mercii değiştirir; ikinci el araçta satışın kimler arasında yapıldığı mutlaka kontrol edilmelidir."
  },
  "Kapora iadesi": {
    title: "Verilen kapora geri alınamıyorsa nereye başvurulur?",
    backlogAlias: "Kapora verdim, geri alamıyorum",
    intentKey: "consumer.deposit-refund",
    summary: "'Kapora' adı tek başına bedelin yanacağı veya otomatik iade edileceği anlamına gelmez; sözleşmede bağlanma parası mı cayma parası mı kararlaştırıldığı ve satıcının ticari sıfatı belirlenmelidir.",
    requiredDocuments: ["Kapora/ön ödeme dekontu", "Sözleşme, teklif veya rezervasyon formu", "İlan ve yazışmalar", "İptal/fesih nedeni ve tarihleri"],
    evidenceChecklist: ["Ödemenin açıklamasını ve alıcı hesabını kaydedin", "Cayma parası olduğuna dair açık hüküm var mı kontrol edin", "Satıcının taahhüdünü yerine getirip getirmediğini belgeleyin", "İade talebini yazılı gönderin"],
    deadline: "Süre ve iade sonucu sözleşmenin türüne göre değişir. Tüketici işleminde yıllık THH sınırı; özel kişiler arasındaki uyuşmazlıkta görevli mahkeme ve genel zamanaşımı hükümleri değerlendirilir.",
    legalBasis: ["6098 sayılı Türk Borçlar Kanunu m. 177-178", "6502 sayılı Kanun (tüketici işlemi varsa)"],
    sources: [LAW_6098],
    caution: "Sadece banka açıklamasında 'kapora' yazması ödemenin hukuki niteliğini tek başına belirlemez; sözleşmenin tamamı incelenmelidir."
  },
  "Ön ödemeli ürün veya hizmetin teslim edilmemesi": {
    title: "Ön ödemeli ürün veya hizmet teslim edilmezse nereye başvurulur?",
    backlogAlias: "Ön ödemeli ürün/hizmet teslim edilmedi",
    intentKey: "consumer.prepaid-nondelivery",
    summary: "Peşin veya kısmen önceden ödenen ürün/hizmet ifa edilmezse sözleşme, ödeme ve vaat edilen tarih belgelenerek teslim ya da fesih/iade talebi yapılır; özel sözleşme türlerinde ek kurallar olabilir.",
    requiredDocuments: ["Sözleşme/sipariş/teklif", "Ödeme dekontları", "Vaat edilen teslim/ifa tarihi", "Satıcı/sağlayıcı yazışmaları"],
    evidenceChecklist: ["Toplam sözleşme bedeli ile ödeneni ayırın", "Teslim vaadini yazılı belgeleyin", "Ek süre verdiyseniz tarihini kaydedin", "Fesih ve iade talebini ispatlanabilir kanaldan gönderin"],
    deadline: "Mesafeli mal satışında 30 günlük azami ifa ve fesih sonrası 14 günlük iade kuralı uygulanabilir; ön ödemeli konut, paket tur ve benzeri özel türlerde farklı süreler bulunduğundan sözleşme türü ayrıca kontrol edilmelidir.",
    legalBasis: ["6502 sayılı Kanun m. 17-21, 40-46 ve 48 (sözleşme türüne göre)"],
    sources: [DISTANCE_GUIDE],
    caution: "Başlık geniştir: ön ödemeli konut, devre tatil, paket tur ve genel ürün siparişi aynı süre ve kesinti rejimine tabi değildir."
  },
  "Cayma hakkının kullandırılmaması": {
    title: "Cayma hakkı kullandırılmıyorsa nereye başvurulur?",
    backlogAlias: "Cayma hakkım kullandırılmıyor",
    intentKey: "consumer.withdrawal-denied",
    summary: "Mesafeli sözleşmede istisna yoksa 14 gün içinde gerekçesiz ve cezasız cayma bildirimi yapılabilir; bildirimin platform/satıcıya ulaştığı kanıtlanmalıdır.",
    requiredDocuments: ["Mesafeli sözleşme ve ön bilgilendirme", "Teslim/sözleşme tarihi", "Cayma bildirimi", "Satıcının ret gerekçesi"],
    evidenceChecklist: ["Sözleşmenin gerçekten mesafeli olduğunu doğrulayın", "İstisna iddiasının hangi maddeye dayandığını isteyin", "14 gün içinde kalıcı veri saklayıcısıyla bildirin", "İade gönderisini takip edin"],
    deadline: "Cayma bildirimi kural olarak 14 gün içinde yapılır. Usulüne uygun bilgilendirme yapılmamışsa tüketici 14 günlük süreyle bağlı olmayabilir; uzamış sürenin ayrıntısı güncel Yönetmelikten kontrol edilmelidir.",
    legalBasis: ["6502 sayılı Kanun m. 48", "Mesafeli Sözleşmeler Yönetmeliği m. 9-15"],
    sources: [DISTANCE_GUIDE, DISTANCE_REGULATION]
  },
  "Mesafeli satışta satıcıya ulaşılamaması": {
    title: "Mesafeli satışta satıcıya ulaşılamıyorsa nereye başvurulur?",
    backlogAlias: "Mesafeli satışta satıcıya ulaşamıyorum",
    intentKey: "consumer.distance-seller-unreachable",
    summary: "Platformdaki talep sistemi üzerinden bildirim yapın, satıcı kimlik ve iletişim bilgilerini saklayın; teslim/iade uyuşmazlığı için TÜBİS, yanıltıcı uygulama için ilgili şikâyet kanalı kullanılabilir.",
    requiredDocuments: ["Site/uygulama ve satıcı profil bilgileri", "Sipariş ve ödeme", "İletişim denemeleri", "Platform talep/şikâyet kayıtları"],
    evidenceChecklist: ["Satıcı sayfasını ve ETBİS sonucunu kaydedin", "Platform talep numarası alın", "E-posta/SMS teslim kayıtlarını saklayın", "Ödeme alıcısının unvanını banka kaydından belirleyin"],
    deadline: "Teslim edilmeyen mesafeli malda 30 günlük azami ifa; fesih veya ifa imkânsızlığında 14 günlük iade süreleri uygulanabilir. Dolandırıcılık şüphesinde ceza başvurusunu geciktirmeyin.",
    legalBasis: ["6502 sayılı Kanun m. 48", "Mesafeli Sözleşmeler Yönetmeliği"],
    sources: [DISTANCE_GUIDE, ETBIS, AD_COMPLAINT],
    channels: [sellerChannel, portal("ETBİS kayıtlı site sorgulama", ETBIS.url, "Kayıt, sitenin güvenli olduğunu garanti etmez"), tubisChannel, eGov("Reklam ve Haksız Ticari Uygulama Şikâyeti", AD_COMPLAINT.url), thhOffice],
    caution: "Satıcıya hiç ulaşılamaması ve sahte kimlik/ilan belirtileri dolandırıcılık şüphesi doğuruyorsa banka ile acil temas ve kolluk/savcılık başvurusu ayrıca değerlendirilmelidir.",
    urgency: "urgent"
  },
  "Tüketici Hakem Heyetine başvuru": {
    title: "Tüketici Hakem Heyetine nasıl başvurulur?",
    backlogAlias: "Tüketici Hakem Heyetine nasıl başvurulur?",
    intentKey: "consumer.thh-application",
    summary: "Yıllık görev sınırının altındaki tüketici uyuşmazlığı TÜBİS üzerinden veya tüketicinin yerleşim yeri/işlemin yapıldığı yerdeki hakem heyetine dilekçeyle ücretsiz sunulur; sözlü başvuru yapılamaz.",
    requiredDocuments: ["Başvuran ve şikâyet edilen taraf bilgileri", "Uyuşmazlık konusu ve Türk Lirası değeri", "Açık talep", "Sözleşme, fatura, ödeme, yazışma ve diğer deliller"],
    evidenceChecklist: ["Uyuşmazlık değerini doğru yazın", "Tek bir uyuşmazlık için tek dosya oluşturun", "Talebinizi sonuç kısmında açıkça belirtin", "Yüklenen belgelerin okunaklı olduğunu kontrol edin"],
    deadline: "Hakem heyeti başvuruyu kural olarak en geç altı ay içinde karara bağlar; bu süre en fazla üç ay uzatılabilir. Alacağın/ayıbın kendi zamanaşımı süresi ayrıca korunmalıdır.",
    legalBasis: ["6502 sayılı Kanun m. 66-72", "Tüketici Hakem Heyetleri Yönetmeliği"],
    sources: [THH_REGULATION],
    petition: { subject: "Tüketici uyuşmazlığı başvurusu", authority: "Yetkili Tüketici Hakem Heyeti Başkanlığı", suggestedType: "Tüketici Hakem Heyeti başvuru dilekçesi", note: "TÜBİS formu elektronik başvuruda ayrıca dilekçe yükleme ihtiyacını ortadan kaldırabilir." }
  },
  "Tüketici Hakem Heyeti kararına itiraz": {
    title: "Tüketici Hakem Heyeti kararına nasıl itiraz edilir?",
    backlogAlias: "Tüketici Hakem Heyeti kararına nasıl itiraz edilir?",
    intentKey: "consumer.thh-decision-appeal",
    summary: "Hakem heyeti kararına karşı tebliğden itibaren iki hafta içinde hakem heyetinin veya tüketicinin yerleşim yerindeki tüketici mahkemesine; yoksa asliye hukuk mahkemesine itiraz edilir.",
    requiredDocuments: ["Hakem heyeti kararı", "Tebligat ve tebliğ tarihi", "İtiraz dilekçesi", "Dayanılan sözleşme, ödeme ve deliller"],
    evidenceChecklist: ["İki haftalık sürenin başlangıcını tebligattan belirleyin", "Karar ve tebligat zarfını birlikte saklayın", "İtiraz nedenlerini madde madde yazın", "Harç/masraf ve elektronik imza koşullarını mahkemeden/UYAP'tan doğrulayın"],
    deadline: "İtiraz süresi kararın tebliğinden itibaren iki haftadır. İtiraz kararın icrasını kendiliğinden durdurmaz; hâkim talep üzerine tedbiren durdurabilir.",
    legalBasis: ["6502 sayılı Kanun m. 70"],
    sources: [THH_REGULATION, UYAP],
    authorities: ["Tüketici mahkemesi; bulunmayan yerde tüketici mahkemesi sıfatıyla asliye hukuk mahkemesi"],
    channels: [eGov("UYAP Vatandaş Portal Girişi", UYAP.url, "Elektronik dava/evrak işlemleri için e-imza veya mobil imza koşullarını kontrol edin"), office("Yetkili adliye hukuk mahkemeleri tevzi bürosu")],
    escalation: ["Tüketici mahkemesine iki hafta içinde itiraz", "Mahkeme kararında gösterilen kanun yolu ve süre"],
    petition: { subject: "Tüketici Hakem Heyeti kararına itiraz", authority: "Yetkili Tüketici Mahkemesi Hâkimliği", suggestedType: "Tüketici Hakem Heyeti kararına itiraz dilekçesi" },
    urgency: "time-limited"
  },
  "Tüketici Hakem Heyeti kararının uygulanmaması": {
    title: "Tüketici Hakem Heyeti kararı uygulanmıyorsa nereye başvurulur?",
    backlogAlias: "Tüketici Hakem Heyeti kararı uygulanmıyor",
    intentKey: "consumer.thh-decision-enforcement",
    summary: "Bağlayıcı hakem heyeti kararı gönüllü uygulanmazsa kararın ilamların icrası hükümlerine göre yerine getirilmesi için icra dairesine başvurulabilir.",
    requiredDocuments: ["Hakem heyeti kararının onaylı/uygulanabilir örneği", "Kararın tebliğ bilgisi", "Borçlu/satıcı kimlik ve adres bilgileri", "Varsa ödeme/teslim talebi ve cevap"],
    evidenceChecklist: ["Kararın taraf ve tutar bilgilerini kontrol edin", "Karşı tarafa yapılan son uygulama talebini saklayın", "İtiraz/dava ve tedbir bulunup bulunmadığını UYAP'tan kontrol edin", "İcra dosyası ve masraf bilgilerini kaydedin"],
    deadline: "Karar yerine getirilmezse ilamlı icra yolu kullanılabilir. Karara karşı itirazın icrayı kendiliğinden durdurmadığı, ancak mahkemenin tedbir kararı verebileceği dikkate alınmalıdır; zamanaşımı ve takip koşulları işlem gününde icra dairesinden doğrulanmalıdır.",
    legalBasis: ["6502 sayılı Kanun m. 70", "2004 sayılı İcra ve İflas Kanunu"],
    sources: [LAW_2004, UYAP],
    authorities: ["Yetkili icra dairesi", "Tedbir/itiraz dosyası varsa ilgili tüketici mahkemesi"],
    channels: [eGov("UYAP Vatandaş Portal Girişi", UYAP.url, "Dosya ve icra takibi görüntüleme; elektronik takip koşullarını ayrıca kontrol edin"), office("Yetkili icra dairesi")],
    escalation: ["İlamlı icra takibi", "İcra işlemine ilişkin uyuşmazlıkta görevli icra hukuk/yargı yolu"],
    petition: { subject: "Tüketici Hakem Heyeti kararının icrası", authority: "Yetkili İcra Dairesi Müdürlüğü", suggestedType: "İlamlı icra takip talebi", note: "İcra takibi özel form ve usule tabidir; oluşturulan metni icra dairesinin güncel takip talebiyle karşılaştırın." },
    urgency: "time-limited"
  }
};

export function consumerDraft(ctx: { label: string }): RouteDraft {
  const config = configs[ctx.label];
  if (!config) throw new Error(`Tüketici rota taslağı bulunamadı: ${ctx.label}`);
  const authorities = config.authorities || ["Satıcı veya sağlayıcı", "Yıllık görev sınırı içindeyse Tüketici Hakem Heyeti", "Sınırın üzerindeyse dava şartı arabuluculuk ve tüketici mahkemesi"];
  const channels = config.channels || [sellerChannel, tubisChannel, thhOffice];
  const escalation = config.escalation || ["Satıcı/sağlayıcıya yazılı seçimlik hak veya iade talebi", "Yıllık parasal sınır içindeyse Tüketici Hakem Heyeti", "Sınırın üzerindeyse dava şartı arabuluculuk; anlaşma olmazsa tüketici mahkemesi", "Hakem heyeti kararına tebliğden itibaren iki hafta içinde tüketici mahkemesinde itiraz"];
  const petition = config.petition || {
    subject: config.title.replace(/ nereye başvurulur\?$/, ""),
    authority: "Yetkili Tüketici Hakem Heyeti Başkanlığı",
    suggestedType: "Tüketici Hakem Heyeti başvuru dilekçesi",
    note: "Önce satıcıya gönderilecek yazılı talep olarak da uyarlanabilir."
  };

  return {
    title: config.title,
    summary: config.summary,
    aliases: [config.backlogAlias],
    intentKey: config.intentKey,
    parentHub: "tuketici-haklari",
    canonicalIntent: config.intentKey,
    verificationStatus: "verified",
    competentAuthorities: authorities,
    applicationChannels: channels,
    requiredDocuments: config.requiredDocuments,
    evidenceChecklist: config.evidenceChecklist,
    deadlineAndAppeal: `${config.deadline} Uyuşmazlık tutarı için merkezi yıllık görev sınırını kontrol edin; hakem heyeti kararına itiraz süresi tebliğden itibaren iki haftadır.`,
    escalation,
    locationLogic: "Tüketici Hakem Heyetine tüketicinin yerleşim yerinde veya tüketici işleminin yapıldığı yerde başvurulabilir. Mahkeme ve icra aşamasında özel yetki kuralları ayrıca kontrol edilir.",
    steps: [
      "Sözleşme türünü, satıcının ticari sıfatını ve kullanmak istediğiniz hakkı belirleyin.",
      `Şu kanıtları kaybolmadan saklayın: ${config.evidenceChecklist.join("; ")}.`,
      "Talebinizi satıcı/sağlayıcıya ispatlanabilir yazılı kanaldan gönderin ve başvuru numarasını alın.",
      "Uyuşmazlık yıllık görev sınırının altındaysa TÜBİS veya yetkili Tüketici Hakem Heyeti; üzerindeyse dava şartı arabuluculuk yolunu kullanın.",
      "Karar veya ret sonrasında tebligat tarihini esas alarak gösterilen itiraz/üst başvuru süresini kaçırmayın."
    ],
    legalBasis: ["6502 sayılı Tüketicinin Korunması Hakkında Kanun", ...(config.legalBasis || [])],
    caution: config.caution,
    sources: Array.from(new Map([LAW_6502, THH_THRESHOLD, THH_INFO, TUBIS, MEDIATION, ...(config.sources || [])].map(source => [source.url, source])).values()),
    freshnessRisk: "high",
    urgency: config.urgency || "time-limited",
    reviewCadence: 90,
    thresholdKey: "consumer-dispute-thh",
    eGovernmentAvailable: true,
    petitionRequired: true,
    petitionReference: petition,
    sourceConflicts: [],
    lastVerified: "2026-08-23"
  };
}
