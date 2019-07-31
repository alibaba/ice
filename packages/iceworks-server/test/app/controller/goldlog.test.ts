const { app } = require('midway-mock/bootstrap');

describe('test /app/controller/goldlog.test.ts', () => {
  it('should status 200 and get the request body', () => {
    return app
      .httpRequest()
      .post('/api/goldlog/record')
      .type('form')
      .send({
        namespace: 'goldlog-test',
        action: 'test',
        data: {},
      })
      .expect(200)
      .expect({
        success: true
      });
  });
});

export {};
