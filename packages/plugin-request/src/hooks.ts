import { useRequest as useAhooksRequest } from 'ahooks';
import type { Options, Result, Service, Plugin } from 'ahooks/lib/useRequest/src/types';
import type { AxiosRequestConfig } from 'axios';
import { request } from './request.js';

interface RequestResult<R, P extends any[]> extends Result<R, P> {
  request: Result<R, P>['run'];
  requestAsync: Result<R, P>['runAsync'];
}

export function useRequest<TData, TParams extends any[] = []>(
  service: string | AxiosRequestConfig | Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]) {
  let s: Service<TData, TParams>;
  if (isFunction(service)) {
    s = service as Service<TData, TParams>;
  } else if (isString(service)) {
    s = async (...extraOptions: TParams) => {
      return request({ url: service, ...extraOptions });
    };
  } else {
    const options = service as AxiosRequestConfig;
    s = async (...extraOptions: TParams) => {
      return request({ ...options, ...extraOptions });
    };
  }
  const req = useAhooksRequest(s, {
    // Note:
    // ahooks/useRequest manual default to true.
    // ICE3/useRequest Default to manual request.
    manual: true,
    ...options,
  }, plugins);
  return {
    ...req,
    // Modify ahooks' useRequest `run` as `request`
    request: req.run,
    // Modify ahooks' useRequest `runAsync` as `requestAsync`
    requestAsync: req.runAsync,
  } as RequestResult<TData, TParams>;
}

function isString(str: any): str is string {
  return typeof str === 'string';
}

function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}
