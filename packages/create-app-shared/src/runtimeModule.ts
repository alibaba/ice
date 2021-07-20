import * as React from 'react';
import type { AppConfig, BuildConfig, Context } from './types';

type IPageComponent = boolean | React.ComponentType;
// simplify page item type while it has been defined in plugin-router
interface IPageItem {
  [key: string]: any;
}
type IPage = IPageItem[];
interface IModifyFn {
  (routes: IPage): IPage;
}
interface IDOMRender {
  ({ App, appMountNode }: { App: React.ComponentType; appMountNode: HTMLElement }): void;
}
interface APIRegistration {
  [key: string]: Function;
}

type RegisterRuntimeAPI = (key: string, api: Function) => void;
type ApplyRuntimeAPI = <T extends unknown>(key: string, ...args: any) => T;
type IWrapper<InjectProps> = (<Props>(Component: React.ComponentType<Props & InjectProps>) => React.ComponentType<Props>)
type IRenderApp = (page?: IPage | React.ComponentType, PageComponent?: IPageComponent) => React.ComponentType;
type IWrapperRouterRender = (renderRouter: IRenderApp) => IRenderApp;

type SetRenderApp = (renderApp: IRenderApp) => void;
type AddProvider = (Provider: React.ComponentType) => void;
type AddDOMRender = (domRender: IDOMRender) => void;
type ModifyRoutes = (modifyFn: IModifyFn) => void;
type WrapperPageComponent = (wrapperPage: IWrapper<any>) => void;
type WrapperRouterRender = (wrapper: IWrapperRouterRender) => void;
type ModifyRoutesComponent = (modify: (routesComponent: IPageComponent) => IPageComponent) => void;
type CommonJsRuntime = { default: RuntimePlugin };

type GetAppComponent = () => React.ComponentType;

interface RuntimeAPI {
  setRenderApp?: SetRenderApp,
  addProvider: AddProvider,
  addDOMRender: AddDOMRender,
  modifyRoutes?: ModifyRoutes,
  wrapperRouterRender?: WrapperRouterRender,
  modifyRoutesComponent?: ModifyRoutesComponent,
  wrapperPageComponent?: WrapperPageComponent,
  applyRuntimeAPI: ApplyRuntimeAPI,
  appConfig: AppConfig,
  buildConfig: BuildConfig,
  context: Context,
}

export interface RuntimePlugin {
  (
    apis: RuntimeAPI
  ): void
}

class RuntimeModule {
  private appConfig: AppConfig;

  private buildConfig: BuildConfig;

  private context: Context;

  private renderApp: IRenderApp;

  private AppProvider: React.ComponentType[];

  private modifyRoutesRegistration: IModifyFn[];

  private wrapperPageRegistration: IWrapper<any>[];

  private routesComponent: IPageComponent;

  private apiRegistration: APIRegistration;

  public modifyDOMRender: IDOMRender;

  constructor(appConfig: AppConfig, buildConfig: BuildConfig, context: Context) {
    this.AppProvider = [];
    this.appConfig = appConfig;
    this.buildConfig = buildConfig;
    this.context = context;
    this.modifyDOMRender = null;
    this.apiRegistration = {};

    this.renderApp = (AppComponent: React.ComponentType) => AppComponent;
    this.routesComponent = false;
    this.modifyRoutesRegistration = [];
    this.wrapperPageRegistration = [];
  }

  public loadModule(module: RuntimePlugin | CommonJsRuntime) {
    const enabledRouter = !this.appConfig.renderComponent;
    let runtimeAPI: RuntimeAPI = {
      addProvider: this.addProvider,
      addDOMRender: this.addDOMRender,
      applyRuntimeAPI: this.applyRuntimeAPI,
      wrapperPageComponent: this.wrapperPageComponent,
      appConfig: this.appConfig,
      buildConfig: this.buildConfig,
      context: this.context
    };
    if (enabledRouter) {
      runtimeAPI = {
        ...runtimeAPI,
        setRenderApp: this.setRenderApp,
        modifyRoutes:  this.modifyRoutes,
        wrapperRouterRender: this.wrapperRouterRender,
        modifyRoutesComponent: this.modifyRoutesComponent,
      };
    }
    const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
    if (module) runtimeModule(runtimeAPI);
  }

  public composeAppProvider() {
    if (!this.AppProvider.length) return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        const element = CurrentProvider
          ? this.context.createElement(CurrentProvider, {...rest}, children)
          : children;
        return this.context.createElement(
          ProviderComponent,
          { ...rest },
          element
        );
      };
    });
  }

  public registerRuntimeAPI: RegisterRuntimeAPI = (key, api) => {
    if (this.apiRegistration[key]) {
      console.warn(`api ${key} had already been registered`);
    } else {
      this.apiRegistration[key] = api;
    }
  }

  private applyRuntimeAPI: ApplyRuntimeAPI = (key, ...args) => {
    if (!this.apiRegistration[key]) {
      console.warn(`unknown api ${key}`);
    } else {
      return this.apiRegistration[key](...args);
    }
  }

  private setRenderApp: SetRenderApp = (renderRouter) => {
    this.renderApp = renderRouter;
  }

  private wrapperRouterRender: WrapperRouterRender = (wrapper) => {
    // pass origin router render for custom requirement
    this.renderApp = wrapper(this.renderApp);
  }

  private addProvider: AddProvider = (Provider) => {
    this.AppProvider.push(Provider);
  }

  private addDOMRender: AddDOMRender = (render) => {
    this.modifyDOMRender = render;
  }

  private modifyRoutes: ModifyRoutes = (modifyFn) => {
    this.modifyRoutesRegistration.push(modifyFn);
  }

  private modifyRoutesComponent: ModifyRoutesComponent = (modify) => {
    this.routesComponent = modify(this.routesComponent);
  }

  private wrapperPageComponent: WrapperPageComponent = (wrapperPage) => {
    this.wrapperPageRegistration.push(wrapperPage);
  }

  private wrapperRoutes = (routes: IPage) => {
    return routes.map((item) => {
      if (item.children) {
        item.children = this.wrapperRoutes(item.children);
      } else if (item.component) {
        item.routeWrappers = this.wrapperPageRegistration;
      }
      return item;
    });
  }

  public getAppComponent: GetAppComponent = () => {
    if (this.modifyRoutesRegistration.length > 0) {
      const routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc: IPage, curr) => {
        return curr(acc);
      }, []));
      return this.renderApp(routes, this.routesComponent);
    }
    return this.renderApp(this.wrapperPageRegistration.reduce((acc, curr) => {
      return curr(acc);
    }, this.appConfig.renderComponent));
  }
}

export default RuntimeModule;
