import * as path from 'path';
import * as fs from 'fs';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import type Browser from '../utils/browser';

const example = 'memory-router';

describe(`build ${example}`, () => {
  let browser: Browser;

  test('memory router', async () => {
    await buildFixture(example);

    const outputDir = path.join(__dirname, `../../examples/${example}`, 'build');

    fs.writeFileSync(path.join(outputDir, 'test.html'), `
  <!DOCTYPE html>
  <html>
  <body>
  <div id="ice-container"></div>
    <script src="/js/p_about.js"></script><script src="/js/main.js"></script>
  </body>
  </html>
    `);

    const res = await setupBrowser({ example, disableJS: false });
    const { page } = res;
    browser = res.browser;
    await page.push('/test.html');
    expect(await page.$$text('h2')).toStrictEqual(['About: 0']);
  });

  afterAll(async () => {
    await browser.close();
  });
});
