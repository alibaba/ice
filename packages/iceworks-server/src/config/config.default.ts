export = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555062042825_9790';

  // add your config here
  config.middleware = [ 'client' ];

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
    allowMethods: 'GET,PUT,POST,DELETE'
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.security = {
    csrf: {
      headerName: 'x-csrf-token',
    },
  };

  return config;
};
