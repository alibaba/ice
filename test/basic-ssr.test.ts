import { buildFixture, setupBrowser } from './utils/build';
import { startFixture, setupStartBrowser } from './utils/start';
import { IPage } from './utils/browser';

const example = 'basic-ssr';

const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

describe(`start ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('main>h2')).toStrictEqual([ 'Home Page...']);
    expect(await page.$$text('main>div')).toStrictEqual([
      'counterState: 1',
      'name: Jack Ma',
      'id: 10001',
      'address: Hangzhou',
    ]);
    await delay(1000);
    expect(await page.$$text('main>strong')).toStrictEqual(['data: 4 5 6 7']);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
