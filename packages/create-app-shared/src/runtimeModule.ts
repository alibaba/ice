import { createHistory } from './history';

class RuntimeModule {

  private renderRouter: any;

  private AppProvider: any;

  private appConfig: any;

  private buildConfig: any;

  private context: any;

  private modifyDOMRender: any;

  private modifyRoutesRegistration: any;

  private wrapperRouteRegistration: any;

  constructor(appConfig, buildConfig, context) {
    this.renderRouter = () => () => context.createElement('div', null, 'No route');
    this.AppProvider = [];
    this.appConfig = appConfig;
    this.buildConfig = buildConfig;
    this.context = context;
    this.modifyDOMRender = null;
    this.modifyRoutesRegistration = [];
    this.wrapperRouteRegistration = [];
  }

  public loadModule(module) {
    const runtimeAPI = {
      setRenderRouter: this.setRenderRouter,
      addProvider: this.addProvider,
      addDOMRender: this.addDOMRender,
      modifyRoutes: this.modifyRoutes,
      wrapperRouteComponent: this.wrapperRouteComponent,
      createHistory
    };

    if (module) module.default({
      ...runtimeAPI,
      appConfig: this.appConfig,
      buildConfig: this.buildConfig,
      context: this.context
    });
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
        const element = CurrentProvider
          ? this.context.createElement(CurrentProvider, {...rest}, children)
          : this.context.createElement(children);
        return this.context.createElement(
          ProviderComponent,
          {...rest},
          element
        );
      };
    });
  }

  public addDOMRender = (render) => {
    this.modifyDOMRender = render;
  }

  public modifyRoutes = (modifyFn) => {
    this.modifyRoutesRegistration.push(modifyFn);
  }

  public wrapperRouteComponent = (wrapperRoute) => {
    this.wrapperRouteRegistration.push(wrapperRoute);
  }

  public wrapperRoutes = (routes) => {
    return routes.map((item) => {
      if (item.children) {
        item.children = this.wrapperRoutes(item.children);
      } else if (item.component) {
        item.routeWrappers = this.wrapperRouteRegistration;
      }
      return item;
    });
  }

  public getAppRouter = () => {
    const routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc, curr) => {
      return curr(acc);
    }, []));

    return this.renderRouter(routes);
  }
}

export default RuntimeModule;
