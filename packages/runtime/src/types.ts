import type { ComponentType, ReactNode } from 'react';
type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId?: string;
  strict?: boolean;
  addProvider?: ({ children }: { children: ReactNode }) => ReactNode;
  getInitialData?: (ctx?: any) => Promise<any>;
} & Record<AppLifecycle, VoidFunction>>;

export interface AppConfig extends Record<string, any> {
  app?: App;
  router?: {
    type: 'hash' | 'browser';
    basename?: string;
  };
}
// simplify page item type while it has been defined in plugin-router
export interface DOMRender {
  ({ App, appMountNode }: { App: React.ComponentType; appMountNode?: HTMLElement }): void;
}

export interface RouteItem {
  path: string;
  component: ComponentType;
  exact?: boolean;
  strict?: boolean;
  children?: RouteItem[];
}

export type Routes = RouteItem[];
export interface RenderOptions {
  context: Context;
  appConfig: AppConfig;
  pageWrappers?: PageWrapper<any>[];
}
export type PageWrapper<InjectProps> = (<Props>(Component: React.ComponentType<Props & InjectProps>) => ComponentType<Props>);
export type RenderApp = (options: RenderOptions) => JSX.Element;
export type SetRenderApp = (renderApp: RenderApp) => void;
export type AddProvider = (Provider: React.ComponentType) => void;
export type AddDOMRender = (domRender: DOMRender) => void;
export type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;

export interface BuildConfig extends Record<string, any> {
  ssr?: boolean;
  target?: string[];
}

// getInitialData: (ctx: InitialContext) => {}
export interface InitialContext {
  pathname: string;
  path: string;
  query: Record<string, any>;
  ssrError?: any;
}

export interface Context {
  appManifest?: Record<string, any>;
  routes?: Routes;
  initialData?: any;
}
export interface RuntimeAPI {
  setRenderApp: SetRenderApp;
  addProvider: AddProvider;
  addDOMRender: AddDOMRender;
  wrapperPageComponent: WrapperPageComponent;
  appConfig: AppConfig;
  buildConfig: BuildConfig;
  context: Context;
}

export interface RuntimePlugin {
  (
    apis: RuntimeAPI
  ): void;
}

export interface CommonJsRuntime {
  default: RuntimePlugin;
}

export type GetAppComponent = () => JSX.Element;
export type GetWrapperPageRegistration = () => PageWrapper<any>[];