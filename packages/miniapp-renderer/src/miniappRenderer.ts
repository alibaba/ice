function miniappRenderer(
  { appConfig, createBaseApp, createHistory, staticConfig, pageProps },
  { renderFactory, createElement, Component }
) {
  const history = createHistory({ routes: staticConfig.routes });
  createBaseApp(appConfig);
  const rootId = appConfig.app.rootId;

  class App extends Component {
    public render() {
      const { Page, ...otherProps } = this.props;
      return createElement(Page, otherProps);
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
        const appInstance = renderFactory(createElement(App, {
          history,
          location: history.location,
          ...pageProps,
          Page: PageComponent
        }), rootEl);

        (document as any).__unmount = appInstance._internal.unmountComponent.bind(appInstance._internal);
      },
      setDocument(value) {
        // eslint-disable-next-line no-global-assign
        document = value;
      }
    };
  });
};

export default miniappRenderer;
