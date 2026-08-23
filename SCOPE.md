# Proje Kapsamı

## Temel ilke

**Nereye Başvurulur?**, kişinin başına gelen somut bir sorun veya yapmak istediği işlem için mevzuatta ya da yetkili kurumların resmî düzeninde tanımlanmış çözüm yolunu gösteren başvuru navigasyon platformudur.

Bir uyuşmazlık özel hukuk ilişkisinden doğsa bile kanunla veya resmî kurumlarca belirlenmiş bir **başvuru, şikâyet, arabuluculuk, hakem heyeti, tahkim, kolluk, savcılık ya da yargı yolu** varsa kapsamdadır. Platform şirket rehberi veya genel şikâyet panosu değildir; yalnız resmî çözüm zincirindeki adımları gösterir.

## Kapsama dahil

- Bakanlıklar, bağlı/ilgili/ilişkili kamu kurumları, valilikler, kaymakamlıklar, belediyeler ve diğer yerel idareler.
- Düzenleyici ve denetleyici kurumların resmî şikâyet ve itiraz mekanizmaları.
- e-Devlet, kurum portalları, resmî başvuru formları ve fizikî başvuru birimleri.
- Kamu karar ve işlemlerine karşı idari başvuru, itiraz ve yargı yolları.
- Tüketici Hakem Heyeti, zorunlu veya ihtiyari arabuluculuk, resmî tahkim, hakem ve kurul başvuruları.
- Suç şüphesinde kolluk, Cumhuriyet başsavcılığı ve mevzuatta gösterilen diğer adli başvuru yolları.
- Özel kişiler veya şirketler arasında doğan; ancak görevli merci, başvuru sırası veya kanun yolu resmî düzenlemeyle belirlenmiş tüketici, abonelik, iş, kira, banka, sigorta, taşıma ve benzeri uyuşmazlıklar.
- Elektrik, su, doğal gaz, telefon/elektronik haberleşme ve benzeri temel hizmetlerin işletmeci → düzenleyici kurum → hakem/yargı zinciri.

### Özel aktörlerin gösterilme sınırı

Satıcı, sağlayıcı, işveren, banka, sigortacı, taşıyıcı veya altyapı işletmecisi yalnız resmî çözüm zincirindeki rolü ölçüsünde gösterilir. Şirkete ilk yazılı başvuru kanunen veya ispat bakımından gerekli/yararlıysa bu adım belirtilir; ardından yetkili hakem, düzenleyici kurum, arabuluculuk, tahkim veya yargı köprüsü kurulur.

Örnek:

- “Bir pazaryerinin müşteri hizmetleri numarası nedir?” kapsam dışıdır.
- “İnternetten aldığım ürünün bedeli iade edilmiyor; TÜBİS üzerinden nereye başvurmalıyım?” kapsamdadır.
- “X şirketi hakkında genel yorum ve şikâyetler” kapsam dışıdır.
- “Operatöre yaptığım fatura itirazı reddedildi; BTK ve Tüketici Hakem Heyeti sırası nedir?” kapsamdadır.

## Kapsam dışı

- Genel müşteri hizmetleri telefon/e-posta/adres rehberleri.
- Şirketlerin kampanya, ürün, fiyat, mağaza, şube veya satış kanalı rehberleri.
- Resmî bir başvuru veya uyuşmazlık çözüm yoluna bağlanmayan genel şirket şikâyetleri ve kullanıcı yorumları.
- Tarafların yalnız pazarlık veya ticari tercihine bağlı, görevli resmî merci ya da kanun yolu bulunmayan talepler.
- Kişiye özel hukuki mütalaa, dava stratejisi, sonuç garantisi veya avukatlık hizmeti.
- Kaynağı doğrulanamayan süre, parasal sınır, görevli merci veya yaptırım bilgisi.

## Problem-niyet ve kanonik rota kuralı

- Giriş noktası kurum adı değil, kullanıcının somut problemidir.
- Her bağımsız sayfa tek bir `canonicalIntent` taşır.
- Yakın sorgular ayrı hukuki rota oluşturmuyorsa yeni URL açılmaz; mevcut hub rotaya alias/niyet eşleştirmesi yapılır.
- Aynı merci, belge, süre ve çözüm sırasını tekrar eden sayfalar bölünmez. Search Console veya resmî süreç farkı daha sonra bağımsız niyet kanıtlarsa ayrıştırılır.
- `intentKey`, `parentHub` ve `canonicalIntent` alanları rota çakışması ve SEO cannibalization kontrolünde zorunludur.

## Zorunlu rota içeriği

Canlı bir rota en az şu bilgileri taşır:

- yetkili ilk merci ve başvuru sırası,
- mümkünse doğrudan resmî başvuru köprüsü,
- varsa ilgili e-Devlet modülü,
- gerekli belgeler ve ayrı kanıt kontrol listesi,
- itiraz, üst başvuru veya alternatif çözüm yolu,
- süre ve yıllık parasal eşik uyarıları,
- dilekçe gerekiyorsa konu/merci/önerilen dilekçe türü bağlantısı,
- hukuki dayanak ve birden fazla güvenilir resmî kaynak,
- son doğrulama tarihi, güncellik riski ve yeniden kontrol periyodu.

## Kaynak standardı

Öncelik sırası Resmî Gazete/yürürlükteki mevzuat → yetkili kurum → e-Devlet veya kurum başvuru ekranıdır. Süre, görevli merci, parasal sınır ve kanun yolu gibi yüksek etkili bilgiler mümkün olduğunca en az iki bağımsız resmî katmanla doğrulanır.

Yıllık değişen tutarlar sayfa metnine dağınık şekilde yazılmaz; `thresholdKey` ile merkezi eşik kaydına bağlanır. Kaynaklar çelişiyorsa rota kesin bilgi yayımlamaz ve kalite radarı `conflicting-sources` eksiği üretir.
