export type Source = {
  title: string;
  url: string;
  authority: string;
};

export type RouteRecord = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  aliases: string[];
  steps: string[];
  legalBasis?: string[];
  caution?: string;
  currentCycleNote?: string;
  sources: Source[];
  lastVerified: string;
  timeSensitive: boolean;
};

export type MenuNode = {
  label: string;
  slug?: string;
  children?: MenuNode[];
};

const leaf = (label: string, slug?: string): MenuNode => ({ label, slug });
const branch = (label: string, children: MenuNode[]): MenuNode => ({ label, children });

export const menuTree: MenuNode[] = [
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
  branch("Elektrik, Su, Doğalgaz ve Haberleşme", [
    branch("Elektrik", [leaf("Elektrik kesintisi"), leaf("Sokak aydınlatması"), leaf("Direk / kablo tehlikesi"), leaf("Dağıtım sorunu")]),
    branch("Su / Kanalizasyon", [leaf("Su kesintisi"), leaf("Su arızası"), leaf("Kanalizasyon"), leaf("Su baskını / taşkın altyapısı")]),
    branch("Doğalgaz", [leaf("Gaz kesintisi"), leaf("Dağıtım hizmeti"), leaf("Acil gaz durumu")]),
    branch("Telefon / İnternet", [leaf("Altyapı"), leaf("Hizmet sorunu"), leaf("Numara / hat işlemleri"), leaf("BTK'ya taşınan başvurular")])
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

export const routes: RouteRecord[] = [
  {
    slug: "trafik-cezasina-itiraz-nereye-yapilir",
    title: "Trafik cezasına itiraz nereye yapılır?",
    summary: "Trafik idari para cezasının yanlış veya haksız olduğunu düşünüyorsanız, güncel Emniyet Genel Müdürlüğü açıklamasına göre cezanın tebliğ tarihinden itibaren 15 gün içinde görevli yargı merciine başvurabilirsiniz.",
    category: "İtiraz ve Üst Başvuru Yolları",
    aliases: ["trafik cezası itiraz", "eds cezası itiraz", "plakaya yazılan ceza itiraz", "trafik para cezası"],
    steps: [
      "Tebliğ tarihini ve ceza karar tutanağını kontrol edin. Süre hesabında özellikle tebliğ tarihini esas alın.",
      "Emniyet Genel Müdürlüğünün güncel SSS açıklamasına göre Trafik Mahkemesinin bulunduğu yerde Trafik Mahkemesine; bulunmadığı yerde yetkili Sulh Ceza Hâkimliğine başvurulur.",
      "UYAP Vatandaş Portal trafik ve idari para cezalarına elektronik itiraz imkânı sunmaktadır. Portalın o anki kimlik doğrulama ve elektronik imza şartlarını başvuru sırasında ayrıca kontrol edin.",
      "Ceza tutanağı, tebligat ve itirazınızı destekleyen belgeleri/delilleri başvuruya ekleyin."
    ],
    legalBasis: ["5326 sayılı Kabahatler Kanunu m.27", "2918 sayılı Karayolları Trafik Kanunu"],
    caution: "Trafikten men, sürücü belgesinin geri alınması gibi para cezasından farklı idari yaptırımlarda görevli yargı yolu değişebilir. Bu sayfa yalnız trafik idari para cezasına itiraz rotasını temel alır.",
    sources: [
      { title: "Emniyet Genel Müdürlüğü Trafik Başkanlığı - Sıkça Sorulan Sorular", url: "https://trafik.gov.tr/sss0", authority: "Emniyet Genel Müdürlüğü" },
      { title: "UYAP - Sunulan Hizmetler", url: "https://www.uyap.gov.tr/Hizmetler", authority: "Adalet Bakanlığı / UYAP" }
    ],
    lastVerified: "2026-08-20",
    timeSensitive: true
  },
  {
    slug: "askerlik-yoklamasi-nereye-yapilir",
    title: "Askerlik yoklaması nereye yapılır?",
    summary: "MSB Askeralma Genel Müdürlüğü, yoklama işleminin e-Devlet'teki “Askerliğim” hizmetinden başlatılabildiğini; ilk adım tamamlandıktan sonra aile hekimi muayenesi ve süreç takibinin devam ettiğini açıklıyor.",
    category: "Askerlik Yükümlülüğü ve Askeralma İşlemleri",
    aliases: ["askerlik yoklama", "e yoklama", "askerliğim yoklama", "askerlik muayene"],
    steps: [
      "e-Devlet'e giriş yapın ve Millî Savunma Bakanlığı altındaki “Askerliğim” bütünleşik hizmetinden yoklama başvurusunu başlatın.",
      "Sınıflandırmaya esas bilgi formu ve sistemde istenen bilgileri tamamlayın.",
      "MSB'nin güncel açıklamasına göre T.C. kimlik kartınız ve varsa sağlık belgelerinizle kayıtlı aile hekiminize müracaat edin.",
      "e-Devlet'teki Yoklama Başvurusu Süreç Takibi üzerinden işlemin durumunu izleyin; sistem sizi farklı bir sağlık kuruluşuna sevk ederse o yönlendirmeyi izleyin."
    ],
    legalBasis: ["7179 sayılı Askeralma Kanunu", "Askeralma Yönetmeliği"],
    sources: [
      { title: "MSB - Askerlik Başvurusu Nasıl Yapılır?", url: "https://www.msb.gov.tr/Askeralma/icerik/askerlik-basvurusu-nasil-yapilir", authority: "Millî Savunma Bakanlığı" },
      { title: "MSB - Askeralma Genel Müdürlüğü", url: "https://www.msb.gov.tr/Askeralma", authority: "Millî Savunma Bakanlığı" }
    ],
    lastVerified: "2026-08-20",
    timeSensitive: true
  },
  {
    slug: "bedelli-askerlik-nereye-basvurulur",
    title: "Bedelli askerlik için nereye başvurulur?",
    summary: "Başvuru kanalı yükümlünün yoklama kaçağı, saklı veya bakaya kaydına göre değişir. Kaydı olmayanlar e-Devlet veya askerlik şubesini kullanabilir; bu kayıtlardan biri bulunanlar için MSB askerlik şubesi rotasını öngörüyor.",
    category: "Askerlik Yükümlülüğü ve Askeralma İşlemleri",
    aliases: ["bedelli askerlik", "bedelli başvuru", "bedelli askerlik e devlet", "bedelli askerlik şubesi"],
    steps: [
      "Önce yoklama ve askerlik durumunuzu e-Devlet “Askerliğim” hizmetinden kontrol edin.",
      "Müracaat tarihine kadar yoklama kaçağı, saklı veya bakaya kaydınız yoksa e-Devlet üzerinden veya askerlik şubesinden başvurabilirsiniz.",
      "Bu kayıtlardan biri varsa MSB'nin güncel bedelli askerlik açıklamasındaki özel başvuru kuralını izleyin; başvuru askerlik şubesi üzerinden yürütülür.",
      "Başvurudan sonra ödeme süresini ve celp tercihlerini MSB'nin güncel duyurularından takip edin."
    ],
    legalBasis: ["7179 sayılı Askeralma Kanunu m.9", "Askeralma Yönetmeliği"],
    caution: "Bedel, ödeme süresi, celp takvimi ve başvuru dönemleri değişkendir. Ödeme yapmadan önce aynı gün MSB Askeralma duyurusunu kontrol edin.",
    currentCycleNote: "MSB'nin 7 Temmuz 2026 tarihli duyurusunda 1 Temmuz-31 Aralık 2026 dönemi bedelli askerlik bedeli 472.653,60 TL olarak açıklanmış ve müracaat işlemlerinin 7 Temmuz 2026'da yeniden başladığı belirtilmiştir.",
    sources: [
      { title: "MSB - Bedelli Askerlik", url: "https://www.msb.gov.tr/Askeralma/icerik/bedelli-askerlik", authority: "Millî Savunma Bakanlığı" },
      { title: "MSB - 01 Temmuz–31 Aralık 2026 Bedelli Askerlik Müracaat Duyurusu", url: "https://www.msb.gov.tr/Askeralma/Duyuru/67032f65cc024348b8cf3fea86c95128", authority: "Millî Savunma Bakanlığı" }
    ],
    lastVerified: "2026-08-20",
    timeSensitive: true
  },
  {
    slug: "msu-askeri-ogrenci-basvurusu-nereye-yapilir",
    title: "MSÜ askerî öğrenci başvurusu nereye yapılır?",
    summary: "MSÜ askerî öğrenci süreci tek kapıdan ibaret değildir: aday belirleme sınavı ÖSYM üzerinden, okul tercihleri ve seçim aşamaları ise MSB Personel Temin sistemi üzerinden yürütülür.",
    category: "Askerî Okullar ve TSK Personel Temini",
    aliases: ["msü başvuru", "harp okulu başvuru", "astsubay myo başvuru", "askeri okul başvuru"],
    steps: [
      "İlgili yılın MSÜ Aday Belirleme Sınavı kılavuzunu ÖSYM'den kontrol edin ve başvuruyu ÖSYM AİS, ÖSYM Başvuru Merkezi veya ÖSYM mobil kanallarından kılavuzdaki tarihlerde yapın.",
      "Harp Okulları/Astsubay MYO için o yılın YKS şartlarını ayrıca yerine getirin. 2026 kılavuzunda Harp Okulları için TYT+AYT, Astsubay MYO için TYT şartı yer aldı.",
      "MSÜ sınavı sonrası okul tercihlerini MSB Personel Temin sisteminden yapın; tercih yapmayan adaylar seçim aşamalarına çağrılmaz.",
      "İkinci seçim aşaması, çağrı, evrak, fiziki yeterlilik, sağlık, mülakat ve sonuç duyurularını MSB Personel Temin sisteminden takip edin."
    ],
    currentCycleNote: "2026-MSÜ sınav başvuruları 5-29 Ocak 2026'da alındı. MSB Personel Temin sistemi 17 Ağustos 2026'da Harp Okulları ve Astsubay MYO sonuç duyurularını yayımladı. Yeni adayların sonraki dönem kılavuzunu beklemesi gerekir.",
    caution: "Başvuru tarihleri, yaş/öğrenim şartları, YKS puan türleri ve seçim aşamaları her dönem kılavuzla değişebilir. Eski dönem şartlarını yeni dönem için kullanmayın.",
    sources: [
      { title: "ÖSYM - 2026-MSÜ Sınavı Başvuruların Alınması", url: "https://www.osym.gov.tr/2026msu-sinavi-basvurularin-alinmasi", authority: "ÖSYM" },
      { title: "MSB Personel Temin Sistemi", url: "https://personeltemin.msb.gov.tr/", authority: "Millî Savunma Bakanlığı" },
      { title: "MSB - Öğrenci Temini", url: "https://personeltemin.msb.gov.tr/Anasayfa/IcerikWeb/MDS03?menuItem=1", authority: "Millî Savunma Bakanlığı" }
    ],
    lastVerified: "2026-08-20",
    timeSensitive: true
  },
  {
    slug: "jsga-guvenlik-bilimleri-fakultesi-basvurusu",
    title: "JSGA Güvenlik Bilimleri Fakültesi başvurusu nereye yapılır?",
    summary: "Jandarma ve Sahil Güvenlik Akademisi Güvenlik Bilimleri Fakültesi öğrenci temini, Jandarma Genel Komutanlığı Personel - JSGA Öğrenci Temin Sistemi üzerinden yürütülür.",
    category: "Jandarma ve Sahil Güvenlik Temin İşlemleri",
    aliases: ["jsga güvenlik bilimleri", "jandarma subay öğrenci", "jandarma öğrenci temin"],
    steps: [
      "Jandarma Genel Komutanlığının ilgili yıl öğrenci temin duyurusunu ve başvuru kılavuzunu kontrol edin.",
      "Başvuruyu J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi üzerinden, ilan edilen tarih aralığında yapın.",
      "Sistem e-Devlet üzerinden giriş kullanır ve çok faktörlü kimlik doğrulaması zorunluluğunu ayrıca duyurur.",
      "Başvuru sonuçları ve sonraki seçim aşamalarını aynı sistemdeki duyuru/sonuç ekranlarından takip edin."
    ],
    currentCycleNote: "2026 Güvenlik Bilimleri Fakültesi başvuruları 3-26 Temmuz 2026 arasında alındı; 2026 başvuru sonuçları 5 Ağustos 2026'da sistemde yayımlandı.",
    caution: "2026 dönemi başvurusu kapanmıştır. Yeni dönem için yalnız yeni Jandarma duyurusu ve kılavuzu esas alınmalıdır.",
    sources: [
      { title: "Jandarma - 2026 Güvenlik Bilimleri Fakültesi ve JAMYO Öğrenci Temini", url: "https://www.jandarma.gov.tr/2026-yili-guvenlik-bilimleri-fakultesi-ve-jandarma-astsubay-meslek-yuksekokuluna-ogrenci-temini", authority: "Jandarma Genel Komutanlığı" },
      { title: "J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi", url: "https://vatandas.jandarma.gov.tr/PTM/frmAdayGirisveDuyuru.aspx", authority: "Jandarma Genel Komutanlığı" }
    ],
    lastVerified: "2026-08-20",
    timeSensitive: true
  },
  {
    slug: "jsga-jandarma-astsubay-myo-basvurusu",
    title: "Jandarma Astsubay Meslek Yüksekokulu başvurusu nereye yapılır?",
    summary: "JAMYO öğrenci temini Jandarma Genel Komutanlığı Personel - JSGA Öğrenci Temin Sistemi üzerinden yürütülür; dönem şartları başvuru kılavuzunda ilan edilir.",
    category: "Jandarma ve Sahil Güvenlik Temin İşlemleri",
    aliases: ["jamyo başvuru", "jandarma astsubay myo", "jandarma astsubay öğrenci"],
    steps: [
      "İlgili yılın JAMYO başvuru kılavuzunu Jandarma Genel Komutanlığının resmî duyurusundan kontrol edin.",
      "İlan döneminde J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemine e-Devlet üzerinden giriş yaparak başvurun.",
      "Sonuç, sınav çağrısı ve sonraki aşamaları aynı sistemden takip edin."
    ],
    currentCycleNote: "2026 JAMYO başvuruları 3-26 Temmuz 2026 arasında alındı; 2026 sonuç duyurusu 5 Ağustos 2026'da sistemde yer aldı.",
    caution: "Yaş, öğrenim, sınav puanı, fiziki kriter ve takvim gibi şartlar dönemsel kılavuzla değişebilir.",
    sources: [
      { title: "Jandarma - 2026 Güvenlik Bilimleri Fakültesi ve JAMYO Öğrenci Temini", url: "https://www.jandarma.gov.tr/2026-yili-guvenlik-bilimleri-fakultesi-ve-jandarma-astsubay-meslek-yuksekokuluna-ogrenci-temini", authority: "Jandarma Genel Komutanlığı" },
      { title: "J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi", url: "https://vatandas.jandarma.gov.tr/PTM/frmAdayGirisveDuyuru.aspx", authority: "Jandarma Genel Komutanlığı" }
    ],
    lastVerified: "2026-08-20",
    timeSensitive: true
  },
  {
    slug: "jandarma-subay-astsubay-personel-temini",
    title: "Jandarma subay/astsubay personel teminine nereye başvurulur?",
    summary: "Jandarma Genel Komutanlığı ve Sahil Güvenlik Komutanlığının ilanlı muvazzaf/sözleşmeli subay ve astsubay teminleri Jandarma Personel - JSGA Öğrenci Temin Sistemi üzerinden yürütülür.",
    category: "Jandarma ve Sahil Güvenlik Temin İşlemleri",
    aliases: ["jandarma subay temin", "jandarma astsubay temin", "jandarma personel alımı"],
    steps: [
      "Jandarma Genel Komutanlığının ilgili personel temin duyurusunu ve kılavuzunu kontrol edin.",
      "Başvuru açıkken J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi üzerinden e-Devlet ile giriş yaparak başvurun.",
      "Sınav çağrısı, evrak, fiziki değerlendirme, sağlık, mülakat ve sonuç duyurularını aynı sistemden takip edin."
    ],
    currentCycleNote: "2026 yılı muvazzaf/sözleşmeli subay/astsubay temini için başvurular 26 Ocak-9 Şubat 2026 arasında alındı; bu dönem kapanmıştır.",
    caution: "Personel teminleri ilan bazlıdır. Yeni ilan yayımlanmadan eski kılavuzdaki şartlarla başvuru yapılamaz.",
    sources: [
      { title: "Jandarma - 2026 Muvazzaf/Sözleşmeli Subay/Astsubay Temini", url: "https://www.jandarma.gov.tr/2026-yili-muvazzafsozlesmeli-subayastsubay-temini", authority: "Jandarma Genel Komutanlığı" },
      { title: "J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi", url: "https://vatandas.jandarma.gov.tr/PTM/frmAdayGirisveDuyuru.aspx", authority: "Jandarma Genel Komutanlığı" }
    ],
    lastVerified: "2026-08-20",
    timeSensitive: true
  }
];

export const routeBySlug = new Map(routes.map(route => [route.slug, route]));

export function countLeaves(nodes: MenuNode[]): number {
  return nodes.reduce((sum, node) => sum + (node.children ? countLeaves(node.children) : 1), 0);
}

export function countLinkedLeaves(nodes: MenuNode[]): number {
  return nodes.reduce((sum, node) => sum + (node.children ? countLinkedLeaves(node.children) : (node.slug ? 1 : 0)), 0);
}
