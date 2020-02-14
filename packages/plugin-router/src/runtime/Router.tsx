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

export interface RouteItemProps extends DefaultRouteProps {
  children?: RouteItemProps[];
  // disable string[]
  path?: string;
  // for rediect ability
  redirect?: string;

  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

  RouteWrapper?: React.ComponentType;
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
};

interface RoutesProps {
  routes: RouteItemProps[];
};

export function Router(props: RouterProps) {
  const { type = 'hash', routes, ...others } = props;
  const typeToComponent = {
    hash: HashRouter,
    browser: BrowserRouter,
    // for test case
    memory: MemoryRouter,
  };
  const RouterComponent: React.ComponentType<any> = typeToComponent[type];

  return (
    <RouterComponent {...others}>
      <Routes routes={routes} />
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
            const { RouteWrapper, component, ...others } = route;
            if (RouteWrapper) {
              const RouteComponent = component;
              return (
                <Route
                  key={id}
                  {...others}
                  render={(props: RouteComponentProps) => {
                    return (
                      <RouteWrapper {...others} {...props}>
                        <RouteComponent {...props} />
                      </RouteWrapper>
                    );
                  }}
                />
              );
            } else {
              return <Route key={id} component={component} {...others} />;
            }
          }
        } else {
          const { component: LayoutComponent, children, RouteWrapper, ...others } = route;
          const RenderComponent = (props: RouteComponentProps) => (
            <LayoutComponent {...props}>
              <Routes routes={children} />
            </LayoutComponent>
          );
          const ComponentWithWrapper = RouteWrapper ? (props: RouteComponentProps) => (
            <RouteWrapper {...others} {...props}><RenderComponent {...props} /></RouteWrapper>
          ) : RenderComponent;
          return (
            <Route
              key={id}
              {...others}
              component={ComponentWithWrapper}
            />
          );
        }
      })}
    </Switch>
  );
}
