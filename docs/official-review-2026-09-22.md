# 22 Eylül 2026 resmî güncellik ve pilot incelemesi

Başlangıç ve son okunan main: `6bdbd203ad28b55d3a18fe910167d17bc1302801`.
Açık PR listesi boş. Önceki [production çalışması 35512878913](https://github.com/balikrotasi1041/nereyebasvurulur/actions/runs/35512878913)
bu SHA için başarılı; bu kanıt bugünkü yerel değişikliklerin yayımlandığı anlamına gelmez.

Çalışma dalı: `audit/official-quality-20260922`.

## Resmî değişiklikler

- **1 mevcut duyuru güncellemesi, 0 yeni duyuru URL'si.** KYGM'nin
  [21 Eylül yurt yedek sonucu](https://kygm.gsb.gov.tr/Duyuru/302961/21092026-tarihli-yurt-yedek-yerlestirme-sonuclari.aspx)
  aynı sonuç kaydında birleştirildi. Genel yeni kayıt saati yok;
  [kişisel e-Devlet sonucu](https://www.turkiye.gov.tr/gsb-yurt-basvuru-sonucu-sorgulama)
  esas alınır. 10 Eylül ilk yerleştirme süresi yeni yedek sonuca taşınmadı.
  Kurum aynı duyuru kimliğini yeni tarihli adresle sunuyor; eski 18 Eylül kaynak
  bağlantısı güncel kaynak listesinden çıkarıldı, önceki sonuç bilgisi metinde korundu.
- KYGM ücret/SSS uyuşmazlığı çözüldü sayılmadı. Yeni kontrol sonuç duyurusuyla
  sınırlı olduğundan bütün eski kaynakların doğrulama tarihi topluca yenilenmedi.
- YKS ek tercih kaydı mevcut tarih hesabıyla 21 Eylül sonrasında arşivdir;
  ayrı ödeme günü tercih penceresini açmaz. Kayıt silinmedi. Bugün ÖSYM ek tercih
  duyurusu/PDF erişimi sonuçlandırılamadı; yeni uzatma veya ücret değişikliği çıkarılmadı.
- [SGK 21 Eylül duyurusu](https://www.sgk.gov.tr/duyuru/detay/Fatura-ve-Eki-Belgelerin-Is-ve-Islemleri-2026-09-21-04-22-33)
  ve resmî PDF eki okundu: belirli illerde sağlık hizmeti sunucularının sözleşme/fatura
  işlemlerinin Kasım 2026'dan itibaren hangi il müdürlüğünde yürütüleceğini düzenliyor.
  Mevcut vatandaş başvuru rotalarına uygulanmadı; yeni genel vatandaş duyurusu üretilmedi.

Etkilenen mevcut duyuru: `/duyuru/2026-gsb-yurt-basvuru-sonuclari-sorgulama/`;
aynı veriyi kullanan `/duyurular/` kartı da değişir.

## Kapsam ve erişim sınırları

| Kaynak | 22 Eylül bulgusu / sınır |
|---|---|
| ÖSYM AİS | HMGS/İYÖS belge, DUS/STS Diş başvuru, TUS/STS Tıp cevap görüntüleme ve Sayıştay geç başvuru satırları okundu. Genel ÖSYM sitesi ve bazı detaylar erişilemedi. KPSS Alan Bilgisi kitapçık penceresi AİS'te görüldü; ayrıntı duyurusu doğrulanamadığından yeni kayıt hazırlanmadı. |
| GSB/KYGM/PGM | 21 Eylül yedek sonuç yeni; PGM listesinde ek yeni işlem değişikliği görülmedi. |
| SGK | Güncel liste ve 21 Eylül fatura duyurusu eki incelendi; yukarıdaki kapsam ayrımı yapıldı. |
| Aile | Güncel listede mevcut 2828 tercih kaydını değiştiren ek gelişme doğrulanmadı. |
| Jandarma/JSGA | Duyuru listeleri okundu; son kış kampı/öğrenci/personel kayıtları karşılaştırıldı. PTM sayfa gövdesi okunamadı. |
| Tarım | Bakanlık duyuru ve haber listesi okundu. 21 Eylül kurum haberlerinden başvuru/süre değişikliği çıkarılmadı. Önceki et/süt düzenlemelerinin mevzuat incelemesi açık kalıyor. |
| MEB, Ticaret, NVI | Duyuru listeleri okundu; mevcut rotaları değiştiren ek doğrulanmış gelişme bulunmadı. Tören ve tanıtımlar alınmadı. |
| GİB | Ana sayfa/duyuru gövdesi sonuçlandırılamadı. Dijital Vergi Dairesi hizmet menüsü erişilebilir; duyuru ekranındaki boş sonuç tam güncellik denetimi sayılmadı. |
| Resmî Gazete / mevzuat | Ana sayfa, 22 Eylül nüshası ve ilgili kanun PDF'lerinde erişim/timeout/502. Yeni mevzuat yok sonucu çıkarılmadı. |

MSB Askeralma ana sayfası, duyuru listesi erişimi, yıllık normal tertip ve bedelli
faaliyet PDF'leri, Kasım dönemi, normal/bedelli sonuç duyuruları ve bedelli uygulama
sayfası ayrıca denendi. Yönlendirme/erişim hataları nedeniyle bu kontrol **tamamlanamadı**.
Personel Temin ana sayfası ve mevcut seçim duyurusu da sonuçlandırılamadı.
Normal tertip/bedelli takviminde değişiklik olmadığı veya yeni 2027 takvimi bulunmadığı
iddia edilmiyor. Takvim satırları, YÜSEM eşanlamlısı ve son doğrulama tarihleri korunuyor.
[Askerliğim hizmet köprüsü](https://www.turkiye.gov.tr/mill-savunma-askerligim) erişilebilir;
kişisel kayıt açılmadı. Birlik ve sevk bilgisi genel takvimden türetilmedi.

## Planlı kalite çalışması

Üç mevcut URL kaynaklarıyla geliştirildi:

1. `/konu/milli-savunma-universitesi-ikinci-secim-asamalari-nereye-basvurulur/`:
   ilk sınav tekrarları yerine kişisel MSB çağrısı, evrak ve seçim aşaması takibi.
   ÖSYM sınav itiraz kuralları MSB aşamasına uygulanmadı; canlı çağrı erişim sınırı görünür.
2. `/konu/kayip-calinti-telefon-imei-kapatma/`: hat sahibi ve ihbar kanalı, IMEI/SIM ayrımı,
   aynı kanaldan iptal, bulunma/adli işlem ayrımı. Yanlış işletmeci/hakem heyeti yerel
   yönlendirmesi giderildi. Ek ücret bilgisi yalnız resmî kılavuzla `applicationCost` alanında.
   Doğalgaz kartları yerine gerçek sonraki işlem olan numara/hat rehberi bırakıldı.
3. `/konu/cimer-cimer-basvurusu-nereye-basvurulur/`: başvuru türü, ön izleme/gönderim,
   numara, sevk ve cevap takibi; ALO 150 ve acil 112 ayrımı. Sürekli işlem türü tanımlandı.

Ana kaynaklar:

- [2026 ÖSYM/MSB kılavuzu](https://dokuman.osym.gov.tr/pdfdokuman/2026/MSU/kilavuz_msd06012026.pdf),
  [MSB e-Devlet köprüsü](https://www.turkiye.gov.tr/msb-personel-ve-ogrenci-temin-sistemi-5958).
- [BTK kayıp/çalıntı SSS](https://tuketici.btk.gov.tr/kayip-calinti-islemleri),
  [resmî ihbar kılavuzu](https://static.turkiye.gov.tr/downloads/kurumlar/btk/BTK_KayipCalintiIhbarBildirimi_Kilavuz.pdf),
  e-Devlet ihbar ve sorgulama/iptal hizmetleri.
- [CİMER](https://www.cimer.gov.tr/), [50 Soruda CİMER](https://www.cimer.gov.tr/50sorudacimer.pdf),
  [CİMER e-Devlet](https://www.turkiye.gov.tr/cumhurbaskanligi-iletisim-merkezi).
  PDF web metin erişimi aralıklı hata verdi; aynı resmî dosya doğrudan indirilip okundu.

Pilot önceliği korundu: 10 ilçe sorgusunda 502/zaman aşımı, 3 il için güncel şube dağılımı
kaynağı erişim sorunu nedeniyle **13 şube/il URL'si blocked**. Adres veya fiziksel şube
yokluğu uydurulmadı. Tüketici hakem heyeti kararına itirazda Bakanlık metni okunabildi;
güncel 6502 metniyle yüksek riskli süre/usul kontrolü tamamlanamadığından **1 URL blocked**.
Sonraki uygun IMEI/CİMER kayıtlarına geçildi. Kaynak denemeleri ve içerik farkları kuyrukta.

Önceki yayınlı pilot sayısı **3** olarak kalır; bugünkü içerikler production kanıtı olmadan
`published` sayılmaz. Ortak test/önbellek değişikliği yeni pilot URL sayılmadı.

## Ölçüm, güvenlik ve SEO sınırı

Yeni canlı GSC, Trends, etkileşim veya IP+zaman+yol+aksiyon verisi erişimi yok.
20 Eylül ölçüm belgesi yeni veri sayılmadı. İlk üç pilotun 14/28 günlük gözlem tarihleri
4 ve 18 Ekim; henüz karşılaştırılabilir yayın sonrası dönem yok. Sonuç artışı ileri sürülmedi.
WAF, IP/ağ blokları, analitik veya indeksleme istekleri değiştirilmedi.
URL, canonical, robots, sitemap üretimi/stratejisi ve IndexNow akışı korunuyor.

## Yayın engeli ve yeniden başlama

GitHub bağlantısı `HTTP 400: Invalid MCP request metadata` hatası veriyor. Salt-okunur
genel GitHub API ve git clone çalışıyor; bağlantı hatası yetkinin kaldırıldığını kanıtlamıyor.
Bu çalışma için PR/merge/deploy henüz yok. Önceki başarılı deploy bugünkü yayın kanıtı değildir.
Bağlantı düzelince main ve açık PR'lar yeniden kontrol edilmeli; aynı yerel çalışmadan devam
edilmeli. Eski veri tekrar doğrulanmadan veya kalite kapıları başarısızken yayımlanmamalı.

22 Eylül sonunda TypeScript ve içerik anlamı kontrolleri geçti; tam doğrulama zinciri,
kaynaklı üç pilotun yeni inceleme tarihinin tarih izin listesinde bulunmaması nedeniyle
durdu. Kaynak denetiminin nihai çıktısı saklanamadı; başarılı kabul edilmedi.
23 Eylül'de bağlantı düzeldiğinde aynı yerel değişikliklerden devam edildi. Gerçek
22 Eylül doğrulama tarihleri korundu; yeni tarih yalnız bu üç rotayla sınırlandırıldı.
Devam eden kontrol ve yayın kaydı: [23 Eylül incelemesi](official-review-2026-09-23.md).
