import { AxiosRequestConfig } from 'axios';
import { IInterceptors } from './base';

export interface IRequest extends AxiosRequestConfig {
  interceptors?: IInterceptors;
}