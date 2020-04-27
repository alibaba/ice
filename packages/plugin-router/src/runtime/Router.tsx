/* eslint @typescript-eslint/explicit-function-return-type:0, react/jsx-filename-extension: 0, no-shadow: 0, @typescript-eslint/no-explicit-any:0 */
import * as React from 'react';
import {
  Router,
  StaticRouter,
  Switch,
  Route,
  Redirect,

  RouteComponentProps
} from 'react-router-dom';
import { RoutesProps, RouterProps } from '../types/router';
import { IRouteWrapper, IDynamicImportComponent, RouteItemProps } from '../types/base';
import { IRouterConfig } from '../types';

function wrapperRoute(component, routerWrappers) {
  return (routerWrappers || []).reduce((acc, curr) => {
    const compose = curr(acc);
    if (acc.pageConfig) {
      compose.pageConfig = acc.pageConfig;
    }
    if (acc.getInitialProps) {
      compose.getInitialProps = acc.getInitialProps;
    }
    return compose;
  }, component);
}

function getRouteComponent(component, routerWrappers?: IRouteWrapper[]) {
  const { __LAZY__, dynamicImport }: IDynamicImportComponent = component || {};
  return __LAZY__ ? React.lazy(() => dynamicImport().then((m) => {
    if (routerWrappers && routerWrappers.length) {
      return { ...m, default: wrapperRoute(m.default, routerWrappers) };
    }
    return m;
  })) : wrapperRoute(component, routerWrappers);
}

function parseRoutes(routes: RouteItemProps[]) {
  return routes.map((route) => {
    const { children, component, routeWrappers, ...others } = route;
    const parsedRoute: IRouterConfig = { ...others };
    if (component) {
      parsedRoute.component = getRouteComponent(component, children ? [] : routeWrappers);
    }
    if (children) {
      parsedRoute.children = parseRoutes(children);
    }
    return parsedRoute;
  });
}

export function IceRouter(props: RouterProps) {
  const { type, routes, fallback, ...others } = props;
  // parse routes before render
  const parsedRoutes = parseRoutes(routes);

  const children = <Routes routes={parsedRoutes} fallback={fallback} />;
  return type === 'static' ?
    <StaticRouter {...others}>
      {children}
    </StaticRouter> :
    <Router {...others}>
      {children}
    </Router>;
}

function Routes({ routes, fallback }: RoutesProps) {
  return (
    <Switch>
      {routes.map((route, id) => {
        const { children } = route;

        if (!children) {
          if (route.redirect) {
            const { redirect, ...others } = route;
            return <Redirect key={id} from={route.path} to={redirect} {...others} />;
          } else {
            const { component: RouteComponent, ...others } = route;
            // React does not currently support Suspense when components are being server-side rendered
            // process.env.__IS_SERVER__: React.RenderToString()
            // window.__ICE_SSR_ENABLED__: React.hydrate()
            const RenderComponent = process.env.__IS_SERVER__ || (window as any).__ICE_SSR_ENABLED__
              ? (props: RouteComponentProps) => <RouteComponent {...props} />
              : (props: RouteComponentProps) => {
                return (
                  <React.Suspense fallback={fallback || <div>loading</div>}>
                    <RouteComponent {...props} />
                  </React.Suspense>
                );
              };

            return (
              <Route
                key={id}
                {...others}
                render={RenderComponent}
              />
            );
          }
        } else {
          const { component: LayoutComponent, children, ...others } = route;
          const RenderComponent = (props: RouteComponentProps) => (
            <LayoutComponent {...props}>
              <Routes routes={children} fallback={fallback} />
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
