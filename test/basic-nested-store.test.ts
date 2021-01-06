import { buildFixture,setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-nested-store';
let page: IPage = null;
let browser = null;

buildFixture(example);

test('open /', async () => {
  const res = await setupBrowser({ example });
  page = res.page;
  browser = res.page;
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'Index Page...']);
  expect(await page.$$text('a')).toStrictEqual(['About']);
})

test('open /home/a', async () => {
  await page.push('#/home/a');

  expect(await page.$$text('h2')).toStrictEqual(['Header', 'Page A']);
  expect(await page.$$text('a')).toStrictEqual(['PageB']);
})

test('open /home/b', async () => {
  await page.push('#/home/b');

  expect(await page.$$text('h2')).toStrictEqual(['Header', 'Page B']);
  expect(await page.$$text('a')).toStrictEqual(['PageA', 'Index']);
})

test('open /about', async () => {
  await page.push('#/about');
  // lazy load
  expect(await page.html()).toContain('loading...');
  // wait for render
  await page.waitForFunction(`document.getElementsByTagName('strong').length > 1`);
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'About Page']);
  expect(await page.$$text('a')).toStrictEqual(['home']);
  expect(await page.html()).toContain('taobao');
  expect(await page.html()).toContain('123');
})
