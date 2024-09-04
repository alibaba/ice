import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import type { ComponentType } from 'react';
import { routerHistory as history } from './history.js';
import type {
  Renderer,
  AppContext,
  StaticRuntimePlugin,
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
  ResponseHandler,
} from './types.js';
import { useData, useConfig } from './RouteContext.js';
import { useData as useSingleRouterData, useConfig as useSingleRouterConfig } from './singleRouter.js';
import { useAppContext } from './AppContext.js';

class Runtime {
  private appContext: AppContext;

  private runtimeOptions?: Record<string, any>;

  private AppRouter: ComponentType<AppRouterProps>;

  private AppProvider: ComponentWithChildren[];

  private RouteWrappers: RouteWrapperConfig[];

  private render: Renderer;

  private responseHandlers: ResponseHandler[];

  public constructor(appContext: AppContext, runtimeOptions?: Record<string, any>) {
    this.AppProvider = [];
    this.appContext = appContext;
    this.render = (container, element) => {
      const root = ReactDOM.createRoot(container);
      root.render(element);
      return root;
    };
    this.RouteWrappers = [];
    this.runtimeOptions = runtimeOptions;
    this.responseHandlers = [];
    this.getAppRouter = this.getAppRouter.bind(this);
  }

  public getAppContext = () => {
    return {
      ...this.appContext,
      RouteWrappers: this.RouteWrappers,
    };
  };

  public setAppContext = (appContext: AppContext) => {
    this.appContext = appContext;
  };

  public getRender = () => {
    return this.render;
  };

  public getAppRouter<T>() {
    return this.AppRouter as ComponentType<T>;
  }

  public getWrappers = () => this.RouteWrappers;

  public loadModule(module: RuntimePlugin | StaticRuntimePlugin | CommonJsRuntime) {
    let runtimeAPI: RuntimeAPI = {
      addProvider: this.addProvider,
      addResponseHandler: this.addResponseHandler,
      getResponseHandlers: this.getResponseHandlers,
      getAppRouter: this.getAppRouter,
      setRender: this.setRender,
      addWrapper: this.addWrapper,
      appContext: this.appContext,
      setAppRouter: this.setAppRouter,
      useData: process.env.ICE_CORE_ROUTER === 'true' ? useData : useSingleRouterData,
      useConfig: process.env.ICE_CORE_ROUTER === 'true' ? useConfig : useSingleRouterConfig,
      useAppContext,
      history,
    };

    const runtimeModule = ((module as CommonJsRuntime).default || module) as RuntimePlugin;
    if (module) {
      return runtimeModule(runtimeAPI, this.runtimeOptions);
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

  public setAppRouter: SetAppRouter = (AppRouter) => {
    this.AppRouter = AppRouter;
  };

  public addResponseHandler = (handler: ResponseHandler) => {
    this.responseHandlers.push(handler);
  };

  public getResponseHandlers = () => {
    return this.responseHandlers;
  };
}

export default Runtime;
