import { expect, test, describe, afterAll } from 'vitest';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'routes-config';

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('a')).toStrictEqual(['link to sales page']);
  });

  test('rewrite link', async () => {
    await page.push('/rewrite/overview');
    expect(await page.$$text('h2')).toStrictEqual(['overview all sale items']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
