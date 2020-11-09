const webpackDevMock = require('webpack-dev-mock');

module.exports = (config, mock, context) => {
  // dev mock
  const { commandArgs, command } = context;
  if (!commandArgs.disableMock && command === 'start' && mock) {
    const originalDevServeBefore = config.devServer.get('before');
    // replace devServer before function
    config.merge({ devServer: {
      before(app, server) {
        webpackDevMock(app);
        if (typeof originalDevServeBefore === 'function') {
          originalDevServeBefore(app, server);
        }
      },
    }});
  }
};
