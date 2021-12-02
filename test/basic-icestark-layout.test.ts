import * as path from 'path';
import { buildFixture, setupBrowser } from './utils/build';
import { startFixture, setupStartBrowser } from './utils/start';
import { IPage } from './utils/browser';
import executeCommand from './utils/executeCommand';

const example = 'icestark-layout';
const rootDir = path.join(__dirname, `../examples/${example}`);

executeCommand('npm install', rootDir);

describe(`build ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  buildFixture(example);

  test('test SPA addProvider', async () => {
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    const length = (await page.$$('.next-fd-shell')).length;
    expect(length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  test('test SPA addProvider', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    const length = (await page.$$('.next-fd-shell')).length;
    expect(length).toBeGreaterThan(0);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
