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
import { Router } from '$ice/Router';
import DefaultLayout from '$ice/Layout';
import removeRootLayout from './runtime/removeLayout';
import { IIceStark } from './types';

const { useEffect, useState } = React;

const module = ({ appConfig, addDOMRender, setRenderRouter, modifyRoutes }) => {
  const { icestark, router } = appConfig;
  const { type: appType } = (icestark || {}) as IIceStark;
  const { type, basename, modifyRoutes: runtimeModifyRoutes } = router;
  if (runtimeModifyRoutes) {
    modifyRoutes(runtimeModifyRoutes);
  }
  if (appType === 'child') {
    addDOMRender(({ App, appMountNode }) => {
      return new Promise(resolve => {
        if (isInIcestark()) {
          const mountNode = getMountNode();
          registerAppEnter(() => {
            ReactDOM.render(<App />, mountNode, resolve);
          });
          // make sure the unmount event is triggered
          registerAppLeave(() => {
            ReactDOM.unmountComponentAtNode(mountNode);
          });
        } else {
          ReactDOM.render(<App />, appMountNode, resolve);
        }
      });
    });
    setRenderRouter((routes) => () => {
      const routerProps = {
        type,
        basename: getBasename(),
        routes,
      };
      return <Router {...routerProps} />;
    });
  } else if (appType === 'framework') {
    const { getApps, appRouter, Layout, AppRoute: CustomAppRoute, removeRoutesLayout } = (icestark || {}) as IIceStark;
    if (removeRoutesLayout) {
      modifyRoutes(removeRootLayout);
    }
    const frameworkRouter = (routes) => () => {
      const [appPathname, setAppPathname] = useState('');
      const [appEnter, setAppEnter] = useState({});
      const [appLeave, setAppLeave] = useState({});

      const [apps, setApps] = useState(null);
      const routerProps = {
        type,
        basename,
        routes,
      };
      const BasicLayout = Layout || DefaultLayout;
      const RenderAppRoute = CustomAppRoute || AppRoute;

      useEffect(() => {
        (async () => {
          // 异步 apps 获取
          const appList = await getApps();
          setApps(appList);
        })();
      }, []);

      function handleRouteChange(pathname) {
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
                  component={<Router {...routerProps} />}
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
