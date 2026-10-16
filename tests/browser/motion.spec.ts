import { test, expect } from '@playwright/test';

test('desktop dialog traps focus, fits a narrow window and restores scroll', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto('/');
  const card = page.locator('[data-product="kondyter-start"]');
  await card.scrollIntoViewIfNeeded();
  await card.focus();
  await card.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  // Clicking may scroll a scaled card into view first; the body lock records
  // the actual position at opening, which must be restored on closing.
  const scroll = await page.evaluate(() => -parseFloat(document.body.style.top));
  await expect(page.locator('#app-shell')).toHaveAttribute('inert', '');
  await expect(page.locator('.product-purchase')).toBeVisible();
  const box = (await dialog.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(900);
  expect(box.height).toBeLessThanOrEqual(900);
  expect(await page.locator('#course-title').evaluate((el) => getComputedStyle(el).fontSize)).toBe(
    '38px',
  );
  await page.locator('.product-purchase').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Закрити', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.product-purchase')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(scroll, 0);
  await expect(page.locator('#app-shell')).not.toHaveAttribute('inert', '');
});

test('before/after pauses while held and keeps keyboard controls', async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 900 });
  await page.goto('/');
  const slider = page.getByRole('slider', { name: 'Порівняти до і після' });
  await slider.scrollIntoViewIfNeeded();
  const box = (await slider.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  const active = await slider
    .locator('.m-comparison-pair[aria-hidden=false] img')
    .first()
    .getAttribute('src');
  // Real elapsed time: this guards the five-second auto-advance while pointer capture is held.
  await page.waitForTimeout(5300);
  expect(
    await slider.locator('.m-comparison-pair[aria-hidden=false] img').first().getAttribute('src'),
  ).toBe(active);
  await page.mouse.up();
  await expect
    .poll(
      () => slider.locator('.m-comparison-pair[aria-hidden=false] img').first().getAttribute('src'),
      { timeout: 6500 },
    )
    .not.toBe(active);
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(slider).toHaveAttribute('aria-valuenow', '0');
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveAttribute('aria-valuenow', '5');
  await page.keyboard.press('End');
  await expect(slider).toHaveAttribute('aria-valuenow', '100');
});

test('course carousel navigates after desktop resize', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await page.goto('/');
  const courses = page.locator('#courses');
  await courses.scrollIntoViewIfNeeded();
  await courses.locator('.carousel-arrow.next').click();
  await expect(courses.locator('.carousel-track')).toHaveAttribute('data-slide-index', '1');
  await page.setViewportSize({ width: 1024, height: 1000 });
  await expect(courses.locator('.carousel-track')).toHaveAttribute('data-slide-index', '1');
  await courses.locator('.carousel-arrow.next').click();
  await expect(courses.locator('.carousel-track')).toHaveAttribute('data-slide-index', '2');
  await courses.locator('.carousel-arrow.prev').click();
  await expect(courses.locator('.carousel-track')).toHaveAttribute('data-slide-index', '1');
  await courses.locator('.carousel-arrow.prev').click();
  await expect(courses.locator('.carousel-track')).toHaveAttribute('data-slide-index', '0');
  await expect(courses.locator('[data-product="kondyter-start"]')).toBeInViewport();
});
