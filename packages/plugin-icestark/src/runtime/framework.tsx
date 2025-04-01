import * as React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import type { RuntimePlugin, ClientAppRouterProps } from '@ice/runtime/types';
import type { AppRouterProps } from '@ice/stark/lib/AppRouter';
import type { RouteInfo, AppConfig, FrameworkConfig } from '../types';

const { useState, useEffect } = React;

const runtime: RuntimePlugin = ({ getAppRouter, setAppRouter, appContext }) => {
  const { appExport, appData } = appContext;
  const OriginalRouter = getAppRouter();
  const { layout, getApps, appRouter, AppRoute: CustomizeAppRoute } = (appExport?.icestark || {}) as FrameworkConfig;

  if (!getApps) {
    console.warn(`
      [plugin-icestark]: appConfig.icestark.getApps should be not empty if this is an framework app.
      see https://ice.work/docs/guide/advanced/icestark/
    `);
    return;
  }

  const FrameworkRouter = (props: ClientAppRouterProps) => {
    const [routeInfo, setRouteInfo] = useState<RouteInfo>({});
    const [appEnter, setAppEnter] = useState<AppConfig>({});
    const [appLeave, setAppLeave] = useState<AppConfig>({});
    const [apps, setApps] = useState<AppConfig[]>([]);
    const FrameworkLayout = layout || React.Fragment;
    const appInfo = {
      pathname: routeInfo.pathname || (typeof window !== 'undefined' ? window.location.pathname : ''),
      routeInfo,
      appEnter,
      appLeave,
      updateApps: setApps,
    };

    useEffect(() => {
      const fetchApps = async () => {
        try {
          const appList = await getApps(appData);
          setApps(appList);
        } catch (error) {
          console.error('[plugin-icestark]: Failed to fetch apps', error);
        }
      };

      fetchApps();
    }, []);

    const handleRouteChange: AppRouterProps['onRouteChange'] = (pathname, query, hash, routeType) => {
      setRouteInfo({ pathname, query, hash, routeType });
    };

    const handleAppLeave: AppRouterProps['onAppLeave'] = (config) => setAppLeave(config);
    const handleAppEnter: AppRouterProps['onAppEnter'] = (config) => setAppEnter(config);
    const AppRouteComponent = CustomizeAppRoute || AppRoute;

    const appRouterProps: AppRouterProps = {
      ...appRouter,
      onRouteChange: handleRouteChange,
      onAppEnter: handleAppEnter,
      onAppLeave: handleAppLeave,
    };
    return (
      <FrameworkLayout {...appInfo}>
        {apps && (
          <AppRouter {...appRouterProps}>
            {apps.map((item: AppConfig, idx: number) => (
              <AppRouteComponent key={idx} {...item} />
            ))}
            <AppRouteComponent
              activePath="/"
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
                return <OriginalRouter {...props} routerContext={routerContext} />;
              }}
            />
          </AppRouter>
        )}
      </FrameworkLayout>
    );
  };

  setAppRouter(FrameworkRouter);
};

export default runtime;
