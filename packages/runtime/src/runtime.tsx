import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import type { ComponentType } from 'react';
import type {
  Renderer,
  AppContext,
  RuntimePlugin,
  CommonJsRuntime,
  RuntimeAPI,
  SetAppRouter,
  AddProvider,
  AddWrapper,
  RouteWrapperConfig,
  SetRender,
  AppRouterProps,
  ComponentWithChildren,
} from './types.js';
import DefaultAppRouter from './AppRouter.js';
import { useData, useConfig } from './RouteContext.js';

class Runtime {
  private appContext: AppContext;

  private AppRouter: ComponentType<AppRouterProps>;

  private AppProvider: ComponentWithChildren[];

  private RouteWrappers: RouteWrapperConfig[];

  private render: Renderer;

  public constructor(appContext: AppContext) {
    this.AppProvider = [];
    this.appContext = appContext;
    this.render = (container, element) => {
      const root = ReactDOM.createRoot(container);
      root.render(element);
    };
    this.AppRouter = DefaultAppRouter;
    this.RouteWrappers = [];
  }

  public getAppContext = () => this.appContext;

  public getRender = () => {
    return this.render;
  };

  public getAppRouter = () => this.AppRouter;

  public getWrappers = () => this.RouteWrappers;

  public async loadModule(module: RuntimePlugin | CommonJsRuntime) {
    let runtimeAPI: RuntimeAPI = {
      addProvider: this.addProvider,
      setRender: this.setRender,
      addWrapper: this.addWrapper,
      appContext: this.appContext,
      setAppRouter: this.setAppRouter,
      useData,
      useConfig,
    };

    const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
    if (module) {
      return await runtimeModule(runtimeAPI);
    }
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

  public addProvider: AddProvider = (Provider) => {
    // must promise user's providers are wrapped by the plugins' providers
    this.AppProvider.unshift(Provider);
  };

  public setRender: SetRender = (render) => {
    this.render = render;
  };

  private addWrapper: AddWrapper = (Wrapper, forLayout?: boolean) => {
    this.RouteWrappers.push({
      Wrapper,
      layout: forLayout,
    });
  };

  // for plugin-icestark
  public setAppRouter: SetAppRouter = (AppRouter) => {
    this.AppRouter = AppRouter;
  };
}

export default Runtime;