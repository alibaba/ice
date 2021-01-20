import { createHistory } from './history';
import getSearchParams from './getSearchParams';

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
      createHistory,
      getSearchParams
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

  public getAppRouter = async () => {
    let routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc, curr) => {
      return curr(acc);
    }, []));

    if (!process.env.__IS_SERVER__) {
      routes = await loadLazyComponent(routes);
    }

    return this.renderRouter(routes);
  }
}

export default RuntimeModule;

async function loadLazyComponent(routes) {
  const newRoutes = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const { children, component, ...other } of routes) {
    const route = {...other};
    if (children) {
      // eslint-disable-next-line no-await-in-loop
      route.children = await loadLazyComponent(children);
    }
    if (component) {
      if (component.load) {
        // eslint-disable-next-line no-await-in-loop
        const loadedComponent = await component.load();
        route.component = loadedComponent.default;
      } else {
        route.component = component;
      }
    }

    newRoutes.push(route);
  }

  return newRoutes;
}
