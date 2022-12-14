import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';

const example = 'multi-target';

describe(`build ${example}`, () => {
  let browser = null;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  test('open /about', async () => {
    await buildFixture(example);

    const aboutFileContent = readFileSync(path.join(__dirname, `../../examples/${example}/build/about.html`), 'utf-8');
    // Compare text.
    expect(aboutFileContent).contains('<div id="about">Target=<!-- -->web<!-- --> Renderer=<!-- -->server</div>');
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port, defaultPath: '/about' });
    page = res.page;
    browser = res.browser;

    expect((await page.$$text('#about'))[0]).contains('Target=web Renderer=client');
  });

  afterAll(async () => {
    await browser.close();
  });
});
