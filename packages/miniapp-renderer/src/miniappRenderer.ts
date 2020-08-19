function miniappRenderer(
  { appConfig, createBaseApp, createHistory, staticConfig, pageProps, emitLifeCycles, ErrorBoundary },
  { mount, unmount, createElement, Component }
) {
  const history = createHistory({ routes: staticConfig.routes });

  const { runtime } = createBaseApp(appConfig);
  const AppProvider = runtime?.composeAppProvider?.();

  const { app = {} } = appConfig;
  const { rootId, ErrorBoundaryFallback, onErrorBoundaryHander, errorBoundary } = app;

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

  (window as any).__pagesRenderInfo = staticConfig.routes.map(({ source, component }: any) => {
    return {
      path: source,
      render() {
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
};

export default miniappRenderer;
