import { test, expect } from '@playwright/test';

const cartKey = 'yanina-desktop-20260930-cart-v1';
test('checkout draft survives switching between mobile and desktop', async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 900 });
  await page.goto('/#/checkout');
  await page.locator('input[type=email]').fill('resize@example.com');
  await page.locator('.m-consent input').check();
  await page.getByRole('button', { name: 'Перейти до оплати', exact: true }).click();
  await page.getByRole('radio', { name: 'Google Pay' }).check();
  await page.locator('.m-consent input').last().check();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator('input[type=email]')).toHaveValue('resize@example.com');
  await expect(page.locator('.d152 > button').last()).toHaveAttribute('aria-pressed', 'true');
  await page.setViewportSize({ width: 402, height: 900 });
  await expect(page.getByRole('radio', { name: 'Google Pay' })).toBeChecked();
  await expect(page.getByRole('button', { name: /^Оплатити / })).toBeEnabled();
  await page.getByRole('button', { name: '← Змінити e-mail' }).click();
  await expect(page.locator('input[type=email]')).toHaveValue('resize@example.com');
});
for (const width of [320, 768, 1280, 1920]) {
  test.describe(`payment ${width}`, () => {
    test.use({ viewport: { width, height: 900 } });
    test('validation, methods, consent and demo notice', async ({ page }) => {
      await page.addInitScript(
        (key) => localStorage.setItem(key, JSON.stringify(['kondyter-start'])),
        cartKey,
      );
      await page.goto('/#/checkout');
      const email = page.locator('input[type=email]');
      await email.fill('invalid');
      expect(await email.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
      await email.fill('student@example.com');
      if (width < 768) {
        await page.locator('.m-consent input').check();
        await page.getByRole('button', { name: 'Перейти до оплати', exact: true }).click();
        const pay = page.getByRole('button', { name: /^Оплатити / });
        await expect(pay).toBeDisabled();
        for (const name of ['Apple Pay', 'Google Pay', 'Банківська картка']) {
          const radio = page.getByRole('radio', { name });
          await radio.check();
          await expect(radio).toBeChecked();
          await expect(page.locator('input[name=payment]:checked')).toHaveCount(1);
        }
        await page.locator('.m-consent input').last().check();
        await expect(pay).toBeEnabled();
        await page.locator('.m-consent input').first().uncheck();
        await expect(pay).toBeDisabled();
        await page.locator('.m-consent input').first().check();
        await pay.click();
        await expect(page.getByRole('status')).toContainText('Онлайн-оплату ще не підключено');
        await page.getByRole('button', { name: '← Змінити e-mail' }).click();
        await expect(email).toHaveValue('student@example.com');
      } else {
        const methods = page.locator('.d152 > button');
        for (let i = 0; i < 3; i++) {
          await methods.nth(i).click();
          await expect(methods.nth(i)).toHaveAttribute('aria-pressed', 'true');
          await expect(page.locator('.d152 > button[aria-pressed=true]')).toHaveCount(1);
        }
        const pay = page.getByRole('button', { name: /^Оплатити / });
        await page.locator('.checkout-consent input').uncheck();
        await expect(pay).toBeDisabled();
        await page.locator('.checkout-consent input').check();
        await pay.click();
        await expect(page.getByRole('status')).toContainText('Онлайн-оплату ще не підключено');
      }
      await expect(page.getByRole('button', { name: /Кошик:/ })).toHaveCount(0);
    });
    test('empty cart cannot proceed to payment', async ({ page }) => {
      await page.addInitScript((key) => localStorage.setItem(key, '[]'), cartKey);
      await page.goto('/#/checkout');
      await expect(
        page.getByRole('button', { name: width < 768 ? 'Перейти до оплати' : /^Оплатити / }),
      ).toBeDisabled();
    });
  });
}
