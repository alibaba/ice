import * as path from 'path';
import { IPluginAPI } from '@alib/build-scripts';
import { Options } from './types';
import { getModules } from './entry.helper';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

interface GetConfig {
  (api: Partial<IPluginAPI>, options?: Options): any;
}

const getConfig: GetConfig = ({ context, onGetWebpackConfig }, { modules, outputDir }) => {
  const { rootDir, userConfig, pkg } = context;
  const { library } = userConfig;
  const { name } = pkg ?? {};

  onGetWebpackConfig('icestark-module', (config) => {
    const entries = getModules(modules);

    config.entryPoints.clear();
    Object.keys(entries).forEach(key => {
      config
        .entry(key)
        .add(path.join(rootDir, (entries as any)[key]));
    });

    // set umd
    const output = path.resolve(rootDir, outputDir ?? 'dist');
    config.output
      .path(output)
      // set output to dist/[name]
      .filename('./[name]/index.js')
      .library((library || name || 'module') as string)
      .libraryTarget('umd');

    config
      .plugin('MiniCssExtractPlugin')
      .use(MiniCssExtractPlugin, [{
        filename: './[name]/index.css',
      }]);

    config.devServer.contentBase(path.join(rootDir, 'dist'));
    config.devServer.writeToDisk(true);
  });
};

export default getConfig;
