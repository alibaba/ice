/* eslint @typescript-eslint/explicit-function-return-type:0, react/jsx-filename-extension: 0, no-shadow: 0, @typescript-eslint/no-explicit-any:0 */
import * as React from 'react';
import { Suspense, lazy } from 'react';
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

function setComponentAttr(comp: any, route?: RouteItemProps) {
  if(!route) return;
  ['pageConfig', 'getInitialProps'].forEach(attr => {
    if (Object.prototype.hasOwnProperty.call(route, attr)) {
      comp[attr] = route[attr];
    }
  });
}

function getRouteComponent(component, routerWrappers?: IRouteWrapper[], route?: RouteItemProps, fallback?: React.ReactNode) {
  const { __LAZY__, dynamicImport, __LOADABLE__ }: IDynamicImportComponent = component || {};
  if (__LOADABLE__) {
    return loadable(dynamicImport, {
      resolveComponent: (mod) => {
        const comp = mod.default as any;
        // 适配中心化路由配置（react-loadable）
        setComponentAttr(comp, route);
        return wrapperRoute(comp, routerWrappers);
      },
      fallback
    });
  } else if (__LAZY__) {
    return lazy(() => dynamicImport().then((mod) => {
      if (routerWrappers && routerWrappers.length) {
        const comp = mod.default as any;
        // 适配中心化路由配置（React lazy）
        setComponentAttr(comp, route);
        return { ...mod, default: wrapperRoute(comp, routerWrappers) };
      }
      return mod;
    }));
  } else {
    // 适配中心化路由配置（非按需加载）
    setComponentAttr(component, route);
    return wrapperRoute(component, routerWrappers);
  }
}

export function parseRoutes(routes: RouteItemProps[], fallback?: React.ReactNode) {
  return routes.map((route) => {
    const { children, component, routeWrappers, wrappers, ...others } = route;
    // do not wrapper components to layout added by runtime api wrapperPageComponent
    let mergedRouteWrappers = children ? [] : routeWrappers as IRouteWrapper[];
    if (wrappers && wrappers.length) {
      mergedRouteWrappers = mergedRouteWrappers.concat(wrappers);
    }
    const parsedRoute: IRouterConfig = { ...others };
    if (component) {
      parsedRoute.component = getRouteComponent(component, mergedRouteWrappers, route, fallback);
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
                    <Suspense fallback={fallback || <div>loading</div>}>
                      <RouteComponent {...props} />
                    </Suspense>
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
