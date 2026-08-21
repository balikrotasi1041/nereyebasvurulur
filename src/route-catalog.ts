import type {
  ApplicationChannel,
  FreshnessRisk,
  MenuNode,
  RouteRecord,
  Source,
  VerificationStatus
} from "./data";

const LAST_VERIFIED = "2026-08-21";

type LeafContext = {
  pathKey: string;
  category: string;
  section: string;
  label: string;
  legacySlug?: string;
};

type RouteDraft = {
  summary: string;
  aliases?: string[];
  verificationStatus: VerificationStatus;
  competentAuthorities: string[];
  applicationChannels: ApplicationChannel[];
  requiredDocuments: string[];
  deadlineAndAppeal: string;
  escalation: string[];
  locationLogic: string;
  legalBasis: string[];
  sources: Source[];
  freshnessRisk: FreshnessRisk;
  caution?: string;
  currentCycleNote?: string;
  publicationBlocker?: string;
};

const src = (title: string, url: string, authority: string): Source => ({ title, url, authority });
const portal = (label: string, url: string, note?: string): ApplicationChannel => ({ type: "official-portal", label, url, note });
const eGov = (label: string, url: string, note?: string): ApplicationChannel => ({ type: "e-government", label, url, note });
const office = (label: string, note?: string): ApplicationChannel => ({ type: "in-person", label, note });
const phone = (label: string, note?: string): ApplicationChannel => ({ type: "phone", label, note });
const legislation = (number: string, title: string, series = "1.5"): Source => src(title, `https://www.mevzuat.gov.tr/MevzuatMetin/${series}.${number}.pdf`, "Mevzuat Bilgi Sistemi");

const S = {
  socialAid: src("Sosyal Yardımlar Genel Müdürlüğü - Sıkça Sorulan Sorular", "https://www.aile.gov.tr/sss/sosyal-yardimlar-genel-mudurlugu/", "Aile ve Sosyal Hizmetler Bakanlığı"),
  socialAidGuide: src("2026 Sosyal Yardımlar Hizmet Rehberi", "https://www.aile.gov.tr/media/281039/hizmet_rehber_sosyal_yardimlar_hizmetleri_04-02-2026-revize.pdf", "Aile ve Sosyal Hizmetler Bakanlığı"),
  familyEGov: src("Aile ve Sosyal Hizmetler Bakanlığı e-Devlet hizmetleri", "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi", "e-Devlet / Aile ve Sosyal Hizmetler Bakanlığı"),
  birthAid: src("Yeni Doğum Yardımı", "https://www.aile.gov.tr/sss/sosyal-yardimlar-genel-mudurlugu/yeni-dogum-yardimi/", "Aile ve Sosyal Hizmetler Bakanlığı"),
  childGuide: src("Çocuk Hizmetleri Rehberi", "https://aile.gov.tr/media/278421/hizmet_rehber_cocuk_hizmetleri.pdf", "Aile ve Sosyal Hizmetler Bakanlığı"),
  disabilityReports: src("Engelliler İçin Sağlık Kurulu Raporları", "https://www.aile.gov.tr/sss/engelli-ve-yasli-hizmetleri-genel-mudurlugu/engelliler-icin-saglik-kurulu-raporlari/", "Aile ve Sosyal Hizmetler Bakanlığı"),
  homeCare: src("Evde Bakım Yardımı Yönetmeliği", "https://www.aile.gov.tr/eyhgm/mevzuat/ulusal-mevzuat/yonetmelikler/evde-bakim-yardimi-yonetmeligi-1/", "Aile ve Sosyal Hizmetler Bakanlığı"),
  homeCare2026: src("Evde Bakım Yardımı Yönetmeliğinde 2026 Değişikliği", "https://www.resmigazete.gov.tr/eskiler/2026/01/20260116-1.htm", "Resmî Gazete"),
  sgk: src("Sosyal Güvenlik Kurumu e-Devlet hizmetleri", "https://www.turkiye.gov.tr/sosyal-guvenlik-kurumu", "e-Devlet / Sosyal Güvenlik Kurumu"),
  sgkMalulluk: src("Malullük", "https://www.sgk.gov.tr/Content/Post/e09fc8f2-f550-4cd7-840c-a812d94d0f62/Malulluk-2022-05-14-09-10-33", "Sosyal Güvenlik Kurumu"),
  sgkOlum: src("Ölüm Aylığı", "https://www.sgk.gov.tr/Content/Post/70fa4a38-aaf1-4f86-aa55-54fdbf4e2481/Olum-Ayligi-2025-02-26-02-56-02", "Sosyal Güvenlik Kurumu"),
  disabledRetirement2025: src("7538 sayılı Kanun - Engelli emekliliği geçiş değişikliği", "https://www.resmigazete.gov.tr/eskiler/2025/01/20250115-1.htm", "Resmî Gazete"),
  nvi: src("NVİ e-Başvurular", "https://nvi.gov.tr/e-basvurular", "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü"),
  nviEGov: src("NVİ e-Devlet hizmetleri", "https://www.turkiye.gov.tr/nufus-ve-vatandaslik-isleri-genel-mudurlugu", "e-Devlet / Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü"),
  nviId: src("T.C. Kimlik Kartı Sıkça Sorulan Sorular", "https://www.nvi.gov.tr/sss-kimlik-karti", "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü"),
  meb: src("Millî Eğitim Bakanlığı e-Devlet hizmetleri", "https://www.turkiye.gov.tr/milli-egitim-bakanligi", "e-Devlet / Millî Eğitim Bakanlığı"),
  eokul: src("e-Okul Yönetim Bilgi Sistemi", "https://e-okul.meb.gov.tr/", "Millî Eğitim Bakanlığı"),
  osymYks: src("2026 YKS Kılavuzu ve Başvuru Bilgileri", "https://www.osym.gov.tr/2026yks-basvurularin-alinmasi", "ÖSYM"),
  osymYksGuideIndex: src("2026 YKS Kılavuzu", "https://www.osym.gov.tr/2026yuksekogretim-kurumlari-sinavi-yks-kilavuzu", "ÖSYM"),
  osymGuide: src("2026 YKS Başvuru Kılavuzu", "https://dokuman.osym.gov.tr/pdfdokuman/2026/YKS/basvuru_kilavuz06022026.pdf", "ÖSYM"),
  osymYksResults: src("2026 YKS Sonuçları", "https://www.osym.gov.tr/2026-yks-sonuclari-aciklandi", "ÖSYM"),
  osymYksPlacement: src("2026 YKS Yerleştirme Sonuçları", "https://www.osym.gov.tr/2026-yks-yerlestirme-sonuclari-aciklandi", "ÖSYM"),
  mebLgs: src("2026 LGS Başvuru ve Uygulama Kılavuzu Duyurusu", "https://odsgm.meb.gov.tr/www/sinavla-ogrenci-alacak-ortaogretim-kurumlarina-iliskin-merkezi-sinav-basvuru-ve-uygulama-kilavuzu-yayimlandi/icerik/1560", "Millî Eğitim Bakanlığı"),
  mebLgsGuide: src("2026 LGS Başvuru ve Uygulama Kılavuzu", "https://odsgm.meb.gov.tr/meb_iys_dosyalar/2026_04/69cfb9daaf8f2557696260_LGS_Basvuru_ve_Uygulama_K%C4%B1lavuzu_2026.pdf", "Millî Eğitim Bakanlığı"),
  yok: src("Yükseköğretim Kurulu e-Devlet hizmetleri", "https://www.turkiye.gov.tr/yuksekogretim-kurulu-baskanligi", "e-Devlet / YÖK"),
  yokTransfer: src("YÖK Ek Madde 1 Yatay Geçiş Uygulama İlkeleri", "https://egitim.yok.gov.tr/documentFiles/1779278338729.guz-ve-bahar-donemi-ek-madde-1-uygulama-ilkeleri.pdf", "Yükseköğretim Kurulu"),
  gsb: src("Gençlik ve Spor Bakanlığı", "https://www.gsb.gov.tr/", "Gençlik ve Spor Bakanlığı"),
  gsbEGov: src("Gençlik ve Spor Bakanlığı e-Devlet hizmetleri", "https://www.turkiye.gov.tr/genclik-ve-spor-bakanligi", "e-Devlet / Gençlik ve Spor Bakanlığı"),
  tkgm: src("Tapu İşlemlerinde Dikkat Edilecek Hususlar", "https://www.tkgm.gov.tr/tapu-islemlerinde-dikkat-edilecek-hususlar", "Tapu ve Kadastro Genel Müdürlüğü"),
  webTapu: src("Web Tapu", "https://www.tkgm.gov.tr/tapu-db/webtapu", "Tapu ve Kadastro Genel Müdürlüğü"),
  tkgmFaq: src("TKGM Sıkça Sorulan Sorular", "https://www.tkgm.gov.tr/sss", "Tapu ve Kadastro Genel Müdürlüğü"),
  plannedAreas: src("Planlı Alanlar İmar Yönetmeliği", "https://www.mevzuat.gov.tr/MevzuatMetin/yonetmelik/7.5.23722.pdf", "Mevzuat Bilgi Sistemi"),
  spatialPlans: src("Mekânsal Planlar Yapım Yönetmeliği", "https://www.mevzuat.gov.tr/MevzuatMetin/yonetmelik/7.5.19788.pdf", "Mevzuat Bilgi Sistemi"),
  risky: src("Riskli Yapılar - Sıkça Sorulan Sorular", "https://csb.gov.tr/sss-detay/3096", "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı"),
  riskyReg: src("6306 Sayılı Kanunun Uygulama Yönetmeliği", "https://www.mevzuat.gov.tr/MevzuatMetin/yonetmelik/7.5.16849.pdf", "Mevzuat Bilgi Sistemi"),
  gib: src("Gelir İdaresi Başkanlığı e-Devlet hizmetleri", "https://www.turkiye.gov.tr/gelir-idaresi-baskanligi", "e-Devlet / Gelir İdaresi Başkanlığı"),
  gibMtv: src("MTV ve Trafik İdari Para Cezaları", "https://istanbul.gib.gov.tr/vergi-konulari/1_bireysel/4_motorlu_tasitlar_vergisi_mtv_ve_trafik_idari_para_cezalari_tpc/4", "Gelir İdaresi Başkanlığı"),
  licenseReg: src("İşyeri Açma ve Çalışma Ruhsatlarına İlişkin Yönetmelik", "https://icisleri.gov.tr/kurumlar/icisleri.gov.tr/IcSite/strateji/yikob-panel/mevzuat/Atiflar/6-_-Isyeri-Acma-ve-Calisma-Ruhsatlarina-Iliskin-Yonetmelik.pdf", "İçişleri Bakanlığı"),
  eMunicipality: src("E-Belediye Bilgi Sistemi", "https://icisleri.gov.tr/e-belediye-bilgi-sistemi", "İçişleri Bakanlığı"),
  agriculture: src("Tarım Reformu Genel Müdürlüğü e-Hizmetler", "https://www.tarimorman.gov.tr/TRGM/Menu/49/E-Hizmetler", "Tarım ve Orman Bakanlığı"),
  agricultureOffices: src("İl Tarım ve Orman Müdürlükleri", "https://www.tarimorman.gov.tr/Iletisim/Il_Mudurlukleri/", "Tarım ve Orman Bakanlığı"),
  cks2026: src("2026 Üretim Yılı ÇKS Başvuru Takvimi", "https://sivas.tarimorman.gov.tr/Sayfalar/Detay.aspx?TermStoreId=368e785b-af33-487d-a98d-c11d5495130b&TermId=778cbf3b-4e47-427a-b741-eb0ab1e00d68&UrlSuffix=827/2026-Uretim-Yili-Ciftci-Kayit-Sistemi-_cks_-Basvurulari-Basliyor", "Tarım ve Orman Bakanlığı"),
  cksProductUpdate2026: src("2026 Üretim Yılı ÇKS Ürün Güncelleme Takvimi", "https://mus.tarimorman.gov.tr/Sayfalar/Detay.aspx?OgeId=357&Liste=Duyuru", "Tarım ve Orman Bakanlığı"),
  forest: src("Orman Genel Müdürlüğü Kamu Hizmet Başvurusu", "https://www.ogm.gov.tr/tr/kamu-hizmet-basvurusu", "Orman Genel Müdürlüğü"),
  municipalities: src("Yerel Yönetimlerin Sunduğu e-Hizmetler", "https://www.turkiye.gov.tr/belediyeler", "e-Devlet / Yerel Yönetimler"),
  water: src("Su ve Kanalizasyon İşletmelerinin e-Hizmetleri", "https://www.turkiye.gov.tr/su-ve-kanalizasyon-sirketleri", "e-Devlet / Yerel Hizmet Kurumları"),
  electricity: src("EPDK Elektrik Tüketici Sıkça Sorulan Sorular", "https://epdk.gov.tr/Detay/Icerik/12-3/1-elektrik-aboneligini-kendi-adima-almak-zorunda", "Enerji Piyasası Düzenleme Kurumu"),
  epdkPortal: src("EPDK Bilgi Edinme ve Tüketici Şikâyet Portalı", "https://www.epdk.gov.tr/BilgiedinmeTuketici/bilgiedinmeTuketici.html", "Enerji Piyasası Düzenleme Kurumu"),
  tedas: src("TEDAŞ e-Devlet Hizmetleri", "https://www.tedas.gov.tr/tr/1/e-devlet-hizmetlerimiz/Page/63c65ac1d27de36b22f9cf3b", "Türkiye Elektrik Dağıtım A.Ş."),
  gas: src("EPDK Doğal Gaz Piyasası Tüketici Sıkça Sorulan Sorular", "https://www.epdk.gov.tr/Detay/Icerik/12-1007/dogal-gaz-piyasasi", "Enerji Piyasası Düzenleme Kurumu"),
  btk: src("BTK Tüketici Sitesi", "https://tuketici.btk.gov.tr/", "Bilgi Teknolojileri ve İletişim Kurumu"),
  btkComplaint: src("BTK Tüketici Şikâyet Bildirim Sistemi", "https://www.turkiye.gov.tr/btk-tuketici-sikayet-bildirim-sistemi-4764", "e-Devlet / Bilgi Teknolojileri ve İletişim Kurumu"),
  cimer: src("50 Soruda CİMER", "https://www.cimer.gov.tr/50sorudacimer.pdf", "Cumhurbaşkanlığı İletişim Başkanlığı"),
  infoLaw: src("4982 Sayılı Bilgi Edinme Hakkı Kanunu", "https://www.icisleri.gov.tr/kurumlar/icisleri.gov.tr/IcSite/bilgiislem/bid_mevzuat/kanun_4982.pdf", "İçişleri Bakanlığı"),
  bedk: src("Bilgi Edinme Değerlendirme Kuruluna Başvuru Süreleri", "https://bedk.adalet.gov.tr/SayfaDetay/bilgi-edinme-degerlendirme-kuruluna-basvuru07042022011950", "Adalet Bakanlığı / BEDK"),
  uyap: src("UYAP Sunulan Hizmetler", "https://uyap.gov.tr/Hizmetler", "Adalet Bakanlığı / UYAP"),
  danistay: src("İYUK m.7 ve m.11 Hakkında Danıştay Kararı", "https://www.danistay.gov.tr/assets/pdf/KararBultenleri/vddk/yirmibes-sayili-karar-bulteni/2023-435.pdf", "Danıştay"),
  traffic: src("EGM Trafik Başkanlığı Sıkça Sorulan Sorular", "https://trafik.gov.tr/sss0", "Emniyet Genel Müdürlüğü"),
  msbAsal: src("MSB Askeralma", "https://www.msb.gov.tr/Askeralma/icerik/askeralma", "Millî Savunma Bakanlığı"),
  msbYoklama: src("MSB Yoklama İşlemleri", "https://www.msb.gov.tr/Askeralma/icerik/yoklama-islemleri", "Millî Savunma Bakanlığı"),
  msbSevk: src("MSB Sevk İşlemleri", "https://www.msb.gov.tr/Askeralma/icerik/sevk-islemleri", "Millî Savunma Bakanlığı"),
  msbBedelli: src("MSB Bedelli Askerlik", "https://www.msb.gov.tr/Askeralma/icerik/bedelli-askerlik", "Millî Savunma Bakanlığı"),
  msbDoviz: src("MSB Dövizle Askerlik İşlemleri", "https://www.msb.gov.tr/Askeralma/icerik/dovizle-askerlik-islemleri", "Millî Savunma Bakanlığı"),
  msbPersonnel: src("MSB Personel Temin Sistemi", "https://personeltemin.msb.gov.tr/", "Millî Savunma Bakanlığı"),
  msbPersonnelInfo: src("MSB Personel Temini Başvuru ve Giriş Koşulları", "https://personeltemin.msb.gov.tr/Anasayfa/Icerikweb/MDS02?menuItem=1000000", "Millî Savunma Bakanlığı"),
  osymMsu: src("2026-MSÜ Kılavuz ve Başvuru Bilgileri", "https://www.osym.gov.tr/2026msu-kilavuz-ve-basvuru-bilgileri", "ÖSYM"),
  osymMsuGuide: src("2026-MSÜ Başvuru Kılavuzu", "https://dokuman.osym.gov.tr/pdfdokuman/2026/MSU/kilavuz_msd06012026.pdf", "ÖSYM"),
  msuSelection: src("MSÜ 2026 Askerî Öğrenci Temini Seçim Aşamaları", "https://personeltemin.msb.gov.tr/AnaSayfa/DuyuruDetay/?id=2ce1749e-372e-4d51-a805-0c91f4f16952", "Millî Savunma Bakanlığı"),
  jandarmaStudent: src("2026 JSGA Güvenlik Bilimleri Fakültesi ve JAMYO Öğrenci Temini", "https://www.jandarma.gov.tr/2026-yili-guvenlik-bilimleri-fakultesi-ve-jandarma-astsubay-meslek-yuksekokuluna-ogrenci-temini", "Jandarma Genel Komutanlığı"),
  jandarmaExpert: src("2026 Jandarma Uzman Erbaş Temini", "https://jandarma.gov.tr/2026-yili-uzman-erbas-temini", "Jandarma Genel Komutanlığı"),
  jandarmaPortal: src("J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi", "https://vatandas.jandarma.gov.tr/PTM/Giris", "Jandarma Genel Komutanlığı"),
  coastGuard: src("Sahil Güvenlik Komutanlığı Personel Temini", "https://www.sg.gov.tr/personel-temini", "Sahil Güvenlik Komutanlığı")
};

