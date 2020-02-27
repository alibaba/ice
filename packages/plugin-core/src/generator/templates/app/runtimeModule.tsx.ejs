import * as React from 'react';

interface IRenderParams {
  App: React.ComponentType;
  appMountNode: HTMLElement;
}

interface IDOMRender {
  (data: IRenderParams): void;
}

interface IGetAppRouter {
  (): React.ComponentType;
}

interface RouteItemProps {
  children?: RouteItemProps[];
  path?: string;
  redirect?: string;
  component?: React.ComponentType;
  RouteWrapper?: React.ComponentType;
}

interface IModifyRoutes {
  (modifyFn: IModifyFn): void;
}

interface IModifyFn {
  (routes: RouteItemProps[]): RouteItemProps[];
}

interface IAppRouter {
  (routes: RouteItemProps[]): React.ComponentType;
}

interface IWrapperRoute {
  (RouteComponent: React.ComponentType): React.ComponentType;
}

interface IWrapperRouteComponent {
  (wrapperRoute: IWrapperRoute): void;
}

class RuntimeModule {
  private AppProvider: React.ComponentType[];

  private modifyRoutesRegistration: IModifyFn[];

  private wrapperRouteRegistration: IWrapperRoute[];

  public renderRouter: IAppRouter;

  public appConfig: any;

  public buildConfig: any;

  public modifyDOMRender: IDOMRender|null;

  constructor(appConfig, buildConfig) {
    this.renderRouter = () => () => <div>No route</div>;
    this.AppProvider = [];
    this.appConfig = appConfig;
    this.buildConfig = buildConfig;
    this.modifyDOMRender = null;
    this.modifyRoutesRegistration = [];
    this.wrapperRouteRegistration = [];
  }

  public loadModlues(modules) {
    const runtimeAPI = {
      setRenderRouter: this.setRenderRouter,
      addProvider: this.addProvider,
      addDOMRender: this.addDOMRender,
      modifyRoutes: this.modifyRoutes,
      wrapperRouteComponent: this.wrapperRouteComponent,
    }

    if (modules && modules.length) {
      modules.forEach((module) => {
        if (module) module.default({ ...runtimeAPI, appConfig: this.appConfig, buildConfig: this.buildConfig });
      })
    }
  }

  public setRenderRouter = (renderRouter) => {
    this.renderRouter = renderRouter;
  }

  public addProvider = (Provider) => {
    this.AppProvider.push(Provider);
  }

  public composeAppProvider() {
    if (!this.AppProvider.length) return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        return (
          <ProviderComponent {...rest}>
            {CurrentProvider ? <CurrentProvider {...rest}>{children}</CurrentProvider> : children}
          </ProviderComponent>
        )
      }
    });
  }

  public addDOMRender = (render: IDOMRender) => {
    this.modifyDOMRender = render;
  }

  public modifyRoutes: IModifyRoutes = (modifyFn) => {
    this.modifyRoutesRegistration.push(modifyFn);
  }

  public wrapperRouteComponent: IWrapperRouteComponent = (wrapperRoute) => {
    this.wrapperRouteRegistration.push(wrapperRoute);
  }

  private wrapperRoutes = (routes) => {
    return routes.map((item) => {
      if (item.children) {
        item.children = this.wrapperRoutes(item.children);
      } else if (item.component) {
        item.routeWrappers = this.wrapperRouteRegistration;
      }
      return item;
    });
  }

  public getAppRouter: IGetAppRouter = () => {
    const routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc, curr) => {
      return curr(acc);
    }, []));
    return this.renderRouter(routes);
  }
}

export default RuntimeModule;
