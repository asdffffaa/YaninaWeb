import { test, expect } from '@playwright/test';

const widths = [320, 360, 402, 640, 768, 1024, 1280, 1440, 1920, 2560];
for (const width of widths) {
  test.describe(`responsive ${width}`, () => {
    test.use({ viewport: { width, height: 1000 }, contextOptions: { reducedMotion: 'reduce' } });
    test('navigation, typography, headings and checkout fit', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto('/');
      await page.locator('#faq').waitFor();
      await page.evaluate(() => document.fonts.ready);
      // Preserve the original canvas and proportions, rather than stretch sections.
      const canvas = await page.locator('#app-shell').evaluate((el) => ({
        width: (el as HTMLElement).offsetWidth,
        zoom: Number(getComputedStyle(el).zoom),
        viewport: document.documentElement.clientWidth,
      }));
      expect(canvas.width).toBe(width < 768 ? 402 : 1920);
      expect(canvas.zoom).toBeCloseTo(
        width < 768 ? Math.min(480, canvas.viewport) / 402 : Math.min(1, canvas.viewport / 1920),
        4,
      );
      if (width >= 768) {
        const nav = page.getByRole('navigation', { name: 'Головна навігація' });
        expect(await nav.locator('a[data-section]').count()).toBe(7);
        const more = page.locator('.nav-more-toggle');
        if (await more.isVisible()) {
          await more.click();
          await expect(page.locator('.nav-more-links')).toBeVisible();
          await page.keyboard.press('Escape');
          await expect(more).toBeFocused();
          await more.click();
          await page.locator('.nav-more-links a').last().click();
          await expect(page.locator('.nav-more-links')).toBeHidden();
        }
        const navBounds = await nav.boundingBox();
        for (const link of await nav.locator(':scope > a:visible, .nav-more-toggle').all()) {
          const box = (await link.boundingBox())!;
          expect(box.x).toBeGreaterThanOrEqual(navBounds!.x - 1);
          expect(box.x + box.width).toBeLessThanOrEqual(navBounds!.x + navBounds!.width + 1);
          if (!(await link.evaluate((e) => e.classList.contains('nav-burger'))))
            expect(await link.evaluate((e) => getComputedStyle(e).fontSize)).toBe('18px');
        }
      }
      for (const id of ['courses', 'lessons', 'results', 'faq']) {
        const section = page.locator('#' + id);
        await section.scrollIntoViewIfNeeded();
        const heading = section.locator('h2').first();
        const h = await heading.boundingBox();
        expect(h, id).not.toBeNull();
        expect(h!.x, id).toBeGreaterThanOrEqual(-1);
        expect(h!.x + h!.width, id).toBeLessThanOrEqual(width + 1);
        const overlap = await heading.evaluate((el) => {
          const range = document.createRange();
          range.selectNodeContents(el);
          const h = range.getBoundingClientRect();
          const next = el.nextElementSibling;
          if (!next || next.tagName !== 'P') return false;
          const p = next.getBoundingClientRect();
          return p.top >= h.top && p.top < h.bottom - 1;
        });
        expect(overlap, id + ' description must not overlap heading').toBe(false);
      }
      await page.goto('/#/checkout');
      await page.locator('input[type=email]').waitFor();
      const email = page.locator('input[type=email]');
      const box = (await email.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      if (width >= 768) {
        const summary = (await page.locator('.checkout-summary').boundingBox())!;
        for (const price of await page.locator('.checkout-summary .product-price').all()) {
          const p = (await price.boundingBox())!;
          expect(p.x + p.width).toBeLessThanOrEqual(summary.x + summary.width);
        }
      }
      expect(errors).toEqual([]);
    });
  });
}
