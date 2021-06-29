import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as queryString from 'query-string';
import { loadableReady } from '@loadable/component';

let __initialData__;

export function setInitialData(initialData) {
  __initialData__ = initialData;
}

export function getInitialData() {
  return __initialData__;
}

export async function reactAppRenderer(options) {
  const { appConfig, setAppConfig, loadStaticModules } = options || {};

  setAppConfig(appConfig);

  loadStaticModules(appConfig);

  if (process.env.__IS_SERVER__) return;

  renderInBrowser(options);
}

export function getRenderApp(runtime, options) {
  const { ErrorBoundary, appConfig = {} } = options;
  const { ErrorBoundaryFallback, onErrorBoundaryHander, onErrorBoundaryHandler, errorBoundary } = appConfig.app;
  const AppProvider = runtime?.composeAppProvider?.();
  const AppRouter = runtime?.getAppRouter?.();

  if (process.env.NODE_ENV === 'development') {
    if (onErrorBoundaryHandler) {
      console.error('Please use onErrorBoundaryHandler instead of onErrorBoundaryHander');
    }
  }

  function App() {
    const appRouter = <AppRouter />;
    const rootApp = AppProvider ? <AppProvider>{appRouter}</AppProvider> : appRouter;
    if (errorBoundary) {
      return (
        <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHandler || onErrorBoundaryHander}>
          {rootApp}
        </ErrorBoundary>
      );
    }
    return rootApp;
  }
  return App;
}

async function renderInBrowser(options) {
  const { appConfig, buildConfig = {}, createBaseApp, emitLifeCycles, setHistory } = options;
  const context: any = {};

  // set History before GID
  setHistory(appConfig);

  // ssr enabled and the server has returned data
  if ((window as any).__ICE_APP_DATA__) {
    context.initialData = (window as any).__ICE_APP_DATA__;
    context.pageInitialProps = (window as any).__ICE_PAGE_PROPS__;
  } else if (appConfig?.app?.getInitialData) {
    const { href, origin, pathname, search } = window.location;
    const path = href.replace(origin, '');
    const query = queryString.parse(search);
    const ssrError = (window as any).__ICE_SSR_ERROR__;
    const initialContext = {
      pathname,
      path,
      query,
      ssrError
    };
    context.initialData = await appConfig.app.getInitialData(initialContext);
  }

  const { runtime, appConfig: modifiedAppConfig } = createBaseApp(appConfig, buildConfig, context);

  // set InitialData, can get the return value through getInitialData method
  setInitialData(context.initialData);
  options.appConfig = modifiedAppConfig;
  // Emit app launch cycle
  emitLifeCycles();
  
  return _render({ runtime }, options);
}

function _render({ runtime }, options) {
  const { appConfig = {} } = options;
  const { rootId, mountNode } = appConfig.app;
  const App = getRenderApp(runtime, options);

  const appMountNode = _getAppMountNode(mountNode, rootId);
  if (runtime?.modifyDOMRender) {
    return runtime?.modifyDOMRender?.({ App, appMountNode });
  }

  // add process.env.SSR for tree-shaking 
  if ((window as any).__ICE_SSR_ENABLED__ && process.env.SSR) {
    loadableReady(() => {
      ReactDOM.hydrate(<App />, appMountNode);
    });
  } else {
    ReactDOM.render(<App />, appMountNode);
  }
}

function _getAppMountNode(mountNode, rootId) {
  return mountNode || document.getElementById(rootId) || document.getElementById('ice-container');
}
