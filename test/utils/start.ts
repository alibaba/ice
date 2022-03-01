import path from 'path';
import getPort from 'get-port';
import Browser, { Page } from './browser';
import { Server } from 'http';
import getBuiltInPlugins from '../../packages/ice/lib/getBuiltInPlugins.js';
import createService from '../../packages/ice/lib/index.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface SetupBrowser {
  (options: { port: number; defaultPath?: string; server: Server; }): Promise<ReturnValue>;
}

interface ReturnValue {
  page: Page;
  browser: Browser;
}

// get builtIn plugins
export const startFixture = async function (example: string) {
  const port = await getPort();
  const rootDir = path.join(__dirname, `../../examples/${example}`);
  process.env.DISABLE_FS_CACHE = 'true';
  const service = await createService({ rootDir, command: 'start', commandArgs: {
    port,
  }, getBuiltInPlugins });
  const devServer = await service.run() as unknown as Server;

  return {
    port,
    devServer
  };
};

export const setupStartBrowser: SetupBrowser = async (options) => {
  const { port, server, defaultPath = '' } = options;
  const browser = new Browser({ server });
  await browser.start();
  const page = await browser.page(`http://127.0.0.1:${port}/${defaultPath}`);
  return {
    browser,
    page,
  };
};
