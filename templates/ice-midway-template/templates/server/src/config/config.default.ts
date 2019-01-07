import * as path from 'path';

module.exports = (appInfo: any) => {
  const config: any = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541510581780_3944';

  // add your config here
  config.middleware = [
  ];

	// https://www.npmjs.com/package/egg-static#configuration
  config.static = {
    // maxAge: 31536000,
		dir: path.join(__dirname, '../../../client/build')
  };

	config.view = {
		// defaultViewEngine: 'ejs',
		// root: path.join(__dirname, '../../../client/build')
  }

  return config;
};
