import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp } from 'universal-env';

export interface IContext {
  initialData?: any;
  pageInitialProps?: any;
  pathname?: string;
}

let _createBaseApp;
let _emitLifeCycles;
let ErrorBoundaryComp;

function reactRendererWithSSR({appConfig, createBaseApp, emitLifeCycles, context}) {
  _createBaseApp = createBaseApp;
  _emitLifeCycles = emitLifeCycles;
  appConfig.router.type = 'static';
  return renderApp(appConfig, context);
}

function reactRenderer({ appConfig, createBaseApp, setAppConfig, emitLifeCycles, ErrorBoundary }) {
  _createBaseApp = createBaseApp;
  _emitLifeCycles = emitLifeCycles;
  ErrorBoundaryComp = ErrorBoundary;

  // set appConfig to application life cycle
  setAppConfig(appConfig);

  if (process.env.__IS_SERVER__) {
    return;
  }

  let initialData = {};
  let pageInitialProps = {};

  // ssr enabled and the server has returned data
  // @ts-ignore
  if (window.__ICE_APP_DATA__) {
    // @ts-ignore
    initialData = window.__ICE_APP_DATA__;
    // @ts-ignore
    pageInitialProps = window.__ICE_PAGE_PROPS__;
    renderApp(appConfig, { initialData, pageInitialProps });
  } else {
    // ssr not enabled, or SSR is enabled but the server does not return data
    // eslint-disable-next-line
    if (appConfig.app && appConfig.app.getInitialData) {
      (async() => {
        // @ts-ignore
        initialData = await appConfig.app.getInitialData();
        renderApp(appConfig, { initialData, pageInitialProps });
      })();
    } else {
      renderApp(appConfig, {});
    }
  }
}

function renderApp(appConfig: any, context = {}) {
  // @ts-ignore
  context.env = { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp };
  const { runtime, appConfig: modifiedAppConfig } = _createBaseApp(appConfig, {}, context);
  const { modifyDOMRender } = runtime;
  const { rootId, mountNode, ErrorBoundaryFallback, onErrorBoundaryHander, errorBoundary } = modifiedAppConfig.app;
  const AppProvider = runtime.composeAppProvider();
  const AppRouter = runtime.getAppRouter();

  function App() {
    const appRouter = <AppRouter />;
    const rootApp = AppProvider ? <AppProvider>{appRouter}</AppProvider> : appRouter;
    if (errorBoundary) {
      return (
        <ErrorBoundaryComp Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHander}>
          {rootApp}
        </ErrorBoundaryComp>
      );
    }
    return rootApp;
  }

  // Emit app launch cycle
  _emitLifeCycles();

  if (process.env.__IS_SERVER__) {
    return ReactDOMServer.renderToString(<App />);
  } else {
    const appMountNode = mountNode
      || document.getElementById(rootId)
      || document.getElementById('ice-container');
    if (modifyDOMRender) {
      return modifyDOMRender({ App, appMountNode });
    } else {
      // @ts-ignore
      return ReactDOM[window.__ICE_SSR_ENABLED__ ? 'hydrate' : 'render'](<App />, appMountNode);
    }
  }
}

export { reactRendererWithSSR };

export default reactRenderer;
