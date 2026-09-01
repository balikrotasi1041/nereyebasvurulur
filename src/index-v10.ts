import baseHandler from "./index-v9";
import { publishedRoutes, routeBySlug, routes } from "./data";
import { searchMilitaryBranches } from "./military-branches";
import { renderSearch } from "./ui";
import { insertBeforeFooter, renderAnnouncementDetail } from "./announcements";
import { renderHomeDeadlineRadar, renderRoutePreferenceLayer, smartSearchRoutes } from "./preference-layer";
import {
  injectSupplementalAnnouncementList,
  injectSupplementalSitemap,
  renderSupplementalHomeSection,
  supplementalAnnouncementBySlug,
  supplementalAnnouncements
} from "./supplemental-announcements";
import { renderSeoGrowthLayer, renderSeoOpsPanel, seoCoverageSummary } from "./seo-growth";

const RELEASE = "v11-search-security-growth-2026-09-01";
const DAILY_RELEASE = "daily-official-audit-2026-09-01";
const GOOGLE_SITE_VERIFICATION = "5Vmhgh-JkZi7cm_gjUHEwjNymv-Sds3VmXmLpmDp3KU";
const YANDEX_SITE_VERIFICATION = "3fa0665bc8ba3bb6";

const BLOCKED_IPS = new Set([
  "20.220.10.235",
  "172.212.194.58",
  "158.158.100.150",
  "34.168.106.157",
  "45.148.10.246",
  "195.178.110.102",
  "158.23.147.79",
  "20.104.18.15"
]);

const RESTRICTED_IPS = new Set(["143.198.198.51", "154.58.229.19"]);
const SCANNER_SEGMENT = /(^|\/)(?:wp-admin|wp-content|wp-includes|wp-login\.php|xmlrpc\.php|wlwmanifest\.xml|wordpress|wp\d+|phpmyadmin|pma|adminer|vendor\/phpunit|\.git|\.env(?:\.[^/]*)?|server-status|server-info)(?:\/|$)/i;
const SUSPICIOUS_FILE = /(?:^|\/)(?:phpinfo[^/]*|[^/]+\.(?:php\d*|phtml|phar|asp|aspx|jsp|cgi|pl))(?:\/|$)/i;

function safePath(path: string): string {
  try { return decodeURIComponent(path); } catch { return path; }
}

function isScannerProbe(path: string): boolean {
  const normalized = safePath(path).toLowerCase();
  return SCANNER_SEGMENT.test(normalized) || SUSPICIOUS_FILE.test(normalized);
}

function isVerifiedBot(request: Request): boolean {
  const cf = request.cf as unknown as { botManagement?: { verifiedBot?: boolean } } | undefined;
  return cf?.botManagement?.verifiedBot === true;
}

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
  headers.set("x-daily-official-audit", DAILY_RELEASE);
  return headers;
}

function blockedResponse(request: Request, reason: "ip" | "scanner"): Response {
  const headers = securityHeaders(new Headers({
    "content-type": "text/plain; charset=utf-8",
    "cache-control": reason === "scanner" ? "public, max-age=86400, s-maxage=86400" : "no-store, max-age=0",
    "x-robots-tag": "noindex, nofollow, noarchive",
    "x-edge-security": reason
  }));
  return new Response(request.method === "HEAD" ? null : "Not Found", { status: 404, headers });
}

function restrictedResponse(request: Request): Response {
  return new Response(request.method === "HEAD" ? null : "Too Many Requests", {
    status: 429,
    headers: securityHeaders(new Headers({
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "3600",
      "x-robots-tag": "noindex, nofollow",
      "x-edge-security": "adaptive-restriction"
    }))
  });
}

function withVerificationMeta(body: string): string {
  if (!body.includes("<head>")) return body;
  if (body.includes('name="google-site-verification"')) return body;
  return body.replace(
    "<head>",
    `<head><meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}"><meta name="yandex-verification" content="${YANDEX_SITE_VERIFICATION}">`
  );
}

function withSearchNav(body: string): string {
  if (!body.includes('<nav class="nav" aria-label="Ana menü">')) return body;
  let output = body;
  if (!output.includes('href="/duyurular/"')) {
    output = output.replace('<nav class="nav" aria-label="Ana menü">', '<nav class="nav" aria-label="Ana menü"><a class="hide-mobile" href="/duyurular/">Duyurular</a>');
  }
  if (!output.includes('href="/askerlik-subeleri/duyurular/"')) {
    output = output.replace('<nav class="nav" aria-label="Ana menü">', '<nav class="nav" aria-label="Ana menü"><a class="hide-mobile" href="/askerlik-subeleri/duyurular/">ASAL</a>');
  }
  return output;
}

function searchResponse(body: string, method: string): Response {
  const html = withVerificationMeta(withSearchNav(body));
  return new Response(method === "HEAD" ? null : html, {
    status: 200,
    headers: securityHeaders(new Headers({
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex, follow, noarchive",
      "x-smart-search": "v1"
    }))
  });
}

function supplementalAnnouncementResponse(body: string, method: string): Response {
  return new Response(method === "HEAD" ? null : withVerificationMeta(withSearchNav(body)), {
    status: 200,
    headers: securityHeaders(new Headers({
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
      "x-announcement-feed": "v1",
      "x-supplemental-announcement": "2026-08-28"
    }))
  });
}

