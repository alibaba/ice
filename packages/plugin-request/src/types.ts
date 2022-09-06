import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface InterceptorRequest<T = AxiosRequestConfig> {
  onConfig?: (config: T) => T | Promise<T>;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface InterceptorResponse<K = AxiosResponse> {
  onConfig?: (response: K) => K | Promise<K>;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface Interceptors {
  request?: InterceptorRequest<AxiosRequestConfig>;
  response?: InterceptorResponse<AxiosResponse>;
}

interface CustomRequest extends AxiosRequestConfig {
  instanceName?: string;
  withFullResponse?: boolean;
  interceptors?: Interceptors;
}

export type Request = CustomRequest | CustomRequest[];
export type RequestConfig = Request | object;

export function defineRequestConfig(configOrDefineConfig: RequestConfig | (() => RequestConfig)): RequestConfig {
  if (typeof configOrDefineConfig === 'function') {
    return configOrDefineConfig();
  }
  return configOrDefineConfig;
}
