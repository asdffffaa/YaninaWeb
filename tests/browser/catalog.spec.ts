import { test, expect } from '@playwright/test';

for (const width of [402, 1024]) {
  test(`catalogue expands, filters and returns to compact view at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const section = page.locator('#recipes');
    const toggle = section.locator(width < 768 ? '.m-catalog-toggle' : '.catalog-toggle');
    await toggle.scrollIntoViewIfNeeded();
    const original = (await section.boundingBox())!.height;
    await toggle.click();
    await expect(section.locator(width < 768 ? '.m-expanded-grid' : '.tech-grid')).toBeVisible();
    await expect
      .poll(async () => (await section.boundingBox())!.height)
      .toBeGreaterThan(original + 100);
    await expect(toggle).toBeEnabled();
    // Wait for the complete opening before exercising the reverse animation.
    await expect(section).not.toHaveClass(/catalog-animating/);
    await toggle.click();
    await expect(section.locator(width < 768 ? '.m-expanded-grid' : '.tech-grid')).toHaveCount(0);
    await expect.poll(async () => (await section.boundingBox())!.height).toBeCloseTo(original, 0);
    await section.getByRole('button', { name: 'Інше', exact: true }).click();
    await expect(section).toContainText('У цій категорії поки немає техкарт.');
    await section.getByRole('button', { name: 'Усі', exact: true }).click();
    await expect(section.locator('.small-card').first()).toBeVisible();
  });
}

for (const width of [320, 768, 1280, 1920]) {
  test(`catalogue text fits cards and build retains images at ${width}`, async ({
    page,
    request,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#footer').waitFor();
    await page.evaluate(() => document.fonts.ready);
    for (const id of ['lessons', 'recipes']) {
      const section = page.locator('#' + id);
      await section.scrollIntoViewIfNeeded();
      const failures = await section.locator('.small-card').evaluateAll((cards, viewport) => {
        return cards.flatMap((card) => {
          const b = card.getBoundingClientRect();
          if (b.left < 0 || b.right > viewport) return [];
          const title = card.querySelector('h3')!;
          const range = document.createRange();
          range.selectNodeContents(title);
          const h = range.getBoundingClientRect();
          const description = card.querySelector('.small-description')!.getBoundingClientRect();
          const button = card.querySelector('.small-details')!.getBoundingClientRect();
          return h.right > b.right - 4 ||
            h.left < b.left ||
            description.top < h.bottom - 3 ||
            button.bottom > b.bottom - 4
            ? [title.textContent]
            : [];
        });
      }, width);
      expect(failures, id).toEqual([]);
    }
    const sources = await page
      .locator('img')
      .evaluateAll((images) => [
        ...new Set(
          images
            .map((img) => (img as HTMLImageElement).src)
            .filter((src) => src.startsWith(location.origin + '/assets/')),
        ),
      ]);
    const missing: string[] = [];
    // HEAD verifies deployment pruning without redownloading the image collection.
    for (let i = 0; i < sources.length; i += 12) {
      await Promise.all(
        sources.slice(i, i + 12).map(async (src) => {
          const response = await request.head(src);
          if (!response.ok()) missing.push(src);
        }),
      );
    }
    expect(missing).toEqual([]);
  });
}
