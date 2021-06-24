import * as path from 'path';
import * as fse from 'fs-extra';
import { IPluginAPI } from '@alib/build-scripts';

interface IExposes {
  [key: string]: string;
}

export default (api: IPluginAPI, { runtimeDir, cacheDir, remoteEntry, cacheContent, remoteName, cacheFile, compilePackages }) => {
  const { context, onHook } = api;
  const { command, webpack } = context;
  // create empty entry for build remote runtime
  const mfEntry = path.join(cacheDir, 'entry.js');
  fse.writeFileSync(mfEntry, '', 'utf-8');

  (onHook as any)(`before.${command}.run`, async ({ config: webpackConfig }) => {
    const targetConfig = (webpackConfig.find(({ name }) => name === 'web'));
    const preBuildConfig = {
      ...targetConfig,
      entry: mfEntry,
      devServer: {
        hot: false,
      },
      output: {
        chunkLoadingGlobal: 'webpackJsonp',
        uniqueName: 'runtime',
        path: runtimeDir,
        libraryTarget: 'commonjs',
      },
      optimization: {
        minimize: false,
        chunkIds: 'named',
      },
      devtool: false,
      plugins: [
        ...(targetConfig.plugins || []).filter((plugin) => {
          // filter unnecessary plugins
          return ![
            'ForkTsCheckerWebpackPlugin',
            'FilterWarningsPlugin',
            'ProgressPlugin',
            'FriendlyErrorsWebpackPlugin',
            'HtmlWebpackPlugin',
            'AddAssetHtmlPlugin',
            'CopyPlugin',
          ].includes(plugin?.constructor?.name);
        }),
        new (webpack as any).ProgressPlugin({}),
        new (webpack as any).container.ModuleFederationPlugin({
          name: remoteName,
          filename: remoteEntry,
          exposes: compilePackages.reduce((pre: IExposes, cur: string) => {
            pre[`./${cur}`] = cur;
            return pre;
          }, {}),
          shared: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
          ],
        }),
      ]
    };
    await new Promise((resolve, reject) => {
      (webpack as any)(preBuildConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
          reject(err);
        }
        // write cache after webpack compile success
        fse.writeFileSync(cacheFile, cacheContent, 'utf-8');
        resolve(stats);
      });
    });
  });
};