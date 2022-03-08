import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { ComponentType } from 'react';
import type {
  PageWrapper,
  Renderer,
  AppContext,
  RuntimePlugin,
  CommonJsRuntime,
  RuntimeAPI,
  SetAppRouter,
  AddProvider,
  SetRender,
  WrapperPageComponent,
  GetWrapperPageRegistration,
} from './types.js';

class Runtime {
  private appContext: AppContext;

  private AppRouter: ComponentType;

  private AppProvider: ComponentType[];

  private wrapperPageRegistration: PageWrapper<any>[];

  private render: Renderer;

  public constructor(appContext: AppContext) {
    this.AppProvider = [];
    this.appContext = appContext;
    this.render = ReactDOM.render;
    this.AppRouter = null;
    this.wrapperPageRegistration = [];
  }

  public getAppContext = () => this.appContext;

  public getRender = () => this.render;

  public getAppRouter = () => this.AppRouter;

  public loadModule(module: RuntimePlugin | CommonJsRuntime) {
    let runtimeAPI: RuntimeAPI = {
      addProvider: this.addProvider,
      setRender: this.setRender,
      wrapperPageComponent: this.wrapperPageComponent,
      appContext: this.appContext,
      setAppRouter: this.setAppRouter,
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

  private addProvider: AddProvider = (Provider) => {
    // must promise user's providers are wrapped by the plugins' providers
    this.AppProvider.unshift(Provider);
  };

  private setRender: SetRender = (render) => {
    this.render = render;
  };

  private wrapperPageComponent: WrapperPageComponent = (wrapperPage) => {
    this.wrapperPageRegistration.push(wrapperPage);
  };

  public getWrapperPageRegistration: GetWrapperPageRegistration = () => {
    return this.wrapperPageRegistration;
  };

  // for plugin-icestark
  private setAppRouter: SetAppRouter = (AppRouter) => {
    this.AppRouter = AppRouter;
  };
}

export default Runtime;