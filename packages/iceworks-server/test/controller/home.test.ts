/* tslint:disable */
const { app, assert } = require('midway-mock/bootstrap');
import { checkAliInternal } from 'ice-npm-utils';
/* tslint:enable */

describe('test/app/controller/home.test.ts', () => {
  it('should assert', async () => {
    const pkg = require('../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect(200);
  });

  it('should render index.html', async () => {
    // mock ctx.clientConfig data
    const ctx = app.mockContext({
      clientConfig: {
        // default use iceworks-client@latest
        clientPath: 'http://ice.alicdn.com/iceworks-client/assets/',
        socketUrl: `//127.0.0.1:${process.env.PORT}/`,
        apiUrl: `//127.0.0.1:${process.env.PORT}/api/`,
        isAliInternal: await checkAliInternal(),
      },
    });

    const result = await app.httpRequest().get('/');
    assert(result.status === 200);
    const cssLink = new RegExp(
      '<link href="' + ctx.clientConfig.clientPath + 'css/index.css" rel="stylesheet" />',
    );
    const faviconLink = new RegExp(
      '<link rel="shortcut icon" href="' + ctx.clientConfig.clientPath + 'favicon.png" />',
    );
    const indexScript = new RegExp('<script src="' + ctx.clientConfig.clientPath + 'js/index.js');
    assert(cssLink.test(result.text));
    assert(faviconLink.test(result.text));
    assert(indexScript.test(result.text));
  });
});
