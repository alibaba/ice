import * as path from 'path';
import * as cheerio from 'cheerio';
import { buildFixture } from './utils/build';

const example = 'basic-ssr-with-lazy-load';

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
    expect($('#__LOADABLE_REQUIRED_CHUNKS___ext').html()).not.toBeUndefined();
  });
})
