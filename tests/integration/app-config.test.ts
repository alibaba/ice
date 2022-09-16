import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'app-config';

describe(`build ${example}`, () => {
  test('open /', async () => {
    await buildFixture(example);
    await setupBrowser({ example });
  }, 120000);
});

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    await page.push('/ice');
    expect(await page.$$text('h1')).toStrictEqual(['home']);
  }, 120000);

  test('error page', async () => {
    await page.push('/ice/error');
    await page.waitForNetworkIdle();
    expect(await page.$$text('h1')).toStrictEqual(['Something went wrong.']);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
