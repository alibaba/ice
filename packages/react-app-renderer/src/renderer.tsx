import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as queryString from 'query-string';
import { loadableReady } from '@loadable/component';
import type { RuntimeModule } from 'create-app-shared';
import type { RenderOptions } from './types';

let __initialData__: any;

export function setInitialData(initialData: any) {
  __initialData__ = initialData;
}

export function getInitialData() {
  return __initialData__;
}

export function getRenderApp(runtime: RuntimeModule, options: RenderOptions) {
  const { ErrorBoundary, appConfig = { app: {} } } = options;
  const AppProvider = runtime?.composeAppProvider?.();
  const AppComponent = runtime?.getAppComponent?.();

  let rootApp = <AppComponent />;
  if (AppProvider) {
    rootApp = (
      <AppProvider>
        {rootApp}
      </AppProvider>
    );
  }

  const { ErrorBoundaryFallback, onErrorBoundaryHandler, errorBoundary, strict = false } = appConfig.app;

  function App() {
    // ErrorBoundary is missing in SSR
    if (errorBoundary && ErrorBoundary) {
      rootApp = (
        <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHandler}>
          {rootApp}
        </ErrorBoundary>
      );
    }
    if (strict) {
      rootApp = (
        <React.StrictMode>
          {rootApp}
        </React.StrictMode>
      );
    }
    return rootApp;
  }
  return App;
}

export async function reactAppRenderer(options: RenderOptions) {
  const { appConfig, buildConfig = {}, appLifecycle } = options;
  const { createBaseApp, emitLifeCycles, initAppLifeCycles } = appLifecycle;
  const context: any = {};

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

  const { runtime, appConfig: modifiedAppConfig } = createBaseApp<any>(appConfig, buildConfig, context);
  // init app life cycles after app runtime created
  initAppLifeCycles();

  // set InitialData, can get the return value through getInitialData method
  setInitialData(context.initialData);
  // emit app launch cycle
  emitLifeCycles();

  return _render(runtime, {
    ...options,
    appConfig: modifiedAppConfig,
  });
}

function _render(runtime: RuntimeModule, options: RenderOptions) {
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

function _getAppMountNode(mountNode: HTMLElement, rootId: string) {
  return mountNode || document.getElementById(rootId) || document.getElementById('ice-container');
}
