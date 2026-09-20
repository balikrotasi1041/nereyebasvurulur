# 20 Eylül 2026 ölçüm kaydı

Kullanıcının sağladığı GSC ZIP ve Cloudflare PDF dışa aktarımları incelendi.
Bunlar canlı API sorgusu değildir. GSC performansı 17 Eylül, kapsamı 14 Eylül,
HTTPS raporu 11 Eylül tarihinde biter. MSÜ pilotunun ilk yayını 20 Eylül olduğundan
bu veriler iyileştirmenin sonucu olarak sunulamaz. İlk gözlem tarihleri 4 ve
18 Ekim; aynı URL'lerde eşit ve tamamlanmış dönemler beklenecek.

## Kapsam ve URL ayrıntısı

`https___nereyebasvurulur.com_-Coverage-2026-09-20.zip` içindeki `Grafik.csv` ve
`Önemli sorunlar.csv`: 314 indekslenen, 109 taranıp indekslenmeyen,
893 keşfedilip indekslenmeyen, 30 noindex. Sayılar 18 Eylül dışa aktarımıyla aynı.
Noindex doğrulamasının etiketi Başlatılmadı'dan Başladı'ya değişmiş; bu indeks
kazanımı veya uygulanan bir site değişikliğinin kanıtı değildir.

| Ayrıntı dosyası | İçerik |
|---|---|
| `Coverage-Drilldown-2026-09-20 (2).zip` | 109 URL: 84 ilçe, 10 il, 13 konu, 2 arama. URL ve tarama tarihleri 18 Eylül dosyasıyla tamamen aynı. |
| `Coverage-Drilldown-2026-09-20 (1).zip` | 30 URL'nin tamamı `/ara?q=...` arama adresi. Mevcut noindex korunur. |
| `Coverage-Drilldown-2026-09-20.zip` | 893 URL: 784 ilçe, 32 il, 70 konu, 6 duyuru, 1 askerlik merkezi. `1970-01-01` değerleri gerçek tarama tarihi sayılmaz. |

ÇKS kayıt rehberinin son taraması hâlâ 3 Eylül; 13 Eylül içerik değişikliğinin
Google tarafından görülüp görülmediği bu dosyayla doğrulanamıyor. URL Denetimi
erişimi yok. HTTPS tablosunda hata satırı yok, 14 HTTPS ve 0 HTTPS olmayan URL
görünüyor; sınırlı/eski bu tablo 314 sayfanın tamamına ilişkin HTTPS denetimi değildir.

## Arama performansı

Kaynak: `https___nereyebasvurulur.com_-Performance-on-Search-2026-09-20.zip`.
Filtre Web / Son 3 ay; dosyada fiilen 19 Ağustos-17 Eylül arasında 30 günlük
satır var. Toplam 5.746 gösterim, 46 tıklama, %0,80 CTR.

| Ölçüt | 4-10 Eylül | 11-17 Eylül | Değişim |
|---|---:|---:|---:|
| Gösterim | 1.846 | 3.232 | +%75,08 |
| Tıklama | 21 | 22 | +%4,76 |
| CTR | %1,14 | %0,68 | -0,46 yüzde puan |
| Ortalama konum (yaklaşık) | 10,76 | 9,95 | 0,82 iyileşme |

Hesaplama: tıklama ve gösterim günlük satırlardan toplandı; CTR toplam
tıklama/toplam gösterimdir. Konum, yuvarlanmış günlük konumların gösterimle
ağırlıklı ortalamasıdır, bu yüzden yaklaşık verilir. Her karşılaştırma yedi
tam günlük dönem kullanır; 18-20 Eylül eksik günleri eklenmedi.

Türkiye: 5.361 gösterim / 45 tıklama. Mobil: 4.659 gösterim / 39 tıklama.
Önceki rapordaki 1-7 Eylül ve 8-14 Eylül dönemleri bu dosyada sırasıyla
1.004/2.381 gösterim ve 7/21 tıklamadır. Farklı haftalar birbiriyle karıştırılmaz.

### Talep sinyalleri

Aşağıdaki sayfa değerleri 19 Ağustos-17 Eylül dışa aktarımının tamamına aittir;
güncel Google Trends artışı veya URL bazında haftalık büyüme sayılmaz.

