import * as React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import type { RuntimePlugin, ClientAppRouterProps } from '@ice/runtime/types';
import type { RouteInfo, AppConfig } from '../types';

const { useState, useEffect } = React;

const runtime: RuntimePlugin = ({ getAppRouter, setAppRouter, appContext }) => {
  const { appExport, appData } = appContext;
  const OriginalRouter = getAppRouter();
  const { layout, getApps, appRouter } = appExport?.icestark || {};

  if (getApps) {
    const FrameworkRouter = (props: ClientAppRouterProps) => {
      const [routeInfo, setRouteInfo] = useState<RouteInfo>({});
      const [appEnter, setAppEnter] = useState<AppConfig>({});
      const [appLeave, setAppLeave] = useState<AppConfig>({});
      const [apps, setApps] = useState([]);
      const FrameworkLayout = layout || (({ children }) => (<>{children}</>));
      const appInfo = {
        pathname: routeInfo.pathname ||
          (typeof window !== 'undefined' && window.location.pathname),
        routeInfo,
        appEnter,
        appLeave,
        updateApps: setApps,
      };
      useEffect(() => {
        (async () => {
          const appList = await getApps(appData);
          setApps(appList);
        })();
      }, []);

      function handleRouteChange(pathname: string, query: Record<string, string>, hash: string, routeType: string) {
        setRouteInfo({ pathname, query, hash, routeType });
      }

      function handleAppLeave(config: AppConfig) {
        setAppLeave(config);
      }

      function handleAppEnter(config: AppConfig) {
        setAppEnter(config);
      }
      return (
        <FrameworkLayout {...appInfo}>
          {apps && (
            <AppRouter
              {...appRouter}
              onRouteChange={handleRouteChange}
              onAppEnter={handleAppEnter}
              onAppLeave={handleAppLeave}
              apps={apps}
            >
              {apps.map((item: AppConfig, idx: number) => {
                return (
                  <AppRoute
                    key={idx}
                    {...item}
                  />
                );
              })}
              <AppRoute
                path="/"
                location={props.location}
                render={() => {
                  const { routerContext } = props;
                  routerContext.routes = [
                    ...routerContext.routes,
                    {
                      path: '*',
                      Component: () => (
                        process.env.NODE_ENV === 'development'
                          ? <div>Add $.tsx to folder pages as a 404 component</div>
                          : null
                        ),
                    },
                  ];
                  const routerProps = {
                    ...props,
                    routerContext,
                  };
                  return <OriginalRouter {...routerProps} />;
                }}
              />
            </AppRouter>
          )}
        </FrameworkLayout>
      );
    };
    setAppRouter(FrameworkRouter);
  } else {
    console.warn(`
      [plugin-icestark]: appConfig.icestark.getApps should be not empty if this is an framework app.
      see https://ice.work/docs/guide/advanced/icestark/
    `);
  }
};

export default runtime;
