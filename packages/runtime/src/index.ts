import {
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import {
  LinkSingle,
  OutletSingle,
  useParamsSingle,
  useSearchParamsSingle,
  useLocationSingle,
} from './utils/history-single.js';
import Runtime from './runtime.js';
import App from './App.js';
import runClientApp from './runClientApp.js';
import { useAppContext } from './AppContext.js';
import { useAppData } from './AppData.js';
import { useData, useConfig } from './RouteContext.js';
import {
  Meta,
  Title,
  Links,
  Scripts,
  Main,
} from './Document.js';
import type {
  RuntimePlugin,
  AppContext,
  AppConfig,
  RouteConfig,
  RouteItem,
  ServerContext,
  AppProvider,
  RouteWrapper,
  GetAppData,
  GetAppConfig,
} from './types.js';
import { matchRoutes } from './routes.js';
import dataLoader from './dataLoader.js';

export {
  matchRoutes,
  Runtime,
  App,
  runClientApp,
  useAppContext,
  useAppData,
  useData,
  useConfig,
  Meta,
  Title,
  Links,
  Scripts,
  Main,
  dataLoader,
  // react-router-dom API
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
  // Single Route API
  LinkSingle,
  OutletSingle,
  useParamsSingle,
  useSearchParamsSingle,
  useLocationSingle,
};

export type {
  RuntimePlugin,
  AppContext,
  AppConfig,
  RouteConfig,
  RouteItem,
  ServerContext,
  AppProvider,
  RouteWrapper,
  GetAppData,
  GetAppConfig,
};