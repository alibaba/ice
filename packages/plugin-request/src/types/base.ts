import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface IInterceptorRequest {
  onConfig?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface IInterceptorResponse {
  onConfig?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onError?: (error: AxiosError) => Promise<void>;
}

export interface IInterceptors {
  request?: IInterceptorRequest;
  response?: IInterceptorResponse;
}
