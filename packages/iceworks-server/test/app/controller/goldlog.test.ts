/* tslint:disable */
const { app, assert } = require('midway-mock/bootstrap');
/* tslint:enable */

describe('test /app/controller/goldlog.test.ts', () => {
  it('should status 200 and get the request body', () => {
    return app
      .httpRequest()
      .post('/api/goldlog/record')
      .type('form')
      .send({
        namespace: 'adapter',
        module: 'page',
        action: 'getAll',
        data: {},
        visit_time: '2019-07-29 14:14:05',
        UA: {
          name: 'chrome',
          version: '75.0.3770',
          versionNumber: 75.0377,
          mobile: false,
          os: 'Windows 10',
        },
      })
      .expect(200)
      .expect({
        success: true
      });
  });
});

export {};
