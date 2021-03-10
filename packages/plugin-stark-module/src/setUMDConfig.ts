import * as path from 'path';
import { IPluginAPI } from '@alib/build-scripts';
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

    config.entryPoints.clear();
    Object.keys(entries).forEach(key => {
      config
        .entry(key)
        .add(path.join(rootDir, (entries as any)[key]));
    });

    // set umd
    const output = path.resolve(rootDir, outputDir ?? 'dist');
    console.log('fsfsfsfsa', filenameStrategy ? `${filenameStrategy}.js` : './[name]/index.js');
    config.output
      .path(output)
      // set output to outputDir/[name]
      .filename(filenameStrategy ? `${filenameStrategy}.js` : './[name]/index.js')
      .library((library || userLibrary || name || 'module') as string)
      .libraryTarget('umd');

    config.plugin('MiniCssExtractPlugin').tap(([args]) => [{ ...args, filename: filenameStrategy ? `${filenameStrategy}.css` : './[name]/index.css' }]);

    // hack with multi publicpath
    config.devServer.contentBase(path.join(rootDir, 'dist'));
    config.devServer.writeToDisk(true);
  });
};

export default getConfig;
