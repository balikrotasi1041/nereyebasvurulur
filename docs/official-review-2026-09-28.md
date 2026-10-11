# 28 Eylül 2026 resmî denetim ve bekleyen yayın

Başlangıç main `15e06d5995e3c1f239f12c9362e82317dea16ea2`. Açık PR yok;
`audit/official-quality-20260924` dalındaki bekleyen çalışma korundu. Main'den
içerik politikası, kalite iş akışı ve pilot kuyruğu yeniden okundu. 24–27 Eylül
hazırlıkları önceki iki raporda kaynaklarıyla yer alır; henüz yayımlanmış sayılmaz.

## Yeni doğrulanan işlem ve arşiv düzeltmesi

- [ÖSYM'nin 27 Eylül duyurusu](https://www.osym.gov.tr/2026-hmgs2-ile-2026-iyos-temel-soru-kitapciklari-ve-cevap-anahtarlari-yayimlandi)
  ve [AİS](https://ais.osym.gov.tr/) 28 Eylül okundu: HMGS/2 ve İYÖS tam kitapçık
  erişimi 27 Eylül 13.40–7 Ekim 23.59. Ayrı işlem niyeti olan kitapçık duyurusu
  eklendi. Bu tarih itiraz süresi veya sonuç açıklaması sayılmadı; soru kopyalanmadı.
- [GSB'nin 7 Eylül antrenör çağrısı](https://pgm.gsb.gov.tr/Duyuru/302875/2026-yili-sozlesmeli-antrenor-alimi-sozlu-ve-uygulamali-sinav-duyurusu.aspx)
  28 Eylül tekrar okundu. 15–25 Eylül sınav aralığına rağmen tarih alanı eksik olduğu
  için kart aktif kalıyordu. `deadlineDate=2026-09-25` ile arşiv düzeltildi;
  ortak bir saat üretilmedi. Eski tam doğrulama tarihi korundu.

Birleşik yayın adayı: **12 yeni duyuru, 5 mevcut duyuru güncellemesi**.
Ana akış `/duyurular/`, ilgili `/duyuru/.../` detayları ve ana sayfa mevcut
modelden güncellenir. GSB antrenör çağrısı dahil son günlerde biten yedi aşama
arşivde korunur: KPSS Alan kitapçığı, DUS/STS Diş normal başvuru, Sayıştay geç
başvuru, GSB bilişim başvurusu, e-YDS giriş belgesi, HMGS/İYÖS giriş belgesi,
GSB antrenör sınav çağrısı. Silme veya yeni konu/il/ilçe URL'si yok.

## 28 Eylül taraması ve sınırları

ÖSYM/AİS, KYGM, SGK, Jandarma/JSGA, GSB Personel, Aile ve Tarım'ın güncel
listeleri açıldı. KYGM'de 23 Eylül yurt yedek sonucu ve 25 Eylül bilgi/güvenlik
duyuruları; SGK/Tarım'da 25 Eylül atama evrak çağrıları sürüyor. AİS, ÖZYES için
15.30 başlangıcını ve DUS/STS Diş için 1 Ekim 10.00–23.59 gelecek dönemini
destekliyor. MEB/NVI/Ticaret giriş ve duyuru sayfaları da kontrol edildi;
bütün alt hizmet sayfalarının güncelliği hakkında toplu garanti verilmedi.

[GİB vergi takvimi](https://www.gib.gov.tr/vergi-takvimi?selectedDate=2026-09-28)
28 Eylül beyan/ödeme günlerini gösteriyor; mevcut bireysel yönlendirmeyi
değiştiren yeni usul çıkarılmadı. GİB arama kaydında 25 Eylül Engelliler İçin
Vergi Rehberi görünüyor. İlk erişim denemeleri sonuçsuz kaldı; 28 Eylül devam
incelemesinde resmî PDF okunabildi (dijital vergi başvurusu ve belediyeye emlak
vergisi başvurusu bölümleri). 30 Eylül yeniden erişimde HTTP 400 alındı. Güncel
mevzuatla parasal/uygunluk koşulları birlikte tamamlanmadığından rehber adayı
**inceleme gerekli** kaldı; buradan yeni vergi hakkı veya tutar yayımlanmadı.
Önceki SGK ilaç/SUT inceleme eksikleri devam ediyor.

28 Eylül Resmî Gazete, mevzuat ana sayfa ve 6502/3713/7179 metinlerine erişim
sonuçlanamadı. ASAL ana sayfa, iki duyuru listesi, yıllık normal/bedelli PDF,
Kasım ve sınıflandırma/bedelli sonuç-sevk duyuruları, bedelli uygulama sayfası,
MSB Personel Temin ve iletişim sayfası ayrıca denendi; gövdeleri alınamadı.
MSB arama kaydı SSS içeriyor, ancak bu yıllık takvimlerin taze doğrulaması değildir.
YÜSEM araması yeni resmî anlam/duyuru sağlamadı. Normal tertip/bedelli veri modeli
değişmedi; takvim ve bedellerin değişmediği yönünde kesin sonuç verilmedi.

## Kalite, ölçüm ve yayın kanıtı

On ilçe sorgusu, üç il için ortak MSB kaynağı ve THH itirazı için güncel 6502
yeniden denendi. **0 yeni derin içerik; 6 published / 14 blocked**. Gerekçeler ve
gerçek deneme tarihi kuyruğa işlendi. PR #40 ile daha önce yayımlanan üç pilotun
kanıtı da bekleyen kayıtlarla birlikte korunuyor; yeni iyileştirme sayılmadı.

Canlı GSC, Trends, etkileşim ve Cloudflare güvenlik verisine erişim yok. Eski
dışa aktarım güncel sayılmadı. İlk 14 günlük gözlem 4 Ekim'de; henüz ölçüm
sonucu yok. IP/WAF değişmedi. Sitemap stratejisi, canonical, robots ve arama
noindex korundu. Mevcut duyuru ve IndexNow akışı kullanılır.

Yayın kapılarının sonucu, PR, squash SHA, Cloudflare ve bağımsız canlı kontrol
kanıtı yayın işlemi tamamlandıktan sonra aynı PR'a kaydedilecektir.
