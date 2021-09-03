import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { IPrivateIceStark, IIceStark } from './types';

const module = ({ appConfig, addDOMRender, buildConfig, setRenderApp, wrapperRouterRender, modifyRoutes, applyRuntimeAPI, wrapperPageComponent }) => {
  const { icestark, router } = appConfig;
  const { type: appType, registerAppEnter: enterRegistration, registerAppLeave: leaveRegistration, $$props } = (icestark || {}) as IPrivateIceStark;
  const { type, basename, modifyRoutes: runtimeModifyRoutes, fallback } = router;

  if (runtimeModifyRoutes) {
    modifyRoutes(runtimeModifyRoutes);
  }
  if (appType === 'child') {
    const { icestarkUMD } = buildConfig;

    const childBasename = isInIcestark() ? getBasename() : basename;

    const history = applyRuntimeAPI('createHistory', { type, basename: childBasename });

    addDOMRender(({ App, appMountNode }) => {
      return new Promise(resolve => {
        if (isInIcestark()) {
          if (!icestarkUMD) {
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
            let { container } = $$props ?? {};
            if (!container) {
              container = getMountNode();
            }
            ReactDOM.render(<App />, container, resolve);
          }
        } else {
          ReactDOM.render(<App />, appMountNode, resolve);
        }
      });
    });

    const wrapperPageFn = (PageComponent) => (props) => {
      const { customProps = {} } = $$props ?? {};

      const combinedProps = {
        ...props,
        frameworkProps: customProps,
      };

      return <PageComponent { ...combinedProps } />;
    };

    // get props by props
    wrapperPageComponent(wrapperPageFn);

    const routerProps = {
      type,
      basename: childBasename,
      history,
      fallback
    };

    // compatible with the case which lock icejs version
    if (wrapperRouterRender && !!process.env.__FRAMEWORK_VERSION__) {
      wrapperRouterRender((originRender) => (routes, RoutesComponent) => {
        return originRender(routes, RoutesComponent, routerProps);
      });
    } else {
      setRenderApp((routes) => () => {
        return <IceRouter {...routerProps} routes={routes} />;
      });
    }
  } else if (appType === 'framework') {
    const { getApps, appRouter, Layout, AppRoute: CustomAppRoute, removeRoutesLayout } = (icestark || {}) as IIceStark;
    if (removeRoutesLayout) {
      modifyRoutes(removeRootLayout);
    }
    const RootApp = ({ routes }) => {
      const [routerHistory] = useState(applyRuntimeAPI('createHistory' ,{ type, basename }));
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
      const BasicLayout = Layout || DefaultLayout || ((props) => (<>{props.children}</>));
      const RenderAppRoute = (CustomAppRoute || AppRoute) as typeof AppRoute;

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
    setRenderApp(frameworkRouter);
  }
};

export default module;
