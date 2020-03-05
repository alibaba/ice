import { AxiosRequestConfig } from 'axios'

export interface IRequest extends AxiosRequestConfig {
  interceptors: {
    request: {
      onConfig: (config) => {};
      onError: (error) => {};
    };
    response: {
      onConfig: (response) => {};
      onError: (error) => {};
    };
  };
}
