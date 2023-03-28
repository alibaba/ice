import { expect, test, describe, afterAll } from 'vitest';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'with-ssg';

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
    expect(await page.$$text('.price')).toStrictEqual(['99.99']);
  });

  test('disable hydrate', async () => {
    const page = await browser.page(`http://127.0.0.1:${serverPort}`, '/', true);
    expect(await page.$$text('.price')).toStrictEqual(['0.00']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
