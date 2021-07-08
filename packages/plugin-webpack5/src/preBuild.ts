import * as path from 'path';
import * as fse from 'fs-extra';
import { IPluginAPI } from '@alib/build-scripts';
import writeRemoteFile from './writeRemoteFile';

interface IExposes {
  [key: string]: string;
}

interface IRemoteFiles {
  packageName: string;
  exposePath: string;
}

export default (api: IPluginAPI, { runtimeDir, cacheDir, remoteEntry, cacheContent, remoteName, cacheFile, compilePackages }) => {
  const { context, onHook } = api;
  const { command, webpack } = context;
  // create empty entry for build remote runtime
  const mfEntry = path.join(cacheDir, 'entry.js');
  fse.writeFileSync(mfEntry, '', 'utf-8');

  (onHook as any)(`before.${command}.run`, async ({ config: webpackConfig }) => {
    const targetConfig = (webpackConfig.find(({ name }) => name === 'web'));
    const remoteFiles = await writeRemoteFile(compilePackages, context.rootDir);
    process.env.RRE_BUILD = 'true';
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
          exposes: remoteFiles.reduce((pre: IExposes, cur: IRemoteFiles) => {
            const { packageName, exposePath } = cur;
            pre[`./${packageName}`] = `./${exposePath}` || packageName;
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
        process.env.RRE_BUILD = '';
        if (err || stats.hasErrors()) {
          reject(err);
          return;
        }
        // write cache after webpack compile success
        fse.writeFileSync(cacheFile, cacheContent, 'utf-8');
        resolve(stats);
      });
    });
  });
};