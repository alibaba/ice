export = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555062042825_9790';

  // middleware config
  config.middleware = ['client'];

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

  config.cors = {
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE',
  };

  config.security = {
    csrf: {
      headerName: 'x-csrf-token',
      ignore: (ctx) => ctx.ip === '127.0.0.1',
    },
  };

  return config;
};