| Mevcut sayfa | Gösterim | Tıklama | CTR | Konum |
|---|---:|---:|---:|---:|
| Sultanbeyli askerlik şubesi | 1.121 | 1 | %0,09 | 9,31 |
| Askerlik yoklaması | 266 | 1 | %0,38 | 11,52 |
| Bayrampaşa askerlik şubesi | 212 | 2 | %0,94 | 9,03 |
| Jandarma uzman erbaş/personel temini | 203 | 6 | %2,96 | 12,94 |
| Askerlik hizmet tercihi | 197 | 1 | %0,51 | 9,75 |
| Kasım 2026 sınıflandırma duyurusu | 176 | 3 | %1,70 | 6,62 |

Sultanbeyli mevcut sayfası sonraki uygun kalite/CTR incelemesi için güçlü bir
adaydır. Bu tespit sabit 20 URL pilotunu, günlük üç URL sınırını veya resmî
kaynak şartını değiştirmez. Yeni yer/alias URL'si, toplu başlık değişikliği,
canonical değişikliği veya ek indeksleme isteği yapılmadı.

## Pilotun yayın öncesi görünümü

20 pilot URL'nin yalnız altısı `Sayfa sayısı.csv` içinde yer alıyor:

| Pilot URL | Gösterim | Tıklama | CTR | Konum |
|---|---:|---:|---:|---:|
| `/askerlik-subeleri/agri/merkez/` | 1 | 0 | %0 | 7 |
| `/askerlik-subeleri/kilis/merkez/` | 1 | 0 | %0 | 9 |
| `/askerlik-subeleri/bartin/ulus/` | 6 | 0 | %0 | 8,5 |
| `/askerlik-subeleri/hatay/iskenderun/` | 6 | 0 | %0 | 8,5 |
| `/askerlik-subeleri/nevsehir/` | 1 | 0 | %0 | 8 |
| `/askerlik-subeleri/istanbul/` | 61 | 0 | %0 | 11,2 |

Diğer 14 URL için satır yok; bunlara sıfır atanmadı. Bugün yayımlanan üç MSÜ
sayfası da bu grupta. Günlük URL kırılımı olmadığından pilot için eşit 14/28
günlük önce/sonra karşılaştırması bu dışa aktarımla kurulamaz. Yayın durumu
3 published, 17 pending, 0 blocked olarak kaldı. Yeni özgün pilot eklenmedi.

## Cloudflare ve etkileşim sınırı

Kaynak: kullanıcının 20 Eylül tarihli `Analytics _ Dashboards _
Balikrotasi1041@gmail(1).PDF` dosyası, 7 sayfa. Ekrandaki kapsam Son 7 gün;
kesin başlangıç/bitiş zaman damgası gösterilmiyor.

- 17,24 bin istek (+%34,9), 9,64 bin Visits (-%6,5), 167,9 MB ve %0,74 cache hit.
- 11,79 bin 2xx, 1,86 bin 3xx, 3,55 bin 4xx, 30 adet 5xx. Yaklaşık 4xx oranı
  %20,6; 5xx %0,17. Yuvarlanmış toplamlar kullanıldı.
- `/ara` yaklaşık 1.630 istek, `/dilekce-olustur/` 110 istek. Bunlar arama
  başarısı, dilekçe tamamlanması veya başarılı resmî başvuru ölçümü değildir.
- `/crm/.env`, `/service/.env` gibi yollar tarama/probe davranışıyla uyumlu.
  Toplam 4xx'in tamamı saldırı veya bozuk kullanıcı bağlantısı sayılamaz.
- PDF'de IP+zaman+yol+aksiyon ilişkisini kuran olay satırları ve doğrulanmış bot
  bilgisi yok. User-Agent etiketleri arama botu kimliğini kanıtlamaz. IP/ülke
  hacmine dayanarak yeni blok, challenge veya rate-limit uygulanmadı.
- Cloudflare Visits/Requests insan ziyaretçi veya Google organik tıklaması
  olarak GSC ile toplanmadı. Worker içi cache durumu bu panelin cache hit
  oranından tek başına çıkarılmadı.

Canlı GSC, Google Trends, Cloudflare WAF yönetimi ve resmî kanal/telefon/yol
tarifi/dilekçe tamamlanmasına ait olay ölçümü hâlâ mevcut değil. Eski IP
raporları yeni davranış kanıtı olarak kullanılmadı.
