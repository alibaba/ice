import type { Action, Location } from 'history';
import type { Navigator, Params } from 'react-router-dom';
import type { ComponentType, ReactNode } from 'react';
import type { Renderer } from 'react-dom';
import type { usePageContext } from './PageContext';

type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId?: string;
  strict?: boolean;
  addProvider?: ({ children }: { children: ReactNode }) => ReactNode;
  getInitialData?: (ctx?: InitialContext) => Promise<any>;
} & Record<AppLifecycle, VoidFunction>>;

export interface AppConfig extends Record<string, any> {
  app?: App;
  router?: {
    type: 'hash' | 'browser';
    basename?: string;
  };
}

export {
  Renderer,
};

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

type InitialData = any;
export interface PageComponent {
  default: ComponentType<any>;
  getInitialData?: (ctx: InitialContext) => any;
  getPageConfig?: (props: { initialData: InitialData }) => PageConfig;
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
  pageConfig?: PageConfig;
  children?: RouteItem[];
}

export interface PageConfig {
  title?: string;
  // TODO: fix type
  meta?: any[];
  links?: any[];
  scripts?: any[];
  auth?: string[];
}

export type PageWrapper<InjectProps> = (<Props>(Component: ComponentType<Props & InjectProps>) => ComponentType<Props>);
export type SetAppRouter = (AppRouter: ComponentType<AppRouterProps>) => void;
export type AddProvider = (Provider: ComponentType) => void;
export type SetRender = (render: Renderer) => void;
export type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;

export interface RouteModules {
  [routeId: string]: PageComponent;
}

export interface AssetsManifest {
  publicPath?: string;
  bundles?: Record<string, {
    files: string[];
    isEntry: boolean;
  }>;
}
export interface AppContext {
  appConfig: AppConfig;
  assetsManifest?: AssetsManifest;
  matches?: RouteMatch[];
  routes?: RouteItem[];
  initialData?: InitialData;
  pageData?: PageData;
  initialPageData?: PageData;
}

export interface AppData {
  initialData?: InitialData;
}

export interface PageData {
  pageConfig: PageConfig;
  initialData?: InitialData;
}

export interface RuntimeAPI {
  setAppRouter: SetAppRouter;
  addProvider: AddProvider;
  setRender: SetRender;
  wrapperPageComponent: WrapperPageComponent;
  appContext: AppContext;
  usePageContext: typeof usePageContext;
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
