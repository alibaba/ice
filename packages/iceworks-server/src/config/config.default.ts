const path = require('path');

export = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555062042825_9790';

  // middleware config
  config.middleware = [];

  config.static = {
    dir: path.join(appInfo.baseDir, 'app/public'),
    prefix: '/',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // socket.io
  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  return config;
};
