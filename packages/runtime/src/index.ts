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
  GetAppData,
} from '@ice/types';
import Runtime from './runtime.js';
import App from './App.js';
import runClientApp from './runClientApp.js';
import type { RunClientAppOptions } from './runClientApp.js';
import { useAppContext, AppContextProvider } from './AppContext.js';
import { useAppData, AppDataProvider, getAppData } from './AppData.js';
import { useData, useConfig, DataProvider, ConfigProvider } from './RouteContext.js';
import {
  Meta,
  Title,
  Links,
  Scripts,
  Main,
  Data,
} from './Document.js';
import dataLoader from './dataLoader.js';
import AppRouter from './AppRouter.js';
import AppErrorBoundary from './AppErrorBoundary.js';
import getAppConfig, { defineAppConfig } from './appConfig.js';
import { routerHistory as history } from './history.js';
import ClientOnly from './ClientOnly.js';
import useMounted from './useMounted.js';

export {
  getAppConfig,
  defineAppConfig,
  Runtime,
  App,
  runClientApp,
  AppContextProvider,
  useAppContext,
  AppDataProvider,
  useAppData,
  useData,
  getAppData,
  DataProvider,
  ConfigProvider,
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
  history,
  AppRouter,
  AppErrorBoundary,
  ClientOnly,
  useMounted,
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
  RunClientAppOptions,
};
