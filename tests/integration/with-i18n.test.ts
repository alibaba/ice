import * as path from 'path';
import * as fs from 'fs';
import glob from 'glob';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const example = 'with-i18n';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('generate html files with locales', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example, disableJS: false });
    page = res.page;
    browser = res.browser;
    const distDir = path.join(__dirname, `../../examples/${example}/build`);
    const htmlFiles = glob.sync('**/*.html', { cwd: distDir });

    expect(htmlFiles).toEqual([
      'blog.html',
      'blog/a.html',
      'en-US.html',
      'en-US/blog.html',
      'en-US/blog/a.html',
      'index.html',
    ]);
  });

  test('visit / page and get the zh-CN locale page', async () => {
    expect(await page.$$text('#button')).toStrictEqual(['普通按钮']);
  });

  test('visit /en-US page and get the en-US locale page', async () => {
    await page.push('/en-US.html');
    expect(await page.$$text('#button')).toStrictEqual(['Normal Button']);
  });

  afterAll(async () => {
    await browser.close();
  });
});