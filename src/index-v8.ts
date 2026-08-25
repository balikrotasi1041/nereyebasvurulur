import baseHandler from "./index-v7";

const SITE_ORIGIN = "https://nereyebasvurulur.com";
const RELEASE = "v8-bot-hardening-2026-08-25";

const LEGACY_SCRIPT_PROBE = /\.(?:php\d*|phtml|phar|asp|aspx|jsp|cgi|pl)(?:\/|$)/i;
const SENSITIVE_FILE_PROBE = /(^|\/)(?:\.DS_Store|web\.config|composer\.(?:json|lock)|package(?:-lock)?\.json|pnpm-lock\.yaml|yarn\.lock)(?:\/|$)/i;
const SERVER_PROBE = /(^|\/)(?:server-status|server-info)(?:\/|$)/i;

function hardeningHeaders(headers: Headers): Headers {
  headers.set("strict-transport-security", "max-age=31536000; includeSubDomains");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("x-dns-prefetch-control", "off");
  headers.set("x-security-layer", RELEASE);
  return headers;
}

function safePathname(url: URL): string | null {
  try {
    return decodeURIComponent(url.pathname);
  } catch {
    return null;
  }
}

function isAutomatedProbe(path: string): boolean {
  return LEGACY_SCRIPT_PROBE.test(path) || SENSITIVE_FILE_PROBE.test(path) || SERVER_PROBE.test(path);
}

function probeResponse(method: string): Response {
  return new Response(method === "HEAD" ? null : "Not Found", {
    status: 404,
    headers: hardeningHeaders(new Headers({
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
      "x-robots-tag": "noindex, nofollow, noarchive",
      "content-security-policy": "default-src 'none'; frame-ancestors 'none'"
    }))
  });
}

function badRequest(method: string): Response {
  return new Response(method === "HEAD" ? null : "Bad Request", {
    status: 400,
    headers: hardeningHeaders(new Headers({
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive"
    }))
  });
}

function withResponseHeaders(response: Response, mutate: (headers: Headers) => void): Response {
  const headers = new Headers(response.headers);
  mutate(headers);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

async function healthResponse(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const upstream = await baseHandler.fetch(request, env, ctx);
  if (upstream.status !== 200) return upstream;

  let announcementFeed = false;
  let announcements = 0;
  try {
    const data = await upstream.json() as Record<string, unknown>;
    announcementFeed = data.announcementFeed === true;
    announcements = typeof data.announcements === "number" ? data.announcements : 0;
  } catch {
    // Health remains intentionally minimal even if the upstream payload changes.
  }

  const body = JSON.stringify({
    status: "ok",
    release: RELEASE,
    announcementFeed,
    announcements,
    security: {
      scannerProbeBlocking: true,
      legacyScriptProbeBlocking: true,
      sensitiveFileProbeBlocking: true,
      publicHealthMinimized: true,
      searchResultsNoindex: true,
      versionedEdgeCache: true,
      ipBlocklist: false
    }
  });

  return new Response(request.method === "HEAD" ? null : body, {
    status: 200,
    headers: hardeningHeaders(new Headers({
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-robots-tag": "noindex, nofollow, noarchive"
    }))
  });
}

function robotsResponse(method: string): Response {
  const body = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /health\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
  return new Response(method === "HEAD" ? null : body, {
    status: 200,
    headers: hardeningHeaders(new Headers({
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }))
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = safePathname(url);
    if (path === null) return badRequest(request.method);

    if (isAutomatedProbe(path)) return probeResponse(request.method);
    if (path === "/health") return healthResponse(request, env, ctx);
    if (path === "/robots.txt") return robotsResponse(request.method);

    const response = await baseHandler.fetch(request, env, ctx);

    if (path === "/ara" || path === "/ara/") {
      return withResponseHeaders(response, headers => {
        headers.set("cache-control", "private, no-store");
        headers.set("x-robots-tag", "noindex, follow, noarchive");
        headers.set("x-security-layer", RELEASE);
      });
    }

    if (response.status >= 400) {
      return withResponseHeaders(response, headers => {
        headers.set("x-robots-tag", "noindex, nofollow, noarchive");
        headers.set("x-security-layer", RELEASE);
      });
    }

    return withResponseHeaders(response, headers => {
      headers.set("x-security-layer", RELEASE);
    });
  }
} satisfies ExportedHandler<Env>;
