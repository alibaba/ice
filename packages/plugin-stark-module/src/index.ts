import { IPlugin, IUserConfig } from '@alib/build-scripts';
import { getWebpackConfig } from 'build-scripts-config';
import * as WebpackPluginImport from 'webpack-plugin-import';
import { Options } from './types';
import setUMDConfig from './setUMDConfig';
import genRuntime from './genRuntime';
import setExternals from './setExternals';
import appendLifecycle from './appendLifecycle';

const plugin: IPlugin = ({ onGetWebpackConfig, context, registerTask, onHook, registerUserConfig }, options) => {
  const { command, userConfig, webpack, commandArgs } = context;
  const { minify: outerMinify, sourceMap: outerSourceMap } = (userConfig || {}) as IUserConfig;

  try {
    registerUserConfig({
      name: 'outputDir',
      defaultValue: 'build',
      validation: 'string',
    });
  } catch (error) {
    console.log('error :>> ', error);
  }
  
  const {
    moduleExternals,
    minify,
    sourceMap,
  } = options as any as Options ?? {};
  const mode = command === 'start' ? 'development' : 'production';

  const baseConfig = getWebpackConfig(mode);

  baseConfig.name('MicroModule');

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

  // definePlugin, Compatible with @ali/build-plugin-ice-def
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };
  baseConfig.plugin('DefinePlugin')
    .use((webpack as any).DefinePlugin, [defineVariables])
    .end();

  // register webpack-plugin-import
  // https://github.com/alibaba/ice/tree/master/packages/webpack-plugin-import
  baseConfig.plugin('WebpackPluginImport')
    .use(WebpackPluginImport, [[
      {
        libraryName: /@ali\/ice-.*/,
        stylePath: 'style.js',
      },
    ]])
    .end();

  // set umd
  setUMDConfig({ context, onGetWebpackConfig }, options as any as Options);

  // set moduleExternals
  if (moduleExternals) {
    setExternals({ onGetWebpackConfig }, { moduleExternals });
  }

  // append lifecycle
  appendLifecycle({ onGetWebpackConfig });

  // registerTask
  registerTask('icestark-module', baseConfig);

  // generate runtime.json
  onHook(`after.${command}.compile`, () => {
    genRuntime({ context }, options as any as Options);
  });
};

export default plugin;
