import { useRequest as useAhooksRequest } from 'ahooks';
import type { Options, Result, Service, Plugin } from 'ahooks/lib/useRequest/src/types';
import type { AxiosRequestConfig } from 'axios';
import request from './request.js';

interface RequestResult<R, P extends any[]> extends Result<R, P> {
  request: (...args: P) => Promise<R>;
}

function useRequest<TData, TParams extends any[]>(
  service: AxiosRequestConfig | Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]) {
  let s: Service<TData, TParams>;
  if (isFunction(service)) {
    s = service as Service<TData, TParams>;
  } else {
    const options = service as AxiosRequestConfig;
    s = async (...extraOptions: TParams) => {
      const response = await request({ ...options, ...extraOptions });
      return response.data as TData;
    };
  }
  const req = useAhooksRequest(s, {
    // Note：
    // ahooks/useRequest manual default to true.
    // ICE3/useRequest Default to manual request.
    manual: true,
    ...options,
  }, plugins);
  return {
    ...req,
    // Modify ahooks' useRequest `run` as `request`
    request: req.run,
  } as RequestResult<TData, TParams>;
}

export default useRequest;

function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}
