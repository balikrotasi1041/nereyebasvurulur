export type ProblemIntentMapping = {
  backlogId: number;
  label: string;
  intentKey: string;
  canonicalSlug: string;
  disposition: "new-route" | "existing-route";
};

export const firstWaveProblemIntents: ProblemIntentMapping[] = [
  { backlogId: 1, label: "Aldığım ürün bozuk/kusurlu çıktı, satıcı kabul etmiyor", intentKey: "consumer.defective-product", canonicalSlug: "bozuk-kusurlu-urun-satici-kabul-etmiyor", disposition: "new-route" },
  { backlogId: 2, label: "İnternetten aldığım ürünü iade edemiyorum", intentKey: "consumer.distance-return", canonicalSlug: "internetten-alinan-urun-iade-edilmiyor", disposition: "new-route" },
  { backlogId: 3, label: "Para iadesi yapılmıyor", intentKey: "consumer.refund-nonpayment", canonicalSlug: "para-iadesi-yapilmiyor", disposition: "new-route" },
  { backlogId: 4, label: "Garanti kapsamındaki ürün ücretsiz tamir edilmiyor", intentKey: "consumer.warranty-free-repair", canonicalSlug: "garanti-kapsaminda-ucretsiz-tamir-yapilmiyor", disposition: "new-route" },
  { backlogId: 5, label: "Yetkili servis ürünü tamir etmiyor", intentKey: "consumer.authorized-service-no-repair", canonicalSlug: "yetkili-servis-urunu-tamir-etmiyor", disposition: "new-route" },
  { backlogId: 6, label: "Serviste ürün kayboldu veya zarar gördü", intentKey: "consumer.service-loss-damage", canonicalSlug: "serviste-urun-kayboldu-zarar-gordu", disposition: "new-route" },
  { backlogId: 7, label: "Değişim talebim kabul edilmiyor", intentKey: "consumer.replacement-refused", canonicalSlug: "degisim-talebi-kabul-edilmiyor", disposition: "new-route" },
  { backlogId: 8, label: "Sipariş ettiğim ürün gönderilmiyor", intentKey: "consumer.order-not-delivered", canonicalSlug: "siparis-gonderilmiyor", disposition: "new-route" },
  { backlogId: 9, label: "Yanlış ürün gönderildi", intentKey: "consumer.wrong-product", canonicalSlug: "yanlis-urun-gonderildi", disposition: "new-route" },
  { backlogId: 10, label: "Eksik ürün gönderildi", intentKey: "consumer.incomplete-delivery", canonicalSlug: "eksik-urun-gonderildi", disposition: "new-route" },
  { backlogId: 11, label: "Kargoda ürün kayboldu", intentKey: "consumer.cargo-lost", canonicalSlug: "kargoda-urun-kayboldu", disposition: "new-route" },
  { backlogId: 12, label: "Kargoda ürün hasar gördü", intentKey: "consumer.cargo-damaged", canonicalSlug: "kargoda-urun-hasar-gordu", disposition: "new-route" },
  { backlogId: 13, label: "Kargo teslim edildi görünüyor ama bana ulaşmadı", intentKey: "consumer.false-delivery-record", canonicalSlug: "kargo-teslim-edildi-gorunuyor-ulasmadi", disposition: "new-route" },
  { backlogId: 14, label: "Sahte/ayıplı ürün satıldı", intentKey: "consumer.counterfeit-product", canonicalSlug: "sahte-ayipli-urun-satildi", disposition: "new-route" },
  { backlogId: 15, label: "Ayakkabı veya kıyafet iadesi kabul edilmiyor", intentKey: "consumer.clothing-footwear-return", canonicalSlug: "ayakkabi-kiyafet-iadesi-kabul-edilmiyor", disposition: "new-route" },
  { backlogId: 16, label: "Mobilya kusurlu veya eksik teslim edildi", intentKey: "consumer.furniture-defect-incomplete", canonicalSlug: "mobilya-kusurlu-eksik-teslim-edildi", disposition: "new-route" },
  { backlogId: 17, label: "Cep telefonu arızalı çıktı", intentKey: "consumer.defective-mobile-phone", canonicalSlug: "cep-telefonu-arizali-cikti", disposition: "new-route" },
  { backlogId: 18, label: "İkinci el araç/üründe gizli ayıp çıktı", intentKey: "consumer.second-hand-hidden-defect", canonicalSlug: "ikinci-el-arac-urunde-gizli-ayip", disposition: "new-route" },
  { backlogId: 19, label: "Kapora verdim, geri alamıyorum", intentKey: "consumer.deposit-refund", canonicalSlug: "kapora-geri-alinamiyor", disposition: "new-route" },
  { backlogId: 20, label: "Ön ödemeli ürün/hizmet teslim edilmedi", intentKey: "consumer.prepaid-nondelivery", canonicalSlug: "on-odemeli-urun-hizmet-teslim-edilmedi", disposition: "new-route" },
  { backlogId: 21, label: "Cayma hakkım kullandırılmıyor", intentKey: "consumer.withdrawal-denied", canonicalSlug: "cayma-hakki-kullandirilmiyor", disposition: "new-route" },
  { backlogId: 22, label: "Mesafeli satışta satıcıya ulaşamıyorum", intentKey: "consumer.distance-seller-unreachable", canonicalSlug: "mesafeli-satista-saticiya-ulasilamiyor", disposition: "new-route" },
  { backlogId: 23, label: "Tüketici Hakem Heyetine nasıl başvurulur?", intentKey: "consumer.thh-application", canonicalSlug: "tuketici-hakem-heyetine-basvuru", disposition: "new-route" },
  { backlogId: 24, label: "Tüketici Hakem Heyeti kararına nasıl itiraz edilir?", intentKey: "consumer.thh-decision-appeal", canonicalSlug: "tuketici-hakem-heyeti-kararina-itiraz", disposition: "new-route" },
  { backlogId: 25, label: "Tüketici Hakem Heyeti kararı uygulanmıyor", intentKey: "consumer.thh-decision-enforcement", canonicalSlug: "tuketici-hakem-heyeti-karari-uygulanmiyor", disposition: "new-route" },
  { backlogId: 96, label: "Telefon faturam haksız yere yüksek geldi", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 97, label: "GSM faturama kullanmadığım hizmet yansıtıldı", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 98, label: "İnternet faturam yanlış geldi", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 99, label: "İnternet aboneliğimi iptal edemiyorum", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 100, label: "Telefon hattımı iptal edemiyorum", intentKey: "telecom.number-line-identity", canonicalSlug: "telefon-internet-numara-hat-islemleri-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 101, label: "Haksız cayma bedeli çıkarıldı", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 102, label: "Taahhüt bilgim dışında yenilendi", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 103, label: "İnternet hızı sözleşmedeki hızdan çok düşük", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 104, label: "İnternet sürekli kesiliyor", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 105, label: "Numara taşıma işlemi yapılmıyor", intentKey: "telecom.number-line-identity", canonicalSlug: "telefon-internet-numara-hat-islemleri-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 106, label: "Haberim olmadan ücretli servise abone edildim", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 107, label: "Paket aşımı nedeniyle yüksek fatura geldi", intentKey: "telecom.billing-service-disputes", canonicalSlug: "telefon-internet-hizmet-sorunu-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 108, label: "Telefon hattım bilgim dışında açıldı", intentKey: "telecom.number-line-identity", canonicalSlug: "telefon-internet-numara-hat-islemleri-nereye-basvurulur", disposition: "existing-route" },
  { backlogId: 109, label: "Kayıp/çalıntı telefonun IMEI'si nasıl kapatılır?", intentKey: "telecom.lost-stolen-imei-block", canonicalSlug: "kayip-calinti-telefon-imei-kapatma", disposition: "new-route" },
  { backlogId: 110, label: "BTK'ya operatör/internet sağlayıcısı şikâyeti nasıl yapılır?", intentKey: "telecom.btk-complaint", canonicalSlug: "telefon-internet-btk-ya-tasinan-basvurular-nereye-basvurulur", disposition: "existing-route" }
];
