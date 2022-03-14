import { buildFixture,setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-store';
let page: IPage = null;
let browser = null;

buildFixture(example);

test('open /', async () => {
  const res = await setupBrowser({ example });
  page = res.page;
  browser = res.browser;
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'basic store', 'Home Page']);
  expect(await page.$$text('div>span')).toStrictEqual(['0']);
  await page.click('#increment');
  expect(await page.$$text('div>span')).toStrictEqual(['1']);
})

test('open /about', async () => {
  await page.push('#/about');
  // wait for render
  await page.waitForFunction(`document.getElementsByTagName('strong').length > 1`);
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'About Page']);
})
