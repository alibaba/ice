import {
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
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
  DistType,
  Loader,
  RouteWrapperConfig,
} from './types.js';
import Runtime from './runtime.js';
import runClientApp from './runClientApp.js';
import type { RunClientAppOptions } from './runClientApp.js';
import { useAppContext, useAppData, AppContextProvider } from './AppContext.js';
import { getAppData } from './appData.js';
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
  MetaType,
  TitleType,
  LinksType,
  ScriptsType,
  DataType,
  MainType,
} from './Document.js';
import dataLoader, { defineDataLoader, defineServerDataLoader, defineStaticDataLoader, callDataLoader } from './dataLoader.js';
import getRequestContext from './requestContext.js';
import AppErrorBoundary from './AppErrorBoundary.js';
import getAppConfig, { defineAppConfig } from './appConfig.js';
import { routerHistory as history } from './history.js';
import KeepAliveOutlet from './KeepAliveOutlet.js';
import ClientOnly from './ClientOnly.js';
import useMounted from './useMounted.js';
import usePageLifecycle from './usePageLifecycle.js';
import { withSuspense, useSuspenseData } from './Suspense.js';
import { createRouteLoader, WrapRouteComponent, RouteErrorComponent, Await } from './routes.js';

export {
  getAppConfig,
  defineAppConfig,
  Runtime,
  runClientApp,
  AppContextProvider,
  useAppContext,
  useAppData,
  useData,
  getAppData,
  defineDataLoader,
  defineServerDataLoader,
  defineStaticDataLoader,
  useConfig,
  Meta,
  Title,
  Links,
  Scripts,
  Data,
  Main,
  // API for data-loader.
  dataLoader,
  callDataLoader,
  getRequestContext,
  // react-router-dom API
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
  history,

  KeepAliveOutlet,
  AppErrorBoundary,
  ClientOnly,

  useMounted,
  usePageLifecycle,

  withSuspense,
  useSuspenseData,

  Await,

  createRouteLoader,
  WrapRouteComponent,
  RouteErrorComponent,
};

export type {
  RuntimePlugin,
  AppContext,
  AppConfig,
  RouteConfig,
  RouteWrapperConfig,
  RouteItem,
  ServerContext,
  AppProvider,
  RouteWrapper,
  RenderMode,
  DistType,
  Loader,
  RunClientAppOptions,
  MetaType,
  TitleType,
  LinksType,
  ScriptsType,
  DataType,
  MainType,
};
