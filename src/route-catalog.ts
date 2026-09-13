import type { MenuNode, RouteRecord } from "./data";
import { buildRouteCatalog as buildBaseRouteCatalog, linkVerifiedRoutes as linkBaseVerifiedRoutes } from "./route-catalog-base";
export type { RouteDraft } from "./route-catalog-base";

const LIVESTOCK_SUPPORT_PATH = "Tarım, Hayvancılık, Orman ve Kırsal > Hayvancılık > Hayvancılık destekleri";
const CKS_PATHS = new Set([
  "Tarım, Hayvancılık, Orman ve Kırsal > Çiftçi Kayıt Sistemi > ÇKS kaydı",
  "Tarım, Hayvancılık, Orman ve Kırsal > Çiftçi Kayıt Sistemi > ÇKS güncelleme"
]);

function applyDailyOfficialUpdates(routes: RouteRecord[]): RouteRecord[] {
  return routes.map(route => {
    if (CKS_PATHS.has(route.pathKey)) {
      return {
        ...route,
        summary: "2027 üretim yılı Çiftçi Kayıt Sistemi (ÇKS) başvuru dönemi 1 Eylül 2026'da başladı ve 31 Aralık 2026'ya kadar devam ediyor. Mevcut ÇKS kaydı bulunan üreticiler uygun kayıt yenileme işlemlerini e-Devlet üzerinden yapabilir; ilk kayıt, arazi/beyan değişikliği ve fizikî kabul kanalı için ilin güncel Tarım ve Orman Müdürlüğü/Ziraat Odası uygulaması kontrol edilmelidir.",
        competentAuthorities: [
          "Tarım ve Orman Bakanlığı / İl ve İlçe Tarım ve Orman Müdürlükleri",
          "Bakanlık-TZOB protokolünün uygulandığı yerlerde ilgili Ziraat Odası veya temsilciliği"
        ],
        applicationChannels: [
          { type: "e-government", label: "Çiftçi Kayıt Sistemi Kayıt Yenileme Başvurusu", url: "https://www.turkiye.gov.tr/tarim-ve-orman-ciftci-kayit-sistemi-kayit-yenileme-basvurusu-gercek-kisi", note: "Mevcut kaydı olan ve e-Devlet hizmetinin izin verdiği üreticiler için." },
          { type: "in-person", label: "İl/İlçe Tarım ve Orman Müdürlüğü", note: "İlk kayıt veya arazi/beyan değişikliği bulunan durumlarda ilin resmî uygulama duyurusunu kontrol edin." },
          { type: "other", label: "Yetkilendirilmiş Ziraat Odası / temsilcilik", note: "Bakanlık-TZOB protokolünün yerelde uygulanarak ÇKS kabul ve veri girişinin odaya devredildiği illerde." }
        ],
        deadlineAndAppeal: "2027 üretim yılı ÇKS başvuruları 1 Eylül-31 Aralık 2026 arasında alınmaktadır. Fizikî başvuruda 31 Aralık günü kurumun/odanın mesai ve evrak kabul saati esas alınmalıdır. İlk kayıt, arazi değişikliği veya yerel yetki devri bulunan işlemlerde ilin güncel resmî duyurusu kontrol edilmeden tek bir fizikî başvuru mercii varsayılmamalıdır.",
        currentCycleNote: "13 Eylül 2026 doğrulaması: 2027 üretim yılı ÇKS dönemi açıktır. Bakanlığın il müdürlükleri 1 Eylül-31 Aralık 2026 takvimini duyurmuştur. e-Devlet'te ÇKS kayıt yenileme hizmeti aktiftir. Bakanlık ile TZOB arasında 28 Ağustos 2026'da imzalanan protokolün yerel uygulandığı illerde ÇKS başvuru ve veri girişleri Ziraat Odaları/temsilciliklerine devredilebildiğinden, fizikî kanal il bazında resmî duyurudan teyit edilmelidir.",
        sources: [
          { title: "2027 Üretim Yılı Çiftçi Kayıt Sistemi (ÇKS) Başvuruları Başlıyor", url: "https://bingol.tarimorman.gov.tr/Duyuru/574/2027-Uretim-Yili-Ciftci-Kayit-Sistemi-_cks_-Basvurulari-Basliyor", authority: "Tarım ve Orman Bakanlığı Bingöl İl Müdürlüğü" },
          { title: "2027 Yılı ÇKS Kayıtları Başladı", url: "https://rize.tarimorman.gov.tr/Duyuru/355/2027-Yili-Cks-Kayitlari-Basladi", authority: "Tarım ve Orman Bakanlığı Rize İl Müdürlüğü" },
          { title: "Çiftçi Kayıt Sistemi Kayıt Yenileme Başvurusu", url: "https://www.turkiye.gov.tr/tarim-ve-orman-ciftci-kayit-sistemi-kayit-yenileme-basvurusu-gercek-kisi", authority: "e-Devlet Kapısı / Tarım ve Orman Bakanlığı" },
          ...route.sources
        ],
        lastVerified: "2026-09-13",
        freshnessRisk: "high",
        timeSensitive: true,
        eGovernmentAvailable: true
      };
    }

    if (route.pathKey !== LIVESTOCK_SUPPORT_PATH) return route;
    return {
      ...route,
      summary: "Hayvancılık destekleri dönemsel Tarım ve Orman Bakanlığı talimatlarına göre yürütülür. 2026 yılı 1. dönem buzağı/malak ve kuzu/oğlak destekleme başvuruları 1 Eylül 2026'da başladı ve resmî uygulama duyurularında 1 Aralık 2026 son başvuru tarihi olarak ilan edildi. 8 Eylül 2026 tarihli 11782 sayılı Cumhurbaşkanı Kararıyla 2026 destek tutarları ve bazı ilave katsayılar güncellendi.",
      competentAuthorities: [
        "Tarım ve Orman Bakanlığı Hayvancılık Genel Müdürlüğü",
        "İl/İlçe Tarım ve Orman Müdürlükleri",
        "Destek türüne göre ilgili yetiştirici örgütü / damızlık yetiştirici birliği"
      ],
      applicationChannels: [
        { type: "in-person", label: "İl/İlçe Tarım ve Orman Müdürlüğü", note: "Büyükbaş desteğinde yetiştirici örgütü üyesi olmayan yetiştiriciler için resmî il uygulama duyurularında gösterilen kanal." },
        { type: "other", label: "İlgili yetiştirici örgütü", note: "Büyükbaş desteğinde örgüt üyesi yetiştiriciler başvuruyu ilgili yetiştirici örgütü üzerinden yürütür." },
        { type: "other", label: "Damızlık Koyun-Keçi Yetiştiricileri Birliği", note: "Küçükbaş kuzu/oğlak desteğinde resmî il uygulama duyurularında gösterilen başvuru kanalı; yerel belge ve kabul ayrıntısı birlikten doğrulanmalıdır." }
      ],
      deadlineAndAppeal: "2026 yılı 1. dönem buzağı/malak ve kuzu/oğlak destekleme başvuruları 1 Eylül-1 Aralık 2026 döneminde alınmaktadır. Fizikî başvuruda ilgili müdürlük veya birliğin mesai/kabul saati esas alınmalıdır. Askı, icmal, itiraz ve sonraki dönem tarihleri ilgili destek talimatı ile il/ilçe müdürlüğünün güncel duyurusundan ayrıca kontrol edilmelidir. 11782 sayılı Karar destek tutarlarını ve teknik katsayıları değiştirmiştir; başvuru kanalını veya 1. dönem son tarihini değiştiren bir hüküm tespit edilmemiştir.",
      currentCycleNote: "9 Eylül 2026 doğrulaması: 8 Eylül 2026 tarihli ve 33364 sayılı Resmî Gazete'de yayımlanan 11782 sayılı Cumhurbaşkanı Kararı 1 Ocak 2026'dan geçerli olmak üzere 2026 hayvancılık destek tutarlarını güncelledi. Buzağı temel desteği 2.000 TL/baş, malak 4.000 TL/baş, kuzu/oğlak 430 TL/baş; atık desteği sığır/manda için 20.000 TL/baş, koyun/keçi için 4.000 TL/baş oldu. Arıcılıkta birlik üyesine 250 TL/kovan, üye olmayana 200 TL/kovan öngörüldü. 1. dönem buzağı/malak ve kuzu/oğlak başvurularının 1 Aralık 2026 son tarihi ile mevcut başvuru kanalları değişmedi.",
      sources: [
        { title: "2024-2026 Yıllarında Yapılacak Hayvancılık Desteklemelerine İlişkin Kararda Değişiklik Yapılmasına Dair Karar", url: "https://www.tarimorman.gov.tr/HHGM/Haber/263/2024-2026-Yillarinda-Yapilacak-Hayvancilik-Desteklemelerine-Iliskin-Kararda-Degisiklik-Yapilmasina-Dair-Karar", authority: "Tarım ve Orman Bakanlığı Hayvancılık Genel Müdürlüğü" },
        { title: "11782 sayılı Cumhurbaşkanı Kararı - Resmî Gazete PDF", url: "https://www.resmigazete.gov.tr/eskiler/2026/09/20260908-8.pdf", authority: "T.C. Resmî Gazete" },
        { title: "2026 Yılı Büyükbaş ve Küçükbaş Hayvancılık Desteklemeleri Talimatları", url: "https://www.tarimorman.gov.tr/haygem/Sayfalar/Detay.aspx?Liste=Duyuru", authority: "Tarım ve Orman Bakanlığı Hayvancılık Genel Müdürlüğü" },
        { title: "2026 Yılı 1. Dönem Büyükbaş Hayvancılık Destekleme Başvuru İşlemleri", url: "https://kutahya.tarimorman.gov.tr/Duyuru/733/2026-Yili-1-Donem-Buyukbas-Hayvancilik-Destekleme-Basvuru-Islemleri", authority: "Tarım ve Orman Bakanlığı Kütahya İl Müdürlüğü" },
        { title: "İl Tarım ve Orman Müdürlükleri", url: "https://www.tarimorman.gov.tr/Iletisim/Il_Mudurlukleri/", authority: "Tarım ve Orman Bakanlığı" },
        ...route.sources
      ],
      lastVerified: "2026-09-09",
      freshnessRisk: "high",
      timeSensitive: true,
      eGovernmentAvailable: false
    };
  });
}

export function buildRouteCatalog(nodes: MenuNode[]): { routes: RouteRecord[] } {
  const built = buildBaseRouteCatalog(nodes);
  return { routes: applyDailyOfficialUpdates(built.routes) };
}

export function linkVerifiedRoutes(nodes: MenuNode[], routes: RouteRecord[], path: string[] = []): MenuNode[] {
  return linkBaseVerifiedRoutes(nodes, routes, path);
}
