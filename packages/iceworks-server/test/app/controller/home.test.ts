/* tslint:disable */
const { app, assert } = require('midway-mock/bootstrap');
/* tslint:enable */

describe('test/app/controller/home.test.ts', () => {

  it('should assert', async () =>{
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
    // const ctx = app.mockContext({});
    // await ctx.service.xx();
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('Welcome to midwayjs!')
      .expect(200);
  });
});