const L = {
  socialAid: legislation("3294", "3294 sayılı Sosyal Yardımlaşma ve Dayanışmayı Teşvik Kanunu"),
  socialServices: legislation("2828", "2828 sayılı Sosyal Hizmetler Kanunu"),
  disability: legislation("5378", "5378 sayılı Engelliler Hakkında Kanun"),
  sgk: legislation("5510", "5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu"),
  population: legislation("5490", "5490 sayılı Nüfus Hizmetleri Kanunu"),
  education: legislation("1739", "1739 sayılı Millî Eğitim Temel Kanunu"),
  higherEducation: legislation("2547", "2547 sayılı Yükseköğretim Kanunu"),
  landRegistry: legislation("2644", "2644 sayılı Tapu Kanunu", "1.3"),
  cadastre: legislation("3402", "3402 sayılı Kadastro Kanunu"),
  zoning: legislation("3194", "3194 sayılı İmar Kanunu"),
  transformation: legislation("6306", "6306 sayılı Kanun"),
  taxProcedure: legislation("213", "213 sayılı Vergi Usul Kanunu", "1.4"),
  municipality: legislation("5393", "5393 sayılı Belediye Kanunu"),
  agriculture: legislation("5488", "5488 sayılı Tarım Kanunu"),
  pasture: legislation("4342", "4342 sayılı Mera Kanunu"),
  forest: legislation("6831", "6831 sayılı Orman Kanunu", "1.3"),
  information: legislation("4982", "4982 sayılı Bilgi Edinme Hakkı Kanunu"),
  petition: legislation("3071", "3071 sayılı Dilekçe Hakkının Kullanılmasına Dair Kanun"),
  administrativeProcedure: legislation("2577", "2577 sayılı İdari Yargılama Usulü Kanunu"),
  misdemeanors: legislation("5326", "5326 sayılı Kabahatler Kanunu"),
  militaryService: legislation("7179", "7179 sayılı Askeralma Kanunu")
};

