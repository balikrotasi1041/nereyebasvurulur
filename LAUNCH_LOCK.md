# Public launch record

Proje sahibi 20 Ağustos 2026 tarihinde ilk sürümün `nereyebasvurulur.com` alan adında canlıya alınmasına açık onay verdi.

## V1 yayın kapsamı

- `nereyebasvurulur.com` ve `www.nereyebasvurulur.com` Cloudflare Worker Custom Domain olarak tanımlanmıştır.
- Ana site ve resmî kaynaklarla doğrulanmış rota sayfaları indekslenebilir durumdadır.
- `/admin/*` alanı `noindex` ve kimlik doğrulama koruması altındadır.
- Yönetim girişi için öncelikle yeni Worker'daki `ADMIN_USERNAME` / `ADMIN_PASSWORD` sırları kullanılır; bu sırlar tanımlı değilse aynı kimlik bilgilerinin Olta Atlası yönetim uç noktasında doğrulanmasıyla yetkilendirme yapılır. Parola repoya yazılmaz.
- İlk sürüm statik doğrulanmış rota kataloğu ile çalışır. D1 şeması sonraki veri büyümesi için repoda tutulur; V1 yayını kullanıcı verisi veya kalıcı yazma işlemi gerektirmediğinden D1 zorunlu değildir.
- Menüdeki doğrulanmamış yapraklar kullanıcıya kesin başvuru rotası vermez ve indekslenebilir konu sayfasına dönüşmez.
- Sitemap yalnız canlı ve resmî kaynaklarla doğrulanmış rota sayfalarını içerir.

## Yayın sonrası kalite kapıları

1. Her canlı rota en az bir resmî kaynak, son doğrulama tarihi ve açık başvuru adımları taşır.
2. Süre, görevli merci, parasal tutar, askerlik/personel temini gibi yüksek riskli alanlar güncel kurum kaynağıyla tekrar doğrulanır.
3. Mevzuat veya resmî kurum kaynağı değiştiğinde etkilenen rota sayısına yapay günlük kota uygulanmaz.
4. Belirsiz rota kesin bilgi olarak yayımlanmaz; doğrulama kuyruğunda tutulur.
5. Dashboard ve veri envanteri canlı rota/kaynak kapsamını izler.
