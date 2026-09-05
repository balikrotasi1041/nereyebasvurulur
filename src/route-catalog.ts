import type { MenuNode, RouteRecord } from "./data";
import { buildRouteCatalog as buildBaseRouteCatalog, linkVerifiedRoutes as linkBaseVerifiedRoutes } from "./route-catalog-base";
export type { RouteDraft } from "./route-catalog-base";

const LIVESTOCK_SUPPORT_PATH = "Tarım, Hayvancılık, Orman ve Kırsal > Hayvancılık > Hayvancılık destekleri";

function applyDailyOfficialUpdates(routes: RouteRecord[]): RouteRecord[] {
  return routes.map(route => {
    if (route.pathKey !== LIVESTOCK_SUPPORT_PATH) return route;
    return {
      ...route,
      summary: "Hayvancılık destekleri dönemsel Tarım ve Orman Bakanlığı talimatlarına göre yürütülür. 2026 yılı 1. dönem buzağı/malak ve kuzu/oğlak destekleme başvuruları 1 Eylül 2026'da başladı ve resmî uygulama duyurularında 1 Aralık 2026 son başvuru tarihi olarak ilan edildi.",
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
      deadlineAndAppeal: "2026 yılı 1. dönem buzağı/malak ve kuzu/oğlak destekleme başvuruları 1 Eylül-1 Aralık 2026 döneminde alınmaktadır. Fizikî başvuruda ilgili müdürlük veya birliğin mesai/kabul saati esas alınmalıdır. Askı, icmal, itiraz ve sonraki dönem tarihleri ilgili destek talimatı ile il/ilçe müdürlüğünün güncel duyurusundan ayrıca kontrol edilmelidir.",
      currentCycleNote: "5 Eylül 2026 doğrulaması: HAYGEM 1 Eylül'de 2026 Büyükbaş (Buzağı/Malak) ve Küçükbaş (Kuzu/Oğlak) Desteklemeleri Talimatlarını yayımladı. Resmî il müdürlüğü duyuruları 1. dönem başvurularının 1 Aralık 2026'da sona ereceğini doğruluyor. Büyükbaşta başvuru kanalı yetiştirici örgütü üyeliğine göre örgüt veya İl/İlçe Tarım ve Orman Müdürlüğü; küçükbaşta ilgili Damızlık Koyun-Keçi Yetiştiricileri Birliği üzerinden yürütülüyor.",
      sources: [
        { title: "2026 Yılı Büyükbaş ve Küçükbaş Hayvancılık Desteklemeleri Talimatları", url: "https://www.tarimorman.gov.tr/haygem/Sayfalar/Detay.aspx?Liste=Duyuru", authority: "Tarım ve Orman Bakanlığı Hayvancılık Genel Müdürlüğü" },
        { title: "2026 Yılı 1. Dönem Büyükbaş Hayvancılık Destekleme Başvuru İşlemleri", url: "https://kutahya.tarimorman.gov.tr/Duyuru/733/2026-Yili-1-Donem-Buyukbas-Hayvancilik-Destekleme-Basvuru-Islemleri", authority: "Tarım ve Orman Bakanlığı Kütahya İl Müdürlüğü" },
        { title: "İl Tarım ve Orman Müdürlükleri", url: "https://www.tarimorman.gov.tr/Iletisim/Il_Mudurlukleri/", authority: "Tarım ve Orman Bakanlığı" },
        ...route.sources
      ],
      lastVerified: "2026-09-05",
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
