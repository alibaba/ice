import type { IncomingMessage, ServerResponse } from 'http';
import type { InitialEntry, AgnosticRouteObject, Location, History, RouterInit, StaticHandlerContext } from '@remix-run/router';
import type { ComponentType, PropsWithChildren } from 'react';
import type { HydrationOptions, Root } from 'react-dom/client';
import type { Params, RouteObject } from 'react-router-dom';
import type { RouteLoaderOptions } from './routes.js';
import type { RenderToPipeableStreamOptions, NodeWritablePiper } from './server/streamRender.js';

type UseConfig = () => RouteConfig<Record<string, any>>;
type UseData = () => RouteData;
type UseAppContext = () => AppContext;

type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId: string;
  strict: boolean;
  errorBoundary: boolean;
  onRecoverableError: (error: unknown, errorInfo: ErrorStack) => void;
  onBeforeHydrate: () => void;
} & Record<AppLifecycle, VoidFunction>>;

export interface ErrorStack {
  componentStack?: string;
  digest?: string;
}

export type AppData = any;
export type RouteData = any;

// route.pageConfig return value
export type RouteConfig<T = {}> = T & {
  // Support for extends config.
  title?: string;
  meta?: React.MetaHTMLAttributes<HTMLMetaElement>[];
  links?: React.LinkHTMLAttributes<HTMLLinkElement>[];
  scripts?: React.ScriptHTMLAttributes<HTMLScriptElement>[];
};

export interface AppExport {
  default?: AppConfig;
  [key: string]: any;
  dataLoader?: DataLoaderConfig;
}

export type DataLoaderResult = (Promise<RouteData> | RouteData) | RouteData;
export type DataLoader = (ctx: RequestContext) => DataLoaderResult;

export interface StaticDataLoader {
  key?: string;
  prefetch_type?: string;
  api: string;
  v: string;
  data: any;
  ext_headers: Object;
}

// route.defineDataLoader
// route.defineServerDataLoader
// route.defineStaticDataLoader
export type Loader = DataLoader | StaticDataLoader | Array<DataLoader | StaticDataLoader>;

// route.pageConfig
export type PageConfig = (args: { data?: RouteData }) => RouteConfig;

export interface AppConfig {
  app?: App;
  router?: {
    type?: 'hash' | 'browser' | 'memory';
    basename?: string;
    initialEntries?: InitialEntry[];
  };
}

export interface RoutesConfig {
  [routeId: string]: RouteConfig;
}

export interface RoutesData {
  [routeId: string]: RouteData;
}

export interface DataLoaderOptions {
  defer?: boolean;
}

export interface DataLoaderConfig {
  loader: Loader;
  options?: DataLoaderOptions;
}

interface DocumentLoaderOptions {
  documentOnly?: boolean;
}
export type DocumentDataLoader = (ctx: RequestContext, options: DocumentLoaderOptions) => DataLoaderResult;

export interface DocumentDataLoaderConfig {
  loader: DocumentDataLoader;
}

export interface LoadersData {
  [routeId: string]: LoaderData;
}

export interface LoaderData {
  data?: RouteData;
  pageConfig?: RouteConfig;
}

// useAppContext
export interface AppContext {
  appConfig: AppConfig;
  appData: any;
  documentData?: any;
  serverData?: any;
  assetsManifest?: AssetsManifest;
  loaderData?: LoadersData;
  routeModules?: RouteModules;
  RouteWrappers?: RouteWrapperConfig[];
  routePath?: string;
  matches?: RouteMatch[];
  routes?: RouteItem[];
  documentOnly?: boolean;
  matchedIds?: string[];
  appExport?: AppExport;
  basename?: string;
  downgrade?: boolean;
  renderMode?: RenderMode;
  requestContext?: RequestContext;
  revalidate?: boolean;
}

export type PublicAppContext = Pick<
AppContext,
 'appConfig' | 'routePath' | 'downgrade' | 'documentOnly' | 'renderMode'
>;

export type WindowContext = Pick<
AppContext,
  'appData' | 'loaderData' | 'routePath' | 'downgrade' | 'matchedIds' | 'documentOnly' | 'renderMode' | 'serverData' | 'revalidate'
>;

export type Renderer = (
  container: Element | Document,
  initialChildren: React.ReactNode,
  options?: HydrationOptions,
) => Root;

export interface ServerContext {
  req?: IncomingMessage;
  res?: ServerResponse;
}

export interface RequestContext extends ServerContext {
  pathname: string;
  query: Record<string, any>;
}

export type ComponentModule = {
  default?: ComponentType<any>;
  Component?: ComponentType<any>;
  staticDataLoader?: DataLoaderConfig;
  serverDataLoader?: DataLoaderConfig;
  dataLoader?: DataLoaderConfig;
  pageConfig?: PageConfig;
  [key: string]: any;
};

