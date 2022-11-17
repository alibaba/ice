import * as path from 'path';
import * as fs from 'fs';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';

const example = 'rax-project';

describe(`build ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });

    page = res.page;
    browser = res.browser;
    expect((await page.$$text('span')).length).toEqual(3);
    expect((await page.$$text('span'))[0]).toStrictEqual('Welcome to Your Rax App');
    expect((await page.$$text('span'))[1]).toStrictEqual('More information about Rax');
    expect((await page.$$text('span'))[2]).toStrictEqual('Visit https://rax.js.org');
    expect((await page.$$text('img')).length).toEqual(1);
    expect(fs.existsSync(path.join(__dirname, `../../examples/${example}/build/js/data-loader.js`))).toBe(false);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    await page.waitForFunction('document.getElementsByTagName(\'span\').length > 0');
    expect((await page.$$text('span')).length).toEqual(3);
    expect((await page.$$text('span'))[0]).toStrictEqual('Welcome to Your Rax App');
    expect((await page.$$text('span'))[1]).toStrictEqual('More information about Rax');
    expect((await page.$$text('span'))[2]).toStrictEqual('Visit https://rax.js.org');
    expect((await page.$$text('img')).length).toEqual(1);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
