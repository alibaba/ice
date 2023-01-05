import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';

const example = 'multi-target';

describe(`build ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('open /about', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example, defaultHtml: 'about.html' });

    page = res.page;
    browser = res.browser;
    // Compare text.
    expect((await page.$$text('#about'))[0]).contains('Target=web Renderer=server');
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port, defaultPath: '/about' });
    page = res.page;
    browser = res.browser;

    expect((await page.$$text('#about'))[0]).contains('Target=web Renderer=client');
  });

  afterAll(async () => {
    await browser.close();
  });
});
