import path from 'path';
import type { Server } from 'http';
import { fileURLToPath } from 'url';
import getPort from 'get-port';
import createService from '../../packages/ice/src/createService';
import type { Page } from './browser';
import Browser from './browser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface SetupBrowser {
  (options: { port: number; defaultPath?: string; server: Server }): Promise<ReturnValue>;
}

interface IReturn {
  page: IPage;
  browser: Browser;
}

// get builtIn plugins
export const startFixture = async function (example: string, commandArgs?: Record<string, any>) {
  const port = await getPort();
  const rootDir = path.join(__dirname, `../../examples/${example}`);
  const processCwdSpy = jest.spyOn(process, 'cwd');
  processCwdSpy.mockReturnValue(rootDir);
  process.env.DISABLE_FS_CACHE = 'true';
  const service = await createService({ rootDir,
command: 'start',
commandArgs: {
    host: '0.0.0.0',
    port,
    open: false,
    ...commandArgs,
  } });

  // @ts-ignore
  const { compiler, devServer } = await service.run();
  // wait generate assets manifest
  await new Promise((resolve) => {
    compiler.hooks.done.tap('done', () => {
      resolve(true);
    });
  });

  // @ts-ignore
  const { compiler, devServer } = await service.run();
  // wait generate assets manifest
  await new Promise((resolve) => {
    compiler.hooks.done.tap('done',() => {
      resolve(true);
    })
  });

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
    devServer,
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
