import { createHistory } from './history';
import getSearchParams from './getSearchParams';

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
type IWrapper<InjectProps> = (<Props>(Component: React.ComponentType<Props & InjectProps>) => React.ComponentType<Props>)
type IRenderRouter = (routes?: IRoutes, RoutesComponent?: IRoutesComponent) => React.ComponentType;
type IWrapperRouterRender = (renderRouter: IRenderRouter) => IRenderRouter;

class RuntimeModule {
  private appConfig: any;

  private buildConfig: any;

  private context: any;

  private renderRouter: IRenderRouter;

  private AppProvider: React.ComponentType[];

  public modifyDOMRender: IDOMRender;

  private modifyRoutesRegistration: IModifyFn[];

  private wrapperRouteRegistration: IWrapper<any>[];

  private routesComponent: IRoutesComponent;

  constructor(appConfig, buildConfig, context) {
    this.renderRouter = () => () => context.createElement('div', null, 'No route');
    this.routesComponent = false;
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
      wrapperRouterRender: this.wrapperRouterRender,
      modifyRoutesComponent: this.modifyRoutesComponent,
      createHistory,
      getSearchParams,
    };

    if (module) (module.default || module)({
      ...runtimeAPI,
      appConfig: this.appConfig,
      buildConfig: this.buildConfig,
      context: this.context
    });
  }

  public setRenderRouter = (renderRouter: IRenderRouter) => {
    this.renderRouter = renderRouter;
  }

  public wrapperRouterRender = (wrapper: IWrapperRouterRender) => {
    // pass origin router render for custom requirement
    this.renderRouter = wrapper(this.renderRouter);
  }

  public addProvider = (Provider: React.ComponentType) => {
    this.AppProvider.push(Provider);
  }

  public composeAppProvider() {
    if (!this.AppProvider.length) return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        const element = CurrentProvider
          ? this.context.createElement(CurrentProvider, { ...rest }, children)
          : this.context.createElement(children);
        return this.context.createElement(
          ProviderComponent,
          { ...rest },
          element
        );
      };
    });
  }

  public addDOMRender = (render: IDOMRender) => {
    this.modifyDOMRender = render;
  }

  public modifyRoutes = (modifyFn: IModifyFn) => {
    this.modifyRoutesRegistration.push(modifyFn);
  }

  public modifyRoutesComponent = (modify: (routesComponent: IRoutesComponent) => IRoutesComponent) => {
    this.routesComponent = modify(this.routesComponent);
  }

  public wrapperRouteComponent = (wrapperRoute: IWrapper<any>) => {
    this.wrapperRouteRegistration.push(wrapperRoute);
  }

  public wrapperRoutes = (routes: IRoutes) => {
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
    const routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc: IRoutes, curr) => {
      return curr(acc);
    }, []));
    return this.renderRouter(routes, this.routesComponent);
  }
}

export default RuntimeModule;
