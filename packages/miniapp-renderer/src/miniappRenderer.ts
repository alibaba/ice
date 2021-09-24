import { createElement, Component, ComponentType, ClassAttributes } from 'rax';
import type { History } from 'history';

interface IAppProps extends ClassAttributes<any> {
  Page: ComponentType;
  history: History;
  location: unknown;
}

function miniappRenderer(
  { appConfig = {} as any, buildConfig, staticConfig, pageProps, ErrorBoundary, appLifecycle: { createBaseApp, emitLifeCycles, initAppLifeCycles } },
  { mount, unmount }
) {
  const history = appConfig.router.history;

  const { runtime } = createBaseApp(appConfig, buildConfig, {}, staticConfig);
  initAppLifeCycles();
  const AppProvider = runtime?.composeAppProvider?.();

  const { app = {} } = appConfig;
  const { rootId = 'root', ErrorBoundaryFallback, onErrorBoundaryHander, onErrorBoundaryHandler, errorBoundary } = app;

  if (onErrorBoundaryHander) {
    console.error('Please use onErrorBoundaryHandler instead of onErrorBoundaryHander');
  }
  emitLifeCycles();
  class App extends Component {
    public render() {
      const { Page, ...otherProps } = this.props as IAppProps;
      const PageComponent = createElement(Page, {
        ...otherProps
      });

      let appInstance = PageComponent;

      if (AppProvider) {
        appInstance = createElement(AppProvider, null, appInstance);
      }
      if (errorBoundary) {
        appInstance = createElement(ErrorBoundary, {
          Fallback: ErrorBoundaryFallback,
          onError: onErrorBoundaryHander || onErrorBoundaryHandler,
        }, appInstance);
      }
      return appInstance;
    }
  }
  const pagesRenderInfo = staticConfig.routes.map(({ source, component, pageSource }: any) => {
    return {
      path: pageSource || source,
      render() {
        const rootEl = document.createElement('div');
        rootEl.setAttribute('id', rootId);
        const appInstance = mount(createElement(App, {
          history,
          location: history.location,
          ...pageProps,
          Page: component,
        }), rootEl);
        document.body.appendChild(rootEl);

        (document as any).__unmount = unmount(appInstance, rootEl);
      },
      setDocument(value) {
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
      }
    };
  });

  (window as any).__pagesRenderInfo = ((window as any).__pagesRenderInfo || []).concat(pagesRenderInfo);
}

export default miniappRenderer;
