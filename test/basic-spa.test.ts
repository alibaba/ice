import { buildFixture, setupBrowser } from './utils/build';
import { startFixture, setupStartBrowser } from './utils/start';
import { IPage } from './utils/browser';

const example = 'basic-spa';

describe(`build ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  buildFixture(example);

  test('open /', async () => {
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['SPA', 'Home Page...1']);
  });

  test('open /dashboard', async () => {
    await page.push('#/dashboard');
    // lazy load
    expect(await page.html()).toContain('加载中...');
    // wait for render
    await page.waitForFunction(`document.getElementsByTagName('h2').length > 1`);
    expect(await page.$$text('h2')).toStrictEqual(['SPA', 'Dashboard Page...']);

    // pageConfig props
    expect(await page.$$text('#J_pageConfig-custom')).toStrictEqual(['foo']);
  });

  test('open /a.html', async () => {
    await page.push('#/a.html');
    expect(await page.$$text('h2')).toStrictEqual(['SPA', 'Home Page...1']);
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['SPA', 'Home Page...1']);
  }, 120000);

  test('open /dashboard', async () => {
    await page.push('#/dashboard');
    // lazy load
    expect(await page.html()).toContain('加载中...');
    // wait for render
    await page.waitForFunction(`document.getElementsByTagName('h2').length > 1`);
    expect(await page.$$text('h2')).toStrictEqual(['SPA', 'Dashboard Page...']);

    // pageConfig props
    expect(await page.$$text('#J_pageConfig-custom')).toStrictEqual(['foo']);
  });

  test('open /a.html', async () => {
    await page.push('#/a.html');
    expect(await page.$$text('h2')).toStrictEqual(['SPA', 'Home Page...1']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
