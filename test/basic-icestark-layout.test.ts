import { buildFixture, setupBrowser } from './utils/build';
import { startFixture, setupStartBrowser } from './utils/start';
import { IPage } from './utils/browser';

const example = 'icestark-layout';

describe(`build ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  buildFixture(example);

  test('test SPA addProvider', async () => {
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    const length = (await page.$$('.next-fd-shell')).length;
    console.log('test SPA addProvider length', length);
    expect(length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  test('test SPA addProvider', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    const length = (await page.$$('.next-fd-shell')).length;
    console.log('test SPA addProvider length', length);
    console.log('next-shell length', (await page.$$('.next-shell')).length);
    expect(length).toBeGreaterThan(0);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
