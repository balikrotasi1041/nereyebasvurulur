import baseHandler from "./index";
import { routes } from "./data";
import {
  announcements,
  announcementBySlug,
  insertBeforeFooter,
  renderAnnouncementDetail,
  renderAnnouncementList,
  renderHomeAnnouncementSection,
  renderRouteAnnouncementSection,
  type Announcement,
  type RelatedRoute
} from "./announcements";

const SITE_ORIGIN = "https://nereyebasvurulur.com";
const ANNOUNCEMENT_CACHE_CONTROL = "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400";
const LATEST_ANNOUNCEMENT_DATE = announcements.map(item => item.lastModified).sort().at(-1) || "2026-08-25";

const routeByPathKey = new Map(routes.map(route => [route.pathKey, route]));
const routeBySlug = new Map(routes.map(route => [route.slug, route]));

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
  headers.set("content-security-policy", "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline' application/ld+json; img-src 'self' data:; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests");
  return headers;
}

function announcementHtml(body: string, method: string): Response {
  return new Response(method === "HEAD" ? null : body, {
    status: 200,
    headers: securityHeaders(new Headers({
      "content-type": "text/html; charset=utf-8",
      "cache-control": ANNOUNCEMENT_CACHE_CONTROL,
      "x-announcement-feed": "v1"
    }))
  });
}

function relatedRoutes(item: Announcement): RelatedRoute[] {
  return item.relatedPathKeys
    .map(pathKey => routeByPathKey.get(pathKey))
    .filter(route => Boolean(route && route.verificationStatus !== "needs-review"))
    .map(route => ({ slug: route!.slug, title: route!.title, pathKey: route!.pathKey }));
}

function announcementsForRoute(slug: string): Announcement[] {
  const route = routeBySlug.get(slug);
  if (!route) return [];
  return announcements.filter(item => item.relatedPathKeys.includes(route.pathKey));
}

function withAnnouncementNav(html: string): string {
  if (html.includes('href="/duyurular/"')) return html;
  const marker = '<nav class="nav" aria-label="Ana menü">';
  if (!html.includes(marker)) return html;
  return html.replace(marker, `${marker}<a class="hide-mobile" href="/duyurular/">Duyurular</a>`);
}

async function transformedBaseResponse(request: Request, env: Env, ctx: ExecutionContext, transform: (body: string) => string): Promise<Response> {
  const response = await baseHandler.fetch(request, env, ctx);
  if (request.method === "HEAD" || response.status !== 200 || !(response.headers.get("content-type") || "").includes("text/html")) return response;
  const body = transform(await response.text());
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

async function sitemapResponse(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const response = await baseHandler.fetch(request, env, ctx);
  if (response.status !== 200) return response;
  let xml = await response.text();
  if (!xml.includes("</urlset>")) return response;
  const entries = [
    `<url><loc>${SITE_ORIGIN}/duyurular/</loc><lastmod>${LATEST_ANNOUNCEMENT_DATE}</lastmod></url>`,
    ...announcements.map(item => `<url><loc>${SITE_ORIGIN}/duyuru/${item.slug}/</loc><lastmod>${item.lastModified}</lastmod></url>`)
  ].join("");
  xml = xml.replace("</urlset>", `${entries}</urlset>`);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("x-announcement-feed", "v1");
  return new Response(request.method === "HEAD" ? null : xml, { status: 200, headers });
}

async function healthResponse(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const response = await baseHandler.fetch(request, env, ctx);
  if (response.status !== 200) return response;
  try {
    const data = await response.json() as Record<string, unknown>;
    const body = JSON.stringify({
      ...data,
      announcementFeed: true,
      announcements: announcements.length,
      announcementLastVerified: LATEST_ANNOUNCEMENT_DATE,
      announcementRelease: "v1-2026-08-25"
    });
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(request.method === "HEAD" ? null : body, { status: 200, headers });
  } catch {
    return response;
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method !== "GET" && request.method !== "HEAD") return baseHandler.fetch(request, env, ctx);

    if (url.hostname === "www.nereyebasvurulur.com") return baseHandler.fetch(request, env, ctx);

    if (path === "/duyurular" || path === "/duyurular/") {
      return announcementHtml(renderAnnouncementList(), request.method);
    }

    const announcementMatch = path.match(/^\/duyuru\/([a-z0-9-]+)\/?$/);
    if (announcementMatch) {
      const item = announcementBySlug.get(announcementMatch[1]);
      if (item) return announcementHtml(renderAnnouncementDetail(item, relatedRoutes(item)), request.method);
      return baseHandler.fetch(request, env, ctx);
    }

    if (path === "/sitemap.xml") return sitemapResponse(request, env, ctx);
    if (path === "/health") return healthResponse(request, env, ctx);

    if (path === "/") {
      return transformedBaseResponse(request, env, ctx, html => insertBeforeFooter(withAnnouncementNav(html), renderHomeAnnouncementSection(4)));
    }

    const routeMatch = path.match(/^\/konu\/([^/]+)\/?$/);
    if (routeMatch) {
      const linked = announcementsForRoute(routeMatch[1]);
      return transformedBaseResponse(request, env, ctx, html => insertBeforeFooter(withAnnouncementNav(html), renderRouteAnnouncementSection(linked)));
    }

    return transformedBaseResponse(request, env, ctx, withAnnouncementNav);
  }
} satisfies ExportedHandler<Env>;
