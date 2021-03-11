import { buildFixture, setupBrowser } from './utils/build';
import { IPage } from './utils/browser';

const example = 'basic-keep-alive';

describe('build', () => {
  let page: IPage = null;
  let browser = null;
  
  buildFixture(example);

  test('open /', async () => {
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;

    expect(await page.$text('#dashboard-count')).toStrictEqual('0');
    await page.click('#add');
    expect(await page.$text('#dashboard-count')).toStrictEqual('1');
  });

  test('open /about', async () => {
    await page.push('#/about');
    expect(await page.$text('#about-count')).toStrictEqual('0');
    await page.click('#add');
    expect(await page.$text('#about-count')).toStrictEqual('1');
  });

  test('back /', async () => {
    await page.push('#/');
    expect(await page.$text('#dashboard-count')).toStrictEqual('0');
  });

  test('back /about', async () => {
    await page.push('#/about');
    expect(await page.$text('#about-count')).toStrictEqual('1');
  });

  afterAll(async () => {
    await browser.close();
  });
})

