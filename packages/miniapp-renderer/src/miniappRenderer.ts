// miniapp renderer is a sync method
function miniappRenderer(
  { appConfig = {} as any, createBaseApp, createHistory, staticConfig, pageProps, emitLifeCycles, ErrorBoundary },
  { mount, unmount, createElement, Component }
) {
  const history = createHistory({ routes: staticConfig.routes });
  emitLifeCycles();

  const { app = {} } = appConfig;
  const { rootId, ErrorBoundaryFallback, onErrorBoundaryHander, errorBoundary } = app;
  let AppProvider;

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

  (window as any).__pagesRenderInfo = staticConfig.routes.map(({ source, component }: any) => {
    return {
      path: source,
      async render() {
        if (!AppProvider) {
          // Only need await render in pagesRenderInfo
          const { runtime } = await createBaseApp(appConfig);
          AppProvider = runtime?.composeAppProvider?.();
        }

        const PageComponent = component()();
        const rootEl = document.createElement('div');
        rootEl.setAttribute('id', rootId);
        document.body.appendChild(rootEl);
        const appInstance = mount(createElement(App, {
          history,
          location: history.location,
          ...pageProps,
          source,
          Page: PageComponent
        }), rootEl);

        (document as any).__unmount = unmount(appInstance, rootEl);
      },
      setDocument(value) {
        // eslint-disable-next-line no-global-assign
        document = value;
      }
    };
  });
}

export default miniappRenderer;
