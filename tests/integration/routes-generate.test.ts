import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'routes-generate';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Home']);
  });

  test('define extra routes', async () => {
    await page.push('/about-me.html');
    expect(await page.$$text('h1')).toStrictEqual([]);
    expect(await page.$$text('h2')).toStrictEqual(['About']);

    await page.push('/product.html');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Products Page']);
  });

  test('page layout', async () => {
    await page.push('/dashboard/a.html');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Dashboard']);
    expect(await page.$$text('h3')).toStrictEqual(['A page']);

    await page.push('/dashboard/b.html');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Dashboard']);
    expect(await page.$$text('h3')).toStrictEqual(['B page']);
  });

  // TODO: dynamic-routes test
  test.todo('dynamic routes', async () => {});

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Home']);
  });

  test('define extra routes', async () => {
    await page.push('/about-me');
    expect(await page.$$text('h1')).toStrictEqual([]);
    expect(await page.$$text('h2')).toStrictEqual(['About']);

    await page.push('/product');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Products Page']);
  });

  test('page layout', async () => {
    await page.push('/dashboard/a');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Dashboard']);
    expect(await page.$$text('h3')).toStrictEqual(['A page']);

    await page.push('/dashboard/b');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Dashboard']);
    expect(await page.$$text('h3')).toStrictEqual(['B page']);
  });

  test('dynamic routes layout', async () => {
    await page.push('/detail/a');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Detail id: a']);

    await page.push('/detail/b');
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Detail id: b']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
