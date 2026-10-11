import type { Announcement, AnnouncementSource } from "./announcements";

const checked = "2026-09-25";
const source = (title: string, url: string, authority = "ÖSYM"): AnnouncementSource => ({ title, url, authority });
const ais = source("ÖSYM AİS işlem takvimi", "https://ais.osym.gov.tr/");
const rules = source("Sınava giriş belgesindeki temel kurallar", "https://dokuman.osym.gov.tr/web/2026/7/temel-kurallar-28k39fdj.pdf");
const populationNotice = source("26 ve 27 Eylül sınavları için açık nüfus müdürlükleri", "https://www.osym.gov.tr/e-yds-202610-ingilizce-2026-hmgs2-ile-2026-iyos-sinavlari-icin-sinav-gunu-acik-tutulacak-ililce-nufus-mudurlukleri");
const population26 = source("26 Eylül 11.00–13.30: açık nüfus müdürlükleri listesi", "https://dokuman.osym.gov.tr/web/2026/9/26-eylul-2026-cumartes-gunu-1100-1330-saatler-arasinda-acik-olacak-llce-nufus-mudurlukler-nf2hlf-23095543.pdf");
const population27 = source("27 Eylül 07.00–10.00: açık nüfus müdürlükleri listesi", "https://dokuman.osym.gov.tr/web/2026/9/27-eylul-2026-pazar-gunu-0700-1000-saatler-arasinda-acik-olacak-llce-nufus-mudurlukler-40ox2t-23095612.pdf");
const sgkNotice = "https://www.sgk.gov.tr/duyuru/detay/Sozlesmeli-Bilisim-Personeli-Giris-Sinavi-Sonuclarina-Gore-Kurumumuza-Yerlesen-Adaylardan-Istenen-Belgelere-Iliskin-Duyuru-2026-09-24-09-46-20";
const injuryNotice = "https://www.jandarma.gov.tr/3713-sayili-kanunun-gecici-20nci-maddesi-kapsaminda-terorle-mucadelede-malul-kalmayacak-sekilde-yaralananlara-iliskin-basvuru-asamalari";

