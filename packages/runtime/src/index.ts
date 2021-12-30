import axios from 'axios';
import * as pathToRegexp from 'path-to-regexp';
import reactAppRenderer, { getInitialData } from 'react-app-renderer';
import KeepAlive, { AliveScope } from 'react-activation';
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
  getInitialData,
  // for plugin-keep-aliv
  KeepAlive,
  AliveScope
};

// for plugn-icestark
export * as iceStark from '@ice/stark';
export * as icestarkApp from '@ice/stark-app';
export type { AppConfig } from '@ice/stark';

// for plugin-react-app
export * as queryString from 'query-string';
