import { countLeaves, countLinkedLeaves, menuTree, publishedRoutes, routeBySlug, routes } from "./data";
import {
  militaryBranchByPath,
  militaryBranchPath,
  militaryBranches,
  militaryProvinceBySlug,
  militaryProvinces,
  searchMilitaryBranches,
  uniqueMilitaryBranchCount
} from "./military-branches";
import {
  renderDashboard,
  renderDataPage,
  renderHome,
  renderMilitaryBranch,
  renderMilitaryBranchAdmin,
  renderMilitaryBranchDirectory,
  renderMilitaryProvince,
  renderNotFound,
  renderRoute,
  renderSearch
} from "./ui";
import { renderPetitionBuilder } from "./petition";

type Env = {
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_AUTH_ORIGIN?: string;
};

const encoder = new TextEncoder();
const INDEXNOW_KEY = "b1493a8a691bb36804ec62b677f59d5b";
const SITE_ORIGIN = "https://nereyebasvurulur.com";
const GOOGLE_SITE_VERIFICATION = "5Vmhgh-JkZi7cm_gjUHEwjNymv-Sds3VmXmLpmDp3KU";
const YANDEX_SITE_VERIFICATION = "3fa0665bc8ba3bb6";

function timingSafeEqual(left: string, right: string): boolean {
  const a = encoder.encode(String(left));
  const b = encoder.encode(String(right));
  const length = Math.max(a.length, b.length, 1);
  let difference = a.length ^ b.length;
  for (let i = 0; i < length; i += 1) difference |= (a[i] || 0) ^ (b[i] || 0);
  return difference === 0;
}

function readBasicCredentials(request: Request): { username: string; password: string } | null {
  const header = request.headers.get("Authorization") || "";
  if (!header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return { username: decoded.slice(0, separator), password: decoded.slice(separator + 1) };
  } catch {
    return null;
  }
}

async function adminAuthorized(request: Request, env: Env): Promise<boolean> {
  const credentials = readBasicCredentials(request);
  if (!credentials) return false;

  if (env.ADMIN_USERNAME && env.ADMIN_PASSWORD) {
    return timingSafeEqual(credentials.username, env.ADMIN_USERNAME)
      && timingSafeEqual(credentials.password, env.ADMIN_PASSWORD);
  }

  const origin = env.ADMIN_AUTH_ORIGIN || "https://oltaatlasi.com/admin/dashboard/";
  try {
    const response = await fetch(origin, {
      method: "GET",
      headers: { Authorization: request.headers.get("Authorization") || "" },
      redirect: "manual"
    });
    return response.status >= 200 && response.status < 300;
  } catch {
    return false;
  }
}