function withReleaseHeader(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("x-security-layer", RELEASE);
  headers.set("x-daily-official-audit", DAILY_RELEASE);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function transformHtmlResponse(
  response: Response,
  request: Request,
  transform: (body: string) => string,
  cacheControl?: string
): Promise<Response> {
  if (request.method === "HEAD" || response.status !== 200 || !(response.headers.get("content-type") || "").includes("text/html")) {
    return withReleaseHeader(response);
  }
  const body = transform(await response.text());
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("x-security-layer", RELEASE);
  headers.set("x-daily-official-audit", DAILY_RELEASE);
  if (cacheControl) {
    headers.set("cache-control", cacheControl);
    headers.set("cdn-cache-control", cacheControl);
  }
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

async function transformSitemapResponse(response: Response, request: Request): Promise<Response> {
  if (response.status !== 200) return withReleaseHeader(response);
  const xml = injectSupplementalSitemap(await response.text());
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("x-daily-official-audit", DAILY_RELEASE);
  headers.set("x-security-layer", RELEASE);
  return new Response(request.method === "HEAD" ? null : xml, { status: 200, headers });
}

function injectRouteLayer(body: string, fragment: string): string {
  const marker = '</section><section class="card content">';
  if (!body.includes(marker)) return insertBeforeFooter(body, fragment);
  return body.replace(marker, `</section>${fragment}<section class="card content">`);
}

async function healthResponse(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const response = await baseHandler.fetch(request, env, ctx);
  if (response.status !== 200) return withReleaseHeader(response);
  try {
    const data = await response.json() as Record<string, unknown>;
    const body = JSON.stringify({
      ...data,
      release: RELEASE,
      preferenceLayer: true,
      quickAnswerLayer: true,
      deadlineRadar: true,
      smartSearch: true,
      noNewPreferenceUrls: true,
      scannerProbeBlocking: true,
      abusiveIpBlocking: true,
      blockedIpCount: BLOCKED_IPS.size,
      adaptiveRestrictionCount: RESTRICTED_IPS.size,
      verifiedBotBypass: true,
      seoGrowth: seoCoverageSummary(routes),
      dailyOfficialAudit: DAILY_RELEASE,
      supplementalAnnouncements: supplementalAnnouncements.length
    });
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("x-security-layer", RELEASE);
    headers.set("x-daily-official-audit", DAILY_RELEASE);
    return new Response(request.method === "HEAD" ? null : body, { status: 200, headers });
  } catch {
    return withReleaseHeader(response);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const clientIp = request.headers.get("cf-connecting-ip") || "";

    if (BLOCKED_IPS.has(clientIp)) return blockedResponse(request, "ip");
    if (isScannerProbe(path)) return blockedResponse(request, "scanner");
    if (RESTRICTED_IPS.has(clientIp) && !isVerifiedBot(request)) return restrictedResponse(request);

    if (request.method !== "GET" && request.method !== "HEAD") return withReleaseHeader(await baseHandler.fetch(request, env, ctx));
    if (url.hostname === "www.nereyebasvurulur.com") return withReleaseHeader(await baseHandler.fetch(request, env, ctx));

    if (path === "/health") return healthResponse(request, env, ctx);

    if (path === "/ara" || path === "/ara/") {
      const query = (url.searchParams.get("q") || "").slice(0, 160);
      const routeMatches = smartSearchRoutes(query, publishedRoutes, 60);
      const branchMatches = searchMilitaryBranches(query, 60);
      return searchResponse(renderSearch(query, routeMatches, branchMatches), request.method);
    }

    const announcementMatch = path.match(/^\/duyuru\/([a-z0-9-]+)\/?$/);
    if (announcementMatch) {
      const item = supplementalAnnouncementBySlug.get(announcementMatch[1]);
      if (item) return supplementalAnnouncementResponse(renderAnnouncementDetail(item, []), request.method);
    }

    const response = await baseHandler.fetch(request, env, ctx);

    if (path === "/sitemap.xml") return transformSitemapResponse(response, request);

    if (path === "/duyurular" || path === "/duyurular/") {
      return transformHtmlResponse(response, request, body => injectSupplementalAnnouncementList(body));
    }

    if (path === "/") {
      return transformHtmlResponse(response, request, body => insertBeforeFooter(insertBeforeFooter(body, renderSupplementalHomeSection()), renderHomeDeadlineRadar(new Date())), "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
    }

    if (path === "/admin/dashboard" || path === "/admin/dashboard/") {
      return transformHtmlResponse(response, request, body => insertBeforeFooter(body, renderSeoOpsPanel(routes)));
    }

    const routeMatch = path.match(/^\/konu\/([^/]+)\/?$/);
    if (routeMatch) {
      const route = routeBySlug.get(routeMatch[1]);
      if (route && route.verificationStatus !== "needs-review") {
        const cacheControl = route.timeSensitive ? "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400" : "public, max-age=900, s-maxage=21600, stale-while-revalidate=172800";
        return transformHtmlResponse(response, request, body => injectRouteLayer(body, `${renderRoutePreferenceLayer(route)}${renderSeoGrowthLayer(route)}`), cacheControl);
      }
    }

    return withReleaseHeader(response);
  }
} satisfies ExportedHandler<Env>;
