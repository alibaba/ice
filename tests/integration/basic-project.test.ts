import { expect, test, describe, afterAll } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import { Page } from '../utils/browser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const example = 'basic-project';

describe(`build ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('open /', async () => {
    await buildFixture(example);

    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
    const bundleContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/index.js`), 'utf-8');
    expect(bundleContent.includes('__REMOVED__')).toBe(false);
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
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
