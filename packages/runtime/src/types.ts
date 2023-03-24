import type { IncomingMessage, ServerResponse } from 'http';
import type { Action, InitialEntry, Location } from 'history';
import type { ComponentType, ReactNode, PropsWithChildren } from 'react';
import type { HydrationOptions, Root } from 'react-dom/client';
import type { Navigator, Params, RouteObject } from 'react-router-dom';

type UseConfig = () => RouteConfig<Record<string, any>>;
type UseData = () => RouteData;
type UseAppContext = () => AppContext;

type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId: string;
  strict: boolean;
  errorBoundary: boolean;
} & Record<AppLifecycle, VoidFunction>>;

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
  dataLoader?: DataLoader;
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
export type DataLoaderConfig = DataLoader | StaticDataLoader | Array<DataLoader | StaticDataLoader>;

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

// useAppContext
export interface AppContext {
  appConfig: AppConfig;
  appData: any;
  serverData?: any;
  assetsManifest?: AssetsManifest;
  routesData?: RoutesData;
  routesConfig?: RoutesConfig;
  routeModules?: RouteModules;
  routePath?: string;
  matches?: RouteMatch[];
  routes?: RouteItem[];
  documentOnly?: boolean;
  matchedIds?: string[];
  appExport?: AppExport;
  basename?: string;
  downgrade?: boolean;
  renderMode?: string;
  requestContext?: RequestContext;
}

export type WindowContext = Pick<
  AppContext,
  'appData' | 'routesData' | 'routesConfig' | 'routePath' | 'downgrade' | 'matchedIds' | 'documentOnly' | 'renderMode' | 'serverData'
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

export interface RouteComponent {
  default: ComponentType<any>;
  staticDataLoader?: DataLoaderConfig;
  serverDataLoader?: DataLoaderConfig;
  dataLoader?: DataLoaderConfig;
  pageConfig?: PageConfig;
  [key: string]: any;
}

export interface RouteItem {
  id: string;
  path: string;
  element?: ReactNode;
  componentName: string;
  index?: boolean;
  exact?: boolean;
  strict?: boolean;
  load?: () => Promise<RouteComponent>;
  lazy?: () => Promise<any>;
  children?: RouteItem[];
  layout?: boolean;
}

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

export type SetAppRouter = (AppRouter: ComponentType<AppRouterProps>) => void;
export type GetAppRouter = () => AppProvider;
export type AddProvider = (Provider: AppProvider) => void;
export type SetRender = (render: Renderer) => void;
export type AddWrapper = (wrapper: RouteWrapper, forLayout?: boolean) => void;

export interface RouteModules {
  [routeId: string]: RouteComponent;
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
  setRender: SetRender;
  addWrapper: AddWrapper;
  appContext: AppContext;
  useData: UseData;
  useConfig: UseConfig;
  useAppContext: UseAppContext;
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
  action: Action;
  location: Location;
  navigator: Navigator;
  routes: RouteObject[];
  static?: boolean;
  basename?: string;
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

export type DistType = Array<'html' | 'javascript'>;
