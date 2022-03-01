import React from 'react';
import type { ComponentType } from 'react';
import type {
  AppConfig,
  BuildConfig,
  PageWrapper,
  DOMRender,
  Context,
  RenderApp,
  RuntimePlugin,
  CommonJsRuntime,
  RuntimeAPI,
  SetRenderApp,
  AddProvider,
  AddDOMRender,
  WrapperPageComponent,
  GetWrapperPageRegistration,
  GetAppComponent,
} from '@ice/types/lib/runtime.js';

class Runtime {
  private appConfig: AppConfig;

  private buildConfig: BuildConfig;

  private context: Context;

  private renderApp: RenderApp;

  private AppProvider: ComponentType[];

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

  private setRenderApp: SetRenderApp = (renderApp) => {
    this.renderApp = renderApp;
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