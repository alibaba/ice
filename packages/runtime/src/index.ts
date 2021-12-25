import axios from 'axios';
import * as pathToRegexp from 'path-to-regexp';
import reactAppRenderer, { getInitialData } from 'react-app-renderer';
import axiosUtils from './axiosUtils';

// for core
export * as createAppShared from 'create-app-shared';

export type { RenderAppConfig } from 'react-app-renderer';

export {
  // for core

  // for plugin-request
  axios,
  axiosUtils,
  pathToRegexp,
  reactAppRenderer,
  getInitialData
};
