# İçerik Doğrulama ve Güncellik Politikası

Bu belge, Nereye Başvurulur? platformunda yayımlanacak başvuru rotalarının hangi kaynaklara dayanacağını, nasıl doğrulanacağını ve değişikliklerin nasıl yönetileceğini tanımlar.

## 1. Temel ilke

Platform genel bilgilendirme ve yönlendirme amacı taşır. Hiçbir içerik hukuki danışmanlık, resmî görüş veya sonuç garantisi olarak sunulmaz.

Kullanıcıya bir işlem yapmadan önce ilgili güncel mevzuatı, yetkili kurumun resmî açıklamalarını ve varsa özel/kanuni başvuru veya itiraz yollarını incelemesi kesin olarak tavsiye edilir. Süreye bağlı işlemlerde kullanıcının yalnızca bu platformdaki bilgiye dayanması önerilmez.

## 2. Kaynak hiyerarşisi

Bir rota mümkün olduğunca aşağıdaki sırayla doğrulanır:

1. Resmî Gazete ve yürürlükteki resmî mevzuat metni.
2. İlgili kanun, Cumhurbaşkanlığı kararnamesi, yönetmelik, tebliğ veya diğer bağlayıcı düzenleme.
3. Yetkili bakanlık, düzenleyici kurum, kamu kurumu veya yargı organının resmî sitesi.
4. e-Devlet üzerinde sunulan resmî hizmet ve açıklamalar.
5. Yetkili valilik, belediye, dağıtım kuruluşu veya yerel kamu kurumunun resmî kanalı.

Bloglar, forumlar, haber siteleri ve kullanıcı yorumları tek başına bir başvuru rotasını doğrulamak için yeterli kaynak sayılmaz. Bunlar yalnızca araştırma ipucu olarak kullanılabilir.

## 3. Yayın statüleri

### Doğrulandı

- Yetkili kurum ve başvuru yolu güncel resmî kaynaklarla desteklenmiştir.
- Önemli süreler ve özel usuller kontrol edilmiştir.
- Son doğrulama tarihi kayıtlıdır.

### Yüksek güven / yerel kontrol gerekli

- Genel yetki ve süreç resmî kaynaklarla doğrulanmıştır.
- Ancak il, ilçe, kurum organizasyonu veya yerel uygulama sonucu değiştirebilir.
- Kullanıcıya yerel yetkili kurumu ayrıca kontrol etmesi açıkça söylenir.

### Doğrulama bekliyor

- Resmî kaynak zinciri tamamlanmamıştır.
- Başlığın güvenli bir rotaya dönüşmesi için gereken işlem/program, kurum, dönem ve yer bilgisi `publicationBlocker` alanında açıkça kaydedilir.
- Canlı sitede kesin yönlendirme olarak yayımlanmaz.

## 4. Özel dikkat gerektiren alanlar

Aşağıdaki bilgiler tek kaynağa dayanılarak yayımlanmamalıdır:

- hak düşürücü veya zamanaşımı niteliği taşıyabilecek süreler,
- dava, itiraz, idari başvuru veya zorunlu ön başvuru usulleri,
- görevli/yetkili mahkeme veya kurul bilgisi,
- para sınırları ve parasal eşikler,
- bölgesel veya kuruma göre değişen yetki alanları,
- acil durum, ceza veya yaptırım doğurabilecek yönlendirmeler.

Belirsizlik varsa kesin hüküm yerine `kontrol gerekli` uyarısı kullanılır.
Katsayı, kur, tarife veya dönemsel ilanla değişen tutarlar sabit içerikten değil, işlem günündeki resmî tahakkuk/başvuru ekranından alınır; eski dönem tutarı yeni dönem için taşınmaz.

## 5. Değişiklik takibi

Yayın öncesi ve sonrasında aşağıdaki sistem kurulacaktır:

1. Resmî Gazete günlük değişiklik kontrolü.
2. Her problem kaydında kullanılan resmî kaynak URL'lerinin kaydı.
3. Kaynak sayfalarında değişiklik tespiti için periyodik kontrol.
4. Değişiklik tespit edildiğinde ilgili rotanın otomatik olarak `yeniden inceleme gerekli` durumuna alınması.
5. Mevzuat veya kurum değişikliği insan/ajan incelemesinden geçmeden otomatik olarak yeni hukuki sonuç şeklinde yayımlanmaması.
6. Her rotada `son doğrulama tarihi` gösterilmesi.

