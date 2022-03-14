import path from 'path';
import getPort from 'get-port';
import Browser, { Page } from './browser';
import { Server } from 'http';
import getBuiltInPlugins from '../../packages/ice/src/getBuiltInPlugins';
import createService from '../../packages/ice/src';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ISetupBrowser {
  (options: { port: number; defaultPath?: string; server: Server; }): Promise<IReturn>;
}

interface IReturn {
  page: IPage;
  browser: Browser;
}

// get builtIn plugins
export const startFixture = async function (example: string) {
  const port = await getPort();
  const rootDir = path.join(__dirname, `../../examples/${example}`);
  const processCwdSpy = jest.spyOn(process, 'cwd');
  processCwdSpy.mockReturnValue(rootDir);
  process.env.DISABLE_FS_CACHE = 'true';
  process.env.JEST_TEST = 'true';
  const service = await createService({ rootDir, command: 'start', commandArgs: {
    port,
    disableOpen: true,
  }, getBuiltInPlugins });
  const devServer = await service.run() as unknown as Server;

  const devServer = await start({
    args: {
      config: path.join(rootDir, 'build.json'),
      port,
      disableOpen: true
    },
    rootDir,
    getBuiltInPlugins: (userConfig) => {
      return getBuiltInPlugins(userConfig).concat(require.resolve('./test-plugin'));
    },
  }) as any as Server;
  return {
    port,
    devServer
  };
};

export const setupStartBrowser: ISetupBrowser = async (options) => {
  const { port, server, defaultPath = '' } = options;
  const browser = new Browser({ server });
  await browser.start();
  const page = await browser.page(`http://127.0.0.1:${port}/${defaultPath}`);
  return {
    browser,
    page,
  };
};