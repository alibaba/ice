function miniappRenderer({ appConfig, createBaseApp, createHistory, staticConfig }) {
  createBaseApp(appConfig);
  createHistory({ routes: staticConfig.routes });
};

export default miniappRenderer;
