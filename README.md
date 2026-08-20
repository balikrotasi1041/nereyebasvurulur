# Nereye Başvurulur?

Türkiye'de bir sorun, bildirim, şikâyet, itiraz veya başvuru için doğru kuruma giden yolu sadeleştiren yönlendirme motoru.

## Ürün yaklaşımı

Site bir makale arşivi değil, karar ağacı tabanlı bir **başvuru rotası** ürünü olarak tasarlanır:

1. Kullanıcı sorununu doğal dille yazar.
2. Gerekliyse birkaç ayırıcı soru sorulur.
3. Konuma ve yetkiye göre doğru kurum belirlenir.
4. İlk başvuru kanalı gösterilir.
5. Gerekli belge / bilgi listesi verilir.
6. Sonuç alınamazsa ikinci ve üçüncü adım gösterilir.
7. Her rota resmî kaynak ve son doğrulama tarihiyle yayınlanır.

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
