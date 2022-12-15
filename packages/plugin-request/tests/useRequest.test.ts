import * as createTestServer from './createTestServer';
import { act, renderHook } from '@testing-library/react-hooks';
import useRequest from '../template/useRequest';

const MOCK_DATA = {
  data: {
    repo: 'alibaba/ice',
    url: 'https://github.com/alibaba/ice'
  }
};

describe('with useRequest', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  it('should be defined', () => {
    expect(useRequest).toBeDefined();
  });

  it('with service should work', async () => {
    const request = req =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (req === 0) {
            reject(new Error('fail'));
          } else {
            resolve('success');
          }
        }, 1000);
      });

    let successValue;
    const successCallback = text => {
      successValue = text;
    };
    const errorCallback = jest.fn();

    const { result, waitForNextUpdate, unmount } = renderHook(() => useRequest(request, {
      manual: false,
      onSuccess: successCallback,
      onError: errorCallback
    }))
    expect(result.current.loading).toEqual(true);

    jest.useRealTimers();
    await waitForNextUpdate();
    expect(result.current.loading).toEqual(false);
    expect(result.current.data).toEqual('success');
    expect(successValue).toEqual('success');
    expect(errorCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.request(0);
    });
    expect(result.current.loading).toEqual(true);

    unmount();
  });

  it('with object should work', async () => {
    server.get('/repo', (req, res) => {
      res.send(MOCK_DATA);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest({ url: `${server.url}/repo` }, {
      manual: true
    }))
    act(() => {
      result.current.request();
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(MOCK_DATA);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
  });

  it('with string should work', async () => {
    server.get('/repo', (req, res) => {
      res.send(MOCK_DATA);
    });

    const { result, waitForNextUpdate } = renderHook(() => useRequest(`${server.url}/repo`, {
      manual: true,
    }))
    act(() => {
      result.current.request();
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(MOCK_DATA);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(undefined);
    console.log(result.current);
  });
});
