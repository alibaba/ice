import * as path from 'path';
import * as fse from 'fs-extra';
import { IPluginAPI } from 'build-scripts';
import writeRemoteFile from './writeRemoteFile';

type IExposes = Record<string, string>

type IRemoteFiles = {
  packageName: string;
  exposePath: string;
}

interface WebpackLoader {
  loader: string;
  options?: any;
}

interface WebpackRule {
  test?: RegExp;
  use?: WebpackLoader[];
}

export default (api: IPluginAPI, { cacheDir, runtimeDir, remoteName, remoteEntry, cacheFile, cacheContent, compilePackages }) => {
  const { context, onHook, log } = api;
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
      // get externals package form global to keep same reference with main app
      externalsType: 'global',
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
      module: {
        rules: targetConfig?.module?.rules.map((rule: WebpackRule) => {
          if (rule?.test?.source?.match(/\.(j|t)sx/)) {
            return {
              ...rule,
              use: rule?.use?.map((use) => {
                const { loader, options } = use;
                if (loader?.match(/babel-loader/) && options?.plugins) {
                  return {
                    ...use,
                    options: {
                      ...options,
                      plugins: options.plugins.filter((plugin: string) => {
                        // filter react-refresh
                        return typeof plugin !== 'string' || !plugin.match(/react-refresh/);
                      }),
                    }
                  };
                }
                return use;
              }),
            };
          }
          return rule;
        }),
      },
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
            'ReactRefreshPlugin',
            'HotModuleReplacementPlugin',
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
    await new Promise((resolve) => {
      webpack(preBuildConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
          log.error('Fail to pre build dependencies', stats.toJson({
            all: false,
            errors: true,
            warnings: true,
            timings: true,
          }));
          return;
        }
        // write cache after webpack compile success
        fse.writeFileSync(cacheFile, cacheContent, 'utf-8');
        resolve(stats);
      });
    });
  });
};
