import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = 'with-data-loader';

describe(`build ${example}`, () => {
  test('data-loader build file', async () => {
    await buildFixture(example);
    const content = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/js/data-loader.js`), 'utf-8');
    expect(content.includes('console.log("target, renderer:","web","client")')).toBe(true);
  });
});

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('should call data loader for each navigator', async () => {
    const { devServer, port } = await startFixture(example, {
      mock: true,
      force: true,
      https: false,
      analyzer: false,
      open: false,
      mode: 'start',
    });
    const res = await setupStartBrowser({ server: devServer, port, defaultPath: '/blog1' });
    page = res.page;
    browser = res.browser;
    const timeStampForRouter1 = (await page.$$text('#timestamp'))[0];

    await page.push('/blog2');
    await page.waitForNetworkIdle();
    const timeStampForRouter2 = (await page.$$text('#timestamp'))[0];

    await page.push('/blog1');
    await page.waitForNetworkIdle();
    const timeStampForRouter3 = (await page.$$text('#timestamp'))[0];

    expect(timeStampForRouter2).not.toStrictEqual(timeStampForRouter1);
    expect(timeStampForRouter3).not.toStrictEqual(timeStampForRouter1);
  });

  test('should work with deferred data loader', async () => {
    await page.push('/with-defer-loader');
    await page.waitForNetworkIdle();
    const data = (await page.$$text('#itemId'))[0];

    expect(data).toEqual('1233');
  });

  afterAll(async () => {
    await browser.close();
  });
});
