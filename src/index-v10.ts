import baseHandler from "./index-v9";
import { publishedRoutes, routeBySlug } from "./data";
import { searchMilitaryBranches } from "./military-branches";
import { renderSearch } from "./ui";
import { insertBeforeFooter } from "./announcements";
import { renderHomeDeadlineRadar, renderRoutePreferenceLayer, smartSearchRoutes } from "./preference-layer";

const RELEASE = "v10-security-edge-2026-08-27";
const GOOGLE_SITE_VERIFICATION = "5Vmhgh-JkZi7cm_gjUHEwjNymv-Sds3VmXmLpmDp3KU";
const YANDEX_SITE_VERIFICATION = "3fa0665bc8ba3bb6";

const BLOCKED_IPS = new Set([
  "20.220.10.235",
  "172.212.194.58",
  "158.158.100.150",
  "34.168.106.157"
]);

const SCANNER_PATH_PREFIXES = [
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/wordpress",
  "/test/wp-",
  "/vendor/phpunit",
  "/.env",
  "/server-status"
];

function isScannerProbe(path: string): boolean {
  const normalized = path.toLowerCase();
  if (normalized === "/xmlrpc.php" || normalized === "/wp-login.php") return true;
  if (SCANNER_PATH_PREFIXES.some(prefix => normalized.startsWith(prefix))) return true;
  return normalized.endsWith(".php");
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
  return headers;
}

function blockedResponse(request: Request, reason: "ip" | "scanner"): Response {
  const headers = securityHeaders(new Headers({
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store, max-age=0",
    "x-robots-tag": "noindex, nofollow, noarchive",
    "x-edge-security": reason
  }));
  return new Response(request.method === "HEAD" ? null : "Not Found", { status: 404, headers });
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

function withReleaseHeader(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("x-security-layer", RELEASE);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function transformHtmlResponse(
  response: Response,
  request: Request,
  transform: (body: string) => string
): Promise<Response> {
  if (request.method === "HEAD" || response.status !== 200 || !(response.headers.get("content-type") || "").includes("text/html")) {
    return withReleaseHeader(response);
  }
  const body = transform(await response.text());
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("x-security-layer", RELEASE);
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
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
      blockedIpCount: BLOCKED_IPS.size
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
    const clientIp = request.headers.get("cf-connecting-ip") || "";

    if (BLOCKED_IPS.has(clientIp)) return blockedResponse(request, "ip");
    if (isScannerProbe(path)) return blockedResponse(request, "scanner");

    if (request.method !== "GET" && request.method !== "HEAD") return withReleaseHeader(await baseHandler.fetch(request, env, ctx));
    if (url.hostname === "www.nereyebasvurulur.com") return withReleaseHeader(await baseHandler.fetch(request, env, ctx));

    if (path === "/health") return healthResponse(request, env, ctx);

    if (path === "/ara" || path === "/ara/") {
      const query = (url.searchParams.get("q") || "").slice(0, 160);
      const routeMatches = smartSearchRoutes(query, publishedRoutes, 60);
      const branchMatches = searchMilitaryBranches(query, 60);
      return searchResponse(renderSearch(query, routeMatches, branchMatches), request.method);
    }

    const response = await baseHandler.fetch(request, env, ctx);

    if (path === "/") {
      return transformHtmlResponse(response, request, body => insertBeforeFooter(body, renderHomeDeadlineRadar(new Date())));
    }

    const routeMatch = path.match(/^\/konu\/([^/]+)\/?$/);
    if (routeMatch) {
      const route = routeBySlug.get(routeMatch[1]);
      if (route && route.verificationStatus !== "needs-review") {
        return transformHtmlResponse(response, request, body => injectRouteLayer(body, renderRoutePreferenceLayer(route)));
      }
    }

    return withReleaseHeader(response);
  }
} satisfies ExportedHandler<Env>;