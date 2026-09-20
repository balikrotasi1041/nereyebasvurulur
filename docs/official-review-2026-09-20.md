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

Güncel GSC/Trends/Cloudflare ölçüm erişimi yok. Eski dosya canlı sayılmadı, yeni
blok/analitik/indeksleme stratejisi veya görev oluşturulmadı.
Yayın sonrası 14/28 günlük gözlem, gerçek ilk production tarihinden hesaplanacak.

Yayın/CI/canlı kanıtı ve üç pilotun durumu production doğrulamasından sonra kaydedilecek.