function slugify(value: string): string {
  const table: Record<string, string> = { "ı": "i", "İ": "i", "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u", "ş": "s", "Ş": "s", "ö": "o", "Ö": "o", "ç": "c", "Ç": "c" };
  return value.split("").map(char => table[char] || char).join("")
    .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function titleFor(label: string): string {
  return `${label} için nereye başvurulur?`;
}

function genericSteps(draft: RouteDraft): string[] {
  const firstChannel = draft.applicationChannels[0]?.label || "yetkili kurumun güncel resmî başvuru kanalı";
  return [
    `İşlemin kapsamını ve yerel yetkiyi kontrol edin. İlk yetkili merci: ${draft.competentAuthorities.join("; ")}.`,
    `Başvuru öncesi şu bilgi ve belgeleri hazırlayın: ${draft.requiredDocuments.join("; ")}.`,
    `${firstChannel} üzerinden başvurun; tarih, evrak veya başvuru numarasını saklayın.`,
    `Cevap verilmez veya başvuru reddedilirse süreyi kaçırmadan şu yolu inceleyin: ${draft.escalation.join("; ")}.`
  ];
}

function reviewDraft(ctx: LeafContext): RouteDraft {
  const blockerByLabel: Record<string, string> = {
    "Çocuk destekleri": "Aranan desteğin adı (nakdî yardım, SED, eğitim, koruma veya başka program), çocuğun yaşı, hane durumu ve il belirtilmelidir.",
    "Yaşlı sosyal destekleri": "Evde destek, bakım, 65 yaş aylığı, ulaşım veya başka hizmetten hangisinin arandığı; yaş, gelir/hane ve il bilgisi belirtilmelidir.",
    "Vergi indirimi / muafiyet süreçleri": "Verginin ve avantajın tam adı, engellilik raporu/ÇÖZGER türü, çalışma statüsü ve işlemi yapan kurum belirtilmelidir.",
    "Ulaşım hakları": "Şehir içi toplu taşıma, TCDD, havayolu veya başka ulaşım türü; kart/indirim türü ve il belirtilmelidir.",
    "Faaliyet izni": "Faaliyetin sektör/NACE türü, işyeri adresi, özel alan statüsü ve istenen izin adı belirtilmelidir.",
    "Genel kamu izni": "İzin konusu, başvuracak kişi/kuruluş, faaliyet yeri ve özel mevzuat belirtilmelidir.",
    "Özel amaçlı izin": "İznin amacı, faaliyet/alan, başvuracak kişi/kuruluş ve yetkili sektör kurumu belirtilmelidir.",
    "Sertifika": "Sertifikanın tam adı, meslek/sektör, başvuracak kişi/kuruluş ve düzenleyen kurum belirtilmelidir.",
    "Yetki belgesi": "Yetki belgesinin tam adı, sektör/faaliyet, şirket/kişi statüsü ve düzenleyen kurum belirtilmelidir.",
    "Resmî statü başvurusu": "İstenen statünün hukuki adı, başvuracak kişi/kuruluş, dayanak program ve yetkili kurum belirtilmelidir."
  };
  return {
    summary: `${ctx.label} başlığı tek başına görevli merci, belge ve süreyi güvenle belirlemek için yeterince özgül değildir. İşlem türü ve varsa sektör/kurum belirtilmeden kesin yönlendirme yayımlanmaz.`,
    verificationStatus: "needs-review",
    competentAuthorities: ["Özel mevzuatta belirlenen yetkili kamu kurumu (konu daraltılmadan belirlenemez)"],
    applicationChannels: [{ type: "other", label: "Kesin başvuru kanalı yayıma kapalı", note: "İşlemin adı, kurum ve yer bilgisi gereklidir." }],
    requiredDocuments: ["İşlemin tam adı", "İlgili kurum veya sektör", "Varsa karar/tebligat", "İl ve ilçe bilgisi"],
    deadlineAndAppeal: "Süre ve itiraz yolu özel mevzuata göre değişir; doğrulanmadan kesin süre gösterilmez.",
    escalation: ["Önce işlem türünü daraltın", "Yetkili kurumun güncel hizmet standardını ve özel mevzuatı kontrol edin"],
    locationLogic: "İşlemin özel mevzuatındaki görev ve yetki kuralı uygulanır.",
    legalBasis: ["İşleme özgü kanun, yönetmelik veya ilan henüz belirlenmedi"],
    sources: [S.cimer],
    freshnessRisk: "high",
    caution: "Bu kayıt veri envanterinde tamamlanmış bir doğrulama uyarısıdır; canlıda kesin yönlendirme olarak yayımlanmaz.",
    publicationBlocker: blockerByLabel[ctx.label] || "İşlemin tam adı, uygulayan kurum/sektör, işlem veya karar tarihi ve il/ilçe bilgisi olmadan görevli merci, süre, belge ve üst başvuru yolu doğrulanamaz."
  };
}

function socialDraft(ctx: LeafContext): RouteDraft {
  const localAid = ["Genel sosyal yardım", "Gıda yardımı", "Yakacak yardımı", "Barınma yardımı", "Elektrik tüketim desteği", "Eşi vefat etmiş kadınlara yardım", "Asker ailesi yardımı"].includes(ctx.label);
  if (localAid) return {
    summary: `${ctx.label} başvurusu ikamet yerindeki Sosyal Yardımlaşma ve Dayanışma Vakfınca hane ve program koşulları üzerinden değerlendirilir; e-Devlet Sosyal Yardım Başvuru Hizmeti de kullanılabilir.`,
    verificationStatus: "local-check",
    competentAuthorities: ["İkamet yerindeki il/ilçe Sosyal Yardımlaşma ve Dayanışma Vakfı (SYDV)"],
    applicationChannels: [eGov("Aile ve Sosyal Hizmetler Bakanlığı e-Devlet hizmetleri", "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi", "Programa göre Sosyal Yardım Başvuru Hizmetini seçin."), office("İkamet yerindeki SYDV")],
    requiredDocuments: ["T.C. kimlik bilgisi", "Hane ve adres bilgileri", "Talep edilen yardımın niteliğini gösteren bilgi/belgeler", "Vakıfça program özelinde istenebilecek güncel belgeler"],
    deadlineAndAppeal: "Genel başvuru için tek bir ulusal son gün yoktur; dönemsel programlarda duyurudaki süre uygulanır. Olumsuz değerlendirmede kararı veren Vakıftan gerekçe ve yeniden inceleme yolu istenmelidir.",
    escalation: ["Kararı veren SYDV Mütevelli Heyetine yazılı yeniden değerlendirme talebi", "Aile ve Sosyal Hizmetler İl Müdürlüğü veya Bakanlığın resmî başvuru kanalı", "Varsa bildirilen özel idari/yargısal başvuru yolu"],
    locationLogic: "Başvuru, MERNİS yerleşim adresinin bulunduğu il veya ilçedeki SYDV tarafından yürütülür; taşınma halinde dosyanın yetkisi değişebilir.",
    legalBasis: ["3294 sayılı Sosyal Yardımlaşma ve Dayanışmayı Teşvik Kanunu", "İlgili sosyal yardım programının güncel usul ve esasları"],
    sources: [S.socialAid, S.socialAidGuide, S.familyEGov, L.socialAid],
    freshnessRisk: "medium"
  };

  if (ctx.label === "Doğum yardımı") return {
    summary: "1 Ocak 2025 ve sonrasında canlı doğan Türk vatandaşı çocuk için yeni doğum yardımı hak sahibinin e-Devlet hesabından istenir; e-Devlet kullanamayanlara İl Müdürlüğü veya Sosyal Hizmet Merkezi başvuru desteği verir.",
    verificationStatus: "verified",
    competentAuthorities: ["Aile ve Sosyal Hizmetler Bakanlığı", "Aile ve Sosyal Hizmetler İl Müdürlüğü / Sosyal Hizmet Merkezi"],
    applicationChannels: [eGov("Doğum Yardımı Başvuru", "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi"), office("İl Müdürlüğü veya Sosyal Hizmet Merkezi", "e-Devlet kullanamayanlar için başvuru desteği")],
    requiredDocuments: ["Başvuru sahibinin kimlik doğrulaması", "Çocuğun nüfus kaydının tamamlanmış olması", "Hak sahibi ile çocuğun Türkiye'de ikamet kaydı", "Sistemde istenirse velayet/hak sahipliği bilgileri"],
    deadlineAndAppeal: "İlk çocuk için tek seferlik ödeme iade edilmişse çocuğun 12'nci ayı dolmadan yeniden başvuru yapılabilir. İkinci ve sonraki çocukların düzenli ödemesi kesilip iade edilmişse çocuk 60 aylık olmadan yeniden başlatma istenebilir; iade edilen eski aylar geriye dönük ödenmez.",
    escalation: ["İl Müdürlüğü / Sosyal Hizmet Merkezinden kayıt incelemesi", "Bakanlığın resmî başvuru kanalı"],
    locationLogic: "Hak sahibi ve çocuğun Türkiye'de ikamet koşulu güncel yardım düzeninde kontrol edilir; fizikî destek ikamet ilindeki birimden alınır.",
    legalBasis: ["633 sayılı KHK", "Doğum Yardımı Yönetmeliği ve güncel uygulama esasları"],
    sources: [S.birthAid, S.familyEGov, L.socialServices],
    freshnessRisk: "high",
    currentCycleNote: "21 Ağustos 2026 kontrolünde tutarlar: ilk çocuk için bir defalık 5.000 TL; ikinci çocuk için başvuru ayından 60'ıncı aya kadar aylık 1.500 TL; üçüncü ve sonraki çocuklar için aynı dönemde aylık 5.000 TL. Çekilmeyen ödeme altı ay sonunda iade edilir; işlem günü resmî ekrandaki tutar yeniden kontrol edilmelidir."
  };

  if (ctx.label === "Sosyal ve Ekonomik Destek (SED)") return {
    summary: "SED için e-Devlet ön başvurusu yapılabilir; sosyal inceleme ve nihai değerlendirme ikamet yerindeki Aile ve Sosyal Hizmetler İl Müdürlüğü veya Sosyal Hizmet Merkezince yürütülür.",
    verificationStatus: "local-check",
    competentAuthorities: ["Aile ve Sosyal Hizmetler İl Müdürlüğü", "Sosyal Hizmet Merkezi"],
    applicationChannels: [eGov("Sosyal ve Ekonomik Destek Hizmeti Ön Başvurusu", "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi"), office("İkamet yerindeki Sosyal Hizmet Merkezi")],
    requiredDocuments: ["Kimlik ve adres bilgileri", "Hane gelir ve gider bilgileri", "Çocuğun eğitim/sağlık durumuna ilişkin belgeler", "Sosyal inceleme sırasında istenen destekleyici belgeler"],
    deadlineAndAppeal: "Genel başvuruda ulusal tek son gün yoktur. Karar veya kesinti bildiriminin üzerindeki yeniden değerlendirme ve dava yolu/süresi ayrıca kontrol edilmelidir.",
    escalation: ["Kararı veren İl Müdürlüğüne gerekçeli yeniden değerlendirme talebi", "Bakanlığın resmî başvuru kanalı"],
    locationLogic: "Dosya fiilî ikamet ve hane incelemesi esas alınarak yerel birimce yürütülür.",
    legalBasis: ["2828 sayılı Sosyal Hizmetler Kanunu", "Sosyal ve Ekonomik Destek Hizmetleri Hakkında Yönetmelik"],
    sources: [S.childGuide, S.familyEGov, L.socialServices],
    freshnessRisk: "medium"
  };

  if (["Koruyucu aile", "Evlat edinme", "Çocuk koruma hizmetleri"].includes(ctx.label)) return {
    summary: `${ctx.label} işlemi Aile ve Sosyal Hizmetler Bakanlığının çocuk hizmetleri birimlerince, sosyal inceleme ve çocuğun üstün yararı esas alınarak yürütülür.`,
    verificationStatus: "local-check",
    competentAuthorities: ["Aile ve Sosyal Hizmetler İl Müdürlüğü Çocuk Hizmetleri Birimi", "Gerekli hâllerde aile mahkemesi / yetkili mahkeme"],
    applicationChannels: [eGov(`${ctx.label} ön başvuru/hizmet ekranları`, "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi"), office("Aile ve Sosyal Hizmetler İl Müdürlüğü")],
    requiredDocuments: ["Kimlik ve medeni durum bilgileri", "Yerleşim yeri", "Gelir, sağlık ve adli sicil yönünden istenen belgeler", "Sosyal inceleme için kurumun bildirdiği ek belgeler"],
    deadlineAndAppeal: "Başvuru süreklidir; uygunluk, eşleştirme ve mahkeme aşamaları dosyaya göre değişir. Olumsuz kararın tebliğinde gösterilen idari/yargısal yol esas alınır.",
    escalation: ["İl Müdürlüğünden yazılı gerekçe ve dosya durumu talebi", "Bakanlık Çocuk Hizmetleri Genel Müdürlüğü", "Mahkeme kararı gereken işlemlerde kanun yolu"],
    locationLogic: "Başvuru ikamet ilindeki İl Müdürlüğüne yapılır; çocuğun bulunduğu yer ve mahkeme yetkisi ayrıca belirleyici olabilir.",
    legalBasis: ["2828 sayılı Sosyal Hizmetler Kanunu", "5395 sayılı Çocuk Koruma Kanunu", "4721 sayılı Türk Medenî Kanunu", "İlgili hizmet yönetmeliği"],
    sources: [S.childGuide, S.familyEGov, L.socialServices],
    freshnessRisk: "medium"
  };

  if (["Huzurevi", "Yaşlı bakım hizmetleri"].includes(ctx.label)) return {
    summary: `${ctx.label} için kamu bakım kuruluşu başvurusu ikamet yerindeki Aile ve Sosyal Hizmetler İl Müdürlüğü veya Sosyal Hizmet Merkezine yapılır; sağlık, gelir ve bakım ihtiyacı değerlendirilir.`,
    verificationStatus: "local-check",
    competentAuthorities: ["Aile ve Sosyal Hizmetler İl Müdürlüğü", "Sosyal Hizmet Merkezi / ilgili resmî yaşlı bakım kuruluşu"],
    applicationChannels: [office("İkamet yerindeki İl Müdürlüğü veya Sosyal Hizmet Merkezi"), eGov("Aile ve Sosyal Hizmetler Bakanlığı hizmetleri", "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi")],
    requiredDocuments: ["Kimlik ve adres", "Sağlık raporu", "Gelir/mal varlığına ilişkin istenen belgeler", "Bakım ihtiyacını gösteren sosyal inceleme bilgileri"],
    deadlineAndAppeal: "Genel başvuru için tek son gün yoktur; kontenjan ve kabul koşulları kuruluş türüne göre değişir. Ret kararında bildirilen yeniden değerlendirme yolu izlenir.",
    escalation: ["Aile ve Sosyal Hizmetler İl Müdürlüğü", "Engelli ve Yaşlı Hizmetleri Genel Müdürlüğü"],
    locationLogic: "İlk inceleme ikamet ilinde yapılır; yerleştirme uygun kuruluş ve kontenjana göre başka ilde olabilir.",
    legalBasis: ["2828 sayılı Sosyal Hizmetler Kanunu", "Huzurevleri ile Huzurevi Yaşlı Bakım ve Rehabilitasyon Merkezleri Yönetmeliği"],
    sources: [S.familyEGov, S.socialAid, L.socialServices],
    freshnessRisk: "medium"
  };

  return reviewDraft(ctx);
}

function disabilityDraft(ctx: LeafContext): RouteDraft {
  if (["Engelli raporu", "Rapor yenileme", "Rapor itirazı"].includes(ctx.label)) return {
    summary: `${ctx.label} işlemi yetkili sağlık kuruluşu ve İl Sağlık Müdürlüğü zincirinde yürütülür; itirazda raporun teslim alındığı veya e-Devlet'te göründüğü tarihten itibaren resmî 30 günlük süre önemlidir.`,
    verificationStatus: "local-check",
    competentAuthorities: ["Yetkili sağlık kurulu raporu düzenleyen sağlık kuruluşu", "İkamet edilen veya raporun alındığı İl Sağlık Müdürlüğü"],
    applicationChannels: [office("Yetkili sağlık kuruluşu"), office("İl Sağlık Müdürlüğü", "Rapor itirazı için")],
    requiredDocuments: ["Kimlik", "Mevcut rapor ve rapor tarihi/numarası", "Tıbbi belgeler ve tetkikler", "İtirazda imzalı dilekçe"],
    deadlineAndAppeal: "Engelli sağlık kurulu raporu ve ÇÖZGER itirazı, raporun teslim alındığı ve/veya e-Devlet'te göründüğü tarihten itibaren 30 gün içinde İl Sağlık Müdürlüğüne yapılır. Yenilemede raporun süreli/süresiz niteliği ve kullanım amacı kontrol edilir.",
    escalation: ["İl Sağlık Müdürlüğünün sevk ettiği ikinci yetkili hastane", "Raporlar farklıysa hakem hastane süreci", "Nihai idari işleme karşı tebliğde gösterilen yargı yolu"],
    locationLogic: "İtiraz ikamet edilen il veya raporun alındığı ilin İl Sağlık Müdürlüğüne yapılabilir; sevk edilecek hastaneyi Müdürlük belirler.",
    legalBasis: ["Erişkinler İçin Engellilik Değerlendirmesi Hakkında Yönetmelik", "Çocuklar İçin Özel Gereksinim Değerlendirmesi Hakkında Yönetmelik"],
    sources: [S.disabilityReports, L.disability],
    freshnessRisk: "high",
    currentCycleNote: "30 günlük itiraz, hastaneye değil ikamet edilen veya raporun alındığı İl Sağlık Müdürlüğüne yapılır. Müdürlük farklı yetkili hastaneye sevk eder; raporlar farklı kalırsa hakem hastane süreci işler. ÇÖZGER için çocuk adına bakım veren kişi de itiraz edebilir."
  };

  if (ctx.label === "Engelli kimlik kartı") return {
    summary: "Engelli kimlik kartı başvurusu e-Devlet üzerinden veya Aile ve Sosyal Hizmetler İl Müdürlüğüne yapılabilir; rapor bilgisi elektronik sistemden doğrulanır.",
    verificationStatus: "local-check",
    competentAuthorities: ["Aile ve Sosyal Hizmetler İl Müdürlüğü"],
    applicationChannels: [eGov("Engelli Kimlik Kartı Ön Başvurusu", "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi"), office("Aile ve Sosyal Hizmetler İl Müdürlüğü")],
    requiredDocuments: ["Kimlik", "Sistemde görünmeyen durumlarda engelli sağlık kurulu raporu", "Güncel fotoğraf / kurumun istediği başvuru bilgileri"],
    deadlineAndAppeal: "Genel başvuru için son gün yoktur. Ret veya kayıt uyuşmazlığında İl Müdürlüğünden yazılı gerekçe ve veri düzeltme yolu istenir.",
    escalation: ["Aile ve Sosyal Hizmetler İl Müdürlüğü", "Engelli ve Yaşlı Hizmetleri Genel Müdürlüğü"],
    locationLogic: "Fizikî başvuru ikamet ilindeki İl Müdürlüğüne yapılır.",
    legalBasis: ["5378 sayılı Engelliler Hakkında Kanun", "Engelliler Veri Tabanı Oluşturulmasına ve Engellilere Kimlik Kartı Verilmesine Dair Yönetmelik"],
    sources: [S.familyEGov, S.disabilityReports, L.disability],
    freshnessRisk: "low"
  };

  if (["Evde bakım yardımı", "Bakım merkezi", "Bakım ihtiyacı değerlendirmesi"].includes(ctx.label)) return {
    summary: `${ctx.label} başvurusu İl Müdürlüğü/Sosyal Hizmet Merkezi tarafından sağlık raporu, gelir, hane ziyareti ve bakım ihtiyacı üzerinden değerlendirilir.`,
    verificationStatus: "local-check",
    competentAuthorities: ["Aile ve Sosyal Hizmetler İl Müdürlüğü", "Sosyal Hizmet Merkezi"],
    applicationChannels: [office("İkamet yerindeki İl Müdürlüğü veya Sosyal Hizmet Merkezi"), eGov("Aile ve Sosyal Hizmetler Bakanlığı hizmetleri", "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-bakanligi")],
    requiredDocuments: ["Kimlik ve ikamet bilgileri", "Güncel uygun engelli sağlık kurulu raporu/ÇÖZGER", "Hane gelir ve mal varlığı bilgileri", "Vasilik kararı gerekiyorsa karar", "IBAN ve kurumca istenen ek belgeler"],
    deadlineAndAppeal: "İlk başvuruda bildirilen belgeler 30 gün içinde tamamlanmalıdır. Ret veya kontrol sonucu sonlandırma kararına karşı tebliğden itibaren 30 gün içinde değerlendirmeyi yapan İl Müdürlüğü/Sosyal Hizmet Merkezine itiraz edilir; dosya ikinci heyetçe incelenir ve bu karar Yönetmelik uyarınca kesindir.",
    escalation: ["İkinci heyet incelemesi için süresinde itiraz", "Nihai karara karşı tebliğde gösterilen idari yargı yolu"],
    locationLogic: "Fiilî ikamet ve hanenin bulunduğu yerde sosyal inceleme yapılır. İl dışı adres değişikliğinde yardım durdurulur; nakil/yeni il işlemi 90 gün içinde tamamlanmazsa yardım sonlandırılır. Bildirim yükümlülüğü doğuran diğer değişiklikler bir ay içinde bildirilmelidir.",
    legalBasis: ["2828 sayılı Sosyal Hizmetler Kanunu", "Evde Bakım Yardımı Yönetmeliği"],
    sources: [S.homeCare, S.homeCare2026, S.disabilityReports, L.socialServices],
    freshnessRisk: "high",
    currentCycleNote: "16 Ocak 2026 değişikliğiyle hanedeki ikinci ve sonraki bakıma ihtiyacı olan her engelli kişi gelir hesabında iki kişi sayılır; öğrenim kredisi, doğum yardımı ve 3308 sayılı Kanun kapsamındaki stajyer ücretleri gelir hesabı dışında bırakılmıştır. Gelir sınırı kişi başına net asgari ücretin üçte ikisidir; tutar başvuru gününde yeniden hesaplanmalıdır.",
    caution: "Yedek bakıcıyla bakım yılda en fazla 30 gün, kurumda geçici bakım yılda en fazla 30 gün; gündüz hizmet merkezi ayda en fazla 72 saat olabilir. Hak doğuran/sona erdiren koşul ve güncel gelir tutarı yerel heyetçe dosya üzerinde doğrulanır."
  };

  if (["RAM başvurusu", "Özel eğitim değerlendirmesi", "Eğitim destekleri"].includes(ctx.label)) return {
    summary: `${ctx.label} süreci öğrencinin bağlı olduğu Rehberlik ve Araştırma Merkezi (RAM) ile il/ilçe millî eğitim birimlerince yürütülür; eğitsel değerlendirme için sağlık ve eğitim kayıtları birlikte incelenebilir.`,
    verificationStatus: ctx.label === "Eğitim destekleri" ? "needs-review" : "local-check",
    competentAuthorities: ["İkamet/okul bölgesindeki Rehberlik ve Araştırma Merkezi", "İl/İlçe Millî Eğitim Müdürlüğü"],
    applicationChannels: [office("İlgili RAM"), office("Öğrencinin okulu veya İl/İlçe Millî Eğitim Müdürlüğü")],
    requiredDocuments: ["Öğrenci ve veli kimlik bilgileri", "Varsa sağlık kurulu raporu/ÇÖZGER", "Okul gelişim ve eğitim belgeleri", "RAM'ın istediği başvuru formu ve destekleyici kayıtlar"],
    deadlineAndAppeal: "Değerlendirme takvimi yerel RAM tarafından bildirilir. Eğitsel değerlendirme/yerleştirme kararına itiraz süresi ve merci karar belgesindeki güncel mevzuata göre kontrol edilmelidir.",
    escalation: ["İl/İlçe Özel Eğitim Hizmetleri Kurulu", "İl Millî Eğitim Müdürlüğü", "Tebliğde gösterilen idari/yargısal yol"],
    locationLogic: "Öğrencinin ikamet veya devam ettiği okulun hizmet bölgesindeki RAM esas alınır.",
    legalBasis: ["5378 sayılı Engelliler Hakkında Kanun", "Özel Eğitim Hizmetleri Yönetmeliği"],
    sources: [S.meb, S.disabilityReports, L.disability, L.education],
    freshnessRisk: "medium",
    caution: ctx.label === "Eğitim destekleri" ? "Destek türü belirtilmediği için bu yaprak kesin yardım yönlendirmesi olarak yayımlanmaz." : undefined,
    publicationBlocker: ctx.label === "Eğitim destekleri" ? "Özel eğitim okul/kurum desteği, rehabilitasyon desteği, taşıma, burs veya başka bir programdan hangisinin arandığı; öğrencinin yaşı, eğitim kademesi ve ili belirtilmelidir." : undefined
  };

  return reviewDraft(ctx);
}

function sgkDraft(ctx: LeafContext): RouteDraft {
  if (ctx.label === "Engelli emekliliği") return {
    summary: "Engellilik nedeniyle yaşlılık aylığı SGK tarafından ilk sigortalılık tarihi, 4/a-4/b-4/c statüsü, prim günleri ve SGK Sağlık Kurulunun çalışma gücü kaybı tespiti birlikte değerlendirilerek bağlanır; vergi indirimi belgesi tek başına yeni aylık hakkı kurmaz.",
    verificationStatus: "verified",
    competentAuthorities: ["Sosyal Güvenlik İl Müdürlüğü / Sosyal Güvenlik Merkezi", "Sağlık değerlendirmesinde SGK Sağlık Kurulu"],
    applicationChannels: [eGov("SGK hizmet dökümü ve aylık başvuru hizmetleri", "https://www.turkiye.gov.tr/sosyal-guvenlik-kurumu"), office("Sigortalı dosyasının bulunduğu veya yetkili SGK ünitesi")],
    requiredDocuments: ["Kimlik ve tahsis talebi", "İlk sigortalılık tarihi ile 4/a-4/b-4/c hizmet dökümü", "Birden fazla statü varsa hizmet birleştirme kayıtları", "SGK sevki üzerine istenen sağlık kurulu raporu, epikriz ve tetkikler", "Geçiş hükmü ileri sürülüyorsa eski vergi indirimi/engellilik ve tahsis kayıtları"],
    deadlineAndAppeal: "Sürekli açık yıllık bir başvuru takvimi yoktur; koşullar tamamlandığında SGK'ya tahsis talebi verilir. Ret veya sağlık kurulu kararı için yazıdaki kurum içi itiraz/yeniden inceleme süresi ve görevli iş mahkemesi yolu karar türüne göre ayrıca uygulanır.",
    escalation: ["SGK ünitesinden sigortalılık statüsü ve hesap cetvelinin yazılı açıklaması", "SGK sağlık kurulu/itiraz sağlık kurulu yolu uygulanıyorsa süresinde itiraz", "Görevli iş mahkemesi"],
    locationLogic: "e-Devlet kayıt kontrolü ulusaldır; tahsis ve sağlık sevki sigortalı dosyasının bulunduğu/yetkili SGK ünitesince yürütülür.",
    legalBasis: ["5510 sayılı Kanun m.28 ve Geçici m.10", "7538 sayılı Kanun m.15"],
    sources: [S.sgk, L.sgk, S.disabledRetirement2025],
    freshnessRisk: "high",
    currentCycleNote: "15 Ocak 2025'te yayımlanan 7538 sayılı Kanun, 5510 Geçici m.10'daki yeni vergi-indirimi temelli 4/a başvuru geçişini kaldırdı; daha önce bu yolla bağlanmış aylıklar devam eder. Güncel m.28'de SGK çalışma gücü kaybı %50-59 için 16 yıl/4.320 gün, %40-49 için 18 yıl/4.680 gün; sigortalılıktan önceki ağır hastalık/engellilik nedeniyle malullük aylığı alamayan belirli kişiler için 15 yıl/3.960 gün öngörülür. Geçici m.10 kapsamındaki 4/a geçişinde 15 yıl/3.600 gün kuralı ayrıca dosya tarihine göre incelenir.",
    caution: "Bu eşikler bütün kişiler için tek formül değildir. İlk sigorta tarihi, son sigortalılık statüsü, hizmet birleştirmesi ve kaybın başlangıç tarihi görülmeden kişiye kesin hak tarihi veya aylık tutarı söylenemez."
  };

  const isMalul = ctx.label === "Malulen emeklilik";
  const isDeath = ["Dul aylığı", "Yetim aylığı", "Ölüm aylığı"].includes(ctx.label);
  const isBorrow = ["Askerlik borçlanması", "Doğum borçlanması"].includes(ctx.label);
  const isRecord = ["Eksik prim", "Hizmet dökümü", "Hizmet birleştirme"].includes(ctx.label);
  const isHealth = ["GSS", "Gelir testi", "Sağlık aktivasyonu"].includes(ctx.label);
  const authority = isHealth && ctx.label === "Gelir testi"
    ? "İkamet yerindeki Sosyal Yardımlaşma ve Dayanışma Vakfı"
    : "Sosyal Güvenlik İl Müdürlüğü / Sosyal Güvenlik Merkezi";
  return {
    summary: ctx.label + " işlemi sigortalılık statüsü ve kişisel hizmet kaydına göre SGK tarafından değerlendirilir" + (ctx.label === "Gelir testi" ? "; gelir testi başvurusu ise ikamet yerindeki SYDV'ye yapılır." : "."),
    verificationStatus: "verified",
    competentAuthorities: [authority],
    applicationChannels: [eGov("SGK " + ctx.label + " hizmetleri", "https://www.turkiye.gov.tr/sosyal-guvenlik-kurumu"), office(authority)],
    requiredDocuments: isMalul
      ? ["Kimlik", "Tahsis talep/dilekçe", "Mevcut sağlık raporu ve tıbbi belgeler", "SGK sevki sonrasında istenen hastane kayıtları"]
      : isDeath
        ? ["Hak sahibinin kimliği", "Tahsis talep bilgileri", "Ölüm kaydı", "Sistemde bulunmayan öğrenim/vesayet/medeni durum belgeleri"]
        : isBorrow
          ? ["Kimlik doğrulaması", "Borçlanılacak dönemi gösteren belge/kayıt", "SGK'nın oluşturduğu borçlanma tahakkuku"]
          : isRecord
            ? ["Kimlik", "Hizmet dökümü", "Eksik/çakışan dönemi kanıtlayan bordro, işe giriş, çalışma veya kurum hizmet belgesi"]
            : isHealth
              ? ["Kimlik", "İkamet ve hane bilgileri", "Varsa gelir/öğrencilik/çalışma durumu belgeleri"]
              : ["Kimlik", "Tahsis talep bilgileri", "Sigortalılık ve hizmet kayıtları", "Statüye göre SGK'nın istediği belgeler"],
    deadlineAndAppeal: isBorrow
      ? "Borç tebliğinden sonra ödeme süresi ve tutarı SGK tahakkuk belgesinden kontrol edilmelidir; süresinde ödenmeyen başvuru geçersiz olabilir."
      : "Başvuru ve itiraz süreleri sigortalılık statüsü ile karar türüne göre değişir. SGK karar yazısındaki itiraz/yeniden inceleme ve yargı yolunu esas alın; sağlık kurulu kararlarında özel itiraz usulü bulunabilir.",
    escalation: ["SGK ünitesine gerekçeli düzeltme/yeniden inceleme talebi", "Kurum içi sağlık kurulu veya itiraz süreci gerekiyorsa o özel yol", "Görevli iş mahkemesi veya bildirilen yargı yolu"],
    locationLogic: ctx.label === "Gelir testi"
      ? "MERNİS ikamet adresinin bağlı olduğu SYDV yetkilidir."
      : "e-Devlet ulusal kanaldır; fizikî işlem sigortalının dosyasının bulunduğu veya en yakın yetkili SGK ünitesinde yürütülür.",
    legalBasis: ["5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu", ...(isBorrow ? ["Sosyal Sigorta İşlemleri Yönetmeliği"] : [])],
    sources: [S.sgk, L.sgk, ...(isMalul ? [S.sgkMalulluk] : []), ...(isDeath ? [S.sgkOlum] : [])],
    freshnessRisk: ["Yaşlılık emekliliği", "Emekli aylığı", "GSS"].includes(ctx.label) ? "high" : "medium"
  };
}

function nviDraft(ctx: LeafContext): RouteDraft {
  const id = ["Yeni kimlik kartı", "Kayıp kimlik"].includes(ctx.label);
  const address = ["Adres değişikliği", "Adres kaydı", "Adres hatası", "Yerleşim yeri belgesi"].includes(ctx.label);
  const passport = ["Pasaport başvurusu", "Hususi pasaport", "Hizmet pasaportu"].includes(ctx.label);
  const licence = ["Yeni ehliyet", "Yenileme", "Kayıp ehliyet"].includes(ctx.label);
  const citizenship = ["Türk vatandaşlığı kazanma", "İstisnai vatandaşlık", "Vatandaşlığın yeniden kazanılması", "Vatandaşlıktan çıkma"].includes(ctx.label);
  const authority = citizenship ? "İl Nüfus ve Vatandaşlık Müdürlüğü / NVİ Genel Müdürlüğü" : "İlçe Nüfus Müdürlüğü";
  const channel = address && ctx.label !== "Adres hatası"
    ? eGov(ctx.label, "https://www.turkiye.gov.tr/nufus-ve-vatandaslik-isleri-genel-mudurlugu")
    : portal("NVİ Randevu / e-Başvuru", "https://randevu.nvi.gov.tr/");
  return {
    summary: ctx.label + " işlemi NVİ'nin resmî kanalları ve yetkili nüfus müdürlüğü üzerinden yürütülür; başvuru türüne göre randevu, şahsen başvuru ve ek uygunluk belgesi gerekir.",
    verificationStatus: citizenship ? "local-check" : "verified",
    competentAuthorities: [authority],
    applicationChannels: [channel, office(authority), portal("NVİ e-Başvurular", "https://nvi.gov.tr/e-basvurular")],
    requiredDocuments: id
      ? ["Fotoğraflı geçerli kimlik belgesi", "Bir adet biyometrik fotoğraf (yaşa ve işleme göre)", "Değerli kâğıt bedeli/ödeme bilgisi", "Kayıpta kimliğin tespiti için istenebilecek ek belge veya doğrulama"]
      : address
        ? ["Kimlik doğrulaması", "Yeni adres bilgisi", "Sistem adresi doğrulayamıyorsa abonelik/fatura, kira sözleşmesi veya muvafakat gibi adresi destekleyen belge"]
        : passport
          ? ["Kimlik", "Biyometrik fotoğraf", "Harç ve defter bedeli bilgisi", "Hususi/hizmet pasaportunda yetkili kurum talep formu ve statü belgesi"]
          : licence
            ? ["Kimlik", "Sürücü sağlık raporu", "Biyometrik fotoğraf", "Kan grubu beyanı/belgesi", "Ücret ödeme bilgisi", "Varsa mevcut sürücü belgesi"]
            : citizenship
              ? ["Kimlik/pasaport ve medeni hâl belgeleri", "Doğum belgesi", "İkamet ve başvuru türüne özgü belgeler", "Yabancı belgeler için usulüne uygun tasdik ve Türkçe tercüme"]
              : ["Kimlik", "Talebi destekleyen kesinleşmiş mahkeme veya resmî belge", "Nüfus kaydı örneği"],
    deadlineAndAppeal: address
      ? "Adres değişikliği bildirimi için 5490 sayılı Kanundaki güncel bildirim süresi uygulanır; gecikme yaptırım doğurabilir. Ret veya uyuşmazlıkta yazılı işlem ve başvuru yolu istenmelidir."
      : "Genel randevu işlemlerinde tek son gün yoktur; pasaport/ehliyet geçerlilik ve yenileme süreleri ile vatandaşlık kararına karşı yol işlem türüne göre değişir.",
    escalation: ["İlçe/İl Nüfus Müdürlüğünden kayıt düzeltme veya yazılı gerekçe", "NVİ Genel Müdürlüğü", "Nüfus kaydının mahkeme kararı gerektirdiği hâllerde görevli mahkeme / kararda bildirilen yargı yolu"],
    locationLogic: citizenship
      ? "Başvuru yerleşim yerindeki İl Nüfus ve Vatandaşlık Müdürlüğüne; yurt dışında dış temsilciliğe yapılır."
      : "NVİ randevu sistemi uygun müdürlüğü gösterir; bazı adres ve kayıt işlemleri yerleşim yeri müdürlüğüne bağlıdır.",
    legalBasis: ["5490 sayılı Nüfus Hizmetleri Kanunu", ...(passport ? ["5682 sayılı Pasaport Kanunu"] : []), ...(licence ? ["2918 sayılı Karayolları Trafik Kanunu", "Karayolları Trafik Yönetmeliği"] : []), ...(citizenship ? ["5901 sayılı Türk Vatandaşlığı Kanunu", "Türk Vatandaşlığı Kanununun Uygulanmasına İlişkin Yönetmelik"] : [])],
    sources: [S.nvi, S.nviEGov, L.population, ...(id ? [S.nviId] : [])],
    freshnessRisk: citizenship || passport || licence ? "medium" : "low"
  };
}

function educationDraft(ctx: LeafContext): RouteDraft {
  const school = ["İlk kayıt", "Nakil", "Adrese bağlı okul", "e-Okul kayıt sorunları"].includes(ctx.label);
  const exam = ["LGS", "YKS", "Sınav sonucu itirazı", "Yerleştirme işlemleri"].includes(ctx.label);
  const equivalency = ["Yurt dışı diploma denkliği", "YÖK denklik", "MEB denklik"].includes(ctx.label);
  const university = ["Kayıt", "Yatay geçiş", "Öğrenci affı", "Öğrenci belgesi"].includes(ctx.label);
  const funding = ["KYK burs", "Öğrenim kredisi", "Kamu bursları"].includes(ctx.label);

  if (ctx.label === "Diploma") return {
    summary: "Okul diploması veya kayıp diploma işlemi mezun olunan okul ve bağlı millî eğitim/üniversite birimince yürütülür; eğitim kademesi belirtilmeden tek bir belge listesi yoktur.",
    verificationStatus: "local-check",
    competentAuthorities: ["Mezun olunan okul/üniversite", "Bağlı İl/İlçe Millî Eğitim Müdürlüğü veya yükseköğretim kurumu"],
    applicationChannels: [office("Mezun olunan kurumun öğrenci işleri"), eGov("Mezun/öğrenci belgesi hizmetleri", "https://www.turkiye.gov.tr/")],
    requiredDocuments: ["Kimlik", "Mezuniyet bilgisi", "Kayıp veya düzeltme talebini açıklayan dilekçe", "Kurumun güncel hizmet standardında istenen ekler"],
    deadlineAndAppeal: "Genel talep için tek son gün yoktur. Kurum kayıt uyuşmazlığında yazılı gerekçe ve düzeltme yolu istenir.",
    escalation: ["İl/İlçe Millî Eğitim Müdürlüğü veya üniversite rektörlüğü", "MEB/YÖK resmî başvuru kanalı"],
    locationLogic: "Belgeyi düzenleyen eğitim kurumu ve arşivinin bulunduğu idare yetkilidir.",
    legalBasis: ["1739 sayılı Millî Eğitim Temel Kanunu veya 2547 sayılı Yükseköğretim Kanunu", "İlgili kurum diploma/belge mevzuatı"],
    sources: [S.meb, S.yok, L.education, L.higherEducation],
    freshnessRisk: "low"
  };

  if (school) return {
    summary: ctx.label + " işlemi öğrencinin adresi, okul türü ve kontenjanına göre e-Okul ile okul müdürlüğü/ilçe millî eğitim zincirinde yürütülür.",
    verificationStatus: "local-check",
    competentAuthorities: ["İlgili okul müdürlüğü", "İlçe Millî Eğitim Müdürlüğü"],
    applicationChannels: [portal("e-Okul", "https://e-okul.meb.gov.tr/"), office("İlgili okul müdürlüğü"), office("İlçe Millî Eğitim Müdürlüğü")],
    requiredDocuments: ["Öğrenci ve veli kimlik bilgileri", "Yerleşim yeri/adres kaydı", "Nakilde öğrenci okul ve sınıf bilgileri", "Özel durum varsa bunu gösteren resmî belge"],
    deadlineAndAppeal: "Kayıt ve nakil takvimleri okul türü ve döneme göre değişir; MEB'in güncel duyurusu/e-Okul ekranı esas alınır. Ret veya kayıt hatasında okuldan işlem gerekçesi alınmalıdır.",
    escalation: ["İlçe Millî Eğitim Müdürlüğü", "İl Millî Eğitim Müdürlüğü", "MEB resmî başvuru kanalı"],
    locationLogic: "Adrese bağlı kayıtta MERNİS yerleşim adresi ve kayıt alanı; nakilde hedef okulun kontenjanı belirleyicidir.",
    legalBasis: ["222 sayılı İlköğretim ve Eğitim Kanunu", "Millî Eğitim Bakanlığı Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği veya okul türünün özel yönetmeliği"],
    sources: [S.meb, S.eokul, L.education],
    freshnessRisk: "high"
  };

  if (exam) {
    if (["Sınav sonucu itirazı", "Yerleştirme işlemleri"].includes(ctx.label)) return {
      summary: `${ctx.label} başlığı sınavın adı ve yılı belirtilmeden yetkili kurumu, elektronik kanalı ve kısa süreyi güvenle belirlemeye yetmez; bu genel rota yayıma kapalıdır.`,
      verificationStatus: "needs-review",
      competentAuthorities: ["Sınavı yapan ve sonucu/yerleştirmeyi açıklayan kurum (sınav adı bilinmeden belirlenemez)"],
      applicationChannels: [{ type: "other", label: "Sınav ve dönem belirlenene kadar yayıma kapalı" }],
      requiredDocuments: ["Sınavın tam adı", "Sınav yılı/dönemi", "Aday ve sonuç belgesi", "Sonucun açıklandığı tarih", "İtiraz edilecek soru/puan/yerleştirme işlemi"],
      deadlineAndAppeal: "MEB, ÖSYM, üniversite ve diğer kurumların sınavlarında farklı ve çok kısa süreler vardır; sınav belirlenmeden gün sayısı yayımlanmaz.",
      escalation: ["İlgili yıl kılavuzundaki inceleme/itiraz yolu", "Merkezî MEB/ÖSYM sınavıysa İYUK m.20/B kapsamındaki 10 günlük dava süresinin ayrıca kontrolü"],
      locationLogic: "Yetki sınavı yapan kurum ve ilgili yıl kılavuzuna göre belirlenir.",
      legalBasis: ["İlgili sınavın özel mevzuatı ve yıl kılavuzu", "Merkezî MEB/ÖSYM sınavlarında 2577 sayılı İYUK m.20/B"],
      sources: [S.meb, S.osymYksGuideIndex, L.administrativeProcedure],
      freshnessRisk: "high",
      caution: "Başka bir sınavın itiraz veya yerleştirme süresi örnek alınamaz.",
      publicationBlocker: "Sınavın tam adı, yılı/dönemi, sonucu açıklayan kurum ve işlem tarihi gereklidir."
    };

    const yks = ctx.label === "YKS";
    return {
      summary: yks
        ? "2026 YKS başvuru, sınav, tercih ve sonuç işlemleri ÖSYM AİS üzerinden; kılavuz ve duyurulardaki dönemsel takvimle yürütülür."
        : "2026 LGS başvurusu e-Okul üzerinden okul müdürlüğünce onaylanır; sınav ve itiraz işlemleri MEB'in yıl kılavuzu ve e-İtiraz sistemi üzerinden yürütülür.",
      verificationStatus: "verified",
      competentAuthorities: [yks ? "Ölçme, Seçme ve Yerleştirme Merkezi Başkanlığı (ÖSYM)" : "Millî Eğitim Bakanlığı Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü"],
      applicationChannels: yks
        ? [portal("ÖSYM Aday İşlemleri Sistemi", "https://ais.osym.gov.tr/"), portal("ÖSYM duyuru ve kılavuzları", "https://www.osym.gov.tr/")]
        : [portal("e-Okul", "https://e-okul.meb.gov.tr/"), portal("MEB e-İtiraz", "https://eitiraz.meb.gov.tr/")],
      requiredDocuments: ["T.C. kimlik/aday bilgileri", "İlgili yıl kılavuzunda istenen eğitim ve fotoğraf bilgileri", "İtirazda evrak referans numarası, imzalı dilekçe ve gerekiyorsa inceleme ücreti dekontu"],
      deadlineAndAppeal: yks
        ? "2026 YKS'de başvuru 6 Şubat-2 Mart, ücret son günü 3 Mart; geç başvuru 10-12 Mart; TYT 20 Haziran, AYT/YDT 21 Hazirandır. Soru itirazı 3 iş günü, sonuç incelemesi 10 gündür. İYUK m.20/B dava süresi 10 gündür ve idari başvuru bu süreyi durdurmaz."
        : "2026 LGS başvurusu 23 Mart-10 Nisan; giriş belgesi 3 Haziran, sınav 13 Haziran, sonuç 10 Temmuzdur. Soru/cevap veya sonuca e-İtiraz üzerinden 5 takvim günü içinde, 75 TL (KDV dâhil) inceleme ücretiyle başvurulur. İYUK m.20/B dava süresi 10 gündür ve idari itiraz bu süreyi durdurmaz.",
      escalation: ["Kılavuzdaki usulle süresinde sonuç/soru inceleme talebi", "2577 sayılı Kanun m.20/B kapsamındaki özel yargı yolu"],
      locationLogic: "Elektronik başvuru ulusaldır; fizikî başvuru merkezi veya okul bilgisi kılavuzda belirlenir.",
      legalBasis: [yks ? "6114 sayılı ÖSYM Hizmetleri Hakkında Kanun" : "1739 sayılı Millî Eğitim Temel Kanunu", "2026 sınav kılavuzu", "2577 sayılı İYUK m.20/B"],
      sources: yks
        ? [S.osymYks, S.osymYksGuideIndex, S.osymGuide, S.osymYksResults, S.osymYksPlacement, L.administrativeProcedure]
        : [S.mebLgs, S.mebLgsGuide, S.eokul, L.administrativeProcedure],
      freshnessRisk: "high",
      currentCycleNote: yks
        ? "2026 YKS yerleştirme sonuçları 18 Ağustos 2026'da açıklandı. Üniversite kayıtları 24-28 Ağustos, e-Kayıt 24-26 Ağustos 2026'dır. Başvuru/sınav ücreti her oturum için 700 TL; geç başvuruda ücret %50 artırımlıdır. Yeni dönem için bu tarihler kullanılmaz."
        : "2026 LGS başvuru, sınav ve sonuç takvimi 21 Ağustos 2026 itibarıyla kapanmıştır; sonraki adaylar yeni yıl kılavuzunu beklemelidir."
    };
  }

  if (equivalency) {
    const higher = ctx.label !== "MEB denklik";
    return {
      summary: ctx.label + " başvurusu eğitim seviyesine göre YÖK'ün e-Devlet denklik ön başvuru sistemi veya İl/İlçe Millî Eğitim Müdürlüğü/yurt dışı temsilcilik üzerinden yürütülür.",
      verificationStatus: "verified",
      competentAuthorities: [higher ? "Yükseköğretim Kurulu Tanıma ve Denklik Hizmetleri Dairesi" : "İl/İlçe Millî Eğitim Müdürlüğü veya yurt dışı eğitim müşavirliği/ataşeliği"],
      applicationChannels: higher
        ? [eGov("Yurtdışı Diploma Denklik Ön Başvuru", "https://www.turkiye.gov.tr/yuksekogretim-kurulu-baskanligi"), office("YÖK Denklik Birimi", "Elektronik başvuruda bildirilen teslim usulüne göre")]
        : [office("İl/İlçe Millî Eğitim Müdürlüğü"), office("Yurt dışında eğitim müşavirliği/ataşeliği")],
      requiredDocuments: ["Kimlik/pasaport", "Diploma ve transkript", "Eğitim süresi ve ülkeye giriş-çıkış kayıtları gerektiğinde", "Yabancı belgelerin usulüne uygun tasdik ve Türkçe tercümeleri", "Sistem/kılavuzun program özelinde istediği ekler"],
      deadlineAndAppeal: "Genel denklik başvurusunda tek son gün yoktur. Eksiklik ve karar bildiriminin üzerindeki tamamlama/itiraz süresi ile idari yargı yolu esas alınır.",
      escalation: ["Kararı veren denklik birimine gerekçeli yeniden inceleme", "YÖK veya MEB'in ilgili üst birimi", "Kararda gösterilen idari yargı yolu"],
      locationLogic: higher ? "Yükseköğretim denklik işlemi YÖK tarafından ulusal yürütülür." : "Ortaöğretim denklik işlemi ikamet edilen yerdeki eğitim birimi veya yurt dışı temsilcilikçe yürütülür.",
      legalBasis: [higher ? "2547 sayılı Yükseköğretim Kanunu" : "1739 sayılı Millî Eğitim Temel Kanunu", higher ? "Yurtdışı Yükseköğretim Diplomaları Tanıma ve Denklik Yönetmeliği" : "Millî Eğitim Bakanlığı Denklik Yönetmeliği"],
      sources: higher ? [S.yok, L.higherEducation] : [S.meb, L.education],
      freshnessRisk: "medium"
    };
  }

  if (university) return {
    summary: ctx.label + " işlemi öğrencinin yükseköğretim kurumu ve YÖK/ÖSYM kayıtları üzerinden, ilgili üniversitenin ilan ve akademik takvimine göre yürütülür.",
    verificationStatus: ctx.label === "Öğrenci affı" ? "needs-review" : "verified",
    competentAuthorities: ["İlgili üniversite öğrenci işleri / rektörlük", "Yükseköğretim Kurulu"],
    applicationChannels: [office("İlgili üniversite öğrenci işleri"), eGov("Üniversite e-Kayıt / öğrenci belgesi hizmetleri", "https://www.turkiye.gov.tr/yuksekogretim-kurulu-baskanligi")],
    requiredDocuments: ["Kimlik", "Yerleştirme/öğrencilik bilgisi", "Diploma veya mezuniyet belgesi", "Yatay geçişte transkript, ders içerikleri ve puan belgeleri", "Üniversite ilanında istenen ekler"],
    deadlineAndAppeal: "Kayıt ve yatay geçiş yalnız ilan edilen akademik takvimde yapılır. Ret kararına karşı üniversiteye süresinde itiraz ve karar yazısında belirtilen idari yargı yolu kontrol edilir.",
    escalation: ["Fakülte/yüksekokul yönetimi veya üniversite rektörlüğü", "YÖK'e görev alanı içindeki başvuru", "İdari yargı"],
    locationLogic: "Yetki öğrencinin kayıtlı olduğu veya başvurduğu üniversitededir; e-Kayıt desteklenen programlarda ulusal elektronik kanaldır.",
    legalBasis: ["2547 sayılı Yükseköğretim Kanunu", "Yükseköğretim Kurumlarında Önlisans ve Lisans Düzeyindeki Programlar Arasında Geçiş Yönetmeliği", "İlgili üniversite yönetmeliği/ilanı"],
    sources: [S.yok, L.higherEducation, ...(ctx.label === "Yatay geçiş" ? [S.yokTransfer] : [])],
    freshnessRisk: "high",
    caution: ctx.label === "Öğrenci affı" ? "Öğrenci affı yalnız özel kanun ve dönemsel üniversite duyurusu varsa uygulanır; sürekli açık bir başvuru değildir." : undefined,
    publicationBlocker: ctx.label === "Öğrenci affı" ? "Yürürlükteki özel af kanunu/geçici madde, kapsadığı ayrılış tarihleri, üniversite/program ve açık başvuru takvimi bulunmadan rota yayımlanamaz." : undefined
  };

  if (funding) return {
    summary: ctx.label + " başvurusu ilgili kamu burs/kredi programının dönemsel e-Devlet ilanı üzerinden yapılır; koşullar ve takvim her yıl değişir.",
    verificationStatus: ctx.label === "Kamu bursları" ? "needs-review" : "verified",
    competentAuthorities: [ctx.label === "Kamu bursları" ? "İlanı yayımlayan kamu kurumu" : "Gençlik ve Spor Bakanlığı Kredi ve Yurtlar Genel Müdürlüğü"],
    applicationChannels: [eGov(ctx.label + " başvurusu", "https://www.turkiye.gov.tr/genclik-ve-spor-bakanligi"), portal("GSB duyuruları", "https://www.gsb.gov.tr/")],
    requiredDocuments: ["Kimlik ve öğrenci bilgileri", "e-Devlet'te görünmeyen öğrenim/hane bilgileri", "İlanın istediği özel durum belgeleri"],
    deadlineAndAppeal: "Yalnız ilan edilen başvuru tarihleri arasında işlem yapılır; sonuç itirazı ve taahhüt/onay süresi ilgili yıl duyurusundan kontrol edilir.",
    escalation: ["GSB/KYGM sonuç ve iletişim kanalı", "İlanı yayımlayan kurumdan yazılı gerekçe", "Kararda belirtilen idari başvuru/yargı yolu"],
    locationLogic: "Başvuru ulusal e-Devlet kanalı üzerinden yapılır; okul/yurt dışı statüsü ilandaki kurala göre değerlendirilir.",
    legalBasis: ["351 sayılı Yüksek Öğrenim Kredi ve Yurt Hizmetleri Kanunu", "İlgili yıl burs/kredi yönetmeliği ve duyurusu"],
    sources: [S.gsb, S.gsbEGov],
    freshnessRisk: "high",
    caution: ctx.label === "Kamu bursları" ? "Kurum/program belirtilmediği için tek ve kesin burs rotası yayımlanmaz." : undefined,
    currentCycleNote: ctx.label === "Kamu bursları" ? undefined : "2026-2027 KYK burs/kredi başvurusu yalnız GSB'nin yeni dönem duyurusu yayımlanıp e-Devlet hizmeti açıldığında yapılabilir; geçmiş yıl tarihleri veya haber sitelerindeki tahminler başvuru takvimi olarak kullanılmaz.",
    publicationBlocker: ctx.label === "Kamu bursları" ? "Bursu veren kamu kurumu, program adı, eğitim düzeyi ve 2026 başvuru ilanı/takvimi belirtilmelidir." : undefined
  };

  return reviewDraft(ctx);
}

function landDraft(ctx: LeafContext): RouteDraft {
  const transaction = ["Satış", "Bağış", "İntikal", "İpotek", "Tapu kayıt düzeltme"].includes(ctx.label);
  const cadastre = ["Parsel sınırı", "Kadastro hatası", "Kadastro itirazı"].includes(ctx.label);
  const web = ["Başvuru", "Randevu", "Başvuru takibi"].includes(ctx.label);
  const numbering = ["Kapı numarası", "Yeni adres", "UAVT adres sorunu"].includes(ctx.label);
  if (numbering) return {
    summary: ctx.label + " işlemi taşınmazın bulunduğu belediyenin numarataj/adres birimi ile NVİ adres kayıt sistemi arasında yürütülür.",
    verificationStatus: "local-check",
    competentAuthorities: ["Taşınmazın bulunduğu belediyenin numarataj/adres birimi", "Gerekirse İlçe Nüfus Müdürlüğü"],
    applicationChannels: [office("Yetkili belediyenin numarataj/adres birimi"), eGov("Yerel Yönetim e-Hizmetleri", "https://www.turkiye.gov.tr/belediyeler"), office("İlçe Nüfus Müdürlüğü", "Belediye kaydı işlendiği hâlde MERNİS uyuşmazlığı varsa")],
    requiredDocuments: ["Kimlik", "Tapu veya taşınmazla ilişki belgesi", "Yapı ruhsatı/iskan veya belediyenin istediği yapı-parsel bilgileri", "Mevcut adres/numarataj kaydı"],
    deadlineAndAppeal: "Yeni yapı ve adres değişikliklerinde bildirim süreleri yerel işlem ve 5490 sayılı Kanuna göre kontrol edilir. Ret halinde belediyeden yazılı gerekçe istenir.",
    escalation: ["Belediyenin imar/numarataj üst birimi", "İlçe Nüfus Müdürlüğü", "Kararda gösterilen idari yargı yolu"],
    locationLogic: "Taşınmaz hangi belediye sınırındaysa o belediyenin numarataj birimi yetkilidir; belediye dışı alanda ilgili il özel idaresi yetkisi kontrol edilir.",
    legalBasis: ["5490 sayılı Nüfus Hizmetleri Kanunu", "5216 ve 5393 sayılı Kanunlar", "Adres ve Numaralamaya İlişkin Yönetmelik"],
    sources: [S.municipalities, S.nviEGov, L.population, L.municipality],
    freshnessRisk: "medium"
  };
  return {
    summary: ctx.label + " işlemi Web Tapu üzerinden başlatılabilir; işlem ve taşınmazın niteliğine göre yetkili tapu veya kadastro müdürlüğü belgeleri kontrol eder ve fizikî imza/inceleme isteyebilir.",
    verificationStatus: cadastre ? "local-check" : "verified",
    competentAuthorities: [cadastre ? "Taşınmazın bulunduğu Kadastro Müdürlüğü / Kadastro Mahkemesi" : "Tapu Müdürlüğü"],
    applicationChannels: [portal("Web Tapu", "https://webtapu.tkgm.gov.tr/"), phone("Alo 181 / e-Randevu"), office(cadastre ? "Yetkili Kadastro Müdürlüğü" : "Tapu Müdürlüğü")],
    requiredDocuments: transaction
      ? ["Tarafların kimlik belgeleri", "Temsil varsa vekâlet/vesayet/yetki belgesi", "Taşınmaz bilgisi", "İşleme göre DASK, veraset belgesi, banka yazısı veya değerleme raporu", "Harç ve döner sermaye ödeme bilgisi"]
      : cadastre
        ? ["Kimlik", "Tapu ve parsel bilgileri", "Askı ilanı/tutanak veya teknik hata kaydı", "İtiraz gerekçesi ve varsa harita/ölçüm/uzman belgesi"]
        : ["e-Devlet kimlik doğrulaması", "Taşınmaz ve işlem bilgisi", "Web Tapu'nun işlem özelinde istediği taranmış belgeler"],
    deadlineAndAppeal: cadastre
      ? "Kadastro askı ilanına itiraz süreleri 3402 sayılı Kanundaki aşamaya göre değişir; TKGM açıklamasında kesin askı ilanındaki bir aylık kadastro mahkemesi süresi ayrıca belirtilir. İlan tarihi ve tutanak türü görülmeden kesin süre hesabı yapılmaz."
      : "Tapu işleminde genel başvuru son günü yoktur; SMS/randevu ve ödeme süresi dosya bazında bildirilir. Ret veya tescil uyuşmazlığında yazılı işlem ve özel dava yolu kontrol edilir.",
    escalation: [cadastre ? "Kadastro Müdürlüğüne süresinde itiraz" : "Tapu Müdürlüğünden yazılı gerekçe/düzeltme", cadastre ? "Kadastro Mahkemesi veya aşamasına göre görevli hukuk mahkemesi" : "TKGM Bölge Müdürlüğü / yargı yolu"],
    locationLogic: "Taşınmazın kayıtlı olduğu yer müdürlüğü esas olmakla birlikte Web Tapu ve yetki alanı dışı işlem imkânı işlem türüne göre sistemde kontrol edilir.",
    legalBasis: [transaction || web ? "2644 sayılı Tapu Kanunu" : "3402 sayılı Kadastro Kanunu", "Tapu Sicili Yönetmeliği", "492 sayılı Harçlar Kanunu"],
    sources: [S.tkgm, S.webTapu, S.tkgmFaq, cadastre ? L.cadastre : L.landRegistry],
    freshnessRisk: cadastre || ctx.label === "Tapu kayıt düzeltme" ? "high" : "medium"
  };
}

function zoningDraft(ctx: LeafContext): RouteDraft {
  const building = ["Yapı ruhsatı", "İskân", "Ruhsatsız yapı", "Kaçak yapı ihbarı"].includes(ctx.label);
  const plan = ["İmar durumu", "Plan değişikliği", "İmar uygulaması", "İmar itirazı"].includes(ctx.label);
  const transformation = ["Riskli yapı tespiti", "Riskli yapı itirazı", "Tahliye", "Kira yardımı", "Dönüşüm desteği"].includes(ctx.label);
  if (transformation) return {
    summary: ctx.label + " işlemi 6306 sayılı Kanun zincirinde lisanslı kuruluş, taşınmazın bulunduğu Kentsel Dönüşüm/Çevre Şehircilik İl Müdürlüğü veya yetki devredilen idare tarafından yürütülür.",
    verificationStatus: "local-check",
    competentAuthorities: [ctx.label === "Riskli yapı tespiti" ? "Bakanlıkça lisanslandırılmış riskli yapı tespit kuruluşu" : "Taşınmazın bulunduğu Kentsel Dönüşüm Müdürlüğü / Çevre, Şehircilik ve İklim Değişikliği İl Müdürlüğü", "Yetki devredilmişse ilgili belediye/idare"],
    applicationChannels: [office("Taşınmazın bulunduğu ildeki yetkili Müdürlük/İdare"), portal("ÇŞİDB e-Devlet hizmetleri", "https://www.turkiye.gov.tr/cevre-ve-sehircilik-bakanligi")],
    requiredDocuments: ctx.label === "Kira yardımı"
      ? ["Başvuru dilekçesi", "Kimlik", "Riskli yapı ve hak sahipliği/kiracılık belgesi", "Tahliye veya yıkım bilgisini gösteren kayıt", "IBAN ve güncel kılavuzdaki ekler"]
      : ["Kimlik", "Tapu ve malik/temsil yetkisi", "Yapı/parsel bilgisi", "Riskli yapı raporu veya tebligat", "İtirazsa gerekçeli dilekçe ve teknik belgeler"],
    deadlineAndAppeal: ctx.label === "Riskli yapı itirazı"
      ? "Riskli yapı tespitine karşı tebligattan itibaren 15 gün içinde yapının bulunduğu yerdeki Müdürlüğe veya yetki devredilen İdareye dilekçe verilir."
      : ctx.label === "Kira yardımı"
        ? "Uygulama Yönetmeliğinde başvuru tahliyeden itibaren bir yıl veya riskli yapının yıkımından itibaren üç ay içinde öngörülür; güncel kılavuz ve hak sahipliği türü aynı gün kontrol edilmelidir."
        : "İşleme özgü tebligat, tahliye ve destek süreleri 6306 sayılı Kanun ile güncel uygulama yönetmeliğinden kontrol edilir.",
    escalation: ["Teknik heyet/kararı veren Müdürlük veya yetkili İdare", "Kentsel Dönüşüm Başkanlığı/Bakanlık", "Süresinde idari yargı"],
    locationLogic: "Yapının bulunduğu il ve Bakanlığın o yerde yetki devri yapıp yapmadığı belirleyicidir.",
    legalBasis: ["6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun", "6306 Sayılı Kanunun Uygulama Yönetmeliği"],
    sources: [S.risky, S.riskyReg, L.transformation],
    freshnessRisk: "high"
  };
  return {
    summary: ctx.label + " başvurusu taşınmazın bulunduğu yetkili belediye veya belediye dışı alanda il özel idaresinin imar birimince yürütülür; plan, parsel ve yapı türüne göre teknik proje gerekir.",
    verificationStatus: "local-check",
    competentAuthorities: ["Taşınmazın bulunduğu yetkili belediyenin imar/yapı kontrol birimi", "Belediye sınırı dışındaysa yetkili il özel idaresi"],
    applicationChannels: [office("Yetkili idarenin imar/yapı kontrol birimi"), eGov("Yerel Yönetim e-Hizmetleri", "https://www.turkiye.gov.tr/belediyeler")],
    requiredDocuments: building
      ? ["Tapu veya yetki belgesi", "İmar durumu", "Mimari/statik/mekanik/elektrik projeleri ve müellif kayıtları", "Yapı denetim ve zemin belgeleri", "İskânda yapı bitirme ve uygunluk belgeleri"]
      : ["Kimlik ve taşınmazla ilgi belgesi", "Ada/parsel bilgisi", "Askı ilanı/plan paftası", "Gerekçeli dilekçe ve varsa şehir plancısı/teknik rapor"],
    deadlineAndAppeal: plan
      ? "İmar planı itirazı bir aylık askı süresi içinde planı ilan eden idareye yapılır. Dava süresi ve İYUK m.11 etkisi ilan/ret tarihine göre ayrıca hesaplanmalıdır."
      : "Ruhsat ve iskân işlemlerinde hizmet standardındaki tamamlama süreleri uygulanır; ruhsatsız yapı ihbarında genel son gün yoktur, acil tehlike varsa 112 ve belediye bildirilir.",
    escalation: ["Belediye/il özel idaresinin yetkili üst birimi ve meclis/encümen süreci gerekiyorsa o merci", "Çevre, Şehircilik ve İklim Değişikliği İl Müdürlüğü görev alanı içindeyse", "İdari yargı"],
    locationLogic: "Yetki taşınmazın konumuna, büyükşehir/ilçe belediyesi görev paylaşımına ve özel alan statüsüne göre belirlenir.",
    legalBasis: ["3194 sayılı İmar Kanunu", building ? "Planlı Alanlar İmar Yönetmeliği" : "Mekânsal Planlar Yapım Yönetmeliği", "5216/5393 sayılı Kanunlar"],
    sources: [building ? S.plannedAreas : S.spatialPlans, S.municipalities, L.zoning, L.administrativeProcedure],
    freshnessRisk: "high"
  };
}

function taxDraft(ctx: LeafContext): RouteDraft {
  const paymentProblem = ["Ödeme yaptım görünmüyor", "Mükerrer ödeme"].includes(ctx.label);
  const publicDebt = ctx.label === "Kamu alacağı itirazı";
  return {
    summary: ctx.label + " işlemi Dijital Vergi Dairesi/e-Devlet ve bağlı vergi dairesi üzerinden yürütülür; verginin türü, dönem ve tebligat hangi özel usulün uygulanacağını belirler.",
    verificationStatus: ctx.label === "Vergi yapılandırma" || ctx.label === "Diğer kamu harçları" ? "needs-review" : "verified",
    competentAuthorities: [paymentProblem ? "Ödemenin yapıldığı/borcun bağlı olduğu vergi dairesi" : "Gelir İdaresi Başkanlığı ve bağlı vergi dairesi"],
    applicationChannels: [portal("Dijital Vergi Dairesi", "https://dijital.gib.gov.tr/"), eGov("GİB e-Devlet hizmetleri", "https://www.turkiye.gov.tr/gelir-idaresi-baskanligi"), office("Yetkili vergi dairesi")],
    requiredDocuments: paymentProblem
      ? ["Kimlik/vergi kimlik numarası", "Ödeme alındısı ve banka işlem bilgisi", "Vergi türü-dönemi ve tahakkuk bilgisi", "İade için IBAN içeren dilekçe"]
      : ["Kimlik/vergi kimlik numarası", "Vergi türü ve dönem bilgisi", "Tahakkuk/ihbarname/ödeme emri", "Düzeltme veya iade gerekçesini kanıtlayan belgeler"],
    deadlineAndAppeal: publicDebt
      ? "Ödeme emrine karşı dava/itiraz süresi 6183 sayılı Kanunun güncel 58. maddesi ve tebliğden kontrol edilmelidir; bu yüksek riskli kayıtta tebligat görülmeden kesin gün hesabı yapılmaz."
      : "Düzeltme, iade, dava ve ödeme süreleri verginin türü ile tebliğ edilen işleme göre değişir. Vergi yapılandırması yalnız özel kanun ve ilan döneminde mümkündür.",
    escalation: ["Vergi dairesine düzeltme/şikâyet veya iade talebi", "GİB'in ilgili üst birimi", "Vergi mahkemesi veya işlemde gösterilen özel yargı yolu"],
    locationLogic: "Mükellefiyetin/borcun bağlı olduğu vergi dairesi yetkilidir; Dijital Vergi Dairesi doğru birime elektronik aktarım sağlar.",
    legalBasis: ["213 sayılı Vergi Usul Kanunu", "6183 sayılı Amme Alacaklarının Tahsil Usulü Hakkında Kanun", ...(ctx.label === "MTV" || ctx.label === "Araç vergi borcu" ? ["197 sayılı Motorlu Taşıtlar Vergisi Kanunu"] : []), ...(ctx.label.includes("harcı") || ctx.label === "Diğer kamu harçları" ? ["492 sayılı Harçlar Kanunu"] : [])],
    sources: [S.gib, L.taxProcedure, ...(ctx.label === "MTV" || ctx.label === "Araç vergi borcu" || paymentProblem ? [S.gibMtv] : [])],
    freshnessRisk: "high",
    caution: ctx.label === "Vergi yapılandırma" ? "Sürekli açık bir yapılandırma yoktur; ancak yürürlükte özel kanun ve GİB duyurusu varsa başvuru yapılabilir." : ctx.label === "Diğer kamu harçları" ? "Harç türü belirtilmeden görevli kurum, 2026 tarifesi ve ödeme kanalı kesinleştirilemez." : "Parasal tutar sabit metinden değil, 2026 tarifesi ile Dijital Vergi Dairesindeki işlem günü tahakkukundan alınmalıdır.",
    publicationBlocker: ctx.label === "Vergi yapılandırma"
      ? "Yürürlükteki özel yapılandırma kanunu, kapsanan borç/dönem ve GİB'in açık 2026 başvuru takvimi gereklidir."
      : ctx.label === "Diğer kamu harçları"
        ? "Harç türü, işlemi yapan kurum, 2026 tarife kalemi ve muafiyet statüsü belirtilmelidir."
        : undefined
  };
}

function licensingDraft(ctx: LeafContext): RouteDraft {
  if (ctx.label !== "İşyeri açma ve çalışma ruhsatı") return reviewDraft(ctx);
  return {
    summary: "İşyeri açma ve çalışma ruhsatı, işyerinin adresi ve faaliyet sınıfına göre belediye, il özel idaresi veya özel kanunla yetkilendirilmiş idareden alınır.",
    verificationStatus: "local-check",
    competentAuthorities: ["İşyeri adresindeki belediye", "Belediye sınırı dışında il özel idaresi", "Özel alanda mevzuatla belirlenen yetkili idare"],
    applicationChannels: [office("Yetkili idarenin ruhsat birimi"), eGov("Belediye Ruhsat Başvurusu / Yerel Yönetim Hizmetleri", "https://www.turkiye.gov.tr/belediyeler")],
    requiredDocuments: ["Başvuru-beyan formu", "Kimlik veya tüzel kişi yetki bilgileri", "İşyeri adresi ve kullanım hakkı", "Faaliyet sınıfına göre itfaiye, çevre, sağlık, sorumlu müdür ve teknik belgeler", "İlgili idarenin güncel hizmet standardındaki ekler"],
    deadlineAndAppeal: "Ruhsat türüne göre inceleme süresi ve faaliyete başlama koşulu değişir. Ret veya faaliyetin durdurulması işleminde yazılı kararın tebliğ tarihi ve başvuru yolu esas alınır.",
    escalation: ["Yetkili idarenin ruhsat/zabıta üst birimi", "Belediye başkanlığı veya il özel idaresi", "İdari yargı"],
    locationLogic: "Yetkili idare işyerinin fizikî adresi, belediye sınırı, organize sanayi/özel alan ve faaliyetin sıhhî/gayrisıhhî sınıfına göre belirlenir.",
    legalBasis: ["3572 sayılı İşyeri Açma ve Çalışma Ruhsatlarına Dair Kanun Hükmünde Kararnamenin Değiştirilerek Kabulüne Dair Kanun", "İşyeri Açma ve Çalışma Ruhsatlarına İlişkin Yönetmelik"],
    sources: [S.licenseReg, S.eMunicipality, S.municipalities, L.municipality],
    freshnessRisk: "high"
  };
}

function agricultureDraft(ctx: LeafContext): RouteDraft {
  const cks = ["ÇKS kaydı", "ÇKS güncelleme"].includes(ctx.label);
  const support = ["Bitkisel üretim destekleri", "Kırsal kalkınma destekleri", "Hayvancılık destekleri"].includes(ctx.label);
  const animal = ctx.label === "Hayvan kayıtları";
  const meadow = ["Mera kullanım işlemleri", "Mera ihlali / başvuru"].includes(ctx.label);
  const forest = ["Orman izinleri", "Ormanla ilgili başvuru"].includes(ctx.label);
  if (forest) return {
    summary: ctx.label + " için Orman Genel Müdürlüğünün e-Devlet kamu hizmetleri kullanılır; izin türü 6831 sayılı Kanunun ilgili maddesine ve alanın bağlı olduğu orman birimine göre ayrılır.",
    verificationStatus: ctx.label === "Ormanla ilgili başvuru" ? "needs-review" : "local-check",
    competentAuthorities: ["Orman Bölge Müdürlüğü / Orman İşletme Müdürlüğü", "Orman Genel Müdürlüğü"],
    applicationChannels: [eGov("OGM Kamu Hizmet Başvuruları", "https://www.ogm.gov.tr/tr/kamu-hizmet-basvurusu"), office("Alanın bağlı olduğu Orman İşletme Müdürlüğü")],
    requiredDocuments: ["Kimlik veya tüzel kişi yetkisi", "Talep edilen izin türü", "Koordinat/harita ve alan bilgisi", "Mülkiyet/ruhsat/proje belgeleri", "İzin türünün özel mevzuatındaki teknik ve mali ekler"],
    deadlineAndAppeal: "Başvuru ve uzatma süreleri izin türüne göre değişir; ret/eksiklik yazısındaki süre esas alınır.",
    escalation: ["Orman Bölge Müdürlüğü", "Orman Genel Müdürlüğü", "Kararda gösterilen idari yargı yolu"],
    locationLogic: "Orman alanının bağlı olduğu bölge ve işletme müdürlüğü yetkilidir.",
    legalBasis: ["6831 sayılı Orman Kanunu", "Orman Kanununun 16, 17/3 veya 18 inci maddesine dayalı ilgili izin yönetmeliği"],
    sources: [S.forest, L.forest],
    freshnessRisk: "high",
    caution: ctx.label === "Ormanla ilgili başvuru" ? "Talebin kesim, kadastro, izin, tahsis veya ihbar türü belirtilmeden kesin rota yayımlanmaz." : undefined,
    publicationBlocker: ctx.label === "Ormanla ilgili başvuru" ? "Kesim, kadastro, 2/B, izin, tahsis, suç/ihbar veya başka bir işlem türü ile alanın il/ilçesi ve statüsü belirtilmelidir." : undefined
  };
  return {
    summary: ctx.label + " işlemi Tarım ve Orman Bakanlığının güncel kayıt/destek sistemi ile kayıtlı olunan İl/İlçe Tarım ve Orman Müdürlüğü üzerinden yürütülür.",
    verificationStatus: meadow ? "local-check" : support ? "needs-review" : "verified",
    competentAuthorities: [meadow ? "İl Mera Komisyonu ve İl Tarım ve Orman Müdürlüğü" : "Kayıtlı olunan İl/İlçe Tarım ve Orman Müdürlüğü"],
    applicationChannels: [eGov(ctx.label + " e-Hizmeti", "https://www.turkiye.gov.tr/tarim-ve-orman-bakanligi"), portal("Tarım Reformu e-Hizmetleri", "https://www.tarimorman.gov.tr/TRGM/Menu/49/E-Hizmetler"), office("İl/İlçe Tarım ve Orman Müdürlüğü")],
    requiredDocuments: cks
      ? ["Kimlik", "Arazi/tapu-kira-muvafakat bilgileri", "Ürün ve parsel bilgileri", "İlk kayıt veya değişiklikte duyuruda istenen ziraat odası/taahhüt belgeleri"]
      : support
        ? ["Kimlik ve çiftçi/kayıt numarası", "Güncel ÇKS/HBS veya ilgili kayıt", "Üretim/hayvan/proje belgeleri", "Programın başvuru formu ve özel ekleri"]
        : animal
          ? ["Kimlik", "İşletme ve hayvan bilgileri", "Küpe/pasaport/veteriner sağlık belgeleri", "Nakil veya kayıt değişikliğini gösteren belge"]
          : ["Kimlik", "Mera ve hayvan/işletme bilgisi", "Muhtarlık/otlatma/kiralama evrakı", "İhlal için yer, tarih ve deliller"],
    deadlineAndAppeal: cks
      ? "2026 üretim yılı ilk kayıt/güncelleme başvurusu 1 Eylül-31 Aralık 2025; ürün bilgisi güncellemesi 15 Mart-15 Nisan 2026 arasında yapılmıştır. Sonradan edinilen/kiralanan araziye ilişkin özel süre varsa yalnız güncel İl/İlçe Müdürlüğü duyurusu uygulanır."
      : support
        ? "Bitkisel, hayvancılık ve kırsal kalkınma desteklerinin her birinde ayrı karar, çağrı, kayıt koşulu ve son gün vardır; program adı olmadan tek 2026 takvimi yayımlanmaz."
      : "Hayvan ve mera bildirim süreleri işlem türüne göre özel mevzuatta düzenlenir; tutanak/karar tebliğindeki itiraz yolu esas alınır.",
    escalation: ["İl Tarım ve Orman Müdürlüğü", meadow ? "İl Mera Komisyonu/Valilik" : "Bakanlığın ilgili genel müdürlüğü", "Kararda gösterilen idari/yargısal yol"],
    locationLogic: meadow ? "Meranın bulunduğu ilin komisyonu ve yerel tahsis/kullanım kararı uygulanır." : "İşletme veya arazinin kayıtlı olduğu İl/İlçe Müdürlüğü yetkilidir; bazı e-Devlet işlemleri yalnız mevcut kaydı olanlara açıktır.",
    legalBasis: [cks || support ? "5488 sayılı Tarım Kanunu" : animal ? "5996 sayılı Veteriner Hizmetleri, Bitki Sağlığı, Gıda ve Yem Kanunu" : "4342 sayılı Mera Kanunu", ...(cks ? ["Çiftçi Kayıt Sistemi Yönetmeliği"] : [])],
    sources: [S.agriculture, S.agricultureOffices, ...(cks ? [S.cks2026, S.cksProductUpdate2026] : []), meadow ? L.pasture : L.agriculture],
    freshnessRisk: "high",
    currentCycleNote: cks ? "21 Ağustos 2026 itibarıyla 2026 ÇKS ilk kayıt/güncelleme ve ürün güncelleme dönemleri kapanmıştır. Yeni işlemde 2027 üretim yılı duyurusu beklenmeli; e-Devlet/TarımCebimde ekranındaki açık dönem ayrıca kontrol edilmelidir." : undefined,
    caution: support ? "Destek üst başlığı tek başına hak, tutar, belge ve takvim üretmez; yalnız programın yürürlükteki 2026 kararı/çağrısı kullanılabilir." : undefined,
    publicationBlocker: support ? "Destek programının tam adı, üretim/hayvan/proje türü, il, çağrı numarası ve açık 2026 başvuru takvimi belirtilmelidir." : undefined
  };
}

function municipalityDraft(ctx: LeafContext): RouteDraft {
  const animal = ["Yaralı hayvan", "Sokak hayvanı bildirimi"].includes(ctx.label);
  const transport = ["Hat / sefer sorunu", "Durak sorunu"].includes(ctx.label);
  const urgent = ctx.label === "Yaralı hayvan";
  const authority = animal
    ? "Olay yerindeki belediyenin veteriner işleri/bakımevi birimi"
    : transport
      ? "Hizmeti yürüten büyükşehir/il belediyesi veya belediye ulaşım kuruluşu"
      : "Sorunun bulunduğu yerden sorumlu belediye";
  return {
    summary: ctx.label + " başvurusu sorunun fizikî konumundan sorumlu belediyenin ilgili hizmet birimine yapılır; başvuru numarası alınarak takip edilir.",
    verificationStatus: "local-check",
    competentAuthorities: [authority],
    applicationChannels: [eGov("Yerel Yönetim e-Hizmetleri", "https://www.turkiye.gov.tr/belediyeler"), phone("Belediye çağrı merkezi / saha ihbar hattı"), office("Belediye evrak veya ilgili hizmet birimi")],
    requiredDocuments: ["Açık adres ve konum", "Tarih/saat", "Fotoğraf veya video varsa", "Başvuru sahibinin iletişim bilgisi", transport ? "Hat, durak, araç ve sefer bilgisi" : "Sorunu somutlaştıran kısa açıklama"],
    deadlineAndAppeal: urgent ? "Canlı ve yaralı hayvan için gecikmeden belediyenin acil veteriner hattına bildirim yapılmalıdır; insan hayatı açısından acil tehlike varsa 112 aranır." : "Genel talep/ihbar için tek son gün yoktur; belediyeden kayıt numarası ve hizmet standardındaki cevap süresi alınmalıdır.",
    escalation: ["Belediyenin ilgili daire başkanlığı / başkanlık başvuru birimi", "Büyükşehir-ilçe görev uyuşmazlığında diğer yetkili belediye veya valilik", "Dilekçe/CİMER ve işlem niteliğine göre idari yargı"],
    locationLogic: "Yetki sorunun bulunduğu belediye sınırı ve büyükşehir-ilçe görev paylaşımına göre belirlenir; adres/koordinat zorunlu pratik bilgidir.",
    legalBasis: ["5393 sayılı Belediye Kanunu", ...(transport ? ["5216 sayılı Büyükşehir Belediyesi Kanunu"] : []), ...(animal ? ["5199 sayılı Hayvanları Koruma Kanunu"] : [])],
    sources: [S.municipalities, S.eMunicipality, L.municipality],
    freshnessRisk: urgent ? "high" : "medium"
  };
}

function utilityDraft(ctx: LeafContext): RouteDraft {
  const electricity = ["Elektrik kesintisi", "Sokak aydınlatması", "Direk / kablo tehlikesi", "Dağıtım sorunu"].includes(ctx.label);
  const water = ["Su kesintisi", "Su arızası", "Kanalizasyon", "Su baskını / taşkın altyapısı"].includes(ctx.label);
  const gas = ["Gaz kesintisi", "Dağıtım hizmeti", "Acil gaz durumu"].includes(ctx.label);
  const telecom = ["Altyapı", "Hizmet sorunu", "Numara / hat işlemleri", "BTK'ya taşınan başvurular"].includes(ctx.label);
  const emergency = ["Direk / kablo tehlikesi", "Acil gaz durumu", "Su baskını / taşkın altyapısı"].includes(ctx.label);
  if (water) return {
    summary: ctx.label + " bildirimi adresin hizmet alanındaki belediye su ve kanalizasyon idaresi/işletmecisine yapılır; acil can güvenliği riski ayrıca 112'ye bildirilir.",
    verificationStatus: "local-check",
    competentAuthorities: ["Adresteki su ve kanalizasyon idaresi veya belediye su işletmesi"],
    applicationChannels: [eGov("Su ve Kanalizasyon İşletmeleri e-Hizmetleri", "https://www.turkiye.gov.tr/su-ve-kanalizasyon-sirketleri"), phone("Yerel su/kanalizasyon arıza hattı"), office("İlgili su ve kanalizasyon idaresi")],
    requiredDocuments: ["Abone/tesisat numarası varsa", "Açık adres ve konum", "Arızanın türü ve başlangıç zamanı", "Fotoğraf/video varsa", "Önceki başvuru numarası"],
    deadlineAndAppeal: emergency ? "Can ve mal güvenliği riski varsa derhal yerel arıza hattı ve 112 kullanılmalıdır." : "Genel arıza için son gün yoktur; kayıt numarası alınır ve yerel hizmet standardındaki süre izlenir.",
    escalation: ["Su idaresi genel müdürlüğü / belediye", "Büyükşehir veya ilçe görev paylaşımına göre yetkili diğer idare", "CİMER/dilekçe ve işlem niteliğine göre yargı yolu"],
    locationLogic: "Adres hangi su ve kanalizasyon hizmet alanındaysa o idare yetkilidir; e-Devlet haritası yerel işletmeciyi bulmak için kullanılır.",
    legalBasis: ["2560 sayılı Kanun (uygulanan büyükşehir su idarelerinde)", "5393 ve 5216 sayılı Kanunlar", "İlgili su idaresi hizmet yönetmeliği"],
    sources: [S.water, S.municipalities],
    freshnessRisk: emergency ? "high" : "medium"
  };
  if (electricity) return {
    summary: ctx.label + " için ilk başvuru adresteki lisanslı elektrik dağıtım şirketinedir; genel aydınlatma için TEDAŞ e-Devlet hizmeti, çözülemeyen mevzuat şikâyeti için EPDK kullanılır.",
    verificationStatus: "local-check",
    competentAuthorities: [ctx.label === "Sokak aydınlatması" ? "Bölgedeki elektrik dağıtım şirketi ve TEDAŞ" : "Bölgedeki elektrik dağıtım şirketi", "Enerji Piyasası Düzenleme Kurumu (üst düzenleyici başvuru)"],
    applicationChannels: [phone("Alo 186 elektrik arıza hattı"), ...(ctx.label === "Sokak aydınlatması" ? [eGov("TEDAŞ Aydınlatma Şikâyet Başvurusu ve Takibi", "https://www.turkiye.gov.tr/turkiye-elektrik-dagitim-as")] : []), portal("EPDK tüketici şikâyet portalı", "https://tuketici.epdk.gov.tr/")],
    requiredDocuments: ["Tesisat/abone numarası varsa", "Açık adres ve konum", "Arıza/tehlikenin açıklaması", "Fotoğraf/video varsa", "Dağıtım şirketi başvuru numarası ve cevabı"],
    deadlineAndAppeal: emergency ? "Can ve mal güvenliği riski varsa 186 ve gerektiğinde 112 derhal aranmalıdır." : "Dağıtım şirketi tüketici başvurusunu EPDK düzenindeki süre içinde sonuçlandırmalıdır; cevap verilmez veya mevzuata aykırı cevap verilirse kayıt ve belgelerle EPDK'ya başvurulur.",
    escalation: ["Dağıtım şirketi tüketici hizmetleri", "EPDK internet veya posta başvurusu", "Uyuşmazlığın niteliğine göre tüketici hakem heyeti/mahkemesi veya yargı yolu"],
    locationLogic: "Yetkili dağıtım şirketi adresin elektrik dağıtım bölgesine göre EPDK listesinden belirlenir.",
    legalBasis: ["6446 sayılı Elektrik Piyasası Kanunu", "Elektrik Piyasası Tüketici Hizmetleri Yönetmeliği", ...(ctx.label === "Sokak aydınlatması" ? ["Genel Aydınlatma Yönetmeliği"] : [])],
    sources: [S.electricity, S.epdkPortal, ...(ctx.label === "Sokak aydınlatması" ? [S.tedas] : [])],
    freshnessRisk: emergency ? "high" : "medium"
  };
  if (gas) return {
    summary: ctx.label + " için ilk merci bölgedeki doğal gaz dağıtım şirketidir; acil gaz ihbarı 187'ye, çözülemeyen mevzuat şikâyeti EPDK'ya yapılır.",
    verificationStatus: "local-check",
    competentAuthorities: ["Bölgedeki lisanslı doğal gaz dağıtım şirketi", "Enerji Piyasası Düzenleme Kurumu"],
    applicationChannels: [phone(ctx.label === "Acil gaz durumu" ? "187 Doğal Gaz Acil" : "Dağıtım şirketi tüketici hizmetleri"), portal("EPDK tüketici şikâyet portalı", "https://tuketici.epdk.gov.tr/")],
    requiredDocuments: ["Abone/tesisat numarası varsa", "Açık adres", "Sorunun/kaçak kokusunun açıklaması", "Dağıtım şirketi başvuru numarası ve cevabı"],
    deadlineAndAppeal: ctx.label === "Acil gaz durumu" ? "Gaz kokusu/kaçak şüphesinde kıvılcım oluşturmayın, ortamı güvenle havalandırın ve derhal 187'yi arayın; can tehlikesinde 112." : "Dağıtım şirketi şikâyeti en geç 15 gün içinde cevaplamalı/işlem yapmalıdır; cevap yoksa veya işlem mevzuata aykırıysa belgelerle EPDK'ya başvurulabilir.",
    escalation: ["Dağıtım şirketi tüketici hizmetleri", "EPDK'ya yazılı/internet başvurusu", "Uyuşmazlığın niteliğine göre tüketici/yargı yolu"],
    locationLogic: "Yetkili şirket adresin EPDK dağıtım lisans bölgesine göre belirlenir.",
    legalBasis: ["4646 sayılı Doğal Gaz Piyasası Kanunu", "Doğal Gaz Piyasası Dağıtım ve Müşteri Hizmetleri Yönetmeliği"],
    sources: [S.gas, S.epdkPortal],
    freshnessRisk: ctx.label === "Acil gaz durumu" ? "high" : "medium"
  };
  if (telecom) return {
    summary: ctx.label + " için önce abonesi olunan veya hizmet talep edilen işletmecinin şikâyet sistemi kullanılır; çözülemeyen kayıt BTK Tüketici Şikâyet Bildirim Sistemine taşınır.",
    verificationStatus: "verified",
    competentAuthorities: ["Yetkilendirilmiş elektronik haberleşme işletmecisi", "Bilgi Teknolojileri ve İletişim Kurumu"],
    applicationChannels: [portal("İşletmecinin resmî şikâyet sistemi", "https://tuketici.btk.gov.tr/"), eGov("BTK Tüketici Şikâyet Bildirim Sistemi", "https://www.turkiye.gov.tr/btk-tuketici-sikayet-bildirim-sistemi-4764")],
    requiredDocuments: ["Abone/hat numarası", "Açık adres (altyapı/kapsama için)", "Sorunun tarihleri ve teknik belirtileri", "İşletmeci başvuru numarası ve cevabı", "Fatura/sözleşme veya ekran görüntüsü gerekiyorsa"],
    deadlineAndAppeal: "İşletmecinin güncel şikâyet cevap süresi ve BTK sistemindeki yeniden değerlendirme adımı ilgili usul ve esaslardan kontrol edilir; özel tüketici/yargı süreleri ayrıca saklıdır.",
    escalation: ["İşletmecinin şikâyet/itiraz kanalı", "BTK Tüketici Şikâyet Bildirim Sistemi", "Uyuşmazlığın niteliğine göre tüketici hakem heyeti/mahkemesi veya diğer görevli merci"],
    locationLogic: "İşletmeci abonelik/hat kaydıyla; altyapı ve kapsama talebinde açık adres ve işletmeci bilgisiyle belirlenir.",
    legalBasis: ["5809 sayılı Elektronik Haberleşme Kanunu", "Elektronik Haberleşme Sektörüne İlişkin Tüketici Hakları Yönetmeliği", "Tüketici Şikâyetlerinin Çözümüne İlişkin Usul ve Esaslar"],
    sources: [S.btk, S.btkComplaint],
    freshnessRisk: "medium"
  };
  return reviewDraft(ctx);
}

function informationDraft(ctx: LeafContext): RouteDraft {
  const info = ctx.label === "Bilgi edinme başvurusu" || ctx.label === "Resmî belge talebi";
  const cimer = ctx.label === "CİMER başvurusu" || ctx.label === "CİMER başvuru takibi";
  return {
    summary: cimer
      ? ctx.label + " işlemi CİMER'in resmî web/e-Devlet kanalı üzerinden yapılır ve verilen başvuru numarasıyla takip edilir."
      : ctx.label + " doğrudan bilgi/belgenin bulunduğu veya işlem dosyasını tutan kamu kurumuna yapılır; CİMER yönlendirme kanalı olarak kullanılabilir.",
    verificationStatus: "verified",
    competentAuthorities: [cimer ? "Cumhurbaşkanlığı İletişim Merkezi ve başvurunun sevk edildiği kamu kurumu" : "Talep edilen bilgi/belge veya işlemin bulunduğu kamu kurumu"],
    applicationChannels: cimer
      ? [portal("CİMER", "https://www.cimer.gov.tr/"), eGov("CİMER Başvuru ve Takip", "https://www.turkiye.gov.tr/cumhurbaskanligi-iletisim-merkezi")]
      : [portal("Kurumun bilgi edinme/e-dilekçe kanalı", "https://www.turkiye.gov.tr/"), office("Kurum evrak/bilgi edinme birimi"), { type: "post", label: "Posta veya mevzuata uygun elektronik başvuru" }],
    requiredDocuments: cimer
      ? ["Kimlik doğrulaması veya yazılı başvuruda kimlik/iletişim bilgileri", "Açık ve somut başvuru metni", "Varsa destekleyici belgeler"]
      : ["Ad-soyad/unvan ve iletişim adresi", "İstenen bilgi, belge veya işlemin açık tarifi", "Yazılı başvuruda imza", "Tüzel kişi ise yetki ve unvan bilgileri"],
    deadlineAndAppeal: info
      ? "Bilgi edinme başvurusu kural olarak 15 iş günü içinde; Kanundaki uzatma hâllerinde 30 iş günü içinde cevaplanır. Ret kararına karşı tebliğden itibaren 15 gün içinde BEDK'ya itiraz edilebilir; BEDK itirazı idari dava süresini durdurur."
      : "3071 kapsamındaki dilekçelere başvurunun sonucu veya işlem safahatı en geç 30 gün içinde bildirilir. CİMER'de dilekçe/bilgi edinme türüne göre 30 gün veya 15 iş günü rejimi uygulanır.",
    escalation: info
      ? ["Bilgi Edinme Değerlendirme Kuruluna 15 gün içinde itiraz", "İdari yargı"]
      : ["Başvurunun gönderildiği kurumdan evrak/safahat sorgusu", "Üst makam veya CİMER takibi", "İşlem niteliğine göre idari yargı"],
    locationLogic: "Başvuru bilgi/belgeyi elinde tutan kuruma yapılır; yanlış kuruma yapılan bilgi edinme başvurusu ilgili kuruma gönderilip başvurana bildirilir.",
    legalBasis: [info ? "4982 sayılı Bilgi Edinme Hakkı Kanunu" : "3071 sayılı Dilekçe Hakkının Kullanılmasına Dair Kanun", "Türkiye Cumhuriyeti Anayasası m.74"],
    sources: [S.cimer, info ? L.information : L.petition, ...(info ? [S.infoLaw, S.bedk] : [])],
    freshnessRisk: info ? "medium" : "low"
  };
}

function appealDraft(ctx: LeafContext): RouteDraft {
  const fine = ctx.label === "İdari para cezasına itiraz" || ctx.label === "Trafik cezasına itiraz";
  const traffic = ctx.label === "Trafik cezasına itiraz";
  if (fine) return {
    summary: ctx.label + " için yaptırım kararının türü, tebliğ/tefhim tarihi ve özel kanunu kontrol edilir; aksine özel hüküm yoksa Kabahatler Kanunu m.27 yolu ve yetkili sulh ceza hâkimliği esas alınır.",
    verificationStatus: "verified",
    competentAuthorities: ["Aksine özel hüküm yoksa yetkili Sulh Ceza Hâkimliği"],
    applicationChannels: [portal("UYAP Vatandaş Portal", "https://vatandas.uyap.gov.tr/"), office("Yetkili adliye tevzi/birim"), { type: "post", label: "Usulüne uygun posta başvurusu", note: "Süre ve mahkeme yetkisi ayrıca kontrol edilmelidir." }],
    requiredDocuments: ["İdari yaptırım/ceza karar tutanağı", "Tebligat ve tebliğ tarihi", "Kimlik", "İtiraz dilekçesi", "Fotoğraf, kayıt ve diğer deliller"],
    deadlineAndAppeal: "5326 sayılı Kanun m.27'de idarî para cezası ve mülkiyetin kamuya geçirilmesi kararına karşı tebliğ veya tefhimden itibaren en geç 15 gün öngörülür. Mücbir sebeple kaçırılırsa sebebin kalkmasından itibaren 7 gün içinde başvuru imkânı vardır. Trafik dâhil özel kanunda farklı görev/süre varsa özel hüküm uygulanır.",
    escalation: ["Sulh ceza hâkimliği kararına karşı kararın bildirdiği süre ve merciye itiraz", "UYAP üzerinden dosya/karar takibi"],
    locationLogic: "Yetki, kararı veren idari birim ve fiilin işlendiği yer/özel kanun kuralına göre belirlenir; UYAP tevzi bilgisi kontrol edilmelidir.",
    legalBasis: ["5326 sayılı Kabahatler Kanunu m.27", ...(traffic ? ["2918 sayılı Karayolları Trafik Kanunu"] : [])],
    sources: [S.uyap, L.misdemeanors, ...(traffic ? [S.traffic] : [])],
    freshnessRisk: "high",
    caution: "Aynı işlemde idarî yargının görev alanına giren başka bir karar da varsa Kabahatler Kanunu m.27/8 nedeniyle uyuşmazlık idarî yargıda birlikte görülebilir. Trafikten men, ehliyet geri alma veya özel kanundaki başka yaptırımlar bu basit para cezası rotasıyla aynı olmayabilir."
  };
  return {
    summary: ctx.label + " için önce yazılı işlem/ret/tebligat ve özel kanundaki zorunlu başvuru yolu incelenir; genel üst makam başvurusu İYUK m.11 koşullarına tabidir.",
    verificationStatus: "verified",
    competentAuthorities: ["İşlemi yapan idari makamın üst makamı; üst makam yoksa işlemi yapan makam", "Uyuşmazlığın türüne göre görevli idare veya vergi mahkemesi"],
    applicationChannels: [office("Kararı veren veya üst idari makamın evrak birimi"), portal("Kurumun resmî e-başvuru/KEP kanalı", "https://www.turkiye.gov.tr/"), portal("UYAP Vatandaş Portal", "https://vatandas.uyap.gov.tr/")],
    requiredDocuments: ["İşlem/ret/tebligat", "Tebliğ tarihi", "Gerekçeli dilekçe", "Talebi destekleyen resmî belgeler", "Vekil varsa yetki belgesi"],
    deadlineAndAppeal: "Özel kanunda ayrı süre yoksa yazılı bildirimi izleyen günden itibaren Danıştay/idare mahkemesinde 60, vergi mahkemesinde 30 günlük genel süre uygulanır. İYUK m.11 başvurusu dava süresi içinde yapılır ve süreyi durdurur; 30 günde cevap verilmezse ret sayılır, kalan süre yeniden işler. İhale/ivedi yargı, merkezî sınav, vergi, imar ve başka özel alanlarda farklı kısa süre vardır; örneğin m.20/B merkezî sınav davalarında süre 10 gündür ve m.11 uygulanmaz.",
    escalation: ["Özel mevzuatta zorunlu itiraz/ön başvuru varsa önce o yol", "İYUK m.11 koşullarında üst makama başvuru", "Süresinde görevli idari yargı mercii"],
    locationLogic: "Görev ve yetki işlemi yapan kurum, işlemin konusu, özel kanun ve idari yargı çevresine göre belirlenir.",
    legalBasis: ["2577 sayılı İdari Yargılama Usulü Kanunu m.7, m.10 ve m.11", "İşlemin özel kanunu"],
    sources: [S.danistay, S.uyap, L.administrativeProcedure],
    freshnessRisk: "high",
    caution: "Bu genel rota özel kanundaki zorunlu itirazı, daha kısa süreyi veya farklı görevli mahkemeyi ortadan kaldırmaz."
  };
}

function militaryServiceDraft(ctx: LeafContext): RouteDraft {
  const health = ["Askerlik yoklaması", "Aile hekimi muayenesi", "Sağlık kurulu işlemleri", "Askerlik sağlık raporuna itiraz"].includes(ctx.label);
  const classification = ["Askerlik hizmet tercihi", "Yedek subay", "Yedek astsubay", "Celp tercihi", "Sevk belgesi", "Erken sevk talebi"].includes(ctx.label);
  const deferment = ["Öğrenci ertelemesi", "Yüksek lisans / staj / aday memur ertelemesi", "Sağlık nedeniyle erteleme", "Yurt dışı ertelemesi", "Kardeş ertelemesi"].includes(ctx.label);
  const paid = ["Bedelli askerlik başvurusu", "Bedelli celp değişikliği", "Bedelliden vazgeçme", "Dövizle askerlik"].includes(ctx.label);
  const absent = ["Yoklama kaçağı işlemleri", "Bakaya işlemleri", "Askeralma idari para cezasına itiraz"].includes(ctx.label);
  const statusDocument = ctx.label === "Askerlik durum belgesi";
  const healthAppeal = ctx.label === "Askerlik sağlık raporuna itiraz";
  const adminFine = ctx.label === "Askeralma idari para cezasına itiraz";

  return {
    summary: health
      ? ctx.label + " işlemi Askerliğim/e-Devlet, askerlik şubesi, kayıtlı aile hekimi ve gerektiğinde MSB'nin sevk ettiği yetkili sağlık kurulu zincirinde yürütülür."
      : ctx.label === "Yurt dışı ertelemesi" || ctx.label === "Dövizle askerlik"
        ? ctx.label + " işlemi Askerliğim/e-Devlet ve bağlı olunan Türk konsolosluğu veya dış temsilcilik üzerinden yürütülür."
        : ctx.label + " işlemi MSB Askeralma Genel Müdürlüğünün Askerliğim/e-Devlet hizmeti ve gerektiğinde askerlik şubesi üzerinden yürütülür.",
    verificationStatus: "verified",
    competentAuthorities: [
      healthAppeal ? "Askerlik şubesi; aile hekimi/tek hekim raporunda muayeneyi yapan hekim de ilk itirazı alabilir" : adminFine ? "Cezayı düzenleyen makam ve özel itiraz için yetkili yargı mercii" : "Millî Savunma Bakanlığı Askeralma Genel Müdürlüğü / askerlik şubesi",
      ...(health ? ["Kayıtlı aile hekimi ve MSB'nin sevk ettiği yetkili sağlık kuruluşu"] : []),
      ...(ctx.label === "Yurt dışı ertelemesi" || ctx.label === "Dövizle askerlik" ? ["Türk konsolosluğu/dış temsilcilik"] : [])
    ],
    applicationChannels: [
      eGov("MSB Askerliğim bütünleşik hizmeti", "https://www.turkiye.gov.tr/milli-savunma-bakanligi"),
      office("Askerlik şubesi"),
      ...(ctx.label === "Yurt dışı ertelemesi" || ctx.label === "Dövizle askerlik" ? [office("Türk konsolosluğu/dış temsilcilik")] : [])
    ],
    requiredDocuments: health
      ? ["T.C. kimlik kartı", "Varsa öğrenim/meslek bilgileri", "Mevcut sağlık raporları, epikriz ve tetkikler", "İtirazda kesinleşmiş rapor ve tebliğ/teslim tarihi"]
      : classification
        ? ["Kimlik doğrulaması", "Tamamlanmış yoklama", "Mezuniyet/öğrenim kaydı", "Hizmet ve celp tercihleri", "Sevk belgesi için sınıflandırma kaydı"]
        : deferment
          ? ["Kimlik", "Erteleme nedenini gösteren güncel öğrenci, yüksek lisans, staj, memuriyet, sağlık, yurt dışı çalışma/oturma veya kardeş hizmet belgesi"]
          : paid
            ? ctx.label === "Dövizle askerlik"
              ? ["Kimlik ve askerlik statü bilgisi", "Yurt dışı çalışma/işveren veya meslek belgesi", "Oturma/çalışma izni ve giriş-çıkış kayıtları", "Konsolosluğun güncel listesinde istenen uzaktan eğitim ve ödeme belgeleri"]
              : ctx.label === "Bedelli celp değişikliği"
                ? ["e-Devlet kimlik doğrulaması", "Mevcut bedelli sınıflandırma/celp kaydı", "Askerliğim ekranında açık kontenjan bilgisi"]
                : ctx.label === "Bedelliden vazgeçme"
                  ? ["Kimlik", "Bedelli başvuru ve ödeme bilgisi", "Vazgeçme talebini açıklayan dilekçe veya Askerliğim işlem kaydı"]
                  : ["Kimlik ve tamamlanmış yoklama", "Bedelli kapsamına uygun askerlik statü bilgisi", "Askerliğim ekranında oluşan ödeme bilgileri"]
            : absent
              ? ["Kimlik", "Yoklama/sevk kaydı", "Tebliğ edilen idari para cezası", "Mazeret ve itiraz delilleri"]
              : ["e-Devlet kimlik doğrulaması", "Askerlik statü kaydı"],
    deadlineAndAppeal: healthAppeal
      ? "Kesinleşmiş askerlik sağlık raporlarına tebliğ veya teslim tarihinden itibaren 30 gün içinde itiraz edilebilir; kesinleşmemiş rapora itiraz edilemez."
      : ctx.label === "Bedelli celp değişikliği"
        ? "Celp/sevk değişikliği yalnız Askerliğim ekranında açık kontenjan ve güncel MSB duyurusunun izin verdiği dönem için yapılabilir; ekranda görünmeyen tarih veya kontenjan için kesin hak varsayılmaz."
        : ctx.label === "Bedelli askerlik başvurusu"
          ? "Yoklama tamamlandıktan sonra başvuru yapılır; ödeme, başvurudan itibaren iki ay içinde ve ödeme tarihinde geçerli tutar üzerinden peşin yapılır. Yoklama kaçağı/saklı/bakaya kaydı olanlarda ek bedel ve yalnız askerlik şubesinden yürütülen işlemler bulunabilir."
          : ctx.label === "Dövizle askerlik"
            ? "Uzaktan eğitim, konsolosluk belge incelemesi ve ödeme birlikte tamamlanmadan başvuru tamamlanmış sayılmaz. Ödeme peşindir; tutar ödeme günündeki memur aylık katsayısı ve TCMB döviz alış kuruyla hesaplanır."
        : paid || classification || deferment
          ? "Başvuru, ödeme, sınıflandırma, celp ve erteleme süreleri dönemsel MSB duyurusu ve kişinin statüsüne göre değişir; işlem günü Askerliğim ekranı ve güncel duyuru esas alınır."
          : adminFine
            ? "İdari para cezasının tebliğ tarihi, 7179 ve 5326 sayılı Kanunlardaki güncel görev/süre kuralı birlikte kontrol edilmelidir."
            : "Yoklama ve sevk yükümlülükleri için kişiye bildirilen ve MSB'de ilan edilen tarihler uygulanır; gecikme yoklama kaçağı/bakaya ve yaptırım sonucu doğurabilir.",
    escalation: healthAppeal
      ? ["Askerlik şubesi üzerinden yeniden muayene sevki", "Yetkili ikinci/hakem sağlık kurulu süreci", "Nihai işleme karşı bildirilen yargı yolu"]
      : adminFine
        ? ["Cezayı düzenleyen idareden kayıt/tebligat incelemesi", "Özel kanuna göre yetkili sulh ceza hâkimliği/yargı mercii"]
        : ["Askerlik şubesinden yazılı kayıt ve düzeltme", "MSB Askeralma Genel Müdürlüğü", "İşlemde gösterilen idari/yargısal yol"],
    locationLogic: ctx.label === "Yurt dışı ertelemesi" || ctx.label === "Dövizle askerlik"
      ? "Yurt dışındaki yükümlü bağlı olduğu Türk konsolosluğu/dış temsilcilik üzerinden işlem yapar."
      : "Askerliğim ulusal elektronik kanaldır; fizikî başvuru ikamete en yakın veya dosyanın yetkili askerlik şubesinde yürütülür.",
    legalBasis: ["7179 sayılı Askeralma Kanunu", "Askeralma Yönetmeliği", ...(adminFine ? ["5326 sayılı Kabahatler Kanunu"] : [])],
    sources: [
      S.msbAsal,
      L.militaryService,
      ...(health ? [S.msbYoklama] : []),
      ...(classification ? [S.msbSevk] : []),
      ...(paid && ctx.label !== "Dövizle askerlik" ? [S.msbBedelli] : []),
      ...(ctx.label === "Dövizle askerlik" ? [S.msbDoviz] : [])
    ],
    freshnessRisk: statusDocument ? "low" : "high",
    currentCycleNote: ctx.label === "Bedelli askerlik başvurusu"
      ? "Bedelli tutarı sabit içerik olarak tutulmaz: 7179 sayılı Kanun m.9'daki gösterge ile ödeme günündeki memur aylık katsayısı üzerinden MSB tarafından hesaplanan tutar esas alınır. Askerliğim ekranındaki tahakkuk dışındaki eski tutarla ödeme yapılmamalıdır."
      : ctx.label === "Dövizle askerlik"
        ? "Döviz tutarı sabit değildir; TL karşılığın ödeme günündeki TCMB döviz alış kuruyla avro veya konvertibl para karşılığı kullanılır. Konsolosluğun aynı gün bildirdiği tutar ve transfer masrafları kontrol edilmelidir."
        : ctx.label === "Bedelli celp değişikliği"
          ? "Kontenjan ve değişiklik yetkisi dönemsel olduğundan yalnız Askerliğim ekranında o gün sunulan seçenek güvenlidir."
          : undefined
  };
}

function msuPersonnelDraft(ctx: LeafContext): RouteDraft {
  const student = ["MSÜ askerî öğrenci başvurusu", "Harp Okulları", "Astsubay Meslek Yüksekokulları", "Bando Astsubay MYO", "MSÜ tercih işlemleri", "İkinci seçim aşamaları", "Sonuç takibi"].includes(ctx.label);
  if (student) return {
    summary: ctx.label + " süreci ÖSYM MSÜ aday belirleme sınavı, gerekli YKS oturumları, MSB Personel Temin tercihleri ve seçim aşamalarından oluşur; her halka ilgili yıl kılavuzuna bağlıdır.",
    verificationStatus: "verified",
    competentAuthorities: ["ÖSYM (MSÜ sınav başvurusu)", "Millî Savunma Bakanlığı Personel Temin Dairesi / Millî Savunma Üniversitesi"],
    applicationChannels: [portal("ÖSYM AİS", "https://ais.osym.gov.tr/"), portal("MSB Personel Temin Sistemi", "https://personeltemin.msb.gov.tr/")],
    requiredDocuments: ["T.C. kimlik ve aday bilgileri", "İlgili yıl MSÜ ve YKS başvuruları", "Okul tercihleri", "Seçim aşaması çağrı belgesi", "Kılavuzdaki diploma, fotoğraf, beyan ve diğer evrak", ...(ctx.label === "Bando Astsubay MYO" ? ["Müzik yeteneği/bilgisi sınavı için duyurulan belgeler"] : [])],
    deadlineAndAppeal: "Sınav, tercih, çağrı, evrak ve sonuç süreleri yalnız ilgili yıl ÖSYM/MSB kılavuz ve duyurusundan alınır. ÖSYM sınav işlemlerinde kılavuzdaki kısa inceleme ve İYUK m.20/B süreleri saklıdır.",
    escalation: ["ÖSYM işlemleri için kılavuzdaki itiraz/inceleme kanalı", "MSB Personel Temin Çağrı Takip/iletişim kanalı", "Duyuruda gösterilen idari/yargısal yol"],
    locationLogic: "Başvuru ulusal elektronik sistemlerdedir; seçim aşaması yeri ve tarihi aday çağrı belgesinde belirlenir.",
    legalBasis: ["6114 sayılı ÖSYM Hizmetleri Hakkında Kanun", "İlgili yıl MSÜ ve YKS kılavuzları", "Millî Savunma Üniversitesi ve askerî öğrenci teminine ilişkin güncel mevzuat"],
    sources: [S.osymMsu, S.osymMsuGuide, S.msbPersonnel, S.msuSelection, L.administrativeProcedure],
    freshnessRisk: "high",
    currentCycleNote: "2026-MSÜ başvuruları 5-29 Ocak, ödeme son günü 30 Ocak, geç başvuru 3 Şubat; sınav 1 Mart 2026'da yapılmıştır. Ücret 700 TL, geç başvuruda %50 artırımlıdır. MSB seçim aşamaları okul türüne göre 14 Temmuz-7 Ağustos 2026 arasında tamamlanmıştır. Soru itirazı 3 iş günü, sonuç incelemesi 10 gün; İYUK m.20/B dava süresi 10 gündür ve idari başvuru bu süreyi durdurmaz. Yeni aday yalnız sonraki dönem kılavuzunu kullanmalıdır."
  };
  const civilian = ctx.label === "Sivil memur";
  return {
    summary: ctx.label + " temini yalnız MSB'nin açık ilan ve başvuru kılavuzu bulunduğunda Personel Temin Sistemi üzerinden yapılır; sürekli açık başvuru değildir.",
    verificationStatus: "verified",
    competentAuthorities: ["Millî Savunma Bakanlığı Personel Temin Dairesi Başkanlığı"],
    applicationChannels: [portal("MSB Personel Temin Sistemi", "https://personeltemin.msb.gov.tr/"), eGov("Personel Temin e-Devlet girişi", "https://personeltemin.msb.gov.tr/")],
    requiredDocuments: ["e-Devlet kimlik doğrulaması", "İlanın kaynak okul/mezuniyet belgesi", "KPSS veya ilanda belirtilen sınav sonucu", "Askerlik ve adli sicil bilgileri", "Seçim aşamasına çağrıda kılavuzdaki asıl evraklar"],
    deadlineAndAppeal: "Yalnız ilan edilen başvuru tarihleri arasında başvuru yapılır; yaş, puan, mezuniyet ve evrak koşulları her ilan kılavuzunda yeniden belirlenir. Sonuç/itiraz süresi duyurudan kontrol edilir.",
    escalation: ["Personel Temin Sistemi Çağrı Takip/iletişim", "İlanı yapan MSB biriminden yazılı gerekçe", "Kararda gösterilen idari yargı yolu"],
    locationLogic: "Ön başvuru ulusaldır; sınav/sağlık/evrak teslim yeri aday çağrısında belirlenir.",
    legalBasis: [civilian ? "657 sayılı Devlet Memurları Kanunu" : ctx.label.includes("subay") || ctx.label.includes("astsubay") ? "926 sayılı Türk Silahlı Kuvvetleri Personel Kanunu ve ilgili temin yönetmeliği" : ctx.label === "Uzman erbaş" ? "3269 sayılı Uzman Erbaş Kanunu" : "6191 sayılı Sözleşmeli Erbaş ve Er Kanunu", "İlgili temin ilanı ve başvuru kılavuzu"],
    sources: [S.msbPersonnel, S.msbPersonnelInfo],
    freshnessRisk: "high",
    caution: "Eski ilan/kılavuz koşulları yeni temin dönemi için kullanılamaz."
  };
}

function jandarmaDraft(ctx: LeafContext): RouteDraft {
  const student = ["Güvenlik Bilimleri Fakültesi", "Jandarma Astsubay MYO", "Başvuru / sonuç işlemleri"].includes(ctx.label);
  const jExpert = ctx.label === "Uzman erbaş" && ctx.section === "Jandarma Personel Temini";
  const coast = ctx.section === "Sahil Güvenlik Personel Temini";
  const followup = ctx.section === "Başvuru Sonrası";
  const authority = coast ? "Sahil Güvenlik Komutanlığı ve ilanda belirtilen temin birimi" : "Jandarma Genel Komutanlığı / Jandarma ve Sahil Güvenlik Akademisi Personel Temin Merkezi";
  return {
    summary: ctx.label + " işlemi ilgili yılın Jandarma veya Sahil Güvenlik temin kılavuzu ve J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi üzerinden yürütülür.",
    verificationStatus: "verified",
    competentAuthorities: [authority],
    applicationChannels: [portal("J.Gn.K.lığı Personel - JSGA Öğrenci Temin Sistemi", "https://vatandas.jandarma.gov.tr/PTM/Giris"), ...(coast ? [portal("Sahil Güvenlik Personel Temini", "https://www.sg.gov.tr/personel-temini")] : [])],
    requiredDocuments: student
      ? ["e-Devlet kimlik doğrulaması", "İlgili yıl sınav/puan ve öğrenim bilgileri", "Başvuru kılavuzundaki beyanlar", "Çağrıda istenen diploma, fotoğraf, sağlık ve diğer evrak"]
      : followup
        ? ["Aday çağrı/sonuç belgesi", "Kılavuzdaki asıl evraklar", "Spor kıyafeti ve muvafakatname (fiziki aşama varsa)", "Sağlık sevk ve rapor belgeleri"]
        : ["e-Devlet kimlik doğrulaması", "İlanın istediği mezuniyet/KPSS/askerlik bilgileri", "Başvuru kılavuzundaki mesleki belgeler", "Çağrıda istenen asıl evrak"],
    deadlineAndAppeal: "Teminler ilan bazlıdır; başvuru, sınav çağrısı, sağlık ve sonuç süreleri yalnız güncel kılavuz/duyurudan alınır. İnternet duyurusu tebliğ niteliğinde olabilir; aday sistemi düzenli takip etmelidir.",
    escalation: ["Aday sistemindeki duyuru/sonuç ve temin birimi iletişim kanalı", "Kılavuzda varsa sınav/sağlık itirazı", "Nihai işleme karşı kararda gösterilen idari yargı yolu"],
    locationLogic: "Ön başvuru ulusal elektroniktir; sınav, evrak ve sağlık yerleri aday çağrı belgesi/kılavuzda belirlenir.",
    legalBasis: ["2803 sayılı Jandarma Teşkilat, Görev ve Yetkileri Kanunu veya 2692 sayılı Sahil Güvenlik Komutanlığı Kanunu", "Jandarma ve Sahil Güvenlik Akademisi ile temine ilişkin güncel yönetmelik", "İlgili yıl başvuru kılavuzu"],
    sources: [S.jandarmaPortal, ...(student ? [S.jandarmaStudent] : []), ...(jExpert ? [S.jandarmaExpert] : []), ...(coast ? [S.coastGuard] : [])],
    freshnessRisk: "high",
    currentCycleNote: student ? "2026 öğrenci temini 3-26 Temmuz 2026 arasında yapılmıştır; bu tarihler sonraki dönem için kullanılamaz." : undefined,
    caution: "Başvuru açık değilse eski kılavuzla yeni başvuru yapılamaz."
  };
}

const routeResolver: Record<string, (ctx: LeafContext) => RouteDraft> = {
  "Sosyal Yardım ve Aile Hizmetleri": socialDraft,
  "Engellilik, Bakım ve Özel Gereksinim": disabilityDraft,
  "Sosyal Güvenlik ve Emeklilik": sgkDraft,
  "Nüfus, Vatandaşlık, Kimlik ve Adres": nviDraft,
  "Eğitim ve Öğrenci İşlemleri": educationDraft,
  "Tapu, Kadastro ve Taşınmaz": landDraft,
  "İmar, Yapı ve Kentsel Dönüşüm": zoningDraft,
  "Vergi, Harç ve Kamu Ödemeleri": taxDraft,
  "Ruhsat, İzin ve Resmî Statüler": licensingDraft,
  "Tarım, Hayvancılık, Orman ve Kırsal": agricultureDraft,
  "Belediye ve Yerel Kamu Hizmetleri": municipalityDraft,
  "Elektrik, Su, Doğalgaz ve Haberleşme": utilityDraft,
  "Bilgi Edinme, Dilekçe ve Resmî Belge": informationDraft,
  "İtiraz ve Üst Başvuru Yolları": appealDraft,
  "Askerlik Yükümlülüğü ve Askeralma İşlemleri": militaryServiceDraft,
  "Askerî Okullar ve TSK Personel Temini": msuPersonnelDraft,
  "Jandarma ve Sahil Güvenlik Temin İşlemleri": jandarmaDraft
};

function collectLeaves(nodes: MenuNode[], path: string[] = []): LeafContext[] {
  const result: LeafContext[] = [];
  for (const node of nodes) {
    const next = [...path, node.label];
    if (node.children?.length) {
      result.push(...collectLeaves(node.children, next));
      continue;
    }
    result.push({
      pathKey: next.join(" > "),
      category: next[0],
      section: next.length > 2 ? next.slice(1, -1).join(" > ") : next[0],
      label: node.label,
      legacySlug: node.slug
    });
  }
  return result;
}

function uniqueSlug(ctx: LeafContext, used: Set<string>): string {
  const preferred = ctx.legacySlug || slugify(ctx.section + " " + ctx.label + " nereye basvurulur");
  let candidate = preferred;
  let suffix = 2;
  while (used.has(candidate)) {
    candidate = preferred + "-" + suffix;
    suffix += 1;
  }
  used.add(candidate);
  return candidate;
}

function toRoute(ctx: LeafContext, draft: RouteDraft, used: Set<string>): RouteRecord {
  const slug = uniqueSlug(ctx, used);
  return {
    pathKey: ctx.pathKey,
    slug,
    title: titleFor(ctx.label),
    summary: draft.summary,
    category: ctx.category,
    section: ctx.section,
    aliases: Array.from(new Set([ctx.label, ctx.section, ctx.category, ...(draft.aliases || [])])),
    verificationStatus: draft.verificationStatus,
    competentAuthorities: draft.competentAuthorities,
    applicationChannels: draft.applicationChannels,
    requiredDocuments: draft.requiredDocuments,
    deadlineAndAppeal: draft.deadlineAndAppeal,
    escalation: draft.escalation,
    locationLogic: draft.locationLogic,
    steps: genericSteps(draft),
    legalBasis: draft.legalBasis,
    caution: draft.caution,
    currentCycleNote: draft.currentCycleNote,
    sources: draft.sources,
    publicationBlocker: draft.verificationStatus === "needs-review"
      ? draft.publicationBlocker || "Kesin rota için işlem/program adı, yetkili kurum, dönem ve yer bilgisi gereklidir."
      : undefined,
    lastVerified: LAST_VERIFIED,
    freshnessRisk: draft.freshnessRisk,
    timeSensitive: draft.freshnessRisk === "high"
  };
}

export function buildRouteCatalog(nodes: MenuNode[]): { routes: RouteRecord[] } {
  const leaves = collectLeaves(nodes);
  const used = new Set<string>();
  const routes = leaves.map(ctx => {
    const resolver = routeResolver[ctx.category];
    const draft = resolver ? resolver(ctx) : reviewDraft(ctx);
    return toRoute(ctx, draft, used);
  });
  const pathKeys = new Set(routes.map(route => route.pathKey));
  if (routes.length !== leaves.length || pathKeys.size !== leaves.length) {
    throw new Error("Rota kataloğu bütünlük kontrolü başarısız: her yaprak için tek kayıt bulunmalıdır.");
  }
  for (const route of routes) {
    if (!route.sources.length || !route.lastVerified || !route.competentAuthorities.length || !route.applicationChannels.length || !route.requiredDocuments.length || !route.legalBasis.length) {
      throw new Error("Eksik zorunlu rota alanı: " + route.pathKey);
    }
  }
  return { routes };
}

export function linkVerifiedRoutes(nodes: MenuNode[], routes: RouteRecord[], path: string[] = []): MenuNode[] {
  const byPath = new Map(routes.map(route => [route.pathKey, route.slug]));
  return nodes.map(node => {
    const next = [...path, node.label];
    if (node.children?.length) return { label: node.label, children: linkVerifiedRoutes(node.children, routes, next) };
    const slug = byPath.get(next.join(" > "));
    return slug ? { label: node.label, slug } : { label: node.label };
  });
}
