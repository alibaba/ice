import type { ComponentType, ReactNode } from 'react';
import type { Renderer } from 'react-dom';

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

export {
  Renderer,
};

export interface RouteItem {
  path: string;
  component: ComponentType;
  exact?: boolean;
  strict?: boolean;
  children?: RouteItem[];
}

export type PageWrapper<InjectProps> = (<Props>(Component: React.ComponentType<Props & InjectProps>) => ComponentType<Props>);
export type SetAppRouter = (AppRouter: React.ComponentType) => void;
export type AddProvider = (Provider: React.ComponentType) => void;
export type SetRender = (render: Renderer) => void;
export type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;

// getInitialData: (ctx: InitialContext) => {}
export interface InitialContext {
  pathname: string;
  path: string;
  query: Record<string, any>;
  ssrError?: any;
}

export interface AppContext {
  // todo: 这是啥
  appManifest?: Record<string, any>;
  routes?: RouteItem[];
  initialData?: any;
  appConfig: AppConfig;
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