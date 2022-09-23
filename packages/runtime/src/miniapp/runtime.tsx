import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import type {
  Renderer,
  AppContext,
  RuntimePlugin,
  CommonJsRuntime,
  RuntimeAPI,
  AddProvider,
  AddWrapper,
  RouteWrapperConfig,
  SetRender,
  ComponentWithChildren,
} from '@ice/types';
import { useData, useConfig } from '../RouteContext.js';
import { useAppContext } from '../AppContext.js';

class Runtime {
  private appContext: AppContext;

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
    this.RouteWrappers = [];
  }

  public getAppContext = () => this.appContext;

  public getRender = () => {
    return this.render;
  };


  public getWrappers = () => this.RouteWrappers;

  public async loadModule(module: RuntimePlugin | CommonJsRuntime) {
    let runtimeAPI: RuntimeAPI = {
      addProvider: this.addProvider,
      setRender: this.setRender,
      addWrapper: this.addWrapper,
      appContext: this.appContext,
      useData,
      useConfig,
      useAppContext,
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
}

export default Runtime;
