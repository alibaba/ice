import { test, describe } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';

const example = 'icestark-child';

describe(`build ${example}`, () => {
  test('open /', async () => {
    await buildFixture(example);
    const { page } = await setupBrowser({ example, disableJS: false });
    // Test umd output.
    await page.waitForFunction('!!window["@examples/icestarkchild"] === true');
  });
});

describe(`start ${example}`, () => {
  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const { page } = await setupStartBrowser({ server: devServer, port });
    // Test umd output.
    await page.waitForFunction('!!window["@examples/icestarkchild"] === true');
  });
});
