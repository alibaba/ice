import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'with-auth';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });

    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h1')).toStrictEqual(['Index']);
  }, 120000);

  test('open /blog', async () => {
    await page.push('/blog.html');
    expect(await page.$$text('#no-auth')).toStrictEqual(['无权限访问']);
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    const { devServer, port } = await startFixture(example, {
      mock: true,
      force: true,
      https: false,
      analyzer: false,
      open: false,
      mode: 'start',
    });
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h1')).toStrictEqual(['Index']);
  }, 120000);

  test('open /blog', async () => {
    await page.push('/blog');
    expect(await page.$$text('#no-auth')).toStrictEqual(['无权限访问']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
