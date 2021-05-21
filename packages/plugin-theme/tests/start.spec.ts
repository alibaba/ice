import path = require('path');
import got from 'got';
import WebpackDevServer = require('webpack-dev-server');
import { start } from '@alib/build-scripts';

describe('simple build test suite', () => {
  let server: WebpackDevServer = null;
  beforeAll(async () => {
    server = await start({
      args: {
        port: 4444,
      },
      eject: false,
      rootDir: path.join(__dirname, 'fixtures/basic-spa/'),
      plugins: [path.join(__dirname, 'fixtures/defaultConfig.ts')],
      getBuiltInPlugins: () => [],
    }) as WebpackDevServer;
  });
  test('dev server', () => {
    expect(server).toBeTruthy();
  })

  test('access dev bundle', async () => {
    const ret = await got('http://127.0.0.1:4444/index.js');
    expect(ret.statusCode).toBe(200);
  });

  afterAll(() => {
    if (server) {
      server.close();
    }
  });
});