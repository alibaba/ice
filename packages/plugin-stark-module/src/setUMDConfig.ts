import * as path from 'path';
import { IPluginAPI } from '@alib/build-scripts';
import { Options } from './types';
import { getModules } from './entryHelper';

interface GetConfig {
  (api: Partial<IPluginAPI>, options?: Options): any;
}

const genDirClassification = (dir: string) => {
  const hierarchicalDirectory = dir.split('/')
    .join(' ')
    .trim()
    .split(' ');
  return [
    hierarchicalDirectory[0],
    hierarchicalDirectory.slice(1).join('/')
  ];
};

const formatSecondaryDir = (secondaryDir: string | undefined) => secondaryDir ? `${secondaryDir}/` : '';

const getConfig: GetConfig = ({ context, onGetWebpackConfig }, { modules, outputDir = 'dist', library, filenameStrategy }) => {
  const { rootDir, userConfig, pkg } = context;
  const { library: userLibrary } = userConfig;
  const { name } = pkg ?? {};

  const [firstLevelDir, secondaryDir] = genDirClassification(outputDir);

  onGetWebpackConfig('icestark-module', (config) => {
    const entries = getModules(modules);

    config.entryPoints.clear();
    Object.keys(entries).forEach(key => {
      config
        .entry(key)
        .add(path.join(rootDir, (entries as any)[key]));
    });
    // disable splitchunks
    config.optimization.splitChunks({ cacheGroups: {} });
    // set umd
    const output = path.resolve(rootDir, firstLevelDir);
    const formattedSecondaryDir = formatSecondaryDir(secondaryDir);
    config.output
      .path(output)
      // set output to outputDir/[name]
      .filename(filenameStrategy ? `${filenameStrategy}.js` : `./${formattedSecondaryDir}[name]/index.js`)
      .library((library || userLibrary || name || 'module') as string)
      .libraryTarget('umd');

    config.plugin('MiniCssExtractPlugin').tap(([args]) => [{
      ...args,
      filename: filenameStrategy ? `${filenameStrategy}.css` : `./${formattedSecondaryDir}[name]/index.css`
    }]);

    /**
     * modify asset file-loader. You may find the original config from `build-scripts-config`
     */
    ['woff2', 'ttf', 'eot', 'svg', 'img'].forEach(assetType => {
      config.module.rule(assetType)
        .use(assetType)
        .tap((options) => ({
          ...options,
          name: `./${formattedSecondaryDir}assets/[hash].[ext]`,
        }));
    });

    // hack with multi publicpath
    config.devServer.contentBase(output);
    config.devServer.writeToDisk(true);
  });
};

export default getConfig;
