import axios from 'axios';
import * as pathToRegexp from 'path-to-regexp';

import axiosUtils from './axiosUtils';

export type { AxiosRequestConfig, CancelTokenStatic, CancelStatic, AxiosResponse, AxiosError } from 'axios';

export {
  axios,
  axiosUtils,
  pathToRegexp,
};
