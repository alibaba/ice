/* eslint @typescript-eslint/explicit-function-return-type:0, react/jsx-filename-extension: 0, no-shadow: 0, @typescript-eslint/no-explicit-any:0 */
import * as React from 'react';
import {
  HashRouter,
  BrowserRouter,
  MemoryRouter,
  Switch,
  Route,
  Redirect,

  RouteProps as DefaultRouteProps,
  RouteComponentProps,
} from 'react-router-dom';

type IImport = Promise<{
  default: React.ComponentType<any>;
}>;

interface IRouteWrapper {
  (props: any): React.ComponentType<any>;
}

export interface RouteItemProps extends DefaultRouteProps {
  children?: RouteItemProps[];
  // disable string[]
  path?: string;
  // for rediect ability
  redirect?: string;

  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | IImport;

  routeWrappers?: IRouteWrapper[];
};

interface RouterProps {
  // custom props
  routes: RouteItemProps[];
  type?: 'hash' | 'browser' | 'memory';
  // common props for BrowserRouter&HashRouter&MemoryRouter
  basename?: string;
  getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);
  forceRefresh?: boolean;
  // for BrowserRouter
  keyLength?: number;
  // for HashRouter
  hashType?: 'slash' | 'noslash' | 'hashbang';
  // for MemoryRouter
  initialEntries?: string[];
  initialIndex?: number;
  lazy?: boolean;
  fallback?: React.ReactNode;
};

interface RoutesProps {
  routes: RouteItemProps[];
};

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function wrapperRoute(component, routerWrappers) {
  return (routerWrappers || []).reduce((acc, curr) => {
    const compose = curr(acc)
    if (acc.pageConfig) {
      compose.pageConfig = acc.pageConfig
    }
    if (acc.getInitialProps) {
      compose.getInitialProps = acc.getInitialProps
    }
    return compose;
  }, component);
}

function getRouteComponent(component, routerWrappers?: IRouteWrapper[]) {
  return isPromise(component) ? React.lazy(() => (component as IImport).then((m) => {
    if (routerWrappers && routerWrappers.length) {
      m.default = wrapperRoute(m.default, routerWrappers);
    }
    return m;
  })) : wrapperRoute(component, routerWrappers);
}

export function Router(props: RouterProps) {
  const { type = 'hash', routes, fallback, ...others } = props;
  const typeToComponent = {
    hash: HashRouter,
    browser: BrowserRouter,
    // for test case
    memory: MemoryRouter,
  };

  const RouterComponent: React.ComponentType<any> = typeToComponent[type];

  return (
    <RouterComponent {...others}>
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <Routes routes={routes} />
      </React.Suspense>
    </RouterComponent>
  );
}

function Routes({ routes }: RoutesProps) {
  return (
    <Switch>
      {routes.map((route, id) => {
        const { children } = route;

        if (!children) {
          if (route.redirect) {
            const { redirect, ...others } = route;
            return <Redirect key={id} from={route.path} to={redirect} {...others} />;
          } else {
            const { routeWrappers, component, ...others } = route;
            if (routeWrappers) {
              const RouteComponent = getRouteComponent(component, routeWrappers);
              return (
                <Route
                  key={id}
                  {...others}
                  render={(props: RouteComponentProps) => {
                    return (
                      <RouteComponent {...props} />
                    );
                  }}
                />
              );
            } else {
              const routeComponent = getRouteComponent(component);
              return <Route key={id} component={routeComponent} {...others} />;
            }
          }
        } else {
          const { component, children, ...others } = route;
          const LayoutComponent = getRouteComponent(component);
          const RenderComponent = (props: RouteComponentProps) => (
            <LayoutComponent {...props}>
              <Routes routes={children} />
            </LayoutComponent>
          );
          return (
            <Route
              key={id}
              {...others}
              component={RenderComponent}
            />
          );
        }
      })}
    </Switch>
  );
}
