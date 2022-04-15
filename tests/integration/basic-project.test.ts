import { expect, test, describe, afterAll } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import { Page } from '../utils/browser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const example = 'basic-project';

describe(`build ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
    const bundleContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/js/main.js`), 'utf-8');
    expect(bundleContent.includes('__REMOVED__')).toBe(false);
    expect(bundleContent.includes('__LOG__')).toBe(false);
    expect(bundleContent.includes('__WARN__')).toBe(false);
    expect(bundleContent.includes('__ERROR__')).toBe(true);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
  }, 120000);

  test('should update config during client routing', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;

    expect(
      await page.title()
    ).toBe('Home');

    expect(
      await page.$$attr('meta[name="theme-color"]', 'content')
    ).toStrictEqual(['#000']);

    await page.click('a[href="/about"]');
    await page.waitForNetworkIdle();

    expect(
      await page.title()
    ).toBe('About');

    expect(
      await page.$$attr('meta[name="theme-color"]', 'content')
    ).toStrictEqual(['#eee']);

    expect(
      await page.$$eval('link[href*="bootstrap"]', (els) => els.length)
    ).toBe(1);

    expect(
      await page.$$eval('script[src*="lodash"]', (els) => els.length)
    ).toBe(1);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
