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

interface ICustomRequest extends AxiosRequestConfig {
  instanceName?: string;
  withFullResponse?: boolean;
  interceptors?: IInterceptors;
}

export type IRequest = ICustomRequest | ICustomRequest[];
