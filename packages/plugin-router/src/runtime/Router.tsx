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
import loadable from '@loadable/component';
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

function getRouteComponent(component, routerWrappers?: IRouteWrapper[], fallback?: React.ReactNode) {
  const { __LAZY__, dynamicImport, __LOADABLE__ }: IDynamicImportComponent = component || {};
  if (__LOADABLE__) {
    return loadable(dynamicImport, {
      resolveComponent: (component) => {
        return wrapperRoute(component.default, routerWrappers);
      },
      fallback
    });
  } else {
    return __LAZY__ ? React.lazy(() => dynamicImport().then((mod) => {
      if (routerWrappers && routerWrappers.length) {
        return { ...mod, default: wrapperRoute(mod.default, routerWrappers) };
      }
      return mod;
    })) : wrapperRoute(component, routerWrappers);
  }
}

export function parseRoutes(routes: RouteItemProps[], fallback?: React.ReactNode) {
  return routes.map((route) => {
    const { children, component, routeWrappers, wrappers, ...others }  = route;
    // do not wrapper components to layout added by runtime api wrapperRouteComponent
    let mergedRouteWrappers = children ? [] : routeWrappers as IRouteWrapper[];
    if (wrappers && wrappers.length) {
      mergedRouteWrappers = mergedRouteWrappers.concat(wrappers);
    }
    const parsedRoute: IRouterConfig = { ...others };
    if (component) {
      parsedRoute.component = getRouteComponent(component, mergedRouteWrappers, fallback);
    }
    if (children) {
      parsedRoute.children = parseRoutes(children, fallback);
    }
    return parsedRoute;
  });
}

export function IceRouter(props: RouterProps) {
  const { type, children, ...others } = props;
  let renderChildren: React.ReactChild | React.ReactChildren | undefined = children;
  if (!renderChildren && props.routes) {
    // parse routes before render
    const parsedRoutes = parseRoutes(props.routes, props.fallback);
    renderChildren = <Routes routes={parsedRoutes} fallback={props.fallback} />;
  }
  return type === 'static' ?
    <StaticRouter {...others}>
      {renderChildren}
    </StaticRouter> :
    <Router {...others}>
      {renderChildren}
    </Router>;
}

export function Routes({ routes, fallback }: RoutesProps) {
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
            if (RouteComponent) {
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
            } else {
              console.error('[Router] component is required when config routes');
              return null;
            }
          }
        } else {
          const { component: LayoutComponent, children, ...others } = route;
          const routesComponent = <Routes routes={children as IRouterConfig[]} fallback={fallback} />;
          const RenderComponent = (props: RouteComponentProps) => LayoutComponent ? (
            <LayoutComponent {...props}>
              {routesComponent}
            </LayoutComponent>
          ) : routesComponent;
          return (
            <Route
              key={id}
              {...others}
              render={RenderComponent}
            />
          );
        }
      })}
    </Switch>
  );
}
