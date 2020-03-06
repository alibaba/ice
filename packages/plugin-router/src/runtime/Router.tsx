/* eslint @typescript-eslint/explicit-function-return-type:0, react/jsx-filename-extension: 0, no-shadow: 0, @typescript-eslint/no-explicit-any:0 */
import * as React from 'react';
import {
  HashRouter,
  BrowserRouter,
  MemoryRouter,
  Switch,
  Route,
  Redirect,

  RouteComponentProps
} from 'react-router-dom';
import { RoutesProps, RouterProps, IRouteWrapper, IDynamicImportComponent  } from '../types'

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
  const { __LAZY__, dynamicImport }: IDynamicImportComponent = component;
  return __LAZY__ ? React.lazy(() => dynamicImport().then((m) => {
    if (routerWrappers && routerWrappers.length) {
      return { ...m, default: wrapperRoute(m.default, routerWrappers) }
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
