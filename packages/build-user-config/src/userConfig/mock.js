const webpackDevMock = require('webpack-dev-mock');

module.exports = (config, mock, context) => {
  // dev mock
  const { commandArgs, command, webpack } = context;
  const isWebpack4 = /^4\./.test(webpack.version);
  if (!commandArgs.disableMock && command === 'start' && mock) {
    // Compat with webpack4
    const beforeHookName = isWebpack4 ? 'before' : 'onBeforeSetupMiddleware';
    const originalDevServeBefore = config.devServer.get(beforeHookName);
    // replace devServer before function
    config.merge({ devServer: {
      [beforeHookName](...args) {
        let app;
        let server;
        if (args[0].app) {
          server = args[0];
          app = server.app;
        } else {
          [app, server] = args;
        }
        // set cors before all served files
        app.use((req, res, next) => {
          res.set('Access-Control-Allow-Origin', '*');
          next();
        });
        const mockIgnore = Object.prototype.toString.call(mock) === '[object Object]' && mock.exclude;
        // keep mock server ahead of devServer.before
        webpackDevMock(app, mockIgnore || []);
        if (typeof originalDevServeBefore === 'function') {
          originalDevServeBefore(...args);
        }
      },
    }});
  }
};
