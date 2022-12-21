import { expect, test, describe, afterAll } from 'vitest';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'with-suspense-ssr';

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;
  let serverPort;

  test('open /', async () => {
    const { devServer, port } = await startFixture(example, {
      mock: true,
      force: true,
      https: false,
      analyzer: false,
      open: false,
      mode: 'start',
    });
    serverPort = port;
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page', 'Thanks for reading!']);
  });

  test('open /server-data-error', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/server-data-error', false);
    expect((await page.$$text('.comment')).length).toEqual(3);
  });

  test('open /server-data-error without hydrate', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/server-data-error', true);
    expect((await page.$$text('.comment')).length).toEqual(0);
  });

  test('open /server-render-error', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/server-data-error', false);
    expect((await page.$$text('.comment')).length).toEqual(3);
  });

  test('open /server-render-error without hydrate', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/server-data-error', true);
    expect((await page.$$text('.comment')).length).toEqual(0);
  });

  afterAll(async () => {
    await browser.close();
  });
});
