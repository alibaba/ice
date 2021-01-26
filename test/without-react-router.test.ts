import { buildFixture, setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'without-react-router';
let page: IPage = null;
let browser = null;

buildFixture(example);

test('open /', async () => {
  const res = await setupBrowser({ example, defaultHtml: 'home.html' });
  page = res.page;
  browser = res.browser;
  expect(await page.$text('h2')).toStrictEqual('Home Page');
});

afterAll(async () => {
  await browser.close();
});
