# 19 Eylül 2026 resmî güncellik ve içerik incelemesi

Başlangıç main: `3792d9813164483941805bc8d51463cd0a020461` (PR #36).
Başlangıçta açık PR yoktu; önceki Cloudflare yayını başarılıydı.

## Doğrulanmış değişiklikler

9 yeni duyuru; 4 mevcut duyuru güncellemesi; resmî takvim nedeniyle 1 mevcut YKS rehberi güncellemesi.
Yeni konu/il/ilçe URL'si oluşturulmadı. Kaynaklar ve gerçek doğrulama tarihi duyuru veri kayıtlarında bulunur.

| Kayıt | Kullanıcıya işlem değeri |
| --- | --- |
| YKS ek yerleştirme | Tercih 17 Eylül 16.00–21 Eylül 23.59; 170 TL ücret için 22 Eylül 23.59 ayrı son tarih. Duyuru + ÖSYM PDF kılavuzu birlikte incelendi. |
| DUS / STS Diş 2. dönem | Normal başvuru 16–24 Eylül; sınavlar 1 Kasım. Ayrı sınav/kılavuz koşulları korunuyor. |
| TUS / STS Tıp 2. dönem | 17 Eylül 11.30'da sonuç açıldı; sonuç duyurusu tercih dönemi sayılmadı. |
| HMGS/2 / İYÖS | 27 Eylül sınavı için giriş belgesi; 10.00 binaya alınma sınırı sınav başlangıcı sayılmadı. |
| GSB bilişim personeli | Başvuru 21 Eylül 00.00–25 Eylül 17.00; yalnız Kariyer Kapısı, tek pozisyon. İlan + PDF birlikte incelendi. |
| 2828 Eylül istihdam tercihleri | Yalnız hak sahipleri için 24 Eylül 23.59 son tarih. Bakanlık duyurusu + kılavuz incelendi. |
| Emekli Jandarma kış kampı | Son gün 16 Ekim; ortak kapanış saati uydurulmadı. Resmî e-Devlet hizmeti doğrulandı. |
| SGK 7594 uygulama duyurusu | 4/c-primsiz fark ödemesi ile çalışması süren 4/a-4/b dosyaları ayrıldı. Taranmış resmî PDF görsel olarak okundu. Kişisel hak/tutar veya kesin ödeme günü çıkarılmadı; kanun metnine erişim sınırı görünür. |
| MEB açık öğretim | 11 Eylül–12 Ekim yeni kayıt/yenileme; okul türüne göre halk eğitimi merkezi veya yüz yüze eğitim kurumu. Kayıtlı öğrencinin uzaktan yenilemesi yeni kayıtla karıştırılmadı. |
| GSB yurt (mevcut kayıt) | 18 Eylül yedek yerleştirme eklendi; eski 10 Eylül kayıt süresi yeni yerleştirmeye taşınmadı. |
| KPSS Ortaöğretim geç başvuru (mevcut kayıt) | 16 Eylül'de sona eren süre arşiv anlatımıyla korundu. Önceki kaynak doğrulama tarihi değiştirilmedi. |
| Sayıştay Eleme (mevcut kayıt) | Normal dönem kapandı; 24 Eylül 10.00–23.59 geç başvuru gelecekteki ayrı aşama olarak gösterildi. |
| e-YDTS/2 (mevcut kayıt) | Aynı olay yeni URL açılmadan sınava giriş aşamasına taşındı; 19 Eylül 13.30 binaya alınma sınırı. |

Başlama zamanı bulunan duyuru ilan tarihinde otomatik açık sayılmıyor. Saat verilmeyen takvim gününde 'son gün, kapanış saatini kontrol edin' durumu kullanılıyor; ertesi gün arşivleniyor. Liste ve rota durumları aynı hesabı kullanıyor.

## Pilot kalite: 3/20 URL

Genel MSÜ, Harp Okulları ve MSÜ tercih sayfaları ayrı kullanıcı aşamalarına göre geliştirildi.
Kaynak: [2026 ÖSYM/MSB ortak kılavuzu](https://dokuman.osym.gov.tr/pdfdokuman/2026/MSU/kilavuz_msd06012026.pdf), [resmî yayın kaydı](https://www.osym.gov.tr/2026msu-kilavuz-ve-basvuru-bilgileri), ÖSYM AİS ve [MSB e-Devlet köprüsü](https://www.turkiye.gov.tr/msb-personel-ve-ogrenci-temin-sistemi-5958).

19 Eylül hazırlık durumu: 3 kayıt inceleme/test aşamasında hazır; 17 kayıt pending; pilotta blocked 0.
MSB'nin güncel ek çağrı/tercih duyuruları erişilemediğinden yeni dönem açık/kapalı iddiası yok.
Bu sınır üç sayfada da açık; 2026 geçmiş tarih ve ücretler sonraki yıla taşınmadı.
Üç sayfanın aşama, belge, ilk kanal, SSS ve sonraki MSÜ aşamasına bağlantısı test edildi.
Kaynak ve farklar `seo-quality-pilot.json` kuyruğuna işlendi. Gerçek yayın ve kanıtı 20 Eylül raporunda; yayın öncesinde published sayılmadı.

## Tamamlanamayan resmî kontroller / inceleme gerekli

- Resmî Gazete ana sayfa, 19 Eylül nüshası ve mevzuat.gov.tr birleşik metinleri: HTTP/erişim hataları. Genel mevzuat taraması tamamlandı veya değişiklik yok denemez.
- MSB ASAL ana sayfa, Askerlik Hizmeti Duyuruları, normal tertip yıllık faaliyet PDF'si, Kasım sonuç/sevk duyuruları, bedelli faaliyet PDF'si ve bedel duyuruları: yönlendirme/erişim hataları. Askeralma takvimleri ve doğrulama tarihleri değiştirilmedi; normal tertip/bedelli değişmedi sonucu çıkarılmadı. Kişisel bilgi e-Devlet Askerliğim/şube belgesinden öğrenilir. YÜSEM'e yeni açılım eklenmedi.
- MSB Personel Temin canlı duyuruları: sonuçlandırılamadı. Erişilen 2026 ortak kılavuz canlı yeni duyuruların yerine geçirilmedi.
- GİB canlı duyuruları/Dijital Vergi Dairesi ve bazı diğer resmî uçlar: tam gövde erişimi sonuçlandırılamadı.
- [16 Eylül et ürünleri standartları](https://www.tarimorman.gov.tr/Haber/7277/Et-Urunlerine-Yonelik-Yeni-Standartlar-Belirlendi) ve [içme sütleri değişikliği](https://www.tarimorman.gov.tr/Haber/7274/Sutte-Yeni-Donem): Bakanlık açıklamaları okundu; 31 Mart 2027 uyum tarihi aktarılıyor. Güncel tebliğ/yürürlük/geçiş hükümleri birlikte okunamadığı için yeni kesin hukuki yükümlülük veya yaptırım rehberi yayımlanmadı; inceleme gerekli.
- SGK ilaç geri ödeme/optik sektör duyurularında tüm ek belgeler birlikte doğrulanamadı; vatandaş rotalarında kapsam/tutar değiştirilmedi.

ÖSYM, GSB/KYGM, Aile, SGK, Jandarma/JSGA ve Tarım listeleri; ek olarak MEB, Sahil Güvenlik, NVI, Ticaret ve EPDK sayfaları incelendi. TKGM/BTK erişiminin kapsamı sınırlıydı. Tören, ziyaret ve tanıtım haberleri duyuruya çevrilmedi. Sahil Güvenlikteki 4 Eylül sonuç kaydı yeni bir 19 Eylül olayı gibi sunulmadı.

## Ölçüm, güvenlik ve indeks politikası

Güncel GSC sorgu/URL Denetimi, Google Trends ve Cloudflare istek/WAF verisine erişim yok.
18 Eylül dışa aktarımı canlı veri sayılmadı. ÇKS'nin 3 Eylül taramasından içerik sonucu çıkarılmadı.
14/28 gün ölçümü ilk pilot yayından sonra aynı URL'lerde, eşit tamamlanmış dönemlerde yapılmalı.
Gösterim/tıklama/CTR/konum/indeks ve etkileşim sonuçları bilinmiyor; boş değerler sıfır değil.
IP/ağ bloğu, challenge/rate-limit veya yeni analitik/kişisel veri aktarımı yapılmadı.

Sitemap üretimi/stratejisi, mevcut URL/canonical/robots/noindex politikası korunuyor.
İki arama URL'si noindex kalıyor. Yalnız onaylı mevcut duyuru/sitemap/IndexNow mekanizması kullanılıyor.

## Yayın kanıtı

Yerel tam validate geçti: TypeScript, veri, dilekçe, quality gate, genel/ek/Askeralma duyuruları, tercih, SEO, content-semantics, çakışma ve Wrangler dry-run.
Kaynak denetimi kapsamı duyuru kaynakları/eylem URL'lerini de içerecek biçimde genişletildi; erişim sonucu içerik doğrulaması yerine geçmiyor.
Son PR/CI/merge/production/IndexNow/canlı smoke sonucu yayın sonrasında eklenecek.
