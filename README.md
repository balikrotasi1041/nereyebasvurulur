# Nereye Başvurulur?

Türkiye'de resmî, kamusal ve idari bir sorun, bildirim, şikâyet, itiraz veya başvuru için doğru kuruma giden yolu sadeleştiren yönlendirme motoru.

## Kapsam

Platform yalnızca kamu/resmî süreçleri kapsar. Genel özel şirket, tüketici, kargo, e-ticaret, özel işveren veya salt özel hukuk uyuşmazlıkları kapsam dışıdır.

İstisna: elektrik, su, doğalgaz, telefon/elektronik haberleşme gibi kamu hizmeti niteliğindeki temel altyapının belirli bölgelerde fiilî işletmecisi olan kuruluşlar, yalnızca ilgili resmî başvuru zincirindeki rolleri ölçüsünde gösterilebilir.

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
- D1 için ilişkisel veri modeli (`migrations/0001_initial.sql`)
- Kurum / yetki alanı / kanal / rota adımı / resmî kaynak ayrımı
- Programatik SEO'ya uygun slug yapısı
- İlk aşamada sunucu tarafında HTML üretimi

## Geliştirme

```bash
npm install
npm run check
npm run dev
```

## Yayın güvenliği

Proje sahibinin açık onayı olmadan canlı yayına açılmaz. Bu branch'te:

- `workers_dev` kapalıdır.
- Custom Domain tanımlı değildir.
- Sayfalarda `noindex,nofollow` vardır.
- `robots.txt` tüm botları engeller.
- sitemap geliştirme aşamasında boştur.

Detay: `LAUNCH_LOCK.md`.

## Mevcut durum

İlk arayüz, basit sorun araması, örnek sorun taksonomisi ve D1 şeması hazırlanmıştır. Örnek sorunlar taslaktır; resmî kaynak doğrulaması yapılmadan yayınlanmayacaktır.
