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
  Data,
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
  RenderMode,
  GetAppData,
} from './types.js';
import dataLoader from './dataLoader.js';
import getAppConfig, { defineAppConfig } from './appConfig.js';
import { routerHistory as history } from './history.js';

export {
  getAppConfig,
  defineAppConfig,
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
  Data,
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
  history,
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
  RenderMode,
  GetAppData,
};