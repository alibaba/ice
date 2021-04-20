import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppConfig, AppRouter, AppRoute } from '@ice/stark';
import {
  isInIcestark,
  getMountNode,
  registerAppEnter,
  registerAppLeave,
  getBasename,
} from '@ice/stark-app';
// @ts-ignore
import { IceRouter } from '$ice/Router';
// @ts-ignore
import DefaultLayout from '$ice/Layout';
import removeRootLayout from './runtime/removeLayout';
import { IIceStark } from './types';

const { useEffect, useState } = React;

const module = ({ appConfig, addDOMRender, buildConfig, setRenderRouter, wrapperRouterRender, modifyRoutes, createHistory }) => {
  const { icestark, router } = appConfig;
  const { type: appType, registerAppEnter: enterRegistration, registerAppLeave: leaveRegistration } = (icestark || {}) as IIceStark;
  const { type, basename, modifyRoutes: runtimeModifyRoutes, fallback } = router;

  if (runtimeModifyRoutes) {
    modifyRoutes(runtimeModifyRoutes);
  }
  if (appType === 'child') {
    const { icestarkUMD } = buildConfig;
    const history = createHistory({ type, basename: getBasename() });

    addDOMRender(({ App, appMountNode }) => {
      return new Promise(resolve => {
        if (isInIcestark() && !icestarkUMD) {
          registerAppEnter(() => {
            const mountNode = getMountNode();
            if (enterRegistration) {
              enterRegistration(mountNode, App, resolve);
            } else {
              ReactDOM.render(<App />, mountNode, resolve);
            }
          });
          // make sure the unmount event is triggered
          registerAppLeave(() => {
            const mountNode = getMountNode();
            if (leaveRegistration) {
              leaveRegistration(mountNode);
            } else {
              ReactDOM.unmountComponentAtNode(mountNode);
            }
          });
        } else if (icestarkUMD) {
          const mountNode = getMountNode();
          ReactDOM.render(<App />, mountNode, resolve);
        } else {
          ReactDOM.render(<App />, appMountNode, resolve);
        }
      });
    });
    const routerProps = {
      type,
      basename: getBasename(),
      history,
      fallback
    };

    if (wrapperRouterRender) {
      wrapperRouterRender((originRender) => (routes, RoutesComponent) => {
        return originRender(routes, RoutesComponent, routerProps);
      });
    } else {
      setRenderRouter((routes) => () => {
        return <IceRouter {...routerProps} routes={routes} />;
      });
    }
  } else if (appType === 'framework') {
    const { getApps, appRouter, Layout, AppRoute: CustomAppRoute, removeRoutesLayout } = (icestark || {}) as IIceStark;
    if (removeRoutesLayout) {
      modifyRoutes(removeRootLayout);
    }
    const RootApp = ({ routes }) => {
      const [routerHistory] = useState(createHistory({ type, basename }));
      const routerProps = {
        type,
        routes,
        basename,
        history: routerHistory,
        fallback
      };
      return <IceRouter {...routerProps} />;
    };

    const frameworkRouter = (routes) => () => {
      const [appPathname, setAppPathname] = useState('');
      const [routeInfo, setRouteInfo] = useState({});
      const [appEnter, setAppEnter] = useState({});
      const [appLeave, setAppLeave] = useState({});

      const [apps, setApps] = useState(null);
      const BasicLayout = Layout || DefaultLayout;
      const RenderAppRoute = CustomAppRoute || AppRoute;

      useEffect(() => {
        (async () => {
          // 异步 apps 获取
          const appList = await getApps();
          setApps(appList);
        })();
      }, []);

      function handleRouteChange(pathname, query, hash, routeType) {
        setRouteInfo({ pathname, query, hash, routeType });
        setAppPathname(pathname);
      }

      function handleAppLeave(config) {
        setAppLeave(config);
      }

      function handleAppEnter(config) {
        setAppEnter(config);
      }

      const appInfo = {
        pathname: appPathname,
        routeInfo,
        appEnter,
        appLeave,
        updateApps: setApps,
      };

      return (
        <BasicLayout {...appInfo}>
          {apps && (
            <AppRouter
              {...(appRouter || {})}
              onRouteChange={handleRouteChange}
              onAppEnter={handleAppEnter}
              onAppLeave={handleAppLeave}
            >
              {apps.map((item: AppConfig, idx: number) => {
                return (
                  <RenderAppRoute
                    key={idx}
                    {...item}
                  />
                );
              })}
              {routes && routes.length && (
                <RenderAppRoute
                  path="/"
                  render={() => {
                    return <RootApp routes={routes} />;
                  }}
                />
              )}
            </AppRouter>
          )}
        </BasicLayout>
      );
    };
    setRenderRouter(frameworkRouter);
  }
};

export default module;
