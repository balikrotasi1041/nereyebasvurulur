# Günlük içerik kalite ve ölçüm akışı

18 Eylül 2026 incelemesine dayanır. Mevcut resmî kaynak denetimi ve yayın görevi içinde uygulanır; ayrı otomasyon oluşturulmaz.

## Başlangıç bulgusu ve sınırları

18 Eylül GSC “Tarandı – şu anda dizine eklenmiş değil” dışa aktarımında 109 URL: 84 ilçe, 10 il, 13 konu ve 2 arama sayfası bulunuyordu. Canlı kontrolde 109 yanıt da 200; 107 içerik sayfası kendi canonical'ını bildiriyor ve noindex taşımıyordu. İki arama sayfasının noindex olması beklenen davranıştır, bunlar indeks kazanımı hedefi değildir. Google'ın seçtiği canonical ve güncel indeks durumu ancak GSC ile doğrulanabilir. Bu bulgular bütün sitenin aynı soruna sahip olduğunu veya ortak şablonun indekslenmeme sebebi olduğunu kanıtlamaz.

84 ilçe sayfasının 57'sinde ad benzerliğinden çıkarılan fiziksel şube yokluğu cümlesi vardı. Merkez örnekleri bu çıkarımın güvenilmezliğini gösterdi. Diğer bulgular: ücret alanına parasal görev sınırı taşınması; yüksek güncellik riskinin dönemsel başvuru sanılması; ilk kanalın URL lehine atlanması; tüketici itirazına ilk şikâyet adımları verilmesi; ilgisiz iç bağlantılar; dört MSÜ sayfasında aşama ayrımının zayıflığı.

## Her çalışmanın sırası

1. Güncel `main` ve içerik politikasını oku; önceki çalışmanın PR, yayın ve kuyruk durumunu kontrol et. Devam eden PR'ı kopyalama, eski checkout'u yayınlama.
2. Mevcut Resmî Gazete/kurum, normal tertip ve bedelli denetimini tamamla. Doğrulanmış acil süre, yanlış merci ve ortak şablon hatalarına adet sınırı koyma.
3. `seo-quality-pilot.json` içinden öncelik sırasıyla **en fazla üç mevcut URL** seç. Bu sayı yalnız planlı içerik derinleştirmesini sınırlar; resmî güncelleme sayısını sınırlamaz. Kaynak bulunamayan kaydı `blocked` ve somut gerekçeyle bırak, sonraki uygun kayda geç. Doldurma metin üretme.
4. Her seçilen URL için kullanıcı sorusu, ilk merci/kanal, aşamaya özgü adımlar, gerçek süre/ücret, kaynak tarihi ve ilgili iç bağlantıları kontrol et. İlçe sayfasında resmî sorumlu şube, iletişim ve yerel yönlendirme; il sayfasında gerçek hizmet dağılımı değer katar. Çalışma saati, görev alanı, mesafe veya randevu şartı uydurma.
5. Kaynak ve yapılan farkı kuyruğa işle. `ready` yalnız incelemesi/testi tamamlanan içerik; `published` yalnız production doğrulanan içeriktir. Ortak şablon düzeltmesini 20 sayfanın özgün içerik incelemesi tamamlanmış gibi sayma.
6. `pnpm validate` ve kaynak denetimini çalıştır; anlam testlerini zayıflatma. PR, squash merge, Cloudflare deploy ve değişen sayfalarda canlı doğrulamayı mevcut yayın akışıyla bitir. Yeni davranışı, kaynak belirsizliklerini ve yayın SHA'sını raporla.
7. Pilot yayınlanınca aynı URL'lerde 14 ve 28 günlük gözlem tarihlerini kaydet. GSC veri gecikmesini gözet; yalnız tamamlanmış ve eşit uzunluktaki dönemleri karşılaştır. Veri yoksa “ölçülemedi” yaz, gelişim yüzdesi üretme.

## Pilot ve üretim modeli

20 URL: 10 ilçe, 3 il, 4 MSÜ ve 3 diğer konu. Kuyrukta URL'ler sabittir; yeni URL açma hedefi yoktur. Şablon düzeltmeleri tüm ilgili sayfalara uygulanabilir, derin inceleme kaynakla sırayla ilerler. Kuyruk bittiğinde yeni GSC verisi ve kullanıcı ihtiyacıyla bir sonraki grubu seç; bekleyen gözlem süresinde sırf metin değişsin diye aynı sayfaları yeniden yazma.

