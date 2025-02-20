import type { IncomingMessage, ServerResponse } from 'http';
import type { ComponentType, PropsWithChildren } from 'react';
import type { HydrationOptions, Root } from 'react-dom/client';

// Basic Types
export type AppData = any;
export type RouteData = any;
export type RenderMode = 'SSR' | 'SSG' | 'CSR';

// Core Interfaces
export interface Path {
  pathname: string;
  search: string;
  hash: string;
}

export interface Location<State = any> extends Path {
  state: State;
  key: string;
}

export interface ErrorStack {
  componentStack?: string;
  digest?: string;
}

export interface ServerContext {
  req?: IncomingMessage;
  res?: ServerResponse;
}

export interface RequestContext extends ServerContext {
  pathname: string;
  query: Record<string, any>;
}

// App Configuration Types
export type App = Partial<{
  rootId: string;
  strict: boolean;
  errorBoundary: boolean;
  onRecoverableError: (error: unknown, errorInfo: ErrorStack) => void;
  onBeforeHydrate: () => void;
}>;

export interface AppConfig {
  app?: App;
  router?: {
    type?: 'hash' | 'browser' | 'memory';
    basename?: string;
    initialEntries?: InitialEntry[];
  };
}

export interface AppExport {
  default?: AppConfig;
  dataLoader?: DataLoaderConfig;
  [key: string]: any;
}

// Route & Component Types
export type ComponentWithChildren<P = {}> = ComponentType<PropsWithChildren<P>>;
export type AppProvider = ComponentWithChildren<any>;
export type RouteWrapper = ComponentType<any>;

export type InitialEntry = string | Partial<Location>;
export type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

// Data Loading Types
export interface DataLoaderOptions {
  defer?: boolean;
}

export interface StaticDataLoader {
  key?: string;
  prefetch_type?: string;
  api: string;
  v: string;
  data: any;
  ext_headers: Object;
}

export type DataLoaderResult = (Promise<RouteData> | RouteData) | RouteData;
export type DataLoader = (ctx: RequestContext) => DataLoaderResult;
export type Loader = DataLoader | StaticDataLoader | Array<DataLoader | StaticDataLoader>;

export interface DataLoaderConfig {
  loader: Loader;
  options?: DataLoaderOptions;
}

// Route Configuration Types
export type RouteConfig<T = {}> = T & {
  title?: string;
  meta?: React.MetaHTMLAttributes<HTMLMetaElement>[];
  links?: React.LinkHTMLAttributes<HTMLLinkElement>[];
  scripts?: React.ScriptHTMLAttributes<HTMLScriptElement>[];
};

export type PageConfig = (args: { data?: RouteData }) => RouteConfig;

export interface LoaderData {
  data?: RouteData;
  pageConfig?: RouteConfig;
}

export interface LoadersData {
  [routeId: string]: LoaderData;
}

// Component & Module Types
export type ComponentModule = {
  default?: ComponentType<any>;
  Component?: ComponentType<any>;
  staticDataLoader?: DataLoaderConfig;
  serverDataLoader?: DataLoaderConfig;
  dataLoader?: DataLoaderConfig;
  pageConfig?: PageConfig;
  [key: string]: any;
};

export interface RouteModules {
  [routeId: string]: ComponentModule;
}

export interface RouteWrapperConfig {
  Wrapper: RouteWrapper;
  layout?: boolean;
}

// Runtime Types
export interface AppContext<T = any> {
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
  routes?: T[];
  documentOnly?: boolean;
  matchedIds?: string[];
  appExport?: AppExport;
  basename?: string;
  downgrade?: boolean;
  renderMode?: RenderMode;
  requestContext?: RequestContext;
  revalidate?: boolean;
}

export type WindowContext = Pick<
AppContext,
  'appData' | 'loaderData' | 'routePath' | 'downgrade' | 'matchedIds' | 'documentOnly' | 'renderMode' | 'serverData' | 'revalidate'
>;

// Runtime API Types
export type Renderer = (
  container: Element | Document,
  initialChildren: React.ReactNode,
  options?: HydrationOptions,
) => Root;

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

type UseConfig = () => RouteConfig<Record<string, any>>;
type UseData = () => RouteData;
type UseAppContext = () => AppContext;

export interface RuntimeAPI<T = History> {
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
  history: T;
}

// Plugin Types
export interface RuntimePlugin<T = Record<string, any>, H = History> {
  (apis: RuntimeAPI<H>, runtimeOptions?: T): Promise<void> | void;
}

export interface StaticRuntimeAPI {
  appContext: {
    appExport: AppExport;
  };
}

export interface StaticRuntimePlugin<T = Record<string, any>> {
  (apis: StaticRuntimeAPI, runtimeOptions?: T): Promise<void> | void;
}

export interface CommonJsRuntime {
  default: RuntimePlugin | StaticRuntimePlugin;
}

// Assets & Runtime Modules
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

export interface RuntimeModules {
  statics?: (StaticRuntimePlugin | CommonJsRuntime)[];
  commons?: (RuntimePlugin | CommonJsRuntime)[];
}

// Loader & Routes Types
export interface RouteLoaderOptions {
  routeId: string;
  requestContext?: RequestContext;
  module: ComponentModule;
  renderMode: RenderMode;
}

export type CreateRoutes<T> = (options: Pick<RouteLoaderOptions, 'renderMode' | 'requestContext'>) => T[];

export interface RunClientAppOptions<T = any> {
  app: AppExport;
  runtimeModules: RuntimeModules;
  createRoutes?: CreateRoutes<T>;
  hydrate?: boolean;
  basename?: string;
  memoryRouter?: boolean;
  runtimeOptions?: Record<string, any>;
  dataLoaderFetcher?: (config: StaticDataLoader) => any;
  dataLoaderDecorator?: (loader: Loader, index?: number) => (requestContext: RequestContext) => DataLoaderResult;
}

export interface RouteMatch<T = any> {
  params: Params;
  pathname: string;
  pathnameBase: string;
  route: T;
}

declare global {
  interface ImportMeta {
    target: string;
    renderer: 'client' | 'server';
    env: Record<string, string>;
  }
}