export const officialAnnouncementsSeptember25: Announcement[] = [
  {
    slug: "2026-kpss-on-lisans-sinava-giris-belgeleri",
    title: "4 Ekim KPSS Ön Lisans sınava giriş belgeleri erişime açıldı",
    authority: "ÖSYM", kind: "exam-call", publishedAt: "2026-09-24", verifiedAt: checked, lastModified: checked,
    deadlineAt: "2026-10-04T10:00:00+03:00", deadlineLabel: "4 Ekim 2026: saat 10.00'dan sonra sınav binasına alınmayacak; bu saat belge indirme kapanışı değildir",
    summary: "KPSS Ön Lisans adaylarının 4 Ekim 2026 sınavındaki bina ve salon bilgileri AİS'te açıldı. Kişisel Sınava Giriş Belgesi 24 Eylül saat 10.30'dan beri alınabiliyor. Sınav günü 10.00'dan sonra binaya giriş yok.",
    details: ["Bu işlem kayıtlı adayın sınava giriş belgesini edinmesidir; yeni KPSS başvurusu değildir. Bina/salon bilgisi genel takvimden değil kişinin kendi belgesinden öğrenilir.", "Fotoğrafın göründüğü belge çıktısını ve ÖSYM'nin kabul ettiği kimlik belgesini hazırlayın. AİS'teki 4 Ekim 23.59 belge erişim kapanışı, sınav binasına giriş için ek süre vermez; sınav saatiyle binaya son kabul saati de aynı bilgi değildir."],
    actions: ["AİS'te 2026 KPSS Ön Lisans Sınava Giriş Belgesini açın, çıktınızı ve geçerli kimliğinizi hazırlayın.", "Belgedeki bina/salonu kontrol edip 4 Ekim'de saat 10.00 sınırından önce giriş işlemlerine hazır olun."],
    actionUrl: ais.url, actionLabel: "AİS KPSS Ön Lisans giriş belgesini aç",
    relatedPathKeys: [], relatedSearches: ["KPSS Ön Lisans sınav yeri"],
    sources: [source("24 Eylül: KPSS Ön Lisans giriş belgeleri", "https://www.osym.gov.tr/2026-kpss-on-lisans-sinavi-sinava-giris-belgeleri-erisime-acildi"), ais, rules]
  },
  {
    slug: "2026-e-yds-10-ingilizce-sinava-giris-belgeleri",
    title: "26 Eylül e-YDS İngilizce: giriş belgesi ve açık nüfus müdürlükleri",
    authority: "ÖSYM", kind: "exam-call", publishedAt: "2026-09-24", verifiedAt: checked, lastModified: checked,
    deadlineAt: "2026-09-26T13:30:00+03:00", deadlineLabel: "26 Eylül 2026: saat 13.30'dan sonra sınav binasına alınmayacak; belge erişim süresiyle karıştırmayın",
    summary: "26 Eylül e-YDS 2026/10 İngilizce adayları giriş belgelerini AİS'ten alabiliyor. Binaya son kabul 13.30; belge ekranının daha geç kapanması bu saati uzatmıyor. Kimlik sorunu yaşayan adaylar için yalnız resmî listedeki nüfus müdürlükleri açık olacak.",
    details: ["Kişisel belge 24 Eylül saat 10.00'da erişime açıldı. Bu e-YDS İngilizce sınavıdır; e-YDTS Türkçe sınavıyla veya yeni sınav başvurusuyla karıştırmayın. Bina ve salon için kendi belgenizi kontrol edin.", "Kimliğini kaybeden veya kimliği sınava kabul koşullarını karşılamayan adaylar için listedeki nüfus müdürlükleri 26 Eylül 11.00–13.30 arasında hizmet verecek. İlgili sınavın giriş belgesi ve biyometrik fotoğrafla başvurulur; düzenlenecek Geçici Kimlik Belgesi dışındaki başvuru formu sınava giriş kimliği sayılmaz. Bu saatler bütün nüfus müdürlüklerinin genel çalışma saati değildir."],
    actions: ["AİS'ten fotoğraflı giriş belgenizi alın; kimliğinizin geçerliliğini sınavdan önce kontrol edin.", "Kimlik sorunu varsa resmî PDF'deki müdürlüğü ve adresi bulun; işlem ve yol süresini gözeterek binaya 13.30'dan önce ulaşın."],
    actionUrl: ais.url, actionLabel: "AİS e-YDS 2026/10 giriş belgesini aç",
    relatedPathKeys: [], relatedSearches: ["e-YDS 2026/10 İngilizce sınav yeri"],
    sources: [source("24 Eylül: e-YDS 2026/10 giriş belgeleri", "https://www.osym.gov.tr/e-yds-202610-ingilizce-sinava-giris-belgeleri-erisime-acildi"), ais, populationNotice, population26]
  },
  {
    slug: "2026-sgk-bilisim-yerlesen-aday-belge-teslimi",
    title: "SGK bilişim personeli: asil adayların belge teslimi 9 Ekim mesai bitiminde sona eriyor",
    authority: "Sosyal Güvenlik Kurumu / Personel Daire Başkanlığı", kind: "guide", publishedAt: "2026-09-24", verifiedAt: checked, lastModified: checked,
    deadlineDate: "2026-10-09", deadlineLabel: "9 Ekim 2026 mesai bitimi; sayısal kapanış saati belirtilmedi. Elden teslim için kurumun mesai saatini kontrol edin",
    summary: "SGK, bilişim personeli sınavı sonucunda asil yerleşen adayları belgelerini 9 Ekim 2026 mesai bitimine kadar elden teslim etmeye çağırdı. Teslim mercii SGK Personel Daire Başkanlığı veya bu birime iletmek üzere herhangi bir Sosyal Güvenlik İl Müdürlüğü.",
    details: ["Bu ilan yeni personel başvurusu değil, 14 Eylül'de ilan edilen sonuçlara göre asil yerleşenlerin atama belgesi aşamasıdır. Web ilanı 24 Eylül, ek duyuru metni 23 Eylül tarihlidir; yayım tarihi otomatik başvuru başlangıcı yapılmadı.", "Ek-1 atama formu; kimlik, öğrenim ve askerlik belgesi; iki fotoğraf; Ek-2 etik sözleşmesi, Ek-3 mal bildirimi ve adli sicil kaydı isteniyor. SMS bilgilendirmesi isteyenler Ek-4'ü de hazırlar. Öğrenim belgesinin onay biçimi ve askerlik durumuna özgü işlem için resmî tam listeyi okuyun.", "Belge teslimi için SGK merkezindeki 5. kat 522 numaralı oda veya Sosyal Güvenlik İl Müdürlüğü kullanılır. Duyuruda e-posta/çevrimiçi yükleme teslim kanalı verilmedi. Güvenlik soruşturması ve arşiv araştırması sonraki aşamadır; belge teslimi tek başına göreve başlama garantisi değildir."],
    actions: ["Asil yerleşme durumunuzu kontrol edin; duyurudaki form ve belge listesini eksiksiz hazırlayın.", "Belgeleri 9 Ekim mesai bitimini beklemeden belirtilen merkez birime veya İl Müdürlüğüne elden teslim edin."],
    actionUrl: sgkNotice, actionLabel: "SGK duyurusunu ve teslim formlarını aç",
    relatedPathKeys: [], relatedSearches: ["SGK bilişim personeli atama belgeleri"],
    sources: [source("24 Eylül: SGK yerleşen adaylardan istenen belgeler", sgkNotice, "SGK"), source("SGK belge teslim duyurusu (23 Eylül tarihli ek)", "https://www.sgk.gov.tr/Download/DownloadFile?f=a8511a8e-2274-42f8-b661-5f3946870a47.pdf&d=cdd47b9a-532e-4367-9c45-06167da95222", "SGK")]
  }
];

