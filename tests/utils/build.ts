import path from 'path';
import process from 'process';
import getPort from 'get-port';
import Browser, { Page } from './browser';
import createService from '../../packages/ice/src/createService';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface SetupBrowser {
  (options: {
    example: string;
    outputDir?: string;
    defaultHtml?: string;
  }): Promise<ReturnValue>;
}

interface ReturnValue {
  page: Page;
  browser: Browser;
}

// get builtIn plugins
export const buildFixture = function(example: string) {
  test(`setup ${example}`, async () => {
    const rootDir = path.join(__dirname, `../../examples/${example}`);
    process.env.DISABLE_FS_CACHE = 'true';
    process.env.JEST_TEST = 'true';
    const service = await createService({ rootDir, command: 'build', commandArgs: {} });
    await service.run();
  }, 120000);
}

export const setupBrowser: SetupBrowser = async (options) => {
  const { example, outputDir = 'build', defaultHtml = 'index.html' } = options;
  const rootDir = path.join(__dirname, `../../examples/${example}`);
  const port = await getPort();
  const browser = new Browser({ cwd: path.join(rootDir, outputDir), port });
  await browser.start();
  const disableJS = true;
  // when preview html generate by build, the path will not match the router info, so hydrate will not found the route component
  const page = await browser.page(`http://127.0.0.1:${port}/${defaultHtml}`, disableJS);
  return {
    browser,
    page,
  }
}
