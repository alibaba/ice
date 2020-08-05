function miniappRenderer(
  { appConfig, createBaseApp, createHistory, staticConfig, pageProps, emitLifeCycles },
  { mount, unmount, createElement, Component }
) {
  const history = createHistory({ routes: staticConfig.routes });
  createBaseApp(appConfig);
  const rootId = appConfig.app.rootId;

  emitLifeCycles();
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
        const appInstance = mount(createElement(App, {
          history,
          location: history.location,
          ...pageProps,
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
