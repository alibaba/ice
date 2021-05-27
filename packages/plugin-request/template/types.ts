import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface IInterceptorRequest {
  onConfig?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface IInterceptorResponse {
  onConfig?: (response: AxiosResponse) => AxiosResponse;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface IInterceptors {
  request?: IInterceptorRequest;
  response?: IInterceptorResponse;
}

interface ICustomRequest extends AxiosRequestConfig {
  instanceName?: string;
  withFullResponse?: boolean;
  interceptors?: IInterceptors;
}

export type IRequest = ICustomRequest | ICustomRequest[];
