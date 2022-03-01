import type { ComponentType } from 'react';
type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId: string;
  strict: boolean;
  renderComponent: ComponentType;
} & Record<AppLifecycle, VoidFunction>>;
export interface AppConfig extends Record<string, any> {
  app: App;
}
// simplify page item type while it has been defined in plugin-router
export interface DOMRender {
  ({ App, appMountNode }: { App: React.ComponentType; appMountNode?: HTMLElement }): void;
}
export interface RenderOptions {
  routeManifest?: Record<string, any>;
  pageWrappers?: PageWrapper<any>[];
  renderComponent?: ComponentType;
}
export type PageWrapper<InjectProps> = (<Props>(Component: React.ComponentType<Props & InjectProps>) => ComponentType<Props>);
export type RenderApp = (options: RenderOptions) => ComponentType;
export type SetRenderApp = (renderApp: RenderApp) => void;
export type AddProvider = (Provider: React.ComponentType) => void;
export type AddDOMRender = (domRender: DOMRender) => void;
export type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;

export interface BuildConfig extends Record<string, any> {
  ssr?: boolean;
  target?: string[];
}
export interface Context {
  appManifest?: Record<string, any>;
  routeManifest?: Record<string, any>;
  initialContext?: Record<string, any>;
  initialData?: any;
  enableRouter?: boolean;
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

export type GetAppComponent = () => ComponentType;
export type GetWrapperPageRegistration = () => PageWrapper<any>[];