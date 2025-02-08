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
  });
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
  });

  test('error page', async () => {
    await page.push('/ice/error');
    await page.waitForNetworkIdle();
    expect(await page.$$text('h1')).toStrictEqual(['Something went wrong.']);
  });

  afterAll(async () => {
    await browser.close();
  });
});

// describe(`start ${example} in speedup mode`, () => {
//   let page: Page;
//   let browser: Browser;
//   test('open /', async () => {
//     const { devServer, port } = await startFixture(example, { speedup: true });
//     const res = await setupStartBrowser({ server: devServer, port });
//     page = res.page;
//     browser = res.browser;
//     await page.push('/ice');
//     expect(await page.$$text('h1')).toStrictEqual(['home']);
//   });
//   afterAll(async () => {
//     await browser.close();
//   });
// });

describe(`build ${example} in speedup mode`, () => {
  test('open /', async () => {
    await buildFixture(example, { speedup: true });
  });
});
