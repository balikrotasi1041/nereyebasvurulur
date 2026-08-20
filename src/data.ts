export type Problem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  aliases: string[];
  firstStep: string;
  nextStep: string;
  caution?: string;
  verified: boolean;
};

export const problems: Problem[] = [
  {
    slug: "komsu-gurultusu-nereye-sikayet-edilir",
    title: "Komşu gürültüsü için nereye başvurulur?",
    summary: "Gürültünün kaynağına, niteliğine ve devam edip etmediğine göre yetkili kamusal başvuru yolu değişebilir.",
    category: "Kamu düzeni ve yerel yaşam",
    aliases: ["komşu gürültüsü", "gece gürültü", "apartman gürültü", "ses yapan komşu"],
    firstStep: "Önce olayın niteliğini ve aciliyetini belirleyin. Devam eden ve kamu düzenini etkileyen durumlarda yetkili yerel kamu birimine yönlendirme gerekir.",
    nextStep: "İlk resmî başvurudan sonuç alınamazsa mevzuata göre ilgili üst veya alternatif idari kanala geçilir.",
    caution: "Acil tehdit, şiddet veya kavga varsa normal başvuru rotası yerine acil yardım kanalı kullanılmalıdır.",
    verified: false
  },
  {
    slug: "sokak-lambasi-yanmiyor-nereye-bildirilir",
    title: "Sokak lambası yanmıyor, nereye bildirilir?",
    summary: "Aydınlatma arızalarında ilk hizmet sağlayıcısı bölgeye göre değişebilir; sonraki resmî denetim/başvuru mercii ayrıca gösterilir.",
    category: "Temel altyapı ve kamu hizmetleri",
    aliases: ["sokak lambası", "sokak ışığı", "aydınlatma arızası", "direk lambası"],
    firstStep: "Konuma göre görevli elektrik dağıtım kuruluşunu belirleyin ve resmî arıza kaydı açın.",
    nextStep: "Kayıt numarasını saklayın; çözülmezse ilgili düzenleyici veya yetkili kamu başvuru kanalına geçin.",
    verified: false
  },
  {
    slug: "bozuk-yol-nereye-bildirilir",
    title: "Bozuk yol nereye bildirilir?",
    summary: "Yolun belediye, büyükşehir, Karayolları veya başka bir idarenin sorumluluğunda olmasına göre merci değişir.",
    category: "Belediye ve yerel idare",
    aliases: ["bozuk yol", "çukur yol", "asfalt bozuk", "yol şikayeti"],
    firstStep: "Önce yolun hangi kamu idaresinin sorumluluğunda olduğunu belirleyin.",
    nextStep: "Başvuru numarasıyla takip edin; yetki farklıysa doğru kamu kurumuna sevk veya yeni başvuru yapın.",
    verified: false
  },
  {
    slug: "belediye-basvurusuna-cevap-verilmedi-ne-yapmaliyim",
    title: "Belediye başvurusuna cevap verilmediyse nereye başvurulur?",
    summary: "Başvurunun türüne ve hukuki niteliğine göre takip, üst başvuru veya diğer idari yollar farklılaşabilir.",
    category: "Belediye ve yerel idare",
    aliases: ["belediye cevap vermedi", "belediye şikayetime cevap yok", "belediye başvuru sonucu yok"],
    firstStep: "İlk başvurunun kayıt numarası, tarihi ve başvuru türü doğrulanır; varsa belediyenin resmî takip/itiraz mekanizması kullanılır.",
    nextStep: "Sonuç alınamazsa başvurunun niteliğine göre ilgili üst idari veya kanuni başvuru yolu kontrol edilir.",
    verified: false
  },
  {
    slug: "bilgi-edinme-basvurusu-nereye-yapilir",
    title: "Bilgi edinme başvurusu nereye yapılır?",
    summary: "Kamu kurumlarından bilgi veya belge talebinde başvurunun muhatabı ve özel istisnaları mevzuata göre belirlenir.",
    category: "Bilgi edinme ve resmî başvurular",
    aliases: ["bilgi edinme", "kamu kurumundan belge isteme", "bilgi edinme başvurusu", "resmi bilgi talebi"],
    firstStep: "Talep edilen bilgi veya belgenin hangi kamu kurumunun görev alanında olduğunu belirleyin ve kurumun resmî bilgi edinme kanalını kullanın.",
    nextStep: "Başvurunun reddi veya cevapsız kalması halinde mevzuatta öngörülen itiraz ve sonraki başvuru yollarını kontrol edin.",
    caution: "Süreler ve istisnalar başvurunun niteliğine göre değişebileceğinden güncel mevzuat kontrol edilmelidir.",
    verified: false
  },
  {
    slug: "kacak-yapi-nereye-sikayet-edilir",
    title: "Kaçak yapı nereye şikâyet edilir?",
    summary: "İmar yetkisi yerleşim türüne ve idari sınırlara göre farklı kamu idarelerinde olabilir.",
    category: "İmar ve yapı",
    aliases: ["kaçak yapı", "ruhsatsız inşaat", "kaçak inşaat", "imar şikayeti"],
    firstStep: "Yapının bulunduğu yerin yetkili imar idaresini belirleyin.",
    nextStep: "Başvuruyu adres, ada/parsel bilgisi varsa bu bilgi ve gözlemlenen durumu açıkça belirterek yapın; sonuç alınamazsa mevzuattaki üst veya alternatif idari yolu kontrol edin.",
    verified: false
  },
  {
    slug: "internet-hizmeti-sorunu-resmi-basvuru-yolu",
    title: "İnternet hizmeti sorunu için resmî başvuru yolu nedir?",
    summary: "Elektronik haberleşme hizmetinde ilk adım hizmet sağlayıcısının resmî kayıt kanalı olabilir; sonraki kamu başvuru yolu ilgili düzenleyici çerçeveye göre belirlenir.",
    category: "Temel altyapı ve kamu hizmetleri",
    aliases: ["internet şikayet", "telefon operatörü şikayet", "internet arıza resmi başvuru", "elektronik haberleşme şikayet"],
    firstStep: "Hizmeti sunan işletmecide kayıt numaralı resmî başvuru oluşturun ve başvuru kaydını saklayın.",
    nextStep: "Çözülmezse elektronik haberleşme alanındaki yetkili düzenleyici kamu merciinin güncel resmî başvuru mekanizmasına geçin.",
    caution: "Bu rota yalnızca kamu tarafından düzenlenen elektronik haberleşme hizmetinin resmî başvuru zincirini kapsar; genel özel şirket/tüketici uyuşmazlığı rehberi değildir.",
    verified: false
  }
];

export const categories = [
  "Belediye ve yerel idare",
  "Kamu kurumları ve kamu görevlileri",
  "Bilgi edinme ve resmî başvurular",
  "İtiraz ve idari hak arama",
  "Temel altyapı ve kamu hizmetleri",
  "Çevre ve şehircilik",
  "İmar ve yapı",
  "Trafik ve ulaşım",
  "Eğitim",
  "Sağlık",
  "Sosyal hizmet ve yardımlar",
  "Kamu düzeni ve yerel yaşam",
  "Valilik ve kaymakamlık işlemleri",
  "Ruhsat, izin ve idari işlemler",
  "Vergi, harç ve kamu alacakları"
];
