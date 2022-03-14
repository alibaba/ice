import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import { Page } from '../utils/browser';

const example = 'basic-project';

describe(`build ${example}`, () => {
  let page: Page = null;
  let browser = null;

  buildFixture(example);

  test('open /', async () => {
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
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
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
