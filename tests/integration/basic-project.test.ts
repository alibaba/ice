import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import type { Page } from '../utils/browser';
import type Browser from '../utils/browser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const example = 'basic-project';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });

    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
    expect(await page.$$text('#data-from')).toStrictEqual(['getStaticData']);

    const bundleContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/js/main.js`), 'utf-8');
    expect(bundleContent.includes('__REMOVED__')).toBe(false);
    expect(bundleContent.includes('__LOG__')).toBe(false);
    expect(bundleContent.includes('__WARN__')).toBe(false);
    expect(bundleContent.includes('__ERROR__')).toBe(true);
    expect(bundleContent.includes('__IS_WEB__')).toBe(true);
    expect(bundleContent.includes('__IS_NODE__')).toBe(false);
    expect(fs.existsSync(path.join(__dirname, `../../examples/${example}/build/favicon.ico`))).toBe(true);
    expect(fs.existsSync(path.join(__dirname, `../../examples/${example}/build/js/data-loader.js`))).toBe(true);
    const jsonContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/assets-manifest.json`), 'utf-8');
    expect(JSON.parse(jsonContent).pages.about.includes('js/framework.js')).toBeFalsy();
    const dataLoaderPath = path.join(__dirname, `../../examples/${example}/build/js/data-loader.js`);
    // should not contain react
    const dataLoaderContent = fs.readFileSync(dataLoaderPath, 'utf-8');
    expect(dataLoaderContent.includes('createElement')).toBe(false);
    // size of data loader should be less than 14kib
    const stats = fs.statSync(dataLoaderPath);
    expect(stats.size).toBeLessThan(1024 * 14);
  });

  test('ClientOnly Component', async () => {
    await page.push('/client-only.html');
    expect(await page.$$text('#mounted')).toStrictEqual(['Server']);
    expect(await page.$$text('#page-url')).toStrictEqual([]);
  });

  test('disable splitChunks', async () => {
    await buildFixture(example, {
      config: 'splitChunks.config.mts',
    });
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;

    const files = fs.readdirSync(path.join(__dirname, `../../examples/${example}/build/js`), 'utf-8');
    expect(files.length).toBe(10);
  });

  test('render route config when downgrade to CSR.', async () => {
    await page.push('/downgrade.html');
    expect(await page.$$text('title')).toStrictEqual(['hello']);
    expect((await page.$$text('h2')).length).toEqual(0);
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;
  const rootDir = path.join(__dirname, `../../examples/${example}`);

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example, {
      mock: true,
      force: true,
      https: false,
      analyzer: false,
      open: false,
      mode: 'start',
    });
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
    expect(await page.$$text('#data-from')).toStrictEqual(['getServerData']);
  });

  test('update route', async () => {
    const targetPath = path.join(rootDir, 'src/pages/blog.tsx');
    const routeContent = fs.readFileSync(targetPath, 'utf-8');
    const routeManifest = fs.readFileSync(path.join(rootDir, '.ice/route-manifest.json'), 'utf-8');
    fs.writeFileSync(targetPath, routeContent);
    await page.reload();
    expect(JSON.parse(routeManifest)[0].children.length).toBe(5);
  });

  test('update watched file: global.css', () => {
    const targetPath = path.join(rootDir, 'src/global.css');
    const cssContent = fs.readFileSync(targetPath, 'utf-8');
    // Trigger modification of global style
    fs.writeFileSync(targetPath, cssContent);
  });

  test('update watched file: app.ts', () => {
    const targetPath = path.join(rootDir, 'src/app.tsx');
    const appContent = fs.readFileSync(targetPath, 'utf-8');
    // Trigger modification of app entry
    fs.writeFileSync(targetPath, appContent);
  });

  test('should update config during client routing', async () => {
    expect(
      await page.title(),
    ).toBe('Home');

    expect(
      await page.$$attr('meta[name="theme-color"]', 'content'),
    ).toStrictEqual(['#000']);

    await page.push('/about');
    await page.waitForNetworkIdle();

    expect(
      await page.title(),
    ).toBe('About');

    expect(
      await page.$$attr('meta[name="theme-color"]', 'content'),
    ).toStrictEqual(['#eee']);

    expect(
      await page.$$eval('link[href*="bootstrap"]', (els) => els.length),
    ).toBe(1);

    expect(
      await page.$$eval('script[src*="lodash"]', (els) => els.length),
    ).toBe(1);
  });

  test('ClientOnly Component', async () => {
    await page.push('/client-only');
    expect(await page.$$text('#mounted')).toStrictEqual(['Client']);
    const pageUrlText = await page.$$text('#page-url');
    expect((pageUrlText as string[])[0].endsWith('/client-only')).toBeTruthy();
  });

  afterAll(async () => {
    await browser.close();
  });
});
