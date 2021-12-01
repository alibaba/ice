import * as path from 'path';
import * as process from 'process';
import { build } from 'build-scripts';
import * as getPort from 'get-port';
import Browser, { IPage } from './browser';
import getBuiltInPlugins = require('../../packages/icejs/src/getBuiltInPlugins');

interface ISetupBrowser {
  (options: {
    example: string;
    outputDir?: string;
    defaultHtml?: string;
  }): Promise<IReturn>;
}

interface IReturn {
  page: IPage;
  browser: Browser;
}

// get builtIn plugins
export const buildFixture = function(example: string) {
  test(`setup ${example}`, async () => {
    const rootDir = path.join(__dirname, `../../examples/${example}`);
    const processCwdSpy = jest.spyOn(process, 'cwd');
    processCwdSpy.mockReturnValue(rootDir);
    process.env.DISABLE_FS_CACHE = 'true';

    await build({
      args: {
        config: path.join(rootDir, 'build.json'),
      },
      rootDir,
      getBuiltInPlugins: (userConfig) => {
        return getBuiltInPlugins(userConfig).concat(require.resolve('./test-plugin'));
      },
    });
  }, 120000);
}

export const setupBrowser: ISetupBrowser = async (options) => {
  const { example, outputDir = 'build', defaultHtml = 'index.html' } = options;
  const rootDir = path.join(__dirname, `../../examples/${example}`);
  const port = await getPort();
  const browser = new Browser({ cwd: path.join(rootDir, outputDir), port });
  await browser.start();
  const page = await browser.page(`http://127.0.0.1:${port}/${defaultHtml}`);
  return {
    browser,
    page,
  }
}
