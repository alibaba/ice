import type { Action, Location } from 'history';
import type { ComponentType, ReactNode } from 'react';
import type { Root, HydrationOptions } from 'react-dom/client';
import type { Navigator, Params } from 'react-router-dom';
import type { useConfig, useData } from './RouteContext';

type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  strict?: boolean;
  addProvider?: ({ children }: { children: ReactNode }) => ReactNode;
  getData?: GetData;
} & Record<AppLifecycle, VoidFunction>>;

export type AppData = any;
export type RouteData = any;

// route.getConfig return value
export interface RouteConfig {
  title?: string;
  // TODO: fix type
  meta?: any[];
  links?: any[];
  scripts?: any[];

  // plugin extends
  auth?: string[];
}

// app.getData & route.getData
export type GetData = (ctx: InitialContext) => Promise<RouteData> | RouteData;
// route.getConfig
export type GetConfig = (args: { data: RouteData }) => RouteConfig;

export interface AppConfig extends Record<string, any> {
  app?: App;
  router?: {
    type: 'hash' | 'browser';
    basename?: string;
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
  assetsManifest: AssetsManifest;
  routesData: RoutesData;
  routesConfig: RoutesConfig;
  appData: any;
  matches?: RouteMatch[];
  routes?: RouteItem[];
  documentOnly?: boolean;
}

export type Renderer = (
  container: Element | Document,
  initialChildren: React.ReactChild | Iterable<React.ReactNode>,
  options?: HydrationOptions,
) => Root;

export interface ServerContext {
  req?: Request;
  res?: Response;
}

export interface InitialContext extends ServerContext {
  pathname: string;
  path: string;
  query: Record<string, any>;
  ssrError?: any;
}

export interface PageComponent {
  default: ComponentType<any>;
  getData?: GetData;
  getConfig?: GetConfig;
}

export interface RouteItem {
  id: string;
  path: string;
  element?: ReactNode;
  componentName: string;
  index?: false;
  exact?: boolean;
  strict?: boolean;
  load?: () => Promise<PageComponent>;
  children?: RouteItem[];
}

export type ComponentWithChildren<P = {}> = React.ComponentType<React.PropsWithChildren<P>>;
export type PageWrapper<InjectProps> = (<Props>(Component: ComponentType<Props & InjectProps>) => ComponentType<Props>);
export type SetAppRouter = (AppRouter: ComponentType<AppRouterProps>) => void;
export type AddProvider = (Provider: ComponentWithChildren<any>) => void;
export type SetRender = (render: Renderer) => void;
export type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;

export interface RouteModules {
  [routeId: string]: PageComponent;
}

export interface AssetsManifest {
  publicPath: string;
  entries: string[];
  pages: string[];
  assets?: {
    [assetPath: string]: string;
  };
}


export interface RuntimeAPI {
  setAppRouter: SetAppRouter;
  addProvider: AddProvider;
  setRender: SetRender;
  wrapperPageComponent: WrapperPageComponent;
  appContext: AppContext;
  useData: typeof useData;
  useConfig: typeof useConfig;
}

export interface RuntimePlugin {
  (
    apis: RuntimeAPI
  ): void;
}

export interface CommonJsRuntime {
  default: RuntimePlugin;
}

export type GetWrapperPageRegistration = () => PageWrapper<any>[];

export type RuntimeModules = (RuntimePlugin | CommonJsRuntime)[];

export interface AppRouterProps {
  action: Action;
  location: Location;
  navigator: Navigator;
  routes: RouteItem[];
  static?: boolean;
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
