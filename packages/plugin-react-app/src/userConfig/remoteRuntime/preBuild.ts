import * as path from 'path';
import * as fse from 'fs-extra';

export default (api, options) => {
  const { context, onHook } = api;
  const { command, webpack } = context;
  const { cacheDir, runtimeDir, cacheFile, cacheContent } = options;
  // create empty entry for build remote runtime
  const mfEntry = path.join(cacheDir, 'entry.js');
  fse.writeFileSync(mfEntry, '', 'utf-8');

  onHook(`before.${command}.load`, async ({ webpackConfig }) => {
    const targetConfig = webpackConfig.find(({ name }) => name === 'web');
    const preBuildConfig = {
      ...targetConfig,
      entry: mfEntry,
      output: {
        chunkLoadingGlobal: 'webpackJsonp',
        uniqueName: 'runtime',
        path: runtimeDir,
      },
      optimization: {
        minimize: false,
        chunkIds: 'named',
      },
      plugins: [
        ...(targetConfig.plugins || []),
        new webpack.ModuleFederationPlugin({

        }),
      ]
    };
    await new Promise((resolve, reject) => {
      webpack(preBuildConfig, (err, stat) => {
        if (err) {
          reject(err);
        }
        // write cache after webpack compile success
        fse.writeFileSync(cacheFile, cacheContent, 'utf-8');
        resolve(stat);
      });
    });
  });
};
