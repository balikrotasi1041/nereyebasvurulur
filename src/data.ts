import { buildRouteCatalog, linkVerifiedRoutes } from "./route-catalog";
import type { ThresholdKey } from "./thresholds";

export type Source = {
  title: string;
  url: string;
  authority: string;
};

export type ApplicationChannel = {
  type: "e-government" | "official-portal" | "in-person" | "phone" | "post" | "other";
  label: string;
  url?: string;
  note?: string;
};

export type VerificationStatus = "verified" | "local-check" | "needs-review";
export type FreshnessRisk = "low" | "medium" | "high";
export type Urgency = "normal" | "time-limited" | "urgent";

export type PetitionReference = {
  subject: string;
  authority: string;
  suggestedType: string;
  note?: string;
};

export type RouteRecord = {
  pathKey: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  section: string;
  aliases: string[];
  intentKey: string;
  parentHub: string;
  canonicalIntent: string;
  verificationStatus: VerificationStatus;
  competentAuthorities: string[];
  applicationChannels: ApplicationChannel[];
  requiredDocuments: string[];
  evidenceChecklist: string[];
  deadlineAndAppeal: string;
  escalation: string[];
  locationLogic: string;
  steps: string[];
  legalBasis: string[];
  caution?: string;
  currentCycleNote?: string;
  publicationBlocker?: string;
  sources: Source[];
  lastVerified: string;
  freshnessRisk: FreshnessRisk;
  urgency: Urgency;
  reviewCadence: number;
  thresholdKey?: ThresholdKey;
  eGovernmentAvailable: boolean;
  petitionRequired: boolean;
  petitionReference?: PetitionReference;
  sourceConflicts: string[];
  timeSensitive: boolean;
};

export type MenuNode = {
  label: string;
  slug?: string;
  children?: MenuNode[];
};

const leaf = (label: string, slug?: string): MenuNode => ({ label, slug });
const branch = (label: string, children: MenuNode[]): MenuNode => ({ label, children });