export function refreshSeptember25(item: Announcement): Announcement {
  if (item.slug === "2026-hmgs-iyos-sinava-giris-belgeleri") return {
    ...item, lastModified: checked,
    // Partial addition only: do not silently re-date every older source in this record.
    details: [...item.details, "25 Eylül ek kontrolü: ÖSYM, kimlik sorunu yaşayan HMGS/2 ve İYÖS adayları için yalnız listede belirtilen nüfus müdürlüklerinin 27 Eylül 07.00–10.00 arasında açık olacağını duyurdu. İlgili Sınava Giriş Belgesi ve biyometrik fotoğrafla gidin; Geçici Kimlik Belgesi düzenlenmesi için gereken işlem/yol süresini binaya son kabul saatinden ayrı planlayın."],
    sources: [...item.sources, populationNotice, population27]
  };
  if (item.slug === "3713-terorle-mucadelede-yaralananlar-e-devlet-basvurusu") return {
    ...item, kind: "guide", lastModified: checked,
    title: "3713 geçici 20: Jandarma ve güvenlik korucuları için başvuru kılavuzları",
    summary: "Jandarma'nın 24 Eylül duyurusu, Jandarma personeli ve güvenlik korucuları için ayrı e-Devlet işlem kılavuzları sunuyor. Kurum seçimi farklı olduğundan kendi grubunuzun kılavuzunu izleyin. Yeni bir hak kazanma veya genel kapanış tarihi ilan edilmiyor.",
    details: ["25 Eylül kılavuz kontrolü: Jandarma personeli İçişleri Bakanlığı hizmetindeki Jandarma seçeneği üzerinden Şehit Gazi İşlemleri sistemine; güvenlik korucuları İller İdaresi Genel Müdürlüğü (Güvenlik Korucuları) seçeneğine yönlendiriliyor. Kılavuzlar formun gönderilmesini ayrı bir son adım olarak gösteriyor; yalnız giriş yapmak başvuruyu tamamlamaz.", "Güvenlik korucuları kılavuzu 1 Ekim 2026 öncesinde başvuruya dikkat çekiyor ve bunu aylık başlangıcıyla ilişkilendiriyor. Bu ifade ortak bir hak düşürücü kapanış saati olarak kaydedilmedi. Kişisel hak ve aylık başlangıcı kurumdan doğrulanmalı.", "İnceleme gerekli: güncel 3713 sayılı Kanun metnine erişilemedi. Yeni kılavuz bağlantıları ve ekran adımları doğrulandı; kapsam, hak kazanma, aylık tutarı veya mevzuat yorumu yeniden doğrulanmış sayılmıyor. Önceki genel kaynak doğrulama tarihi bu nedenle korunuyor.", ...item.details],
    deadlineLabel: "Yeni kılavuzda ortak kesin kapanış tarihi doğrulanmadı; 1 Ekim öncesi önerisini kişisel hak kaybı son günü saymayın",
    sources: [source("24 Eylül: 3713 geçici 20 başvuru aşamaları", injuryNotice, "Jandarma Genel Komutanlığı"), source("Jandarma personeli başvuru kılavuzu", "https://www.jandarma.gov.tr/kurumlar/jandarma.gov.tr/Duyurular/2026/Gecici-20Madde-Basvuru-Kilavuzu-JANDARMA.pdf", "Jandarma Genel Komutanlığı"), source("Güvenlik korucuları başvuru kılavuzu", "https://www.jandarma.gov.tr/kurumlar/jandarma.gov.tr/Duyurular/2026/Gecici-20Madde-Basvuru-Kilavuzu-GK_GKK.pdf", "Jandarma Genel Komutanlığı"), ...item.sources]
  };
  return item;
}
