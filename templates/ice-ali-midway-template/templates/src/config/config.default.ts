export = (appInfo: any) => {
  const config: any = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544601223261_7512';

  // add your middleware here
  config.middleware = [
  ];

  return config;
};
