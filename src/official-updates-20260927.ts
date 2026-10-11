import type { Announcement, AnnouncementSource } from "./announcements";

const source = (title: string, url: string, authority: string): AnnouncementSource => ({ title, url, authority });
const sgk = "https://www.sgk.gov.tr/duyuru/detay/3713-Sayili-Terorle-Mucadele-Kanunu-Kapsaminda-Kurumumuza-Yerlestirilen-Adaylarin-Atamalarina-Iliskin-Duyuru-2026-09-25-01-27-54";
const tarim = "https://www.tarimorman.gov.tr/Duyuru/2701/3713-Sayili-Terorle-Mucadele-Kanunu-Geregi-Bakanligimiza-Yerlestirilenlerden-Istenilen-Evraklar";
const nakil = "https://www.turkiye.gov.tr/kyk-kredi-burs-nakil-basvurusu";
const resultUrl = "https://sonuc.osym.gov.tr/Sorgu.aspx?SonucID=10370";

export const officialAnnouncementsSeptember27: Announcement[] = [
  {
    slug: "2026-sgk-3713-yerlesen-aday-belge-teslimi",
    title: "SGK'ya 3713 kapsamında yerleşenler: belge teslimi 2 Ekim mesai bitiminde sona eriyor",
    authority: "Sosyal Güvenlik Kurumu / Personel Daire Başkanlığı", kind: "guide",
    publishedAt: "2026-09-25", verifiedAt: "2026-09-26", lastModified: "2026-09-26",
    deadlineDate: "2026-10-02", deadlineLabel: "2 Ekim 2026 mesai bitimi; sayısal saat verilmedi, teslim biriminin mesaisini kontrol edin",
    summary: "3713 kapsamında SGK'ya yerleştirilen adayların atama belgelerini 2 Ekim mesai bitimine kadar elden teslim etmesi gerekiyor. Kurumun merkez Personel birimi veya herhangi bir Sosyal Güvenlik İl Müdürlüğü kullanılabiliyor.",
    details: ["Bu, yerleştirmesi yapılmış adayların belge aşamasıdır; yeni işe alım veya 3713 geçici 20 yaralanma başvurusu değildir. Merkezde teslim yeri Ziyabey Cad. No:6, Balgat/Çankaya/Ankara, 5. kat 524 numaralı odadır. Bilişim personelinin 9 Ekim takvimi bu gruba uygulanmaz.", "Atama formu, öğrenim belgesi, iki fotoğraf, kimlik örneği, askerlik belgesi, mal bildirimi, etik sözleşmesi ve adli sicil hazırlanır. SMS dilekçesi isteyen adaylar içindir. Terhis olanlar için şubeden alınan ayrıntılı belge isteniyor; genel e-Devlet askerlik belgesini yeterli saymayın. Belge/onay ayrıntıları için resmî eki okuyun."],
    actions: ["SGK'ya yerleşme durumunuzu ve resmî ekteki belge listesini kontrol edin.", "Belgeleri 2 Ekim mesai bitiminden önce belirtilen merkez birime veya İl Müdürlüğüne elden ulaştırın."],
    actionUrl: sgk, actionLabel: "SGK belge listesini ve formları aç",
    relatedPathKeys: [], relatedSearches: ["SGK 3713 atama belge teslimi"],
    sources: [source("25 Eylül SGK atama duyurusu", sgk, "SGK"), source("24 Eylül tarihli SGK belge teslim eki", "https://www.sgk.gov.tr/Download/DownloadFile?f=6c0cd0a3-eb59-433a-8ff8-501c88d1b5c4.pdf&d=047721bb-c66f-4a66-86af-6763ffd6bb6d", "SGK")]
  },
  {
    slug: "2026-tarim-3713-yerlesen-aday-belge-teslimi",
    title: "Tarım ve Orman Bakanlığına 3713 kapsamında yerleşenler: evrak son günü 16 Ekim",
    authority: "Tarım ve Orman Bakanlığı / Personel Genel Müdürlüğü", kind: "guide",
    publishedAt: "2026-09-25", verifiedAt: "2026-09-26", lastModified: "2026-09-26",
    deadlineDate: "2026-10-16", deadlineLabel: "16 Ekim 2026 mesai bitimi; kesin saat belirtilmiyor. Posta süresini ve teslim adresini kurumla kontrol edin",
    summary: "Bakanlığa 3713 kapsamında yerleştirilen adaylardan atama evrakı istendi. 25 Eylül ilanı, belgelerin 16 Ekim 2026 mesai bitimine kadar Personel Genel Müdürlüğüne posta yoluyla gönderilmesini söylüyor.",
    details: ["İşlem yalnız Bakanlığa yerleştirilen adayların atama aşamasıdır. SGK'nın elden teslim yolu ve 2 Ekim tarihi bu ilana uygulanmaz. Yeni bir genel istihdam hakkı veya yaralanma başvurusu açıldığı sonucu çıkarılmaz.", "İmzalı beyan ve sağlık durumu formu, kapalı zarfta imzalı mal bildirimi, altı fotoğraf, UETS adresi ve onaylı mezuniyet belgesi isteniyor. Erkek adaylar için şubeden askerlik/terhis belgesi; başka kamu kurumunda çalışanlar için hizmet belgesi de var. Formları ilanın eklerinden alın; posta ve teslim ayrıntısını Personel Genel Müdürlüğüyle doğrulayın."],
    actions: ["Yerleştirildiğiniz kurumu kontrol edip Bakanlığın form ve evrak listesini hazırlayın.", "Posta teslim planını 16 Ekim mesai bitimini gözeterek yapın; gönderi kaydını saklayın."],
    actionUrl: tarim, actionLabel: "Bakanlığın evrak ve form duyurusunu aç",
    relatedPathKeys: [], relatedSearches: ["Tarım Orman 3713 atama evrakları"],
    sources: [source("25 Eylül: yerleşenlerden istenilen evraklar", tarim, "Tarım ve Orman Bakanlığı")]
  },
  {
    slug: "2026-kygm-burs-kredi-bilgi-kontrolu-nakil",
    title: "Burs/kredi alan öğrenciler: öğrenim bilgisi ve nakil kaydınızı kontrol edin",
    authority: "GSB / Kredi ve Yurtlar Genel Müdürlüğü", kind: "guide",
    publishedAt: "2026-09-25", verifiedAt: "2026-09-27", lastModified: "2026-09-27",
    summary: "KYGM, burs/kredi ödemelerinde YÖKSİS bilgilerinin esas alındığını hatırlattı. Öğrenim bilgisi yanlışsa üniversitenin öğrenci işleriyle düzeltilmesi; üniversite değişmişse e-Devlet'ten kredi/burs nakil talebi verilmesi gerekiyor.",
    details: ["Bu işlem mevcut burs/kredi kaydını yönetmek içindir; 2026–2027 ilk burs başvurusunun açıldığını göstermez ve duyuruda ortak bir son tarih bulunmuyor. Burs alanlar başarı bilgilerinin de güncel olduğunu kontrol etmeli.", "KYGM'nin aynı gün yayımladığı güvenli kanal uyarısına göre kişisel bilgiler e-Devlet'ten, kurum bilgisi 444 0 472 üzerinden kontrol edilir. Telefon veya mesajla gelen borç/ödeme yönlendirmelerine dayanmayın; banka hesabınızı ve şifrenizi başkasına kullandırmayın. Nakil ekranına giriş yapmak tek başına talebin tamamlandığı anlamına gelmez."],
    actions: ["Öğrenim bilgisi hatalıysa önce üniversitenizin öğrenci işleriyle YÖKSİS kaydını düzelttirin.", "Üniversite değişikliğinde resmî e-Devlet Kredi / Burs Nakil Başvurusu hizmetinden talebinizi iletip sonucunu takip edin."],
    actionUrl: nakil, actionLabel: "e-Devlet kredi / burs nakil hizmetini aç",
    relatedPathKeys: [], relatedSearches: ["KYK burs kredi nakil", "YÖKSİS öğrenim bilgisi"],
    sources: [source("25 Eylül: burs/kredi alan öğrencilerin bilgi kontrolü", "https://kygm.gsb.gov.tr/HaberDetaylari/1/303224/burs-kredi-alan-ogrencilerin-dikkat-etmesi-gerekenler.aspx", "GSB / KYGM"), source("25 Eylül: banka hesapları ve güvenli kanallar", "https://kygm.gsb.gov.tr/Duyuru/303217/banka-hesaplarinin-kullanimina-dikkat.aspx", "GSB / KYGM"), source("Kredi / Burs Nakil Başvurusu", nakil, "e-Devlet / GSB"), source("Öğrenim / Katkı Kredisi ve Burs Sorgulama", "https://www.turkiye.gov.tr/kyk-ogrenim-katki-kredisi-ve-burs-sorgulama", "e-Devlet / GSB")]
  },
  {
    slug: "2026-e-yds-10-ingilizce-sinav-sonuclari",
    title: "e-YDS 2026/10 İngilizce sonuçları 26 Eylül'de açıklandı",
    authority: "ÖSYM", kind: "result", publishedAt: "2026-09-26", verifiedAt: "2026-09-27", lastModified: "2026-09-27",
    summary: "26 Eylül'deki e-YDS 2026/10 İngilizce sınavının sonuçları aynı gün saat 18.15'te açıldı. Adaylar kendi puanını ÖSYM Sonuç Açıklama Sisteminde T.C. kimlik/YU numarası ve aday şifresiyle öğrenebilir.",
    details: ["Sonuç sorgulama ile önceki sınava giriş belgesi aşaması farklıdır. 26 Eylül binaya giriş saati artık sona ermiştir; sonuç duyurusu yeni sınav başvurusu açmaz.", "ÖSYM aynı duyuruda yüzde 10'luk temel soru kitapçığı bağlantısını da veriyor. Bu genel duyurudan kişisel başarı, yerleştirme veya itiraz için son gün çıkarılmamalı; sonuç incelemesi gerekiyorsa ilgili sınavın güncel kılavuzunu kontrol edin."],
    actions: ["Resmî ÖSYM sonuç ekranında e-YDS 2026/10 kaydınızı açın.", "Puanınızı kişisel sonuç belgenizden kontrol edin; hesap bilgilerinizi üçüncü taraf sitelere vermeyin."],
    actionUrl: resultUrl, actionLabel: "e-YDS 2026/10 sonucunu sorgula",
    relatedPathKeys: [], relatedSearches: ["e-YDS 2026/10 İngilizce sonuç"],
    sources: [source("26 Eylül e-YDS İngilizce sonuç duyurusu", "https://www.osym.gov.tr/e-yds-202610-ingilizce-sinav-sonuclari-aciklandi", "ÖSYM"), source("e-YDS 2026/10 kişisel sonuç ekranı", resultUrl, "ÖSYM")]
  },
  {
    slug: "2026-dus-sts-dis-2-donem-gec-basvuru",
    title: "DUS ve STS Diş 2. dönem: geç başvuru 1 Ekim saat 10.00'da başlayacak",
    authority: "ÖSYM", kind: "application", publishedAt: "2026-09-27", verifiedAt: "2026-09-27", lastModified: "2026-09-27",
    startsAt: "2026-10-01T10:00:00+03:00", deadlineAt: "2026-10-01T23:59:00+03:00",
    deadlineLabel: "Geç başvuru: 1 Ekim 2026 saat 10.00–23.59; her sınav için ayrı kayıt ve ücret",
    summary: "ÖSYM AİS, DUS ve STS Diş Hekimliği 2. dönem için ayrı geç başvuru pencerelerini 1 Ekim 10.00–23.59 olarak gösteriyor. Her sınavın geç başvuru ücreti 3.750 TL. 27 Eylül itibarıyla bu dönem henüz başlamadı.",
    details: ["24 Eylül'de kapanan normal dönem arşivde kalır; bu ayrı geç başvuru günüdür. DUS uzmanlık sınavı ile STS Diş Hekimliği denklik sınavı farklı işlemlerdir. Kendi sınavınızın koşullarını ve kişisel başvuru durumunuzu kontrol edin.", "Güncel AİS, iki sınavın geç başvuru ödemesini ÖSYM Kartlı Ödeme Sistemine yönlendiriyor. DUS kılavuzu, geç başvuru ücretinin yüzde 50 artırımlı olarak aynı gün ödenmesini öngörüyor. Normal dönemin banka/ödeme takvimini bu güne taşımayın; kendi sınavınızın kılavuzu ve AİS kaydını esas alın."],
    actions: ["1 Ekim saat 10.00'dan itibaren AİS'te doğru sınavın başvurusunu seçin.", "Aynı gün kayıt ve gerekiyorsa ücret işlemini tamamlayıp başvurunuzun durumunu kontrol edin."],
    actionUrl: "https://ais.osym.gov.tr/", actionLabel: "AİS geç başvuru takvimini aç",
    relatedPathKeys: [], relatedSearches: ["DUS 2 dönem geç başvuru", "STS Diş geç başvuru"],
    sources: [source("27 Eylül kontrolü: DUS / STS Diş geç başvuru saatleri ve ücretleri", "https://ais.osym.gov.tr/", "ÖSYM"), source("DUS 2. dönem kılavuzu: geç başvuru günü ve ödeme", "https://dokuman.osym.gov.tr/web/2026/9/basvuru-kilavuzu-e1esxj-16163038.pdf", "ÖSYM"), source("DUS ve STS Diş normal dönem ve ayrı kılavuzları", "https://www.osym.gov.tr/2026-dus-2-donem-sinavi-ile-2026-sts-dis-hekimligi-2-donem-sinavi-basvurularin-alinmasi", "ÖSYM")]
  }
];
