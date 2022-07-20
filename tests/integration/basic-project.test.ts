import { expect, test, describe, afterAll } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import { Page } from '../utils/browser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
    expect(await page.$$text('#data-from')).toStrictEqual(['getStaticData']);

    const bundleContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/js/main.js`), 'utf-8');
    expect(bundleContent.includes('__REMOVED__')).toBe(false);
    expect(bundleContent.includes('__LOG__')).toBe(false);
    expect(bundleContent.includes('__WARN__')).toBe(false);
    expect(bundleContent.includes('__ERROR__')).toBe(true);
    expect(bundleContent.includes('__IS_WEB__')).toBe(true);
    expect(bundleContent.includes('__IS_NODE__')).toBe(false);
    expect(fs.existsSync(path.join(__dirname, `../../examples/${example}/build/favicon.ico`))).toBe(true);

    const dataLoaderPath = path.join(__dirname, `../../examples/${example}/build/js/data-loader.js`);
    // should not contain react
    const dataLoaderContent = fs.readFileSync(dataLoaderPath, 'utf-8');
    expect(dataLoaderContent.includes('createElement')).toBe(false);
    // size of data loader should be less than 14kib
    const stats = fs.statSync(dataLoaderPath);
    expect(stats.size).toBeLessThan(1024 * 14);
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
    expect(await page.$$text('#data-from')).toStrictEqual(['getServerData']);
  }, 120000);
  // TODO: fix waitForNetworkIdle not resolved
  test.skip('should update config during client routing', async () => {
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
