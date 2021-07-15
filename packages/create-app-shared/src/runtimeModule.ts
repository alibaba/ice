import * as React from 'react';
import type { AppConfig, BuildConfig, Context } from './types';

type IRoutesComponent = boolean | React.ComponentType;
// simplify route item type while it has been defined in plugin-router
interface IRouteItem {
  [key: string]: any;
}
type IRoutes = IRouteItem[];
interface IModifyFn {
  (routes: IRoutes): IRoutes;
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
type IRenderRouter = (routes?: IRoutes, RoutesComponent?: IRoutesComponent) => React.ComponentType;
type IWrapperRouterRender = (renderRouter: IRenderRouter) => IRenderRouter;

type SetRenderRouter = (renderRouter: IRenderRouter) => void;
type AddProvider = (Provider: React.ComponentType) => void;
type AddDOMRender = (domRender: IDOMRender) => void;
type ModifyRoutes = (modifyFn: IModifyFn) => void;
type WrapperPageComponent = (wrapperPage: IWrapper<any>) => void;
type WrapperRouterRender = (wrapper: IWrapperRouterRender) => void;
type ModifyRoutesComponent = (modify: (routesComponent: IRoutesComponent) => IRoutesComponent) => void;

type CommonJsRuntime = { default: RuntimePlugin };

interface RuntimeAPI {
  setRenderRouter?: SetRenderRouter,
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

  private renderRouter: IRenderRouter;

  private AppProvider: React.ComponentType[];

  private modifyRoutesRegistration: IModifyFn[];

  private wrapperPageRegistration: IWrapper<any>[];

  private routesComponent: IRoutesComponent;

  private apiRegistration: APIRegistration;

  public modifyDOMRender: IDOMRender;

  constructor(appConfig: AppConfig, buildConfig: BuildConfig, context: Context) {
    this.AppProvider = [];
    this.appConfig = appConfig;
    this.buildConfig = buildConfig;
    this.context = context;
    this.modifyDOMRender = null;
    this.apiRegistration = {};

    this.renderRouter = () => () => context.createElement('div', null, 'No route');
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
        setRenderRouter: this.setRenderRouter,
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

  private setRenderRouter: SetRenderRouter = (renderRouter) => {
    this.renderRouter = renderRouter;
  }

  private wrapperRouterRender: WrapperRouterRender = (wrapper) => {
    // pass origin router render for custom requirement
    this.renderRouter = wrapper(this.renderRouter);
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

  private wrapperRoutes = (routes: IRoutes) => {
    return routes.map((item) => {
      if (item.children) {
        item.children = this.wrapperRoutes(item.children);
      } else if (item.component) {
        item.routeWrappers = this.wrapperPageRegistration;
      }
      return item;
    });
  }

  public getAppRouter = () => {
    const routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc: IRoutes, curr) => {
      return curr(acc);
    }, []));
    return this.renderRouter(routes, this.routesComponent);
  }

  public getPageComponent = () => {
    return this.wrapperPageRegistration.reduce((acc, curr) => {
      return curr(acc);
    }, this.appConfig.renderComponent);
  }
}

export default RuntimeModule;
