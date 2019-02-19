import * as path from 'path';

module.exports = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541510581780_3944';

  // 配置自定义中间件
  config.middleware = ['assetsInfo'];

  // https://www.npmjs.com/package/egg-static#configuration
  config.static = {
    // maxAge: 31536000,
    prefix: '/',
    dir: path.join(__dirname, '../../../client/build'),
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
    // root: path.join(__dirname, '../../../client/build')
  };

  return config;
};
