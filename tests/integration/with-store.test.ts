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
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
