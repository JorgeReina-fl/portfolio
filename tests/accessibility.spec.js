import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Projects', url: '/projects' },
    { name: 'Contact', url: '/contact' },
];

test.describe('Accessibility Tests', () => {
    for (const page of pages) {
        test(`${page.name} page should not have accessibility violations`, async ({ page: playwrightPage }) => {
            await playwrightPage.goto(page.url);

            // Wait for page to be fully loaded and animations to finish
            await playwrightPage.waitForLoadState('networkidle');
            // Give Framer Motion time to finish initial animations
            await playwrightPage.waitForTimeout(1000);

            // Run axe accessibility scan
            const accessibilityScanResults = await new AxeBuilder({ page: playwrightPage })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze();

            // Assert no violations
            expect(accessibilityScanResults.violations).toEqual([]);
        });

        test(`${page.name} page should have proper heading structure`, async ({ page: playwrightPage }) => {
            await playwrightPage.goto(page.url);
            await playwrightPage.waitForLoadState('networkidle');
            // Wait for h1 to be visible/attached (Framer Motion might delay it)
            await playwrightPage.waitForSelector('h1', { state: 'attached', timeout: 5000 });

            // Check for h1
            const h1Count = await playwrightPage.locator('h1').count();
            expect(h1Count).toBeGreaterThan(0);
            expect(h1Count).toBeLessThanOrEqual(1); // Should have exactly one h1
        });

        test(`${page.name} page should have proper lang attribute`, async ({ page: playwrightPage }) => {
            await playwrightPage.goto(page.url);

            const htmlLang = await playwrightPage.getAttribute('html', 'lang');
            expect(htmlLang).toBeTruthy();
            expect(htmlLang).toBe('es');
        });

        test(`${page.name} page should have meta description`, async ({ page: playwrightPage }) => {
            await playwrightPage.goto(page.url);

            const metaDescription = await playwrightPage.getAttribute('meta[name="description"]', 'content');
            expect(metaDescription).toBeTruthy();
            expect(metaDescription.length).toBeGreaterThan(50);
        });
    }

    test('All interactive elements should be keyboard accessible', async ({ page }) => {
        await page.goto('/');

        // Test navigation links - only those that are visible (mobile vs desktop)
        const navLinks = page.locator('nav a').filter({ visible: true });
        const count = await navLinks.count();

        for (let i = 0; i < count; i++) {
            const link = navLinks.nth(i);
            await link.focus();
            const isFocused = await link.evaluate(el => el === document.activeElement);
            expect(isFocused).toBe(true);
        }
    });

    test('Color contrast should meet WCAG AA standards', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2aa'])
            .include('body')
            .analyze();

        const contrastViolations = accessibilityScanResults.violations.filter(
            v => v.id === 'color-contrast'
        );

        expect(contrastViolations).toEqual([]);
    });
});