## 6. Güvenli başarısızlık ilkesi

Doğru merci veya usul güvenilir biçimde belirlenemiyorsa platform tahminde bulunmaz. Kullanıcıya belirsizlik açıkça gösterilir ve doğrudan yetkili kurumun güncel resmî kaynağını kontrol etmesi önerilir.

Yanlış kesinlik vermek yerine eksikliği göstermek tercih edilir.

## 7. Yayın öncesi zorunlu alanlar

Bir rota `Doğrulandı` olarak yayımlanmadan önce en az:

- problem ve kapsam tanımı,
- ilk başvuru mercii,
- alternatif/sonraki yol,
- coğrafi yetki bilgisi gerekiyorsa kapsamı,
- resmî kaynak veya kaynaklar,
- özel süre/usul uyarıları,
- son doğrulama tarihi,
- güven seviyesi

kayıtlı olmalıdır.

Problem bazlı rotalarda bunlara ek olarak `intentKey`, `parentHub`, `canonicalIntent`, `evidenceChecklist`, `urgency`, `reviewCadence` ve uygulanıyorsa `thresholdKey` zorunludur. e-Devlet hizmeti bulunduğu işaretlenen kayıtta doğrudan hizmet bağlantısı; yazılı dilekçe gereken kayıtta konu, merci ve önerilen dilekçe türü bulunur. Yıllık değişen parasal sınırlar sayfa metinlerinde kopyalanmaz, merkezî eşik kaydından okunur.

## 8. Kalite radarı

Kalite radarı her rotayı aşağıdaki eksikler için ayrı ayrı işaretler:

- güvenilir resmî kaynak bulunmaması,
- doğrudan resmî başvuru veya işlem bağlantısının bulunmaması,
- itiraz/üst başvuru yolunun bulunmaması,
- mevcut olduğu belirtilen e-Devlet köprüsünün bulunmaması,
- gerekli olduğu belirtilen dilekçe referansının bulunmaması,
- `lastVerified` tarihinin rota `reviewCadence` süresini aşması,
- çözümlenmemiş resmî kaynak çelişkisi.

Çelişkili kaynak bulunan rota kesin sonuç yayımlamaz. Kalite radarı yayın öncesi testte ilk dalga için sıfır eksik koşuluyla, yönetim panelinde ise bütün envanteri sürekli görünür kılacak biçimde çalışır.

## 9. Askerlik şubesi konum kayıtları

Askerlik şubesi sayfalarında il ve ilçe envanteri İçişleri Bakanlığının Valilikler ve Kaymakamlıklar kaydından, sorumlu şube adı ile adres/telefon/e-posta bilgileri MSB Askeralma Genel Müdürlüğünün resmî “Askerlik Şubeleri İletişim Bilgileri” aramasından alınır.

- Her ilçe için MSB sisteminin döndürdüğü sorumlu şube gösterilir; her ilçede ayrı fiziksel şube varmış gibi ifade kullanılmaz.
- MSB sonucu alınamayan ilçe kesin iletişim sayfası olarak yayımlanmaz.
- Yol tarifi bağlantısı, MSB'nin yayımladığı şube adı ve yazışma adresini harita uygulamasına hedef olarak aktarır; doğrulanmamış enlem/boylam tahmini saklanmaz.
- Her kayıtta resmî sorguda kullanılan il/ilçe değeri ve son doğrulama tarihi tutulur.
- Adres ve telefon değişebileceği için kayıtlar yüksek güncellik ihtiyacıyla periyodik olarak yeniden üretilir ve veri bütünlüğü testinden geçirilir.
- İlçe adı ile şube adının aynı veya farklı olması, ilçede fiziksel şube bulunduğunun ya da bulunmadığının kanıtı değildir. Yalnız resmî sorgunun hangi şubeyi gösterdiği söylenir; fiziksel yer hakkında ek iddia ayrı kaynak ister.

