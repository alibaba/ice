import * as createTestServer from 'create-test-server';
import request from '../template/request';

const MOCK_DATA = {
  data: {
    repo: 'alibaba/ice',
    url: 'https://github.com/alibaba/ice'
  }
};

describe('with request', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();

    server.get('/user', (req, res) => {
      res.send(MOCK_DATA);
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should be defined', () => {
    expect(request).toBeDefined();
  });

  test('request alias should work', async () => {
    const data = await request.get(`${server.url}/user`);
    expect(data).toEqual(MOCK_DATA);
  });

  test('request receive an object parameter should work', async () => {
    const data = await request({
      url: `${server.url}/user`
    });
    expect(data).toEqual(MOCK_DATA);
  });

  test('request withFullResponse should work', async () => {
    // @ts-ignore
    const data = await request({
      url: `${server.url}/user`,
      withFullResponse: true
    });
    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual('OK');
  });
});
