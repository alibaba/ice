import * as path from 'path';
import { buildFixture, setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-mpa';
let page: IPage = null;
let browser = null;

buildFixture(example);

test('open /dashboard', async () => {
  const res = await setupBrowser({ example, defaultHtml: 'dashboard.html' });
  page = res.page;
  browser = res.page;
  expect(await page.$$text('h2')).toStrictEqual(['Dashboard Page...']);
});

test('open /detail', async () => {
  const res = await setupBrowser({ example, defaultHtml: 'detail.html' });
  page = res.page;
  browser = res.page;
  expect(await page.$$text('h2')).toStrictEqual(['Detail Page']);
});

test('open /home', async () => {
  const res = await setupBrowser({ example, defaultHtml: 'home.html' });
  page = res.page;
  browser = res.page;
  expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
});
