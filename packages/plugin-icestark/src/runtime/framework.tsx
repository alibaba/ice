import * as React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import type { RuntimePlugin, AppRouterProps } from '@ice/runtime/esm/types';
import type { RouteInfo, AppConfig } from '../types';

const { useState, useEffect } = React;
const runtime: RuntimePlugin = ({ getAppRouter, setAppRouter, appContext }) => {
  const { appExport, appData } = appContext;
  const OriginalRouter = getAppRouter();
  const { layout, getApps, appRouter } = appExport?.icestark || {};
  if (!getApps) {
    console.warn(`
      [plugin-icestark]: appConfig.icestark.getApps should be not empty if this is an framework app.
      see https://ice.work/docs/guide/advanced/icestark/
    `);
  } else {
    const FrameworkRouter = (props: AppRouterProps) => {
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
        console.log('first', { pathname, query, hash, routeType });
      }

      function handleAppLeave(config: AppConfig) {
        console.log('config', config);
        if (config.path) {
          setAppLeave(config);
        }
      }

      function handleAppEnter(config: AppConfig) {
        console.log('config entry', config);
        if (config.path) {
          setAppEnter(config);
        }
      }
      console.log('apps', appInfo);
      return (
        <FrameworkLayout {...appInfo}>
          {apps && (
            <AppRouter
              {...appRouter}
              onRouteChange={handleRouteChange}
              onAppEnter={handleAppEnter}
              onAppLeave={handleAppLeave}
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
                render={() => {
                  return <OriginalRouter {...props} />;
                }}
              />
            </AppRouter>
          )}
        </FrameworkLayout>
      );
    };
    setAppRouter(FrameworkRouter);
  }
};

export default runtime;