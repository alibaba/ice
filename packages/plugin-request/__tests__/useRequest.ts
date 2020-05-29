import * as createTestServer from 'create-test-server';
import { act, renderHook } from '@testing-library/react-hooks';
import useRequest from '../template/useRequest';

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

    jest.useRealTimers();
    await waitForNextUpdate();
    expect(result.current.error).toEqual(new Error('fail'));
    expect(result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();
    act(() => {
      result.current.request(1);
    });

    jest.useRealTimers();
    await waitForNextUpdate();
    expect(result.current.data).toEqual('success');
    expect(result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();

    unmount();
  });
});
