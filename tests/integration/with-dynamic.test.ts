import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test, describe, afterAll, beforeAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const example = 'with-dynamic';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  beforeAll(async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });

    page = res.page;
    browser = res.browser;
  });

  describe('normal case', () => {
    test('basic case', async () => {
      const htmlPath = '/normal/basic.html';
      await page.push(htmlPath);
      const htmlContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build${htmlPath}`), 'utf-8');

      expect(htmlContent.includes('"renderMode":"SSG"')).toBe(true);
      expect(htmlContent.includes('<!--$?--><template id="B:0"></template><div>normal fallback</div>')).toBe(true);
      expect(htmlContent.includes('<div hidden id="S:0"><div>normal text</div>')).toBe(true);
    });

    test('should support call w/ a bare import', async () => {
      const htmlPath = '/normal/bare-import.html';
      await page.push(htmlPath);
      const htmlContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build${htmlPath}`), 'utf-8');

      expect(htmlContent.includes('"renderMode":"SSG"')).toBe(true);
      expect(htmlContent.includes('<!--$?--><template id="B:0"></template><div>bare import fallback</div>')).toBe(true);
      expect(htmlContent.includes('<div hidden id="S:0"><div>normal text</div>')).toBe(true);
    });
  });

  describe('non-ssr pkg case', () => {
    test('should downgrade when ssr w/o fallback', async () => {
      const htmlPath = '/nonssr/ssr-no-fallback.html';
      await page.push(htmlPath);
      const htmlContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build${htmlPath}`), 'utf-8');

      expect(await page.$$text('#app')).toStrictEqual(['']);
      expect(htmlContent.includes('"renderMode":"CSR"')).toBe(true);
      expect(htmlContent.includes('"downgrade":true')).toBe(true);
    });

    test('should not downgrade when no ssr no fallback', async () => {
      const htmlPath = '/nonssr/no-ssr-no-fallback.html';
      await page.push(htmlPath);
      const htmlContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build${htmlPath}`), 'utf-8');
      expect(await page.$$text('#app')).toStrictEqual(['']);
      expect(htmlContent.includes('"renderMode":"SSG"')).toBe(true);
      expect(htmlContent.includes('"downgrade":true')).toBe(false);
    });

    test('should not downgrade and display fallback when no ssr with fallback', async () => {
      const htmlPath = '/nonssr/no-ssr-fallback.html';
      await page.push(htmlPath);
      const htmlContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build${htmlPath}`), 'utf-8');
      expect(await page.$$text('#app')).toStrictEqual(['fallback']);
      expect(htmlContent.includes('"renderMode":"SSG"')).toBe(true);
      expect(htmlContent.includes('"downgrade":true')).toBe(false);
    });

    test('should downgrade w/o using dynamic', async () => {
      const htmlPath = '/nonssr/without-dynamic.html';
      await page.push(htmlPath);
      const htmlContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build${htmlPath}`), 'utf-8');

      expect(await page.$$text('#app')).toStrictEqual(['']);
      expect(htmlContent.includes('"renderMode":"CSR"')).toBe(true);
      expect(htmlContent.includes('"downgrade":true')).toBe(true);
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
