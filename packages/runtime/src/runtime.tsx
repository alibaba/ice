import * as React from 'react';
import type { ComponentType } from 'react';

type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId: string;
  strict: boolean;
  renderComponent: ComponentType;
} & Record<AppLifecycle, VoidFunction>>;
interface AppConfig extends Record<string, any> {
  app?: App;
}
// simplify page item type while it has been defined in plugin-router
interface DOMRender {
  ({ App, appMountNode }: { App: React.ComponentType; appMountNode?: HTMLElement }): void;
}
interface RenderOptions {
  routeManifest?: Record<string, any>;
  pageWrappers?: PageWrapper<any>[];
  renderComponent?: ComponentType;
}
type PageWrapper<InjectProps> = (<Props>(Component: React.ComponentType<Props & InjectProps>) => ComponentType<Props>);
type RenderApp = (options: RenderOptions) => ComponentType;
type SetRenderApp = (renderApp: RenderApp) => void;
type AddProvider = (Provider: React.ComponentType) => void;
type AddDOMRender = (domRender: DOMRender) => void;
type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;
interface CommonJsRuntime {
  default: RuntimePlugin;
}
type GetAppComponent = () => ComponentType;
type GetWrapperPageRegistration = () => PageWrapper<any>[];
interface BuildConfig extends Record<string, any> {
  ssr: boolean;
  target: string[];
}
interface Context {
  appManifest: Record<string, any>;
  routeManifest: Record<string, any>;
  initialContext: Record<string, any>;
  initialData: any;
  enableRouter: boolean;
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

class Runtime {
  private appConfig: AppConfig;

  private buildConfig: BuildConfig;

  private context: Context;

  private renderApp: RenderApp;

  private AppProvider: React.ComponentType[];

  private wrapperPageRegistration: PageWrapper<any>[];

  public modifyDOMRender: DOMRender;

  public constructor(appConfig: AppConfig, buildConfig: BuildConfig, context: Context) {
    this.AppProvider = [];
    this.appConfig = appConfig;
    this.buildConfig = buildConfig;
    this.context = context;
    this.modifyDOMRender = null;
    this.renderApp = () => null;
    this.wrapperPageRegistration = [];
  }

  public getAppConfig = () => this.appConfig;

  public loadModule(module: RuntimePlugin | CommonJsRuntime) {
    let runtimeAPI: RuntimeAPI = {
      appConfig: this.appConfig,
      addProvider: this.addProvider,
      addDOMRender: this.addDOMRender,
      wrapperPageComponent: this.wrapperPageComponent,
      buildConfig: this.buildConfig,
      context: this.context,
      setRenderApp: this.setRenderApp,
    };

    const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
    if (module) runtimeModule(runtimeAPI);
  }

  public composeAppProvider() {
    if (!this.AppProvider.length) return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        const element = CurrentProvider
          ? <CurrentProvider {...rest}>{children}</CurrentProvider>
          : children;
        return <ProviderComponent {...rest}>{element}</ProviderComponent>;
      };
    });
  }

  private setRenderApp: SetRenderApp = (renderRouter) => {
    this.renderApp = renderRouter;
  };

  private addProvider: AddProvider = (Provider) => {
    // must promise user's providers are wrapped by the plugins' providers
    this.AppProvider.unshift(Provider);
  };

  private addDOMRender: AddDOMRender = (render) => {
    this.modifyDOMRender = render;
  };

  private wrapperPageComponent: WrapperPageComponent = (wrapperPage) => {
    this.wrapperPageRegistration.push(wrapperPage);
  };

  public getWrapperPageRegistration: GetWrapperPageRegistration = () => {
    return this.wrapperPageRegistration;
  };

  public getAppComponent: GetAppComponent = () => {
    const { enableRouter, routeManifest } = this.context;
    const renderComponent = this.appConfig.app?.renderComponent;
    return this.renderApp(enableRouter ? {
      routeManifest,
      pageWrappers: this.wrapperPageRegistration,
    } : {
      pageWrappers: this.wrapperPageRegistration,
      renderComponent,
    });
  };
}

export default Runtime;