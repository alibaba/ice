import { IPlugin, IUserConfig } from '@alib/build-scripts';
import { getWebpackConfig } from 'build-scripts-config';
import { Options } from './types';
import getConfig from './getConfig';
import genRuntime from './genRuntime';
import setExternals from './setExternals';
import appendLifecycle from './appendLifecycle';

// eslint-disable-next-line
const chalk = require('chalk');

const plugin: IPlugin = ({ onGetWebpackConfig, context, registerTask, onHook }, options) => {
  const { command, userConfig } = context;
  const { minify: outerMinify, sourceMap: outerSourceMap } = (userConfig || {}) as IUserConfig;

  const {
    externals,
    modules,
    minify,
    outputDir,
    sourceMap,
  } = options as any as Options ?? {};
  const mode = command === 'start' ? 'development' : 'production';

  const baseConfig = getWebpackConfig(mode);

  // minify
  const localMinify = outerMinify ?? minify;
  if (localMinify !== undefined) {
    baseConfig.optimization.minimize(minify);
  }

  // sourcemap
  const localSourceMap = outerSourceMap ?? sourceMap;
  if (localSourceMap !== undefined) {
    baseConfig.devtool(sourceMap ? 'source-map' : false);
    // eslint-disable-next-line no-unused-expressions
    sourceMap
      && (command === 'build')
      && baseConfig.optimization
        .minimizer('TerserPlugin')
        .tap(([opts]: any) => [
          { ...opts, sourceMap: true },
        ]);
  }

  // set umd
  getConfig({ context, onGetWebpackConfig }, { modules, outputDir });

  // set externals
  if (externals) {
    setExternals({ onGetWebpackConfig }, { externals });
  }

  // append lifecycle
  appendLifecycle({ onGetWebpackConfig });

  // registerTask
  registerTask('icestark-module', baseConfig);

  // generate runtime.json
  onHook(`after.${command}.compile`, () => {
    if (externals) {
      console.log(chalk.green('runtime.json starts to build:'));
      try {
        genRuntime({ context }, { externals, modules });
        console.log(chalk.green('build succeed!'));
      } catch (e) {
        console.log(chalk.red('runtime.json starts to build:'));
      }
    }
  });
};

export default plugin;
