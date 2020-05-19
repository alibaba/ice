import { AxiosRequestConfig } from 'axios';
import { IInterceptors } from './base';

interface ICustomRequest extends AxiosRequestConfig {
  name?: string;
  withFullResponse?: boolean;
  interceptors?: IInterceptors;
}

export type IRequest = ICustomRequest | ICustomRequest[];
