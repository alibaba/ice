// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, ComponentType, Component, RaxElement } from 'rax';

interface IRoute {
  source: string;
  component: () => ComponentType & {
    __pageConfig: IRoute;
  },
  pageSource: string;
}

function miniappRenderer(
  { appConfig = {} as any, buildConfig, staticConfig, ErrorBoundary, appLifecycle: { createBaseApp, emitLifeCycles, initAppLifeCycles } },
  { mount, unmount }
) {
  const { runtime } = createBaseApp(appConfig, buildConfig, {}, staticConfig);
  initAppLifeCycles();

  const { app = {} } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHander, onErrorBoundaryHandler, errorBoundary, rootId = 'root' } = app;

  ErrorBoundary = errorBoundary ? ErrorBoundary : null;
  const onError = onErrorBoundaryHander || onErrorBoundaryHandler;

  if (onErrorBoundaryHander) {
    console.error('Please use onErrorBoundaryHandler instead of onErrorBoundaryHander');
  }

  // Emit app lifecycles
  emitLifeCycles();
  (window as any).__pagesRenderInfo = [];
  (window as any).__render = function(pageComponent) {
    const rootEl = document.createElement('div');
    rootEl.setAttribute('id', rootId);
    const appInstance = mount(getRenderApp(pageComponent, runtime, {
      ErrorBoundary,
      ErrorBoundaryFallback,
      onError,
    }), rootEl);

    document.body.appendChild(rootEl);
    (document as any).__unmount = unmount(appInstance, rootEl);
  };

  (window as any).__setDocument = function(value) {
    // eslint-disable-next-line no-global-assign
    document = value;
    // getApp doesn't exist in plugin situation
    // @ts-ignore
    if (typeof getApp === 'function') {
      // @ts-ignore
      const MiniAppGlobalInstance = getApp();
      const dispatchDocumentModify = MiniAppGlobalInstance._dispatchDocumentModify;
      if (typeof dispatchDocumentModify === 'function') {
        dispatchDocumentModify.call(MiniAppGlobalInstance, value);
      }
    }
  };
}

function wrapperPage(component, pageWrappers) {
  const Wrapper = (pageWrappers || []).reduce((acc, curr) => {
    return curr(acc);
  }, component);

  return <Wrapper />;
}

function getRenderApp(Page, runtime, { onError, ErrorBoundary, ErrorBoundaryFallback }): RaxElement {
  const wrapperPageRegistration = runtime?.getWrapperPageRegistration?.();
  let rootApp = wrapperPage(Page, wrapperPageRegistration);
  const AppProvider = runtime?.composeAppProvider?.();

  if (AppProvider) {
    rootApp = <AppProvider>{rootApp}</AppProvider>;
  }

  if (ErrorBoundary) {
    rootApp = <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onError}>{rootApp}</ErrorBoundary>;
  }

  // For miniapp unmount
  class App extends Component {
    public render() {
      return rootApp;
    }
  }

  return <App />;
}

export default miniappRenderer;
