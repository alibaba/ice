import axios from 'axios';
import * as pathToRegexp from 'path-to-regexp';
import axiosUtils from './axiosUtils';
import { isServer } from './env';

export {
  axios,
  axiosUtils,
  isServer,
  pathToRegexp,
};