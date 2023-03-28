import { expect, test, describe, afterAll } from 'vitest';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'icestark-layout';

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
  });

  test('open /seller', async () => {
    await page.push('/seller');
    await page.waitForFunction('document.getElementsByTagName(\'h3\').length > 0');

    expect(await page.$$text('h3')).toStrictEqual(['商家平台']);
  });

  test('open /waiter', async () => {
    await page.push('/waiter');
    await page.waitForFunction('document.getElementsByTagName(\'h1\').length > 0');

    expect(await page.$$text('h1')).toStrictEqual(['Hello Vite + icestark + Vue3!']);
  });

  test('open /', async () => {
    await page.push('/');
    await page.waitForFunction('document.getElementsByTagName(\'h2\').length > 0');

    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
