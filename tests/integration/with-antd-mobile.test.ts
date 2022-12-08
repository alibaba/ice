import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'with-antd-mobile';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example, disableJS: false });
    page = res.page;
    browser = res.browser;
    await page.waitForFunction('document.getElementsByTagName(\'h2\').length > 0');
    expect(await page.$$text('h2')).toStrictEqual(['Counter']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
