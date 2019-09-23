const { app } = require('midway-mock/bootstrap');

describe('POST /api/goldlog/record', () => {
  it('success should be true', () => {
    return app
      .httpRequest()
      .post('/api/goldlog/record')
      .send({
        namespace: 'goldlog-test',
        action: 'test',
        data: {},
      })
      .expect(200, {
        success: true,
      });
  });
});
