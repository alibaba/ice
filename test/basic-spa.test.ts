import { buildFixture, setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-spa';
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
});

afterAll(async () => {
  await browser.close();
});
