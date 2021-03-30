const webpackDevMock = require('webpack-dev-mock');

module.exports = (config, mock, context) => {
  // dev mock
  const { commandArgs, command } = context;
  if (!commandArgs.disableMock && command === 'start' && mock) {
    const originalDevServeBefore = config.devServer.get('before');
    // replace devServer before function
    config.merge({ devServer: {
      before(app, server) {
        // set cors before all served files
        app.use((req, res, next) => {
          res.set('Access-Control-Allow-Origin', '*');
          next();
        });
        const mockIgnore = Object.prototype.toString.call(mock) === '[object Object]' && mock.exclude;
        // keep mock server ahead of devServer.before
        webpackDevMock(app, mockIgnore || []);
        if (typeof originalDevServeBefore === 'function') {
          originalDevServeBefore(app, server);
        }
      },
    }});
  }
};
