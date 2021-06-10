import * as path from 'path';
import * as fse from 'fs-extra';
import { IPluginAPI } from 'build-scripts';

interface IExposes {
  [key: string]: string;
}

export default (api: IPluginAPI, { cacheDir, runtimeDir, remoteName, remoteEntry, cacheFile, cacheContent, compilePackages }) => {
  const { context, onHook } = api;
  const { command, webpack } = context;
  // create empty entry for build remote runtime
  const mfEntry = path.join(cacheDir, 'entry.js');
  fse.writeFileSync(mfEntry, '', 'utf-8');

  (onHook as any)(`before.${command}.load`, async ({ webpackConfig }) => {
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
        new (webpack as any).ModuleFederationPlugin({
          name: remoteName,
          filename: remoteEntry,
          exposes: compilePackages.reduce((pre: IExposes, cur: string) => {
            pre[`./${cur}`] = cur;
            return pre;
          }, {}),
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
