import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';

function reactAppRendererWithSSR(context, options) {
  const { appConfig } = options || {};
  appConfig.router.type = 'static';
  return renderApp(context, options);
}

async function reactAppRenderer(options) {
  const { appConfig, setAppConfig, loadStaticModules } = options || {};

  setAppConfig(appConfig);

  loadStaticModules(appConfig);

  if (process.env.__IS_SERVER__) return;

  let initialData = {};
  let pageInitialProps = {};

  // ssr enabled and the server has returned data
  if ((window as any).__ICE_APP_DATA__) {
    initialData = (window as any).__ICE_APP_DATA__;
    pageInitialProps = (window as any).__ICE_PAGE_PROPS__;
  } else {
    // ssr not enabled, or SSR is enabled but the server does not return data
    // eslint-disable-next-line
    if (appConfig.app && appConfig.app.getInitialData) {
      initialData = await appConfig.app.getInitialData();
    }
  }

  const context = { initialData, pageInitialProps };
  renderApp(context, options);
}

function renderApp(context, options) {
  const { appConfig, staticConfig, createBaseApp, ErrorBoundary, emitLifeCycles } = options;
  const { runtime, appConfig: modifiedAppConfig } = createBaseApp(appConfig, {}, context);
  const { modifyDOMRender } = runtime;
  const { rootId, mountNode, ErrorBoundaryFallback, onErrorBoundaryHander, errorBoundary } = modifiedAppConfig.app;

  // for miniapp routes
  let routes = [];
  if (staticConfig && staticConfig.routes) {
    routes = staticConfig.routes.map(route => {
      const pageComponent = route.component()();
      return {
        ...route,
        component: pageComponent
      };
    });
  };

  const AppProvider = runtime.composeAppProvider();
  const AppRouter = runtime.getAppRouter(routes);

  function App() {
    const appRouter = <AppRouter />;
    const rootApp = AppProvider ? <AppProvider>{appRouter}</AppProvider> : appRouter;
    if (errorBoundary) {
      return (
        <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHander}>
          {rootApp}
        </ErrorBoundary>
      );
    }
    return rootApp;
  }

  // Emit app launch cycle
  emitLifeCycles();

  if (process.env.__IS_SERVER__) {
    return ReactDOMServer.renderToString(<App />);
  } else {
    const appMountNode = mountNode
      || document.getElementById(rootId)
      || document.getElementById('ice-container');
    if (modifyDOMRender) {
      return modifyDOMRender({ App, appMountNode });
    } else {
      return ReactDOM[(window as any).__ICE_SSR_ENABLED__ ? 'hydrate' : 'render'](<App />, appMountNode);
    }
  }
}

export { reactAppRendererWithSSR };

export default reactAppRenderer;
