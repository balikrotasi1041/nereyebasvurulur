# Public launch lock

Bu proje sahibi açıkça onay verene kadar halka açık yayına alınmayacaktır.

## Kilitler

- `wrangler.jsonc` içinde `workers_dev: false`.
- Custom Domain / route tanımı yok.
- Arayüz meta robots değeri `noindex,nofollow`.
- `/robots.txt` tüm taramayı `Disallow: /` ile engeller.
- `/sitemap.xml` geliştirme aşamasında boş döner.
- Seed problem kayıtları `verified: false` durumundadır.

## Canlı yayın öncesi zorunlu kontrol

1. Proje sahibinden açık yayın onayı alınır.
2. İlk içerik grubunun resmî kaynak doğrulaması tamamlanır.
3. D1 üretim veritabanı oluşturulur ve migration uygulanır.
4. Testler / tip kontrolü / dry-run başarılı olur.
5. `noindex` ve robots kilitleri yalnız onay sonrası kaldırılır.
6. `nereyebasvurulur.com` Custom Domain yalnız onay sonrası eklenir.
7. `www` için tek kanonik alan adına 301 yönlendirme uygulanır.
8. Canlı sürüm kontrol edilip ancak sonra indekslemeye açılır.
