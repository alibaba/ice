import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';

const example = 'rax-inline-style';

describe(`build ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });

    page = res.page;
    browser = res.browser;
    // inline index.module.less
    expect((await page.$$attr('img', 'style'))[0]).contain('height:24vw');
    // inline index.module.css
    expect((await page.$$attr('span', 'style'))[0]).contain('font-weight:bold');
    // inline css from node_modules
    expect((await page.$$attr('span', 'style'))[0]).contain('display:block');
    // inline index.css
    expect((await page.$$attr('span', 'style'))[1]).contain('color:rgb(85,85,85)');
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

    // inline index.module.less
    expect((await page.$$attr('img', 'style'))[0]).contain('height:24vw');
    // inline index.module.css
    expect((await page.$$attr('span', 'style'))[0]).contain('font-weight:bold');
    // inline css from node_modules
    expect((await page.$$attr('span', 'style'))[0]).contain('display:block');
    // inline index.css
    expect((await page.$$attr('span', 'style'))[1]).contain('color:rgb(85,85,85)');
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
