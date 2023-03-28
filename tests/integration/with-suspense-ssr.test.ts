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

  test('open /with-data-error', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/with-data-error', false);
    expect((await page.$$text('.comment')).length).toEqual(3);
  });

  test('open /with-data-error without hydrate', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/with-data-error', true);
    expect((await page.$$text('.comment')).length).toEqual(0);
  });

  test('open /with-render-error', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/with-render-error', false);
    expect((await page.$$text('.comment')).length).toEqual(3);
  });

  test('open /with-render-error without hydrate', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/with-render-error', true);
    expect((await page.$$text('.comment')).length).toEqual(0);
  });

  test('open /with-fallback', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/with-fallback', false);
    expect(await page.$$text('#fallback')).toStrictEqual(['Something went wrong.']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
