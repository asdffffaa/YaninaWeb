import { test, expect } from '@playwright/test';

for (const width of [402, 1920]) {
  test.describe(`existing interactions ${width}`, () => {
    test.use({ viewport: { width, height: 1000 } });
    test('card opening, cart persistence and checkout', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto('/');
      const card = page.locator('[data-product="kondyter-start"]');
      await card.scrollIntoViewIfNeeded();
      await card.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      if (width < 768) {
        await expect(page.locator('.m-product-sheet')).toHaveClass(/is-peek/);
        await page.getByRole('button', { name: 'Розгорнути матеріал', exact: true }).click();
        await expect(page.locator('.m-product-sheet')).not.toHaveClass(/is-peek/);
      }
      await page.locator(width < 768 ? '.m-product-buy .m-primary' : '.product-purchase').click();
      await expect(page.locator('.cart-panel')).toBeVisible();
      await expect(page.locator('.cart-panel')).toContainText('Кондитер START');
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await page.reload();
      await page.getByRole('button', { name: /Кошик:/ }).click();
      await expect(page.locator('.cart-panel')).toContainText('Кондитер START');
      await page.locator('.cart-checkout').click();
      await expect(page.getByRole('button', { name: /Кошик:/ })).toHaveCount(0);
      if (width < 768) {
        const email = page.getByRole('textbox', { name: 'E-mail' });
        await expect(page.locator('.m-field input')).toHaveCount(1);
        await email.fill('student@example.com');
        await page.locator('.m-consent input').check();
        await page.getByRole('button', { name: 'Перейти до оплати', exact: true }).click();
        await page.getByRole('button', { name: '← Змінити e-mail', exact: true }).click();
        await expect(email).toHaveValue('student@example.com');
      }
      expect(errors).toEqual([]);
    });
    test('FAQ keeps heading steady; filter and payment controls work', async ({ page }) => {
      await page.goto('/');
      const q = page.locator('.faq-question').first();
      await q.scrollIntoViewIfNeeded();
      const height = (await q.boundingBox())!.height;
      await q.click();
      await expect(page.locator('.faq-reveal').first()).toHaveAttribute('aria-hidden', 'false');
      expect((await q.boundingBox())!.height).toBeCloseTo(height, 1);
      await q.click();
      await expect(page.locator('.faq-reveal').first()).toHaveAttribute('aria-hidden', 'true');
      const other = page.locator('#recipes').getByRole('button', { name: 'Інше', exact: true });
      await other.scrollIntoViewIfNeeded();
      await other.click();
      await expect(page.locator('#recipes')).toContainText('У цій категорії поки немає техкарт.');
      const payment = page
        .locator('#payment')
        .getByRole('button', { name: 'Переглянути умови' })
        .first();
      await payment.scrollIntoViewIfNeeded();
      await payment.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
    });
  });
}
