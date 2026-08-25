import baseHandler from "./index-v8";
import { routes } from "./data";
import { insertBeforeFooter, type RelatedRoute } from "./announcements";
import {
  militaryServiceAnnouncements,
  militaryServiceAnnouncementBySlug,
  renderMilitaryRouteAnnouncementSection,
  renderMilitaryServiceDetail,
  renderMilitaryServiceFeedSection,
  renderMilitaryServiceGeneralFeedSection,
  renderMilitaryServiceListPage,
  type MilitaryServiceAnnouncement
} from "./military-service-announcements";

const SITE_ORIGIN = "https://nereyebasvurulur.com";
const RELEASE = "v9-askeralma-announcements-2026-08-25";
const MILITARY_CACHE_CONTROL = "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400";
const routeByPathKey = new Map(routes.map(route => [route.pathKey, route]));
const routeBySlug = new Map(routes.map(route => [route.slug, route]));
const militaryLastModified = militaryServiceAnnouncements.map(item => item.lastModified).sort().at(-1) || "2026-08-25";

function securityHeaders(headers: Headers): Headers {
  headers.set("strict-transport-security", "max-age=31536000; includeSubDomains");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-permitted-cross-domain-policies", "none");
  headers.set("x-dns-prefetch-control", "off");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("x-frame-options", "DENY");
  headers.set("cross-origin-opener-policy", "same-origin");
  headers.set("cross-origin-resource-policy", "same-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  headers.set("content-security-policy", "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests");
  headers.set("x-security-layer", RELEASE);
  return headers;
}

function html(body: string, method: string): Response {
  return new Response(method === "HEAD" ? null : body, {
    status: 200,
    headers: securityHeaders(new Headers({
      "content-type": "text/html; charset=utf-8",
      "cache-control": MILITARY_CACHE_CONTROL,
      "x-military-announcement-feed": "v1"
    }))
  });
}

function withReleaseHeader(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("x-security-layer", RELEASE);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function relatedRoutes(item: MilitaryServiceAnnouncement): RelatedRoute[] {
  return item.relatedPathKeys
    .map(pathKey => routeByPathKey.get(pathKey))
    .filter(route => Boolean(route && route.verificationStatus !== "needs-review"))
    .map(route => ({ slug: route!.slug, title: route!.title, pathKey: route!.pathKey }));
}

function militaryAnnouncementsForRoute(slug: string): MilitaryServiceAnnouncement[] {
  const route = routeBySlug.get(slug);
  if (!route) return [];
  return militaryServiceAnnouncements.filter(item => item.relatedPathKeys.includes(route.pathKey));
}

function renderMilitaryHubNotice(): string {
  const current = militaryServiceAnnouncements.find(item => item.slug === "kasim-2026-siniflandirma-donemi-duyurusu") || militaryServiceAnnouncements[0];
  return `<aside style="width:min(1160px,calc(100% - 28px));margin:16px auto 30px;padding:14px 16px;border:1px solid #cfdcf5;border-radius:14px;background:#f6f9ff;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div><strong style="display:block">Askeralma takvimi ve sevk duyuruları</strong><span style="display:block;margin-top:4px;color:#65758b;font-size:.88rem;line-height:1.45">${current ? current.title : "Normal tertip ve bedelli celp-sevk takvimlerini kontrol edin."}</span></div><a href="/askerlik-subeleri/duyurular/" style="display:inline-flex;min-height:42px;align-items:center;padding:9px 12px;border-radius:10px;background:#2458d6;color:#fff;text-decoration:none;font-weight:800">Güncel takvimi aç →</a></aside>`;
}

async function transformedBaseResponse(request: Request, env: Env, ctx: ExecutionContext, transform: (body: string) => string): Promise<Response> {
  const response = await baseHandler.fetch(request, env, ctx);
  if (request.method === "HEAD" || response.status !== 200 || !(response.headers.get("content-type") || "").includes("text/html")) return withReleaseHeader(response);
  const body = transform(await response.text());
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("x-military-announcement-feed", "v1");
  headers.set("x-security-layer", RELEASE);
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

async function sitemapResponse(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const response = await baseHandler.fetch(request, env, ctx);
  if (response.status !== 200) return withReleaseHeader(response);
  const xml = await response.text();
  if (!xml.includes("</urlset>")) return withReleaseHeader(response);
  const entries = [
    `<url><loc>${SITE_ORIGIN}/askerlik-subeleri/duyurular/</loc><lastmod>${militaryLastModified}</lastmod></url>`,
    ...militaryServiceAnnouncements.map(item => `<url><loc>${SITE_ORIGIN}/duyuru/${item.slug}/</loc><lastmod>${item.lastModified}</lastmod></url>`)
  ].join("");
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("x-military-announcement-feed", "v1");
  headers.set("x-security-layer", RELEASE);
  return new Response(request.method === "HEAD" ? null : xml.replace("</urlset>", `${entries}</urlset>`), { status: 200, headers });
}

async function healthResponse(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const response = await baseHandler.fetch(request, env, ctx);
  if (response.status !== 200) return withReleaseHeader(response);
  try {
    const data = await response.json() as Record<string, unknown>;
    const body = JSON.stringify({
      ...data,
      release: RELEASE,
      militaryAnnouncementFeed: true,
      militaryAnnouncements: militaryServiceAnnouncements.length,
      militaryAnnouncementLastVerified: militaryLastModified
    });
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("x-security-layer", RELEASE);
    return new Response(request.method === "HEAD" ? null : body, { status: 200, headers });
  } catch {
    return withReleaseHeader(response);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method !== "GET" && request.method !== "HEAD") return withReleaseHeader(await baseHandler.fetch(request, env, ctx));
    if (url.hostname === "www.nereyebasvurulur.com") return withReleaseHeader(await baseHandler.fetch(request, env, ctx));

    if (path === "/askerlik-subeleri/duyurular" || path === "/askerlik-subeleri/duyurular/") {
      return html(renderMilitaryServiceListPage(), request.method);
    }

    const announcementMatch = path.match(/^\/duyuru\/([a-z0-9-]+)\/?$/);
    if (announcementMatch) {
      const item = militaryServiceAnnouncementBySlug.get(announcementMatch[1]);
      if (item) return html(renderMilitaryServiceDetail(item, relatedRoutes(item)), request.method);
    }

    if (path === "/sitemap.xml") return sitemapResponse(request, env, ctx);
    if (path === "/health") return healthResponse(request, env, ctx);

    if (path === "/") {
      return transformedBaseResponse(request, env, ctx, body => insertBeforeFooter(body, renderMilitaryServiceGeneralFeedSection(4)));
    }

    if (path === "/duyurular" || path === "/duyurular/") {
      return transformedBaseResponse(request, env, ctx, body => insertBeforeFooter(body, renderMilitaryServiceGeneralFeedSection(4)));
    }

    if (path === "/askerlik-subeleri" || path === "/askerlik-subeleri/") {
      return transformedBaseResponse(request, env, ctx, body => insertBeforeFooter(body, renderMilitaryServiceFeedSection(5)));
    }

    if (/^\/askerlik-subeleri\/[^/]+\/?$/.test(path)) {
      return transformedBaseResponse(request, env, ctx, body => insertBeforeFooter(body, renderMilitaryServiceFeedSection(3)));
    }

    if (/^\/askerlik-subeleri\/[^/]+\/[^/]+\/?$/.test(path)) {
      return transformedBaseResponse(request, env, ctx, body => insertBeforeFooter(body, renderMilitaryHubNotice()));
    }

    const routeMatch = path.match(/^\/konu\/([^/]+)\/?$/);
    if (routeMatch) {
      const linked = militaryAnnouncementsForRoute(routeMatch[1]);
      if (linked.length) return transformedBaseResponse(request, env, ctx, body => insertBeforeFooter(body, renderMilitaryRouteAnnouncementSection(linked)));
    }

    return withReleaseHeader(await baseHandler.fetch(request, env, ctx));
  }
} satisfies ExportedHandler<Env>;
