import * as React from 'react';
import { useEffect, useState, useMemo, memo } from 'react';
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
import { IPrivateIceStark, IIceStark, IStarkAppConfig } from './types';

const module = ({
  appConfig,
  addDOMRender,
  buildConfig,
  setRenderApp,
  setRenderRouter,
  wrapperRouterRender,
  modifyRoutes,
  applyRuntimeAPI,
  createHistory,
  wrapperPageComponent,
  wrapperRouteComponent
}) => {
  const { icestark, router } = appConfig;
  const {
    type: appType = process.env.__ICESTARK_TYPE__,
    registerAppEnter: enterRegistration,
    registerAppLeave: leaveRegistration,
    getApps,
    $$props
  } = (icestark || {}) as IPrivateIceStark;
  const {
    type,
    basename,
    modifyRoutes: runtimeModifyRoutes,
    fallback,
    initialIndex,
    initialEntries,
  } = router;
  // compatible with deprecated runtime API
  const wrapperComponent = wrapperPageComponent || wrapperRouteComponent;
  const createAppHistory = createHistory || ((options: any) => applyRuntimeAPI('createHistory', options));
  const setRenderComponent = setRenderApp || setRenderRouter;

  if (runtimeModifyRoutes) {
    modifyRoutes(runtimeModifyRoutes);
  }

  if (appType === 'child') {
    const { icestarkUMD, icestarkType } = buildConfig;

    const localIcestarkType = icestarkType || (icestarkUMD ? 'umd' : 'normal');

    const childBasename = isInIcestark() ? getBasename() : basename;

    addDOMRender(({ App, appMountNode }) => {
      return new Promise(resolve => {
        if (isInIcestark()) {
          if (localIcestarkType === 'normal') {
            // @ts-ignore remove this next time for https://github.com/ice-lab/icestark/pull/440
            registerAppEnter((props) => {
              const container = (props && props.container) || getMountNode();
              if (enterRegistration) {
                enterRegistration(container, App, resolve);
              } else {
                ReactDOM.render(<App />, container, () => {
                  resolve(true);
                });
              }
            });
            // make sure the unmount event is triggered
            // @ts-ignore remove this next time for https://github.com/ice-lab/icestark/pull/440
            registerAppLeave((props) => {
              const container = (props && props.container) || getMountNode();
              if (leaveRegistration) {
                leaveRegistration(container);
              } else {
                ReactDOM.unmountComponentAtNode(container);
              }
            });
          } else {
            let { container } = $$props ?? {};
            if (!container) {
              container = getMountNode() as HTMLElement;
            }
            ReactDOM.render(<App />, container, () => {
              resolve(true);
            });
          }
        } else {
          ReactDOM.render(<App />, appMountNode, () => {
            resolve(true);
          });
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
    wrapperComponent(wrapperPageFn);

    // `buildConfig.router` is false when configrated in build.json.
    if (buildConfig.router !== false) {
      const history = createAppHistory({ type, basename: childBasename, initialIndex, initialEntries });
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
        setRenderComponent((routes) => () => {
          return <IceRouter {...routerProps} routes={routes} />;
        });
      }
    }
  } else if (appType === 'framework' && getApps) {
    const { appRouter, Layout, AppRoute: CustomAppRoute, removeRoutesLayout } = (icestark || {}) as IIceStark;

    if (removeRoutesLayout) {
      modifyRoutes(removeRootLayout);
    }
    const RootApp = ({ routes }) => {
      const [routerHistory] = useState(createAppHistory({ type, basename, initialEntries, initialIndex }));
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
      const [appPathname, setAppPathname] = useState(window.location.pathname);
      const [routeInfo, setRouteInfo] = useState({});
      const [appEnter, setAppEnter] = useState({});
      const [appLeave, setAppLeave] = useState({});

      const [apps, setApps] = useState<IStarkAppConfig[] | null>(null);
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

      // RootApp will re-render on every AppRoute's update if RootApp were matched.
      const MemoRootApp = useMemo(
        () => memo(() => <RootApp routes={routes} />),
        []
      );

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
                    return <MemoRootApp />;
                  }}
                />
              )}
            </AppRouter>
          )}
        </BasicLayout>
      );
    };
    setRenderComponent(frameworkRouter);
  }

  if (appType === 'framework' && !getApps) {
    console.warn(`
      [plugin-icestark]: appConfig.icestark.getApps should be not empty if this is an framework app; If not，please make sure appConfgi.icestark.type exist.
      see https://ice.work/docs/guide/advanced/icestark/
    `);
  }
};

export default module;
