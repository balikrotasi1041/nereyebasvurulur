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
    summary: "Gürültünün kaynağına ve devam edip etmediğine göre doğru başvuru yolu değişebilir.",
    category: "Ev, apartman ve komşuluk",
    aliases: ["komşu gürültüsü", "gece gürültü", "apartman gürültü", "ses yapan komşu"],
    firstStep: "Önce olayın niteliğini ve aciliyetini belirleyin. Devam eden ve kamu düzenini etkileyen durumlarda yetkili yerel birime yönlendirme gerekir.",
    nextStep: "İlk başvurudan sonuç alınamazsa ilgili üst veya alternatif idari kanala geçilir.",
    caution: "Acil tehdit, şiddet veya kavga varsa normal şikâyet rotası yerine acil yardım kanalı kullanılmalıdır.",
    verified: false
  },
  {
    slug: "sokak-lambasi-yanmiyor-nereye-bildirilir",
    title: "Sokak lambası yanmıyor, nereye bildirilir?",
    summary: "Aydınlatma arızalarında yetkili dağıtım kuruluşu bölgeye göre değişebilir.",
    category: "Elektrik, su ve doğalgaz",
    aliases: ["sokak lambası", "sokak ışığı", "aydınlatma arızası", "direk lambası"],
    firstStep: "Konuma göre görevli elektrik dağıtım kuruluşunu belirleyin ve arıza kaydı açın.",
    nextStep: "Kayıt numarasını saklayın; çözülmezse ilgili düzenleyici veya kamu başvuru kanalına geçin.",
    verified: false
  },
  {
    slug: "bozuk-yol-nereye-bildirilir",
    title: "Bozuk yol nereye bildirilir?",
    summary: "Yolun belediye, büyükşehir, karayolları veya başka bir idarenin sorumluluğunda olmasına göre merci değişir.",
    category: "Belediye ve şehir sorunları",
    aliases: ["bozuk yol", "çukur yol", "asfalt bozuk", "yol şikayeti"],
    firstStep: "Önce yolun hangi idarenin sorumluluğunda olduğunu belirleyin.",
    nextStep: "Başvuru numarasıyla takip edin; yetki farklıysa doğru kuruma sevk veya yeni başvuru yapın.",
    verified: false
  },
  {
    slug: "kargo-kayip-nereye-basvurulur",
    title: "Kargo kaybolduysa nereye başvurulur?",
    summary: "Önce taşıyıcı firmanın kayıtlı şikâyet kanalı, ardından uyuşmazlığın niteliğine göre tüketici başvuru yolları gündeme gelir.",
    category: "Kargo ve teslimat",
    aliases: ["kargo kayıp", "paket kayboldu", "kargom gelmedi", "teslim edilmedi"],
    firstStep: "Taşıyıcı firmada yazılı veya kayıt numaralı başvuru oluşturun.",
    nextStep: "Çözülmezse uyuşmazlık tutarına ve niteliğine göre yetkili tüketici başvuru yolunu kontrol edin.",
    verified: false
  },
  {
    slug: "maas-odenmedi-nereye-basvurulur",
    title: "Maaş ödenmediyse nereye başvurulur?",
    summary: "Çalışma statüsü ve uyuşmazlığın niteliği başvuru rotasını değiştirir.",
    category: "İş ve çalışma hayatı",
    aliases: ["maaş ödenmedi", "işveren maaş vermiyor", "ücret yatmadı", "maaşımı alamadım"],
    firstStep: "Çalışma statünüzü ve talebin türünü belirleyin; varsa ücret bordrosu ve ödeme kayıtlarını hazırlayın.",
    nextStep: "İdari ve hukuki başvuru yolları statünüze göre ayrıştırılmalıdır.",
    caution: "Bu sayfa kişisel hukuki danışmanlık yerine doğru resmî başvuru kanalını bulmayı amaçlar.",
    verified: false
  },
  {
    slug: "kacak-yapi-nereye-sikayet-edilir",
    title: "Kaçak yapı nereye şikâyet edilir?",
    summary: "İmar yetkisi yerleşim türüne ve idari sınırlara göre farklı kurumlarda olabilir.",
    category: "İmar ve yapı",
    aliases: ["kaçak yapı", "ruhsatsız inşaat", "kaçak inşaat", "imar şikayeti"],
    firstStep: "Yapının bulunduğu yerin yetkili imar idaresini belirleyin.",
    nextStep: "Başvuruyu adres, ada/parsel bilgisi varsa bu bilgi ve gözlemlenen durumu açıkça belirterek yapın.",
    verified: false
  }
];

export const categories = [
  "Ev, apartman ve komşuluk",
  "Belediye ve şehir sorunları",
  "İş ve çalışma hayatı",
  "Tüketici sorunları",
  "Elektrik, su ve doğalgaz",
  "İnternet ve telefon",
  "Trafik ve ulaşım",
  "Çevre",
  "Eğitim",
  "Sağlık",
  "Kamu kurumları",
  "İmar ve yapı",
  "Hayvanlar",
  "Kargo ve teslimat",
  "İtiraz ve hak arama"
];
