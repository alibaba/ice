import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface IInterceptorRequest <T = AxiosRequestConfig> {
  onConfig?: (config: T) => T | Promise<T>;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface IInterceptorResponse <K = AxiosResponse> {
  onConfig?: (response: K) => K | Promise<K>;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface IInterceptors {
  request?: IInterceptorRequest<AxiosRequestConfig>;
  response?: IInterceptorResponse<AxiosResponse>;
}