MSÜ rolleri: genel rehber tüm aşamaları bağlar; Harp Okulları sayfası okul/program ve aday uygunluğunu açıklar; tercih sayfası MSB tercih ekranı ve kayıt kontrolünü; ikinci seçim sayfası kişisel çağrı, evrak ve aşama takibini açıklar. Tarih, yaş, puan veya sağlık koşulu yalnız güncel resmî kılavuzdan alınır. Bu sayfaların URL'leri birleştirilmez veya değiştirilmez.

ÇKS sayfasının listedeki son taraması 3 Eylül, içerik doğrulaması 13 Eylül'dür. Önce GSC URL Denetimi ile yeni sürümü kontrol et; eski taramaya bakarak gereksiz yeniden yazma.

## Arama, etkileşim ve güvenlik ölçümü

- GSC: aynı pilot URL grubunun indeks durumu, gösterim, tıklama, CTR ve ortalama konumu; Türkiye, cihaz ve sorgu/işlem niyeti ayrımı. Farklı dönem uzunluklarını veya bot isteklerini organik ziyaret diye kıyaslama. İndekslenme ve sıralama garantisi verme.
- Trend: erişilebilen güncel GSC sorguları, Google Trends ve resmî başvuru takvimini birlikte incele. Trends göreli ilgi verir, mutlak hacim değildir. Kaynak/dönem yoksa “trend” iddiası kurma. Doğrulanan eşanlamlıları mevcut sayfaya doğal biçimde ekle; alias başına URL açma.
- Etkileşim: mevcut resmî kanal, telefon, yol tarifi ve dilekçe akışında olay ölçümü varsa kullan. Ölçüm yoksa şema önerisini kaydet; ham arama, dilekçe metni, kimlik veya iletişim bilgilerini analitiğe aktarma. Tıklamayı başvurunun başarıyla tamamlanması sayma. Yeni ölçüm entegrasyonunu ayrıca test edilmiş değişiklik olarak yap.
- Güvenlik: erişilebilen güncel Cloudflare olaylarında zaman aralığı, IP, yol, aksiyon ve yoğunluğu birlikte değerlendir. Eski rapor, ülke, yüksek toplam istek veya User-Agent tek başına blok nedeni değildir. Arama botunu Cloudflare doğrulaması ya da resmî IP/ileri-ters DNS yöntemiyle doğrula. Tarama saldırısı 404'lerini gerçek kullanıcının bozuk bağlantılarıyla ayır; engellemenin 4xx'i mutlaka düşüreceğini varsayma. Güncel davranış olmadan yeni IP veya ağ bloğu ekleme. Zone WAF erişimi yoksa challenge uygulanmış gibi raporlama.

## Yayın sınırları ve kayıt biçimi

Sitemap üretimi, canonical, robots, mevcut URL ve indeks politikası bu çalışma kapsamında değiştirilmez. Önceden onaylı duyuru üretiminin mevcut otomatik akışı sürer. Toplu sayfa silme/noindex/yönlendirme ve yinelenen indeksleme talepleri yapılmaz. Yalnız hata veren kaynağı erişim sorunu yüzünden kesin kırık ilan etme.

Kuyruk durumları: `pending`, `blocked`, `ready`, `published`, `observing`, `reviewed`. Her içerik kaydında `evidence` (kaynak URL ve gerçekten incelenen tarih), `changeSummary`, `publishedAt`, `publishedCommit`, `observationDue` ve `observations` bulunur. Yayın bilgileri yalnız doğrulanınca doldurulur. Gözlem kaydı kullanılan veri dosyasını/dönemini, sayıları, belirsizliği ve sonraki kararı içerir. Kuyruk/ölçüm belgesi takibi için yapılan doküman commit'i içerik yayın tarihi yerine geçmez.

Başvuru ücreti modeli, zaman türü ve aşama tutarlılığı için `CONTENT_VERIFICATION_POLICY.md` zorunludur. Hiçbir üretim hedefi resmî doğrulama şartını gevşetmez.
