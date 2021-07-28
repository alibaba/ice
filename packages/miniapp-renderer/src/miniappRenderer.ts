function miniappRenderer(
  { appConfig = {} as any, createBaseApp, createHistory, staticConfig, pageProps, emitLifeCycles, ErrorBoundary },
  { mount, unmount, createElement, Component }
) {
  const history = createHistory({ routes: staticConfig.routes });

  const { runtime } = createBaseApp(appConfig);
  const AppProvider = runtime?.composeAppProvider?.();

  const { app = {} } = appConfig;
  const { rootId = 'root', ErrorBoundaryFallback, onErrorBoundaryHander, errorBoundary } = app;

  emitLifeCycles();
  class App extends Component {
    public render() {
      const { Page, ...otherProps } = this.props;
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
          onError: onErrorBoundaryHander
        }, appInstance);
      }
      return appInstance;
    }
  }
  const pagesRenderInfo = staticConfig.routes.map(({ source, component }: any) => {
    return {
      path: source,
      render() {
        const PageComponent = component()();
        const rootEl = document.createElement('div');
        rootEl.setAttribute('id', rootId);
        const appInstance = mount(createElement(App, {
          history,
          location: history.location,
          ...pageProps,
          source,
          Page: PageComponent
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