const rawMenuTree: MenuNode[] = [
  branch("Sosyal Yardım ve Aile Hizmetleri", [
    branch("Sosyal Yardımlar", [leaf("Genel sosyal yardım"), leaf("Gıda yardımı"), leaf("Yakacak yardımı"), leaf("Barınma yardımı"), leaf("Elektrik tüketim desteği")]),
    branch("Aile Destekleri", [leaf("Doğum yardımı"), leaf("Çocuk destekleri"), leaf("Eşi vefat etmiş kadınlara yardım"), leaf("Asker ailesi yardımı")]),
    branch("Çocuk ve Aile Hizmetleri", [leaf("Sosyal ve Ekonomik Destek (SED)"), leaf("Koruyucu aile"), leaf("Evlat edinme"), leaf("Çocuk koruma hizmetleri")]),
    branch("Yaşlı Hizmetleri", [leaf("Huzurevi"), leaf("Yaşlı bakım hizmetleri"), leaf("Yaşlı sosyal destekleri")])
  ]),
  branch("Engellilik, Bakım ve Özel Gereksinim", [
    branch("Engelli Sağlık Kurulu", [leaf("Engelli raporu"), leaf("Rapor yenileme"), leaf("Rapor itirazı")]),
    branch("Engelli Hakları", [leaf("Engelli kimlik kartı"), leaf("Vergi indirimi / muafiyet süreçleri"), leaf("Ulaşım hakları")]),
    branch("Bakım Hizmetleri", [leaf("Evde bakım yardımı"), leaf("Bakım merkezi"), leaf("Bakım ihtiyacı değerlendirmesi")]),
    branch("Özel Eğitim", [leaf("RAM başvurusu"), leaf("Özel eğitim değerlendirmesi"), leaf("Eğitim destekleri")])
  ]),
  branch("Sosyal Güvenlik ve Emeklilik", [
    branch("Emeklilik", [leaf("Yaşlılık emekliliği"), leaf("Malulen emeklilik"), leaf("Engelli emekliliği")]),
    branch("Hak Sahibi Aylıkları", [leaf("Emekli aylığı"), leaf("Dul aylığı"), leaf("Yetim aylığı"), leaf("Ölüm aylığı")]),
    branch("Prim ve Hizmet", [leaf("Eksik prim"), leaf("Hizmet dökümü"), leaf("Hizmet birleştirme"), leaf("Askerlik borçlanması"), leaf("Doğum borçlanması")]),
    branch("Sağlık Sigortası", [leaf("GSS"), leaf("Gelir testi"), leaf("Sağlık aktivasyonu")])
  ]),
  branch("Nüfus, Vatandaşlık, Kimlik ve Adres", [
    branch("Kimlik", [leaf("Yeni kimlik kartı"), leaf("Kayıp kimlik"), leaf("Kimlik bilgisi düzeltme")]),
    branch("Adres", [leaf("Adres değişikliği"), leaf("Adres kaydı"), leaf("Adres hatası"), leaf("Yerleşim yeri belgesi")]),
    branch("Pasaport", [leaf("Pasaport başvurusu"), leaf("Hususi pasaport"), leaf("Hizmet pasaportu")]),
    branch("Sürücü Belgesi", [leaf("Yeni ehliyet"), leaf("Yenileme"), leaf("Kayıp ehliyet")]),
    branch("Vatandaşlık", [leaf("Türk vatandaşlığı kazanma"), leaf("İstisnai vatandaşlık"), leaf("Vatandaşlığın yeniden kazanılması"), leaf("Vatandaşlıktan çıkma")])
  ]),
  branch("Eğitim ve Öğrenci İşlemleri", [
    branch("Okul İşlemleri", [leaf("İlk kayıt"), leaf("Nakil"), leaf("Adrese bağlı okul"), leaf("e-Okul kayıt sorunları")]),
    branch("Sınav ve Yerleştirme", [leaf("LGS"), leaf("YKS"), leaf("Sınav sonucu itirazı"), leaf("Yerleştirme işlemleri")]),
    branch("Diploma ve Denklik", [leaf("Diploma"), leaf("Yurt dışı diploma denkliği"), leaf("YÖK denklik"), leaf("MEB denklik")]),
    branch("Üniversite", [leaf("Kayıt"), leaf("Yatay geçiş"), leaf("Öğrenci affı"), leaf("Öğrenci belgesi")]),
    branch("Burs ve Kamu Eğitim Destekleri", [leaf("KYK burs"), leaf("Öğrenim kredisi"), leaf("Kamu bursları")])
  ]),
  branch("Tapu, Kadastro ve Taşınmaz", [
    branch("Tapu İşlemleri", [leaf("Satış"), leaf("Bağış"), leaf("İntikal"), leaf("İpotek"), leaf("Tapu kayıt düzeltme")]),
    branch("Kadastro", [leaf("Parsel sınırı"), leaf("Kadastro hatası"), leaf("Kadastro itirazı")]),
    branch("WebTapu", [leaf("Başvuru"), leaf("Randevu"), leaf("Başvuru takibi")]),
    branch("Adres / Numarataj", [leaf("Kapı numarası"), leaf("Yeni adres"), leaf("UAVT adres sorunu")])
  ]),
  branch("İmar, Yapı ve Kentsel Dönüşüm", [
    branch("Yapı ve Ruhsat", [leaf("Yapı ruhsatı"), leaf("İskân"), leaf("Ruhsatsız yapı"), leaf("Kaçak yapı ihbarı")]),
    branch("İmar", [leaf("İmar durumu"), leaf("Plan değişikliği"), leaf("İmar uygulaması"), leaf("İmar itirazı")]),
    branch("Kentsel Dönüşüm", [leaf("Riskli yapı tespiti"), leaf("Riskli yapı itirazı"), leaf("Tahliye"), leaf("Kira yardımı"), leaf("Dönüşüm desteği")])
  ]),
  branch("Vergi, Harç ve Kamu Ödemeleri", [
    branch("Vergi İşlemleri", [leaf("Vergi borcu"), leaf("Vergi düzeltme"), leaf("Vergi iadesi"), leaf("Vergi yapılandırma")]),
    branch("Motorlu Taşıtlar", [leaf("MTV"), leaf("Araç vergi borcu")]),
    branch("Harçlar", [leaf("Pasaport harcı"), leaf("Tapu harcı"), leaf("Diğer kamu harçları")]),
    branch("Ödeme Sorunları", [leaf("Ödeme yaptım görünmüyor"), leaf("Mükerrer ödeme"), leaf("Kamu alacağı itirazı")])
  ]),
  branch("Ruhsat, İzin ve Resmî Statüler", [
    branch("İşyeri / Faaliyet Ruhsatları", [leaf("İşyeri açma ve çalışma ruhsatı"), leaf("Faaliyet izni")]),
    branch("Kamu İzinleri", [leaf("Genel kamu izni"), leaf("Özel amaçlı izin")]),
    branch("Sertifika / Yetki Belgesi", [leaf("Sertifika"), leaf("Yetki belgesi")]),
    branch("Resmî Statü Başvuruları", [leaf("Resmî statü başvurusu")])
  ]),
  branch("Tarım, Hayvancılık, Orman ve Kırsal", [
    branch("Çiftçi Kayıt Sistemi", [leaf("ÇKS kaydı"), leaf("ÇKS güncelleme")]),
    branch("Tarımsal Destekler", [leaf("Bitkisel üretim destekleri"), leaf("Kırsal kalkınma destekleri")]),
    branch("Hayvancılık", [leaf("Hayvancılık destekleri"), leaf("Hayvan kayıtları")]),
    branch("Mera İşlemleri", [leaf("Mera kullanım işlemleri"), leaf("Mera ihlali / başvuru")]),
    branch("Orman İşlemleri", [leaf("Orman izinleri"), leaf("Ormanla ilgili başvuru")])
  ]),
  branch("Belediye ve Yerel Kamu Hizmetleri", [
    branch("Yol ve Kaldırım", [leaf("Bozuk yol / çukur"), leaf("Kaldırım sorunu"), leaf("Yol talebi")]),
    branch("Çöp ve Temizlik", [leaf("Çöp alınmıyor"), leaf("Temizlik talebi")]),
    branch("Park ve Yeşil Alan", [leaf("Park sorunu"), leaf("Ağaç / yeşil alan talebi")]),
    branch("Zabıta", [leaf("Zabıta denetimi / başvurusu")]),
    branch("Sokak Hayvanları", [leaf("Yaralı hayvan"), leaf("Sokak hayvanı bildirimi")]),
    branch("Toplu Taşıma", [leaf("Hat / sefer sorunu"), leaf("Durak sorunu")])
  ]),
  branch("Tüketici Hakları ve Alışveriş", [
    branch("Ayıplı Mal ve Teslim", [
      leaf("Bozuk veya kusurlu ürün", "bozuk-kusurlu-urun-satici-kabul-etmiyor"),
      leaf("Değişim talebinin reddi", "degisim-talebi-kabul-edilmiyor"),
      leaf("Yanlış ürün teslimi", "yanlis-urun-gonderildi"),
      leaf("Eksik ürün teslimi", "eksik-urun-gonderildi"),
      leaf("Sahte veya ayıplı ürün", "sahte-ayipli-urun-satildi"),
      leaf("Kusurlu veya eksik mobilya teslimi", "mobilya-kusurlu-eksik-teslim-edildi"),
      leaf("Arızalı cep telefonu", "cep-telefonu-arizali-cikti"),
      leaf("İkinci el üründe gizli ayıp", "ikinci-el-arac-urunde-gizli-ayip")
    ]),
    branch("İade, Cayma ve Ön Ödeme", [
      leaf("İnternetten alınan ürünü iade", "internetten-alinan-urun-iade-edilmiyor"),
      leaf("Para iadesinin yapılmaması", "para-iadesi-yapilmiyor"),
      leaf("Ayakkabı veya kıyafet iadesi", "ayakkabi-kiyafet-iadesi-kabul-edilmiyor"),
      leaf("Kapora iadesi", "kapora-geri-alinamiyor"),
      leaf("Cayma hakkının kullandırılmaması", "cayma-hakki-kullandirilmiyor")
    ]),
    branch("Garanti ve Yetkili Servis", [
      leaf("Garanti kapsamında ücretsiz onarım", "garanti-kapsaminda-ucretsiz-tamir-yapilmiyor"),
      leaf("Yetkili servisin tamir etmemesi", "yetkili-servis-urunu-tamir-etmiyor"),
      leaf("Serviste ürünün kaybolması veya zarar görmesi", "serviste-urun-kayboldu-zarar-gordu")
    ]),
    branch("E-Ticaret, Sipariş ve Kargo", [
      leaf("Siparişin gönderilmemesi", "siparis-gonderilmiyor"),
      leaf("Kargoda ürün kaybı", "kargoda-urun-kayboldu"),
      leaf("Kargoda ürün hasarı", "kargoda-urun-hasar-gordu"),
      leaf("Teslim edildi görünen kargonun ulaşmaması", "kargo-teslim-edildi-gorunuyor-ulasmadi"),
      leaf("Ön ödemeli ürün veya hizmetin teslim edilmemesi", "on-odemeli-urun-hizmet-teslim-edilmedi"),
      leaf("Mesafeli satışta satıcıya ulaşılamaması", "mesafeli-satista-saticiya-ulasilamiyor")
    ]),
    branch("Tüketici Hakem Heyeti", [
      leaf("Tüketici Hakem Heyetine başvuru", "tuketici-hakem-heyetine-basvuru"),
      leaf("Tüketici Hakem Heyeti kararına itiraz", "tuketici-hakem-heyeti-kararina-itiraz"),
      leaf("Tüketici Hakem Heyeti kararının uygulanmaması", "tuketici-hakem-heyeti-karari-uygulanmiyor")
    ])
  ]),
  branch("Elektrik, Su, Doğalgaz ve Haberleşme", [
    branch("Elektrik", [leaf("Elektrik kesintisi"), leaf("Sokak aydınlatması"), leaf("Direk / kablo tehlikesi"), leaf("Dağıtım sorunu")]),
    branch("Su / Kanalizasyon", [leaf("Su kesintisi"), leaf("Su arızası"), leaf("Kanalizasyon"), leaf("Su baskını / taşkın altyapısı")]),
    branch("Doğalgaz", [leaf("Gaz kesintisi"), leaf("Dağıtım hizmeti"), leaf("Acil gaz durumu")]),
    branch("Telefon / İnternet", [leaf("Altyapı"), leaf("Hizmet sorunu"), leaf("Numara / hat işlemleri"), leaf("BTK'ya taşınan başvurular"), leaf("Kayıp/çalıntı telefon IMEI kapatma", "kayip-calinti-telefon-imei-kapatma")])
  ]),
  branch("Bilgi Edinme, Dilekçe ve Resmî Belge", [
    leaf("Bilgi edinme başvurusu"),
    leaf("Dilekçe ile başvuru"),
    leaf("Resmî belge talebi"),
    leaf("Başvuru durumunu öğrenme"),
    branch("CİMER", [leaf("CİMER başvurusu"), leaf("CİMER başvuru takibi")])
  ]),
  branch("İtiraz ve Üst Başvuru Yolları", [
    leaf("İdari işleme itiraz"),
    branch("İdari Para Cezası", [
      leaf("İdari para cezasına itiraz"),
      leaf("Trafik cezasına itiraz", "trafik-cezasina-itiraz-nereye-yapilir")
    ]),
    leaf("Kurum kararına itiraz"),
    leaf("Başvurunun reddine itiraz"),
    leaf("Cevap verilmeyen başvuru"),
    leaf("Üst makama / ilgili kuruma başvuru")
  ]),
  branch("Askerlik Yükümlülüğü ve Askeralma İşlemleri", [
    branch("Yoklama ve Sağlık", [
      leaf("Askerlik yoklaması", "askerlik-yoklamasi-nereye-yapilir"),
      leaf("Aile hekimi muayenesi"), leaf("Sağlık kurulu işlemleri"), leaf("Askerlik sağlık raporuna itiraz")
    ]),
    branch("Sınıflandırma ve Sevk", [leaf("Askerlik hizmet tercihi"), leaf("Yedek subay"), leaf("Yedek astsubay"), leaf("Celp tercihi"), leaf("Sevk belgesi"), leaf("Erken sevk talebi")]),
    branch("Erteleme / Tecil", [leaf("Öğrenci ertelemesi"), leaf("Yüksek lisans / staj / aday memur ertelemesi"), leaf("Sağlık nedeniyle erteleme"), leaf("Yurt dışı ertelemesi"), leaf("Kardeş ertelemesi")]),
    branch("Bedelli ve Dövizle Askerlik", [
      leaf("Bedelli askerlik başvurusu", "bedelli-askerlik-nereye-basvurulur"),
      leaf("Bedelli celp değişikliği"), leaf("Bedelliden vazgeçme"), leaf("Dövizle askerlik")
    ]),
    branch("Yoklama Kaçağı / Bakaya", [leaf("Yoklama kaçağı işlemleri"), leaf("Bakaya işlemleri"), leaf("Askeralma idari para cezasına itiraz")]),
    leaf("Askerlik durum belgesi")
  ]),
  branch("Askerî Okullar ve TSK Personel Temini", [
    branch("Millî Savunma Üniversitesi", [
      leaf("MSÜ askerî öğrenci başvurusu", "msu-askeri-ogrenci-basvurusu-nereye-yapilir"),
      leaf("Harp Okulları"), leaf("Astsubay Meslek Yüksekokulları"), leaf("Bando Astsubay MYO"), leaf("MSÜ tercih işlemleri"), leaf("İkinci seçim aşamaları"), leaf("Sonuç takibi")
    ]),
    branch("TSK Personel Temini", [leaf("Muvazzaf subay"), leaf("Sözleşmeli subay"), leaf("Muvazzaf astsubay"), leaf("Sözleşmeli astsubay"), leaf("Uzman erbaş"), leaf("Sözleşmeli er"), leaf("Sivil memur")])
  ]),
  branch("Jandarma ve Sahil Güvenlik Temin İşlemleri", [
    branch("JSGA Öğrenci Temini", [
      leaf("Güvenlik Bilimleri Fakültesi", "jsga-guvenlik-bilimleri-fakultesi-basvurusu"),
      leaf("Jandarma Astsubay MYO", "jsga-jandarma-astsubay-myo-basvurusu"),
      leaf("Başvuru / sonuç işlemleri")
    ]),
    branch("Jandarma Personel Temini", [
      leaf("Muvazzaf / sözleşmeli subay ve astsubay", "jandarma-subay-astsubay-personel-temini"),
      leaf("Uzman erbaş")
    ]),
    branch("Sahil Güvenlik Personel Temini", [leaf("Subay"), leaf("Astsubay"), leaf("Diğer ilanlı teminler")]),
    branch("Başvuru Sonrası", [leaf("Sınav çağrısı"), leaf("Evrak işlemleri"), leaf("Fiziki yeterlilik"), leaf("Sağlık"), leaf("Mülakat"), leaf("Sonuç sorgulama")])
  ])
];

const catalog = buildRouteCatalog(rawMenuTree);
export const routes = catalog.routes;
export const publishedRoutes = routes.filter(route => route.verificationStatus !== "needs-review" && route.sourceConflicts.length === 0);
export const menuTree = linkVerifiedRoutes(rawMenuTree, publishedRoutes);
export const routeBySlug = new Map(publishedRoutes.map(route => [route.slug, route]));

export function countLeaves(nodes: MenuNode[]): number {
  return nodes.reduce((sum, node) => sum + (node.children ? countLeaves(node.children) : 1), 0);
}

export function countLinkedLeaves(nodes: MenuNode[]): number {
  return nodes.reduce((sum, node) => sum + (node.children ? countLinkedLeaves(node.children) : (node.slug ? 1 : 0)), 0);
}
