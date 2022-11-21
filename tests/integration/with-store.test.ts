import * as path from 'path';
import * as fs from 'fs';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'with-store';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example, disableJS: false });
    page = res.page;
    browser = res.browser;
    await page.waitForFunction('document.getElementsByTagName(\'button\').length > 0');
    expect(await page.$$text('#username')).toStrictEqual(['name: icejs']);
    expect(await page.$$text('#count')).toStrictEqual(['0']);

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
