# 20 Eylül 2026 devam ve yayın incelemesi

Başlangıç main: `3792d9813164483941805bc8d51463cd0a020461`.
Bekleyen PR #37'nin önceki CI'ı başarılı; henüz birleştirilmemiş/yayımlanmamıştı.
Aynı değişiklik için ikinci içerik PR'ı açılmadı. İlk üç pilot bu yayında sonuçlandırılıyor;
aynı çalışmada üçten fazla özgün pilot URL'si işlenmiyor. Önceki gerçek doğrulama tarihleri
sırf gün değiştiği için yenilenmedi.

## Bugünkü ek bulgular

- KYGM'nin 19 Eylül aylık ücret hatırlatması, ayın **son iş günü** ifadesini kullanıyor.
  Güncel yurt SSS'si **ayın son günü / resmî tatil uzaması** ayrımını kullanıyor.
  Her ikisi 20 Eylül'de okundu. Güncel mevzuat erişimi tamamlanamadığından fark
  çözülmüş sayılmadı; kayıt kaybı gibi sonuçlar için yeni kesin hukuki tarih üretilmedi.
  Mevcut yurt sonuç duyurusuna görünür kontrol uyarısı ve kaynaklar eklendi.
- KYGM'nin 17 Eylül BİZ açıklamasındaki izin/nakil/ödeme kanalı aynı kayıtta belirtildi;
  sonuç sorgulama veya yeni yurt başvurusu kanalıyla karıştırılmadı.
- ÖSYM TUS/STS Tıp cevap kâğıdı duyurusu: 17 Eylül 11.40'tan itibaren 10 gün
  görüntüleme. Sonuç kaydına eklendi; itiraz/dava süresi sayılmadı.
- Yeni ek duyuru URL'si açılmadı. Önceki PR'daki 9 yeni duyuru + 4 mevcut duyuru
  güncellemesi + YKS rota güncellemesi korunuyor. Bu ekler aynı olayları çoğaltmıyor.
- e-YDTS/2'nin 19 Eylül 13.30 sınırı geçti: mevcut durum hesabı kaydı arşivde gösteriyor.

Kaynaklar:

- https://kygm.gsb.gov.tr/HaberDetaylari/10008/1/303096/yurt-ucretini-zamaninda-odemeyi-unutma.aspx
- https://kygm.gsb.gov.tr/Sayfalar/2678/3200/sikca-sorulan-sorular-yurt.aspx
- https://kygm.gsb.gov.tr/HaberDetaylari/10008/1/303072/tum-islemler-bizde.aspx
- https://www.osym.gov.tr/2026-tus-2-donem-sinavi-ile-2026-sts-tip-doktorlugu-2-donem-sinavi-cevap-kgitlari-ve-aday-cevaplari-erisime-acildi

## Bugünkü kontrol kapsamı ve sınır

ÖSYM/AİS, SGK, GSB/KYGM, Aile, Jandarma/JSGA, Tarım, MEB, Ticaret ve NVI
listeleri yeniden incelendi. İşlem değeri olmayan haberler alınmadı.
Erişilen listelerde hazırlanan kayıtları değiştiren başka kesin tarih/merci değişikliği doğrulanmadı.

Resmî Gazete ana sayfa ve 20 Eylül nüshası, mevzuat.gov.tr, GİB duyuruları,
MSB ASAL ana sayfa/Askerlik Hizmeti Duyuruları, yıllık normal tertip ve bedelli PDF'leri,
Kasım dönemi ve bedel duyuruları ile Personel Temin canlı sayfası yeniden denendi;
erişim/yönlendirme hataları devam ediyor. Bu alanlar tamamlanmış denetim veya
'değişiklik yok' sonucu sayılmıyor. Askerliğim e-Devlet hizmeti erişilebilir;
kişisel veriye giriş yapılmadı. Takvim ve kaynak doğrulama tarihleri korunuyor.

19 Eylül raporundaki et/süt tebliği inceleme ihtiyacı sürüyor. KYGM ödeme günü
anlatımı ayrıca inceleme gerekli. Bunlar pilot kuyruğunun blocked sayısıyla aynı ölçü değildir.

İlk yayın sırasında güncel GSC/Trends/Cloudflare ölçüm erişimi yoktu. Daha sonra
20 Eylül dışa aktarımları sağlandı; [ölçüm kaydı](seo-measurement-2026-09-20.md)
gerçek veri tarihlerini ve yayın öncesi sınırını içeriyor. Canlı GSC/Trends veya
Cloudflare olay yönetimi erişimi sağlanmış sayılmadı. Yeni blok, analitik,
indeksleme stratejisi veya görev oluşturulmadı.
Yayın sonrası 14/28 günlük gözlem, gerçek ilk production tarihinden hesaplanacak.

