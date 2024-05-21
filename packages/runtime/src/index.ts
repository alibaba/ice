import type {
  RuntimePlugin,
  AppContext,
  PublicAppContext,
  AppConfig,
  RouteConfig,
  RouteItem,
  ServerContext,
  AppProvider,
  RouteWrapper,
  RenderMode,
  Loader,
  RouteWrapperConfig,
} from './types.js';
import Runtime from './runtime.js';
import runClientApp from './runClientApp.js';
import type { RunClientAppOptions, CreateRoutes } from './runClientApp.js';
import { useAppContext as useInternalAppContext, useAppData, AppContextProvider } from './AppContext.js';
import { getAppData } from './appData.js';
import { useData, useConfig } from './RouteContext.js';
import {
  Meta,
  Title,
  Links,
  Scripts,
  FirstChunkCache,
  Main,
  Data,
  usePageAssets,
} from './Document.js';
import type {
  MetaType,
  TitleType,
  LinksType,
  ScriptsType,
  FirstChunkCacheType,
  DataType,
  MainType,
} from './Document.js';
import dataLoader, { defineDataLoader, defineServerDataLoader, defineStaticDataLoader, callDataLoader } from './dataLoader.js';
import getRequestContext from './requestContext.js';
import AppErrorBoundary from './AppErrorBoundary.js';
import getAppConfig, { defineAppConfig } from './appConfig.js';
import { routerHistory as history } from './history.js';
import KeepAliveOutlet from './KeepAliveOutlet.js';
import { useActive } from './Activity.js';
import ClientOnly from './ClientOnly.js';
import useMounted from './useMounted.js';
import usePageLifecycle from './usePageLifecycle.js';
import { withSuspense, useSuspenseData } from './Suspense.js';
import { createRouteLoader, WrapRouteComponent, RouteErrorComponent, Await } from './routes.js';
import { dynamic } from './dynamic.js';
function useAppContext() {
  console.warn('import { useAppContext } from \'@ice/runtime\'; is deprecated, please use import { useAppContext } from \'ice\'; instead.');
  return useInternalAppContext();
}

function usePublicAppContext(): PublicAppContext {
  const context = useInternalAppContext();

  const {
    appConfig,
    routePath,
    downgrade,
    documentOnly,
    renderMode,
  } = context;

  return {
    appConfig,
    routePath,
    downgrade,
    documentOnly,
    renderMode,
  };
}

function useDocumentData() {
  const context = useInternalAppContext();
  return context.documentData;
}

// @TODO: remove unstable prefix or refactor.
// eslint-disable-next-line
export const unstable_useDocumentData = useDocumentData;

export {
  getAppConfig,
  defineAppConfig,
  Runtime,
  runClientApp,
  AppContextProvider,
  /**
   * @deprecated
   * Please use import { useAppContext } from \'ice\'; instead.
   */
  useAppContext,
  usePublicAppContext,
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
  FirstChunkCache,
  Data,
  Main,
  usePageAssets,
  // API for data-loader.
  dataLoader,
  callDataLoader,
  getRequestContext,
  history,
  dynamic,

  useActive,
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

export {
  Link,
  NavLink,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
  useNavigation,
  useRevalidator,
  useAsyncValue,
} from 'react-router-dom';

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
  Loader,
  RunClientAppOptions,
  MetaType,
  TitleType,
  LinksType,
  ScriptsType,
  FirstChunkCacheType,
  DataType,
  MainType,
  CreateRoutes,
};
