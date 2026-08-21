// @ts-nocheck -- Runs under Node through tsx; the Worker bundle intentionally omits Node typings.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { routes } from "../src/data";

const execFileAsync = promisify(execFile);
const urls = Array.from(new Set(routes.flatMap(route => route.sources.map(source => source.url))));
const failures: string[] = [];
let cursor = 0;

async function worker(): Promise<void> {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    try {
      const { stdout } = await execFileAsync("curl", [
        "--location", "--fail", "--silent", "--show-error", "--max-time", "30",
        "--range", "0-65535",
        "--user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36",
        "--output", "/dev/null", "--write-out", "%{http_code}\t%{url_effective}", url
      ]);
      const [status, effectiveUrl] = stdout.trim().split("\t");
      const invalidRedirect = /mevzuat\.gov\.tr\/(?:anasayfa\/)?errorpage/i.test(effectiveUrl);
      if (!/^2\d\d$/.test(status) || invalidRedirect) failures.push(`${status} ${url} -> ${effectiveUrl}`);
    } catch (error) {
      const detail = error?.stderr?.trim() || error?.message || String(error);
      failures.push(`ERR ${url} -> ${detail}`);
    }
  }
}

await Promise.all(Array.from({ length: 6 }, () => worker()));
if (failures.length) {
  console.error(failures.join("\n"));
  throw new Error(`${failures.length}/${urls.length} benzersiz resmî kaynak doğrulanamadı.`);
}
console.log(`${urls.length} benzersiz resmî kaynak erişilebilir ve hata sayfasına yönlenmiyor.`);
