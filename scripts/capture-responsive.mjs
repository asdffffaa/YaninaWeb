import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const state = process.argv[2] ?? 'baseline';
const out = join(process.cwd(), '..', state);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    'C:/Users/Lenovo/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe',
});
const widths = [402, 820, 1100, 1920];
const metrics = [];
for (const width of widths) {
  console.log(`Checking ${width}px`);
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5187/', { waitUntil: 'domcontentloaded' });
  await page.locator('#faq').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: join(out, `${width}.png`),
    fullPage: true,
    animations: 'disabled',
    timeout: 30000,
  });
  const data = await page.evaluate(() => ({
    viewport: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    canvas: {
      width: document.querySelector('#app-shell')?.getBoundingClientRect().width,
      zoom: getComputedStyle(document.querySelector('#app-shell')).zoom,
    },
    sections: [...document.querySelectorAll('main .section[id], main .hero[id]')].map((el) => ({
      id: el.id,
      x: Math.round(el.getBoundingClientRect().x),
      width: Math.round(el.getBoundingClientRect().width),
      height: Math.round(el.getBoundingClientRect().height),
    })),
  }));
  metrics.push(data);
  await page.close();
}
writeFileSync(join(out, 'metrics.json'), JSON.stringify(metrics, null, 2));
await browser.close();
