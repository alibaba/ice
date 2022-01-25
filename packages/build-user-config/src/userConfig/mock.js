const webpackDevMock = require('webpack-dev-mock');

module.exports = (config, mock, context) => {
  // dev mock
  const { commandArgs, command, webpack } = context;
  const isWebpack4 = /^4\./.test(webpack.version);
  if (!commandArgs.disableMock && command === 'start' && mock) {
    // Compat with webpack4
    const beforeHookName = isWebpack4 ? 'before' : 'setupMiddlewares';
    const originalDevServeBefore = config.devServer.get(beforeHookName);
    // replace devServer before function
    config.merge({ devServer: {
      [beforeHookName](appOrMiddlewares, server) {
        let middlewares;
        let app;
        if (appOrMiddlewares.get) {
          app = appOrMiddlewares;
        } else {
          app = server.app;
          middlewares = appOrMiddlewares;
        }
        const mockIgnore = Object.prototype.toString.call(mock) === '[object Object]' && mock.exclude;
        // keep mock server ahead of devServer.before
        webpackDevMock(app, mockIgnore || []);
        if (typeof originalDevServeBefore === 'function') {
          return originalDevServeBefore(appOrMiddlewares, server);
        }
        if (middlewares) {
          return middlewares;
        }
      },
    }});
  }
};
