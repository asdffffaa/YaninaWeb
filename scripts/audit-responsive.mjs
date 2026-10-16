import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
    : {}),
});
const out = join(process.cwd(), '..', 'audit');
mkdirSync(out, { recursive: true });
const widths = [
  320, 360, 375, 390, 402, 430, 480, 640, 768, 820, 1024, 1025, 1100, 1199, 1200, 1280, 1366, 1439,
  1440, 1536, 1600, 1728, 1920, 2560, 3840,
];
const reports = [];
for (const w of widths) {
  const page = await browser.newPage({
    viewport: { width: w, height: 900 },
    reducedMotion: 'reduce',
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://127.0.0.1:5187/', { waitUntil: 'domcontentloaded' });
  await page.locator('#faq').waitFor();
  await page.evaluate(() => document.fonts.ready);
  const report = await page.evaluate(() => {
    const rect = (e) => {
      const r = e.getBoundingClientRect();
      return {
        x: Math.round(r.left),
        y: Math.round(r.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    };
    const sections = [
      ...document.querySelectorAll('main .section[id], main .hero[id], footer[id]'),
    ].map((s) => ({
      id: s.id,
      r: rect(s),
      children: [...s.children]
        .flatMap((e) => [e, ...e.children].slice(0, 20))
        .map((e) => ({
          id: e.getAttribute('data-node-id'),
          class: typeof e.className === 'string' ? e.className.slice(0, 24) : '',
          r: rect(e),
        }))
        .filter((e) => e.r.w > 0),
    }));
    const offscreen = [];
    document.querySelectorAll('a,button,input,h1,h2,h3').forEach((e) => {
      const r = e.getBoundingClientRect(),
        css = getComputedStyle(e);
      if (css.display === 'none' || css.visibility === 'hidden' || !r.width || !r.height) return;
      if (r.left < -5 || r.right > innerWidth + 5)
        offscreen.push({
          txt: (e.innerText || e.getAttribute('aria-label') || '')
            .replace(/\s+/g, ' ')
            .slice(0, 45),
          r: rect(e),
        });
    });
    return {
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      zoom: getComputedStyle(document.querySelector('#app-shell')).zoom,
      sections,
      offscreen: offscreen.slice(0, 40),
    };
  });
  reports.push({ w, errors, ...report });
  if ([320, 402, 820, 1100, 1280, 1440, 1920].includes(w))
    await page.screenshot({ path: join(out, `${w}-top.png`), animations: 'disabled' });
  console.log(w, 'offscreen', report.offscreen.length, 'errors', errors.length);
  await page.close();
}
writeFileSync(join(out, 'report.json'), JSON.stringify(reports, null, 2));
await browser.close();
