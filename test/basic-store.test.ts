import { buildFixture,setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-store';
let page: IPage = null;
let browser = null;

buildFixture(example);

test('open /', async () => {
  const res = await setupBrowser({ example });
  page = res.page;
  browser = res.page;
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'basic store', 'Home Page']);
})

test('open /about', async () => {
  await page.push('#/about');
  // lazy load
  expect(await page.html()).toContain('loading...');
  // wait for render
  await page.waitForFunction(`document.getElementsByTagName('strong').length > 1`);
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'About Page']);
})
