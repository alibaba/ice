import { buildFixture,setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-custom-store';
let page: IPage = null;
let browser = null;

buildFixture(example);

test('open /', async () => {
  const res = await setupBrowser({ example });
  page = res.page;
  browser = res.browser;
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'HOME']);
  expect(await page.$$text('div>span')).toStrictEqual(['0']);
  await page.click('button');
  expect(await page.$$text('div>span')).toStrictEqual(['1']);
});

afterAll(async () => {
  await browser.close();
});
