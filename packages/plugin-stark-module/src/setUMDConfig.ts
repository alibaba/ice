import * as path from 'path';
import * as chalk from 'chalk';
import { IPluginAPI } from 'build-scripts';
import { Options } from './types';
import { getModules } from './entryHelper';

interface GetConfig {
  (api: Partial<IPluginAPI>, options?: Options): any;
}

const getConfig: GetConfig = ({ context, onGetWebpackConfig }, { modules, outputDir, library, filenameStrategy }) => {
  const { rootDir, userConfig, pkg } = context;
  const { library: userLibrary } = userConfig;
  const { name } = pkg ?? {};

  onGetWebpackConfig('icestark-module', (config) => {
    const entries = getModules(modules);

    if (Object.keys(entries).length > 1 && filenameStrategy === 'index.module') {
      throw Error(chalk.red('With several entries, filenameStrategy could not be set to the value \'index.module\', so just remove it.'));
    }

    config.entryPoints.clear();
    Object.keys(entries).forEach(key => {
      config
        .entry(key)
        .add(path.join(rootDir, (entries as any)[key]));
    });
    // disable splitchunks
    config.optimization.splitChunks({ cacheGroups: {} });
    // set umd
    const output = path.resolve(rootDir, outputDir ?? 'dist');

    config.output
      .path(output)
      // set output to outputDir/[name]
      .filename(filenameStrategy ? `${filenameStrategy}.js` : './[name]/index.js')
      .library((library || userLibrary || name || 'module') as string)
      .libraryTarget('umd');

    config.plugin('MiniCssExtractPlugin').tap(([args]) => [{ ...args, filename: filenameStrategy ? `${filenameStrategy}.css` : './[name]/index.css' }]);

    // hack with multi publicpath
    config.devServer.contentBase(output);
    config.devServer.writeToDisk(true);
  });
};

export default getConfig;
