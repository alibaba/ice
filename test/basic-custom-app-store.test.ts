import { buildFixture,setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-custom-app-store';
let page: IPage = null;
let browser = null;

buildFixture(example);

test('open /', async () => {
  const res = await setupBrowser({ example });
  page = res.page;
  browser = res.page;
  expect(await page.$$text('h2')).toStrictEqual(['Header', 'HOME']);
})
