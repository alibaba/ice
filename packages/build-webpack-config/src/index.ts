import getBaseConfig from './webpack.base';
import configBuild from './webpack.build';
import configDev from './webpack.dev';

export default (mode = 'development') => {
  const config = getBaseConfig(mode);
  if (mode === 'development') {
    configDev(config);
  } else {
    configBuild(config);
  }
  return config;
};
