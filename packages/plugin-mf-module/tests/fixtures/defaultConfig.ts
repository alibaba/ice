import path = require('path');
import Config = require('webpack-chain');
import { IPlugin } from '@alib/build-scripts/lib';

const plugin: IPlugin = ({ registerTask, context }) => {
  const { rootDir } = context;
  const config = new Config();
  config.mode('development');
  config.entry('index').add(path.join(rootDir, 'src/index.tsx'));
  config.output.path(path.join(rootDir, 'build'));
  config.merge({
    devServer: {
      logLevel: 'silent',
      clientLogLevel: 'none',
    },
  });
  registerTask('web', config);
};

export default plugin;