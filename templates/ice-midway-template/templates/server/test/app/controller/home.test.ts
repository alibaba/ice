/* tslint:disable */
const { app, assert } = require('midway-mock/bootstrap');
/* tslint:enable */

describe('test/app/controller/home.test.ts', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, midway')
      .expect(200);
  });
});
