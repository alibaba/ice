import * as path from 'path';
import * as cheerio from 'cheerio';
import { buildFixture } from './utils/build';
import { startFixture, setupStartBrowser } from './utils/start';
import { IPage } from './utils/browser';

const example = 'basic-ssr';

describe(`build ${example}`, () => {
  buildFixture(example);

  test('/home', async () => {
    const serverRender = require(path.join(process.cwd(), 'build/server/index.js'));
    const url = '/home';
    const req = {
      url
    };

    const res = {};
    const ctx = { req, res };
    const { html } = await serverRender.default({
      ctx,
      pathname: url,
      loadableStatsPath: path.join(process.cwd(), 'build/loadable-stats.json')
    });

    const $ = cheerio.load(html, { decodeEntities: false });
    const homePageContent = $('main>div').map(function(i, el) {
      return $(el).text();
    }).get();

    expect($('main>h2').text()).toBe('Home Page...');
    expect(homePageContent).toStrictEqual([
      'counterState: 1',
      'name: Jack Ma',
      'id: 10001',
      'address: Hangzhou',
    ]);
    // check loadable content
    expect($('#__LOADABLE_REQUIRED_CHUNKS__').html()).toBe('[]');
    expect($('#__LOADABLE_REQUIRED_CHUNKS___ext').html()).toBe('{"namedChunks":[]}');
  });
})

describe(`start ${example}`, () => {
  let page: IPage = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('main>h2')).toStrictEqual([ 'Home Page...']);
    expect(await page.$$text('main>div')).toStrictEqual([
      'counterState: 1',
      'name: Jack Ma',
      'id: 10001',
      'address: Hangzhou',
    ]);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
