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
import { IceRouter } from '$ice/Router';
import { createHashHistory, createBrowserHistory } from '$ice/history';
import DefaultLayout from '$ice/Layout';
import removeRootLayout from './runtime/removeLayout';
import { IIceStark } from './types';

const { useEffect, useState } = React;

const module = ({ appConfig, addDOMRender, setRenderRouter, modifyRoutes }) => {
  const { icestark, router } = appConfig;
  const { type: appType, registerAppEnter: enterRegistration, registerAppLeave: leaveRegistration } = (icestark || {}) as IIceStark;
  const { type, basename, modifyRoutes: runtimeModifyRoutes } = router;

  if (runtimeModifyRoutes) {
    modifyRoutes(runtimeModifyRoutes);
  }
  if (appType === 'child') {
    const history = createHistory(type, getBasename());

    addDOMRender(({ App, appMountNode }) => {
      return new Promise(resolve => {
        if (isInIcestark()) {
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
        } else {
          ReactDOM.render(<App />, appMountNode, resolve);
        }
      });
    });
    setRenderRouter((routes) => () => {
      const routerProps = {
        type,
        routes,
        basename: getBasename(),
        history
      };
      return <IceRouter {...routerProps} />;
    });
  } else if (appType === 'framework') {
    const { getApps, appRouter, Layout, AppRoute: CustomAppRoute, removeRoutesLayout } = (icestark || {}) as IIceStark;
    const history = createHistory(type, basename);
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
        routes,
        basename,
        history
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
                  render={() => {
                    return <IceRouter {...routerProps} />;
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

function createHistory(type: string, basename: string) {
  const histories = {
    hash: createHashHistory,
    browser: createBrowserHistory,
  };
  return histories[type]({basename});
}

export default module;
