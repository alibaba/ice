import type { ComponentType, ReactNode } from 'react';
import type { Renderer } from 'react-dom';
import type { Params } from 'react-router-dom';

type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId?: string;
  strict?: boolean;
  addProvider?: ({ children }: { children: ReactNode }) => ReactNode;
  getInitialData?: (ctx?: any) => Promise<any>;
} & Record<AppLifecycle, VoidFunction>>;

interface Page {
  default: ComponentType<any>;
  getPageConfig?: Function;
  getInitialData?: (ctx?: any) => Promise<any>;
}

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

export interface RouteItem {
  id: string;
  path: string;
  component: Page;
  componentName: string;
  index?: false;
  exact?: boolean;
  strict?: boolean;
  load?: () => Promise<{ default: ComponentType<any> }>;
  children?: RouteItem[];
}

export interface RouteMatch<RouteItem> {
  params: Params;
  pathname: string;
  route: RouteItem;
}

export interface PageConfig {
  title?: string;
  meta?: any[];
  links?: any[];
  scripts?: any[];
  auth?: string[];
}

export interface PageAssets {
  links?: any[];
  scripts?: any[];
}

export type PageWrapper<InjectProps> = (<Props>(Component: ComponentType<Props & InjectProps>) => ComponentType<Props>);
export type SetAppRouter = (AppRouter: ComponentType<AppRouterProps>) => void;
export type AddProvider = (Provider: ComponentType) => void;
export type SetRender = (render: Renderer) => void;
export type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;

// getInitialData: (ctx: InitialContext) => {}
export interface InitialContext {
  pathname: string;
  path: string;
  query: Record<string, any>;
  ssrError?: any;
}

export interface RouteData {
  [componentName: string]: any;
}

export interface AppContext {
  // todo: 这是啥
  appManifest?: Record<string, any>;
  routes?: RouteItem[];
  initialData?: any;
  appConfig: AppConfig;
  routeData?: RouteData;
  routeAssets?: any;
  matches?: RouteMatch<RouteItem>[];
  assets?: any;
}

export interface RuntimeAPI {
  setAppRouter: SetAppRouter;
  addProvider: AddProvider;
  setRender: SetRender;
  wrapperPageComponent: WrapperPageComponent;
  appContext: AppContext;
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
  PageWrappers?: PageWrapper<any>[];
}