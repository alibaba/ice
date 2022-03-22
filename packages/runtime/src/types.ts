import type { Action, Location } from 'history';
import type { Navigator } from 'react-router-dom';
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

export interface PageConfig {
  auth?: string[];
}

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
  path: string;
  element: ReactNode;
  componentName: string;
  id: string;
  index?: false;
  exact?: boolean;
  strict?: boolean;
  load?: () => Promise<PageComponent>;
  pageConfig?: PageConfig;
  children?: RouteItem[];
}

export type PageWrapper<InjectProps> = (<Props>(Component: ComponentType<Props & InjectProps>) => ComponentType<Props>);
export type SetAppRouter = (AppRouter: ComponentType<AppRouterProps>) => void;
export type AddProvider = (Provider: ComponentType) => void;
export type SetRender = (render: Renderer) => void;
export type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;

export interface RouteModules {
  [routeId: string]: PageComponent;
}

export interface AppContext {
  // todo: 这是啥
  appManifest?: Record<string, any>;
  routeModules: RouteModules;
  appConfig: AppConfig;
  pageData: PageData;
  routes?: RouteItem[];
  initialData?: InitialData;
  document?: ComponentType;
}

export interface PageData {
  pageConfig?: PageConfig;
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
