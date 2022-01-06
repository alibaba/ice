import axios from 'axios';
import * as pathToRegexp from 'path-to-regexp';
import * as createAppShared from 'create-app-shared';
import reactAppRenderer, { getInitialData } from 'react-app-renderer';
import KeepAlive, { AliveScope } from 'react-activation';
import useBaseRequest from '@ahooksjs/use-request';
import loadable from '@loadable/component';

import axiosUtils from './axiosUtils';

export {
  createAppShared
};

// for core

export type { RenderAppConfig } from 'react-app-renderer';

export type { AxiosRequestConfig, CancelTokenStatic, CancelStatic, AxiosResponse, AxiosError } from 'axios';

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

/* for plugin-request  */
export type {
  BaseOptions,
  BasePaginatedOptions,
  BaseResult,
  CombineService,
  LoadMoreFormatReturn,
  LoadMoreOptions,
  LoadMoreOptionsWithFormat,
  LoadMoreParams,
  OptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedOptionsWithFormat,
  PaginatedParams,
} from '@ahooksjs/use-request/lib/types';

export {
  useBaseRequest
};

/* for plugin-store  */
export type { Models, IcestoreRootState, IcestoreDispatch } from '@ice/store';

/* for plugin-router */
export {
  loadable
};

// https://github.com/ReactTraining/history/blob/master/modules/index.js
export {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom
export {
  // components
  Link,
  NavLink,
  Prompt,
  Redirect,
  Route,
  Switch,
  // BrowserRouter,
  // HashRouter,
  // MemoryRouter,
  // StaticRouter,

  // static method
  // export withrouter API from the create-app-shared
  // withRouter,
  matchPath,
  generatePath,

  // hooks
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,

  RouteComponentProps,
  Router,
  StaticRouter,
} from 'react-router-dom';
