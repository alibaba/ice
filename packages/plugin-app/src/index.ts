import * as path from 'path';
import getWebpackConfig from '@builder/webpack-config';

const plugin = ({ registerTask, context }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';
  const webpackConfig = getWebpackConfig(mode);
  // set alias for webpack/hot while webpack has been prepacked
  webpackConfig.resolve.alias.set('webpack/hot', '@builder/pack/deps/webpack/hot');
  // TODO: remove after refactor
  webpackConfig.entry('index').add(path.join(rootDir, 'src/app'));
  webpackConfig.resolve.merge({
    fallback: {
      // add events fallback for webpack/hot/emitter
      events: require.resolve('events'),
    },
  });
  registerTask('web', webpackConfig);
};

export default plugin;