export type RouteItem = AgnosticRouteObject & {
  componentName: string;
  Component?: ComponentType<any>;
  exports?: string[];
  layout?: boolean;
  children?: RouteItem[];
};

export type ComponentWithChildren<P = {}> = ComponentType<PropsWithChildren<P>>;

export type DocumentComponent = ComponentWithChildren<{
  pagePath: string;
}>;

export interface RouteWrapperConfig {
  Wrapper: RouteWrapper;
  layout?: boolean;
}

export type AppProvider = ComponentWithChildren<any>;
export type RouteWrapper = ComponentType<any>;
export type ResponseHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => any | Promise<any>;

export type SetAppRouter = <T>(AppRouter: ComponentType<T>) => void;
export type GetAppRouter = () => AppProvider;
export type AddProvider = (Provider: AppProvider) => void;
export type SetRender = (render: Renderer) => void;
export type AddWrapper = (wrapper: RouteWrapper, forLayout?: boolean) => void;
export type AddResponseHandler = (handler: ResponseHandler) => void;
export type GetResponseHandlers = () => ResponseHandler[];

export interface RouteModules {
  [routeId: string]: ComponentModule;
}

export interface AssetsManifest {
  dataLoader?: string;
  publicPath: string;
  entries: {
    [assetPath: string]: string[];
  };
  pages: {
    [assetPath: string]: string[];
  };
  assets?: {
    [assetPath: string]: string;
  };
}

export interface RuntimeAPI {
  setAppRouter?: SetAppRouter;
  getAppRouter: GetAppRouter;
  addProvider: AddProvider;
  addResponseHandler: AddResponseHandler;
  getResponseHandlers: GetResponseHandlers;
  setRender: SetRender;
  addWrapper: AddWrapper;
  appContext: AppContext;
  useData: UseData;
  useConfig: UseConfig;
  useAppContext: UseAppContext;
  history: History;
}

export interface StaticRuntimeAPI {
  appContext: {
    appExport: AppExport;
  };
}

export interface RuntimePlugin<T = Record<string, any>> {
  (
    apis: RuntimeAPI,
    runtimeOptions?: T,
  ): Promise<void> | void;
}

export interface StaticRuntimePlugin<T = Record<string, any>> {
  (
    apis: StaticRuntimeAPI,
    runtimeOptions?: T,
  ): Promise<void> | void;
}

export interface CommonJsRuntime {
  default: RuntimePlugin | StaticRuntimePlugin;
}

export interface RuntimeModules {
  statics?: (StaticRuntimePlugin | CommonJsRuntime)[];
  commons?: (RuntimePlugin | CommonJsRuntime)[];
}

export interface AppRouterProps {
  routes?: RouteObject[];
  location?: Location;
  Component?: ComponentType<any>;
  loaderData?: LoaderData;
}

export interface ClientAppRouterProps extends AppRouterProps {
  routerContext?: Omit<RouterInit, 'routes'> & { routes?: RouteObject[] };
}

export interface ServerAppRouterProps extends AppRouterProps {
  routerContext?: StaticHandlerContext;
}

export interface AppRouteProps {
  routes: RouteItem[];
}

// rewrite the `RouteMatch` type which is referenced by the react-router-dom
export interface RouteMatch {
  /**
   * The names and values of dynamic parameters in the URL.
   */
  params: Params;
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string;
  /**
   * The portion of the URL pathname that was matched before child routes.
   */
  pathnameBase: string;
  /**
   * The route object that was used to match.
   */
  route: RouteItem;
}

export type RenderMode = 'SSR' | 'SSG' | 'CSR';

interface Piper {
  pipe: NodeWritablePiper;
  fallback: Function;
}

export interface Response {
  statusCode?: number;
  statusText?: string;
  value?: string | Piper;
  headers?: Record<string, string>;
}

export interface RenderOptions {
  app: AppExport;
  assetsManifest: AssetsManifest;
  createRoutes: (options: Pick<RouteLoaderOptions, 'requestContext' | 'renderMode'>) => RouteItem[];
  runtimeModules: RuntimeModules;
  documentDataLoader?: DocumentDataLoaderConfig;
  Document?: DocumentComponent;
  documentOnly?: boolean;
  preRender?: boolean;
  getAssets?: boolean;
  renderMode?: RenderMode;
  // basename is used both for server and client, once set, it will be sync to client.
  basename?: string;
  // serverOnlyBasename is used when just want to change basename for server.
  serverOnlyBasename?: string;
  routePath?: string;
  disableFallback?: boolean;
  routesConfig?: {
    [key: string]: PageConfig;
  };
  runtimeOptions?: Record<string, any>;
  serverData?: any;
  streamOptions?: RenderToPipeableStreamOptions;
}

declare global {
  interface ImportMeta {
    // The build target for ice.js
    // Usually `web` or `node` or `weex`
    target: string;
    // The renderer for ice.js
    renderer: 'client' | 'server';
    // ice.js defined env variables
    env: Record<string, string>;
  }
}