## 10. İşlem anlamı ve kısa cevap tutarlılığı

- Her sayfanın kullanıcı niyeti ve işlem aşaması belirlenir. İlk başvuru mercii, ilk kanal, hızlı cevap, belge listesi, işlem adımları ve dilekçe aynı aşamayı anlatmalıdır. Bağlantısı olmayan ilk kanal, sırf sonraki kanalda URL var diye atlanmaz.
- Başvuru, karara itiraz ve kararın icrası aynı işlem değildir. Karar aşamasındaki kullanıcı ilk satıcı şikâyeti veya yeni hakem heyeti başvurusuna döndürülmez.
- MSÜ genel rehberi, Harp Okulları, tercih işlemleri ve ikinci seçim aşamaları ayrı kullanıcı sorularını cevaplar. ÖSYM sınav başvurusuyla MSB tercih/çağrı kanalı karıştırılmaz; ortak paragrafın yalnız başlığı değiştirilerek yeni sayfa hazırlanmaz.
- `thresholdKey` yalnız parasal görev/uygunluk sınırıdır; başvuru ücreti, harç veya ödenecek bedel değildir. Gerçek ücret bilgisi varsa `applicationCost.summary`, resmî `sourceUrls` ve `verifiedAt` birlikte tutulur. Kaynağı olmayan ücret ya da ücretsiz olma iddiası üretilmez.
- `applicationTiming`: `continuous` (ilan döneminden bağımsız), `event-relative` (olay/tebliğ gibi kişisel başlangıca bağlı), `periodic` (resmî ilan dönemi). `freshnessRisk`, `urgency` veya `timeSensitive` tek başına dönem bilgisi vermez. Tür doğrulanmadıysa süre alanı gösterilir; açık/kapalı diye tahmin yapılmaz.
- “Başvuru açık” iddiası için ilgili aşamanın başlamış olduğu ve bitiş/erken kapanma koşulları kaynakta doğrulanır. Duyurunun yayımlanma tarihi başlangıç tarihi sayılmaz; gelecek dönem duyurusu bugüne açık gösterilmez. Sonuç ve sevk duyuruları başvuru dönemi açmaz.
- Duyurularda kesin başlangıç `startsAt`, saatli kapanış `deadlineAt` ile tutulur. Yalnız son gün biliniyorsa `deadlineDate` kullanılır; 00.00 veya 23.59 uydurulmaz. Son gün kesin açık iddiası yerine kapanış saatini kontrol et uyarısı, ertesi gün arşiv gösterilir. Liste, detay ve rota kartı aynı durum hesabını kullanır.
- Görünür SSS ve yapılandırılmış veri aynı soru-cevabı taşır. Soru başlığına ikinci bir soru eklenmez. SSS işaretlemesi zengin sonuç garantisi değildir.
- İç bağlantılar aynı işlem ailesi, anlamlı konu veya sonraki adımla ilişkilendirilir. “Başvuru”, “itiraz”, “e-Devlet” gibi ortak kelimeler tek başına ilişki kurmaz. Alakasız linkle kart sayısı tamamlanmaz.

## 11. Analize dayalı içerik üretimi

Günlük resmî denetime [kalite iş akışı](docs/seo-quality-workflow.md) ve [20 URL pilot kuyruğu](docs/seo-quality-pilot.json) eşlik eder. Önce mevcut kanonik sayfanın eksik kullanıcı cevabı tamamlanır. Yeni URL ancak farklı işlem niyeti, yeterli resmî kaynak ve bağımsız kullanıcı faydası varsa açılır. Trend veya arama eşanlamlısı tek başına yeni sayfa gerekçesi değildir.

SEO için sabit kelime sayısı, yapay güncelleme tarihi, yer adı değiştirilmiş kopya içerik, toplu noindex/redirect veya yüzeysel yeni sayfa kotası kullanılmaz. `lastVerified` tüm ilgili içeriğin gerçekten doğrulandığı tarihi gösterir; ortak şablon düzeltmesi bütün kaynakların yeniden doğrulandığı anlamına gelmez. Sitemap değişiklikleri bu iyileştirme kapsamının dışındadır.
