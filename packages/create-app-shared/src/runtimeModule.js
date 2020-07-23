import { createHistory } from './history';

class RuntimeModule {
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

  loadModule(module) {
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

  setRenderRouter = (renderRouter) => {
    this.renderRouter = renderRouter;
  }

  addProvider = (Provider) => {
    this.AppProvider.push(Provider);
  }

  composeAppProvider() {
    if (!this.AppProvider.length) return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        const element = CurrentProvider
          ? this.context.createElement(CurrentProvider, {...rest})
          : this.context.createElement(children);
        return this.context.createElement(
          ProviderComponent,
          {...rest},
          element
        );
      };
    });
  }

  addDOMRender = (render) => {
    this.modifyDOMRender = render;
  }

  modifyRoutes = (modifyFn) => {
    this.modifyRoutesRegistration.push(modifyFn);
  }

  wrapperRouteComponent = (wrapperRoute) => {
    this.wrapperRouteRegistration.push(wrapperRoute);
  }

  wrapperRoutes = (routes) => {
    return routes.map((item) => {
      if (item.children) {
        item.children = this.wrapperRoutes(item.children);
      } else if (item.component) {
        item.routeWrappers = this.wrapperRouteRegistration;
      }
      return item;
    });
  }

  getAppRouter = () => {
    const routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc, curr) => {
      return curr(acc);
    }, []));
    return this.renderRouter(routes);
  }
}

export default RuntimeModule;
