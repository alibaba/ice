function miniappRenderer(
  { appConfig, createBaseApp, createHistory, staticConfig, pageProps, emitLifeCycles },
  { mount, unmount, createElement, Component }
) {
  const history = createHistory({ routes: staticConfig.routes });

  const { runtime } = createBaseApp(appConfig);
  const AppProvider = runtime && runtime.composeAppProvider && runtime.composeAppProvider();

  const rootId = appConfig.app.rootId;

  emitLifeCycles();
  class App extends Component {
    public render() {
      const { Page, source, ...otherProps } = this.props;
      const PageComponent = createElement(Page, {
        ...otherProps
      });

      if (AppProvider) {
        return createElement(AppProvider, null, PageComponent);
      }

      return PageComponent;
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