function securityHeaders(headers: Headers, admin = false): Headers {
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("x-frame-options", "DENY");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  headers.set("content-security-policy", "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
  if (admin) headers.set("cache-control", "private, no-store");
  return headers;
}

function withSearchEngineVerification(body: string): string {
  if (!body.includes("<head>")) return body;
  return body.replace(
    "<head>",
    `<head><meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}"><meta name="yandex-verification" content="${YANDEX_SITE_VERIFICATION}">`
  );
}

function html(body: string, status = 200, admin = false): Response {
  return new Response(withSearchEngineVerification(body), {
    status,
    headers: securityHeaders(new Headers({
      "content-type": "text/html; charset=utf-8",
      "cache-control": admin ? "private, no-store" : "no-store, max-age=0"
    }), admin)
  });
}

function unauthorized(): Response {
  return new Response("Yönetim paneli için kimlik doğrulaması gerekiyor.", {
    status: 401,
    headers: securityHeaders(new Headers({
      "content-type": "text/plain; charset=utf-8",
      "WWW-Authenticate": 'Basic realm="Nereye Basvurulur Yonetim", charset="UTF-8"',
      "cache-control": "private, no-store"
    }), true)
  });
}

function normalize(value: string): string {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();
}

function searchRoutes(query: string) {
  const q = normalize(query);
  if (!q) return publishedRoutes;
  const terms = q.split(" ").filter(Boolean);
  return publishedRoutes
    .map(route => {
      const haystack = normalize([route.title, route.summary, route.category, ...route.aliases].join(" "));
      const score = terms.reduce((n, term) => n + (haystack.includes(term) ? 1 : 0), 0);
      return { route, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.route);
}

function xmlEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
}

function latestVerifiedDate(): string {
  return publishedRoutes.map(route => route.lastVerified).filter(Boolean).sort().at(-1) || "2026-08-21";
}

function sitemap(): string {
  const homeDate = latestVerifiedDate();
  const militaryDate = militaryBranches[0]?.lastVerified || homeDate;
  const entries = [
    `<url><loc>${SITE_ORIGIN}/</loc><lastmod>${xmlEscape(homeDate)}</lastmod></url>`,
    `<url><loc>${SITE_ORIGIN}/dilekce-olustur/</loc><lastmod>2026-08-21</lastmod></url>`,
    ...publishedRoutes.map(route => `<url><loc>${SITE_ORIGIN}/konu/${xmlEscape(route.slug)}/</loc><lastmod>${xmlEscape(route.lastVerified)}</lastmod></url>`),
    `<url><loc>${SITE_ORIGIN}/askerlik-subeleri/</loc><lastmod>${xmlEscape(militaryDate)}</lastmod></url>`,
    ...militaryProvinces.map(province => `<url><loc>${SITE_ORIGIN}/askerlik-subeleri/${xmlEscape(province.slug)}/</loc><lastmod>${xmlEscape(militaryDate)}</lastmod></url>`),
    ...militaryBranches.map(record => `<url><loc>${SITE_ORIGIN}${xmlEscape(militaryBranchPath(record))}</loc><lastmod>${xmlEscape(record.lastVerified)}</lastmod></url>`)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
}

function stats() {
  return {
    categories: menuTree.length,
    leaves: countLeaves(menuTree),
    linked: countLinkedLeaves(menuTree),
    routes: routes.length,
    published: publishedRoutes.length,
    verified: routes.filter(route => route.verificationStatus === "verified").length,
    localCheck: routes.filter(route => route.verificationStatus === "local-check").length,
    needsReview: routes.filter(route => route.verificationStatus === "needs-review").length,
    sources: routes.reduce((sum, route) => sum + route.sources.length, 0),
    highRisk: routes.filter(route => route.freshnessRisk === "high").length,
    militaryProvinces: militaryProvinces.length,
    militaryDistrictPages: militaryBranches.length,
    militaryPhysicalBranches: uniqueMilitaryBranchCount,
    militaryLastVerified: militaryBranches[0]?.lastVerified || ""
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);
    const isAdmin = path === "/admin" || path.startsWith("/admin/");

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }

    if (url.hostname === "www.nereyebasvurulur.com") {
      return Response.redirect(`${SITE_ORIGIN}${url.pathname}${url.search}`, 308);
    }

    if (isAdmin && !(await adminAuthorized(request, env))) return unauthorized();

    if (path === `/${INDEXNOW_KEY}.txt`) {
      return new Response(INDEXNOW_KEY, {
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=86400" }
      });
    }

    if (path === "/robots.txt") {
      return new Response(`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`, {
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" }
      });
    }

    if (path === "/sitemap.xml") {
      return new Response(sitemap(), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
    }

    if (path === "/health") {
      return new Response(JSON.stringify({ status: "ok", release: "v4-petition-builder", publicLaunch: true, petitionBuilder: true, indexNowKeyHosted: true, googleVerificationMeta: true, yandexVerificationMeta: true, ...stats() }), {
        headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
      });
    }

    if (path === "/") return html(renderHome(menuTree, publishedRoutes.length, militaryBranches.length, uniqueMilitaryBranchCount));

    if (path === "/dilekce-olustur" || path === "/dilekce-olustur/") {
      return html(renderPetitionBuilder());
    }

    if (path === "/ara" || path === "/ara/") {
      const query = (url.searchParams.get("q") || "").slice(0, 160);
      return html(renderSearch(query, searchRoutes(query), searchMilitaryBranches(query)));
    }

    if (path === "/askerlik-subeleri" || path === "/askerlik-subeleri/") {
      return html(renderMilitaryBranchDirectory(militaryProvinces, militaryBranches.length, uniqueMilitaryBranchCount));
    }

    const militaryDetailMatch = path.match(/^\/askerlik-subeleri\/([^/]+)\/([^/]+)\/?$/);
    if (militaryDetailMatch) {
      const record = militaryBranchByPath.get(`${militaryDetailMatch[1]}/${militaryDetailMatch[2]}`);
      const province = militaryProvinceBySlug.get(militaryDetailMatch[1]);
      return record && province ? html(renderMilitaryBranch(record, province)) : html(renderNotFound(), 404);
    }

    const militaryProvinceMatch = path.match(/^\/askerlik-subeleri\/([^/]+)\/?$/);
    if (militaryProvinceMatch) {
      const province = militaryProvinceBySlug.get(militaryProvinceMatch[1]);
      return province ? html(renderMilitaryProvince(province)) : html(renderNotFound(), 404);
    }

    if (path.startsWith("/konu/")) {
      const slug = path.slice("/konu/".length).replace(/\/$/, "");
      const route = routeBySlug.get(slug);
      return route ? html(renderRoute(route)) : html(renderNotFound(), 404);
    }

    if (path === "/admin" || path === "/admin/") {
      return Response.redirect(`${SITE_ORIGIN}/admin/dashboard/`, 302);
    }

    if (path === "/admin/dashboard" || path === "/admin/dashboard/") {
      return html(renderDashboard(stats(), routes), 200, true);
    }

    if (path === "/admin/data" || path === "/admin/data/") {
      return html(renderDataPage(routes), 200, true);
    }

    if (path === "/admin/askerlik-subeleri" || path === "/admin/askerlik-subeleri/") {
      return html(renderMilitaryBranchAdmin(militaryBranches), 200, true);
    }

    if (path === "/admin/api/data") {
      return new Response(JSON.stringify({ generatedAt: new Date().toISOString(), stats: stats(), menuTree, routes, militaryBranches }, null, 2), {
        headers: securityHeaders(new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": "private, no-store" }), true)
      });
    }

    return html(renderNotFound(), 404);
  }
};
