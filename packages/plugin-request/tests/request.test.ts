import * as createTestServer from './createTestServer';
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

    server.get('/repo', (req, res) => {
      res.send(MOCK_DATA);
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should be defined', () => {
    expect(request).toBeDefined();
  });

  it('request alias should work', async () => {
    const data = await request.get(`${server.url}/repo`);
    expect(data).toEqual(MOCK_DATA);
  });

  it('request receive an object parameter should work', async () => {
    const data = await request({
      url: `${server.url}/repo`
    });
    expect(data).toEqual(MOCK_DATA);
  });

  it('request withFullResponse should work', async () => {
    // @ts-ignore
    const data = await request({
      url: `${server.url}/repo`,
      withFullResponse: true
    });
    expect(data.status).toEqual(200);
    expect(data.statusText).toEqual('OK');
  });
});