## Yayın ve kontrol kanıtı

- PR #37 squash merge: `ec6f10892c1dc397f478893db1e7c95b32c1ec4b`.
- Son PR CI: [35491126658](https://github.com/balikrotasi1041/nereyebasvurulur/actions/runs/35491126658), başarılı.
- [Production 35491384705](https://github.com/balikrotasi1041/nereyebasvurulur/actions/runs/35491384705):
  kalite kapıları, kaynak denetimi, deploy, Verify production ve mevcut IndexNow adımı başarılı.
- Cloudflare sürümü: `371158c6-71b6-4136-9708-d3ce56e02439`.
- Kaynak denetimi: 206 URL; yerelde 67, production CI'da 60 HTTP/erişim sonucu belirsiz.
  Bunlar doğrulanmış içerik sayılmadı. Kesin hata kapısı başarılı; yeni duyuruların
  esas alınan metinleri ayrıca web/PDF üzerinden incelendi.
- IndexNow mevcut akışı 1323 sitemap URL'si için HTTP 200 aldı. Elle ek indeksleme isteği yapılmadı.
- İlk canlı taramada 31 URL HTTP 200/canonical/indeks kontrollerinden geçti; ek duyuru
  detayından YKS rehberine dönüş bağlantısı eksik bulundu. Diğer kontrollerin geçmesi
  bu eksikliği kapatmış sayılmadı.
- Üç pilot URL ayrıca 20 Eylül 05.28 UTC'de tekrar kontrol edildi: HTTP 200, self-canonical,
  yeni içerik, kaynak erişim sınırı, FAQPage ve sonraki MSÜ aşaması bağlantısı başarılı.
  Kuyruk bu kanıttan sonra published oldu: **3 published, 17 pending, 0 blocked**.
  İlk ölçüm tarihleri 4 ve 18 Ekim; güncel GSC sonucu henüz yok.

## Canlı kontrolde bulunan ortak şablon düzeltmesi

Ek duyuruların entrypoint'i detay oluşturucuya boş rehber listesi gönderiyordu.
Artık yalnız `publishedRoutes` içinde yer alan ve duyurunun açıkça ilişkilendirdiği
rotalar gönderiliyor; needs-review kayıtlarına görünür link oluşturulmuyor.
İlk değişiklikte iki doğrudan dönüş YKS ve yurt sonucuna aitti. Sonraki canlı
kontrol ÇKS kaydının boş ilişki listesi nedeniyle teste hiç girmediğini ortaya
çıkardı; önceki YKS/ÇKS ifadesi bu nedenle düzeltildi. ÇKS kayıt rehberine açık
ilişki eklendi, yurt sonucundan üniversite kayıt rehberine ilgisiz ilişki kaldırıldı.
İki beklenen YKS/ÇKS çifti artık ayrıca tanımlanarak her iki yönde test ediliyor.
21 ek duyurunun gerçek Worker giriş noktası kalite testine eklendi; yalnız alt
şablon fonksiyonunun doğru olması yeterli kabul edilmiyor.

Bu takip commit'i pilotların ilk içerik yayın tarihini veya yayın SHA'sını değiştirmez.
Son bağlantı düzeltmesinin CI/production ve yeniden canlı denetim sonucu ilgili PR'da izlenir.

ÇKS kaynakları 20 Eylül'de yeniden açıldı: [Rize](https://rize.tarimorman.gov.tr/Duyuru/355/2027-Yili-Cks-Kayitlari-Basladi)
1 Eylül-31 Aralık 2026 tarih aralığını, [Bolu](https://bolu.tarimorman.gov.tr/Duyuru/701/2027-Uretim-Yili-Ciftci-Kayit-Sistemi-Basvurulari-1-Eylul-2026-Tarihi-Itibari-Ile-Baslamistir)
yerel ve elektronik başvuru ayrımını destekliyor. Kaynakta bulunmayan 23.59
kapanış saati kaldırılarak yalnız takvim günü saklandı; yeni süre uzatımı
veya yeni dönem ilan edilmedi. Duyuru/rota doğrulama tarihleri topluca yenilenmedi.
Bu mevcut kayıt düzeltmesi, 9 yeni duyuru ve 4 diğer duyuru güncellemesine ektir;
planlı pilot sayısını artırmaz. ÇKS'nin GSC'deki son taraması hâlâ 3 Eylül olduğu
için sırf indeksleme amacıyla rehber içeriği yeniden yazılmadı.
