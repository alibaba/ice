import * as path from 'path';
import * as cheerio from 'cheerio';
import executeCommand from './utils/executeCommand';

const example = 'basic-vite-ssr';

executeCommand('npm run build', path.join(process.cwd(), 'examples/basic-vite-ssr'));

describe(`build ${example}`, () => {
  test('/', async () => {    
    const serverRender = require(path.join(process.cwd(), 'examples', example, 'build/server/index.js'));
    const url = '/';
    const req = {
      url
    };

    const res = {};
    const ctx = { req, res };
    const { html } = await serverRender.default({
      ctx,
      pathname: url,
      loadableStatsPath: false
    });
    expect(html).toContain('window.__ICE_SSR_ENABLED__=true');
    expect(html).toContain('Click me :');
    expect(html).toContain('Vite Docs');
  });
})
