import { IPlugin, Json } from '@alib/build-scripts';
import { getWebpackConfig } from 'build-scripts-config';

import webpack = require('webpack');
import fse = require('fs-extra')
import path = require('path');

const plugin: IPlugin = ({ registerTask, onGetWebpackConfig, context, onHook }, pluginOptions) => {
  const { rootDir, command, commandArgs, webpack: contextWebpack } = context;
  const { externals, library, moduleEntry = {} } = pluginOptions as Json || {};
  const entryKeys = Object.keys(moduleEntry);
  if (entryKeys.length > 0) {
    const mode = command === 'start' ? 'development' : 'production';
    const defaultConfig = getWebpackConfig(mode);
    defaultConfig.name('Module');
    // DefinePlugin
    const defineVariables = {
      'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
      'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
    };
    defaultConfig.plugin('DefinePlugin')
      .use((contextWebpack as any).DefinePlugin, [defineVariables])
      .end();
    registerTask('module', defaultConfig);
    onGetWebpackConfig('module', (config) => {
      config.context(rootDir);
      // clear entry
      config.entryPoints.clear();
      entryKeys.forEach((entryKey) => {
        // add module entry
        config.entry(entryKey).add(path.join(rootDir, ((moduleEntry as Json)[entryKey] as string)));
      });
      // disable vendor
      const outputDir = path.resolve(rootDir, 'dist');
      config.optimization.splitChunks({ cacheGroups: {} });
      config.output
        .path(outputDir)
        .filename('[name].js')
        .library((library as string) || 'module')
        .libraryTarget('umd');
      // css
      config.plugin('MiniCssExtractPlugin').tap((args) => [{ ...args, filename: '[name].css' }]);
      config.devServer.contentBase(path.join(rootDir, 'dist'));
      config.devServer.writeToDisk(true);
      config.externals(externals as webpack.ExternalsElement[]);
      onHook('after.build.compile', () => {
        // copy files to build/modules
        fse.copySync(outputDir, path.join(rootDir, 'build', 'modules'));
      });
    });
  }
};

export default plugin;