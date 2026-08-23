# Nereye Başvurulur?

Türkiye'de resmî, kamusal ve idari bir sorun, bildirim, şikâyet, itiraz veya başvuru için doğru kuruma giden yolu sadeleştiren yönlendirme motoru.

## Kapsam

Platform, kamu işlemlerinin yanında özel hukuk ilişkisinden doğsa da resmî şikâyet, arabuluculuk, hakem/tahkim, kolluk, savcılık veya yargı yoluna bağlanan somut problemleri kapsar. Özel şirketler yalnız bu resmî çözüm zincirindeki rolleri ölçüsünde gösterilir; müşteri hizmetleri ve genel şirket rehberleri kapsam dışıdır.

Detay: `SCOPE.md`.

## Ürün yaklaşımı

Site bir makale arşivi değil, karar ağacı tabanlı bir **başvuru rotası** ürünü olarak tasarlanır:

1. Kullanıcı resmî/kamusal işlem türünü seçer veya sorununu doğal dille yazar.
2. İlk seçime göre yalnızca ilgili sonraki kriterler gösterilir.
3. Gerekliyse birkaç ayırıcı soru sorulur.
4. Konuma ve mevzuattaki yetkiye göre doğru kamu kurumu veya istisnai temel hizmet sağlayıcısı belirlenir.
5. İlk resmî başvuru kanalı gösterilir.
6. Gerekli belge / bilgi listesi verilir.
7. Sonuç alınamazsa mevzuattaki ikinci ve üçüncü başvuru/itiraz adımı gösterilir.
8. Her rota resmî kaynak ve son doğrulama tarihiyle yayınlanır.

## Teknik mimari

- Cloudflare Workers
- TypeScript
- D1 için ilişkisel veri modeli (`migrations/0001_initial.sql` ve problem niyeti/kalite genişletmesi `migrations/0002_problem_intents_and_quality.sql`)
- Kurum / yetki alanı / kanal / rota adımı / resmî kaynak ayrımı
- Programatik SEO'ya uygun slug yapısı
- İlk aşamada sunucu tarafında HTML üretimi

## Geliştirme

```bash
pnpm install
pnpm run validate
pnpm run dev
```

`pnpm run validate`; Wrangler tarafından üretilen Worker türleri, TypeScript, 252 yapraklık veri bütünlüğü, ilk dalga kalite radarı, niyet/rota çakışması ve Cloudflare paketleme kontrollerini birlikte çalıştırır. `pnpm run audit:sources` tüm resmî kaynak ve doğrudan başvuru köprülerinin erişilebilirliğini ayrıca sınar.

`pnpm run refresh:military-branches`; İçişleri Bakanlığının güncel ilçe envanterini ve MSB Askeralma Genel Müdürlüğünün şube iletişim aramasını okuyarak askerlik şubesi veri dosyasını yeniden üretir. Sonuçlar doğrulama testlerinden geçmeden yayımlanmaz.

## Yayın ve içerik güvenliği

Proje sahibi 20 Ağustos 2026 tarihinde canlı yayın için açık onay vermiştir. Ayrıntı `LAUNCH_LOCK.md` içindedir.

`main` dalına gönderilen değişiklikler, kilit dosyasındaki sürümlerle kurulan bağımlılıklar ve tüm kalite kapıları başarıyla tamamlandıktan sonra Cloudflare'a dağıtılır. Yayın akışı beklenen sürüm kimliğini, yeni tüketici/IMEI rotalarını, dilekçe oluşturucuyu, sitemap'i, güvenlik başlıklarını ve admin korumasını canlı alan adında doğrular.

- Yalnız `verified` ve `local-check` rotaları menüye, aramaya ve sitemap'e girer.
- `needs-review` kayıtları admin envanterinde görünür ama kesin yönlendirme olarak yayımlanmaz.
- Her kayıt yetkili merci, kanal, belgeler, süre/itiraz, üst başvuru, yerel yetki, hukuki dayanak, resmî kaynak, son doğrulama ve güncellik riski taşır.
- İçerik güncellemesine yapay günlük kayıt kotası uygulanmaz.
- Admin alanı kimlik doğrulaması ve `noindex` ile korunur.

Detay: `CONTENT_VERIFICATION_POLICY.md` ve `SCOPE.md`.

## Mevcut durum

18 ana kategori altındaki 252 link-tree yaprağının tamamı veri envanterine alınmıştır. 23 Ağustos 2026 ilk dalgasında 25 tüketici problemi yeni rota olarak eklenmiş, telefon/internet 96-110 kümesi dört mevcut kanonik rotaya ve bir yeni IMEI rotasına bağlanmıştır. Toplam 231 rota yayıma uygundur; konu başlığı yetkili mercii kesinleştirmek için yetersiz olan 21 kayıt güvenli biçimde yayıma kapalıdır.

Askerlik şubesi dizini 81 ildeki 973 ilçenin tamamını kapsar. MSB'nin resmî il/ilçe araması bu ilçeleri 397 farklı fiziksel askerlik şubesine eşlemektedir. Her ilçe sayfasında sorumlu şube adı, adres, telefon, e-posta, bağlı ASAL bölgesi, resmî kaynak, son doğrulama tarihi ve adresi hedef alan yol tarifi bağlantısı bulunur. Her ilçede ayrı fiziksel şube varmış gibi bir ifade kullanılmaz; MSB'nin başka ilçedeki bir şubeyi göstermesi açıkça belirtilir.

Statik katalog canlı ürünü besler; D1 şeması sonraki veri büyümesi ve kaynak izleme için repoda tutulur.
