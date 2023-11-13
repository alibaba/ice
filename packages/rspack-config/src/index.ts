import * as path from 'path';
import { createRequire } from 'module';
import { compilationPlugin, compileExcludes, getDefineVars, getCompilerPlugins } from '@ice/shared-config';
import type { Config, ModifyWebpackConfig } from '@ice/shared-config/types';
import type { Configuration } from '@rspack/core';
import type { rspack as Rspack } from '@ice/bundles/compiled/@rspack/core/dist/index.js';
import AssetManifest from './plugins/AssetManifest.js';
import getSplitChunks from './splitChunks.js';
import getAssetsRule from './assetsRule.js';
import getCssRules from './cssRules.js';

interface GetRspackConfigOptions {
  rootDir: string;
  taskConfig: Config;
  runtimeTmpDir: string;
  getExpandedEnvs: () => Record<string, string>;
  runtimeDefineVars?: Record<string, any>;
  getRoutesFile?: () => string[];
  localIdentName?: string;
  rspack: typeof Rspack;
}

type GetConfig = (
  options: GetRspackConfigOptions,
) => Promise<Configuration>;

const require = createRequire(import.meta.url);

const getConfig: GetConfig = async (options) => {
  const {
    rootDir,
    taskConfig,
    runtimeTmpDir,
    getExpandedEnvs,
    runtimeDefineVars,
    getRoutesFile,
    localIdentName,
    rspack,
  } = options;

  const {
    mode,
    publicPath = '/',
    cacheDir,
    outputDir = 'build',
    sourceMap,
    externals = {},
    alias = {},
    compileIncludes,
    polyfill,
    swcOptions,
    hash,
    define = {},
    splitChunks,
    enableRpx2Vw = true,
    postcss,
    proxy,
    devServer = {},
    plugins = [],
    middlewares,
    configureWebpack = [],
  } = taskConfig || {};
  const absoluteOutputDir = path.isAbsolute(outputDir) ? outputDir : path.join(rootDir, outputDir);
  const hashKey = hash === true ? 'hash:8' : (hash || '');
  const compilation = compilationPlugin({
    rootDir,
    cacheDir,
    sourceMap,
    fastRefresh: false,
    mode,
    compileIncludes,
    compileExcludes,
    swcOptions,
    polyfill,
    enableEnv: true,
    getRoutesFile,
  });
  const { DefinePlugin, ProvidePlugin } = await import('@ice/bundles/compiled/@rspack/core/dist/index.js');
  const cssFilename = `css/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`;
  // get compile plugins
  const compilerWebpackPlugins = getCompilerPlugins(rootDir, taskConfig || {}, 'rspack', { isServer: false });
  const config: Configuration = {
    entry: {
      main: [path.join(rootDir, runtimeTmpDir, 'entry.client.tsx')],
    },
    name: 'web',
    mode,
    externals,
    output: {
      clean: true,
      publicPath,
      path: absoluteOutputDir,
      filename: `js/${hashKey ? `[name]-[${hashKey}].js` : '[name].js'}`,
      cssFilename,
      cssChunkFilename: cssFilename,
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
    },
    context: rootDir,
    module: {
      rules: [
        // Compliation rules for js / ts.
        {
          test: compilation.transformInclude,
          use: [{
            loader: require.resolve('@ice/shared-config/compilation-loader'),
            options: {
              transform: compilation.transform,
            },
          }],
        },
        ...getAssetsRule(),
        ...getCssRules({
          rootDir,
          enableRpx2Vw,
          postcssOptions: postcss,
        }),
      ],
    },
    resolve: {
      alias,
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 100,
    },
    optimization: {
      splitChunks: typeof splitChunks == 'object'
        ? splitChunks
        : getSplitChunks(rootDir, splitChunks),
    },
    // @ts-expect-error plugin instance defined by default in not compatible with rspack.
    plugins: [
      ...plugins,
      // Unplugin should be compatible with rspack.
      ...compilerWebpackPlugins,
      new AssetManifest({
        fileName: 'assets-manifest.json',
        outputDir: path.join(rootDir, runtimeTmpDir),
      }),
      new DefinePlugin(getDefineVars(define, runtimeDefineVars, getExpandedEnvs)),
      new ProvidePlugin({
        process: [require.resolve('process/browser')],
        $ReactRefreshRuntime$: [require.resolve('./client/reactRefresh.cjs')],
      }),
    ].filter(Boolean),
    builtins: {
      devFriendlySplitChunks: true,
      css: {
        modules: { localIdentName },
      },
    },
    stats: 'none',
    infrastructureLogging: {
      level: 'warn',
    },
    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      // @ts-expect-error devServer.hot in rspack only support boolean.
      hot: true,
      compress: false,
      proxy,
      devMiddleware: {
        publicPath,
      },
      client: {
        logging: 'info',
      },
      ...devServer,
      setupMiddlewares: middlewares,
    },
  };
  // Compatible with API configureWebpack.
  const ctx = {
    ...taskConfig,
    rootDir,
    hashKey,
    enableRpx2Vw,
    bundler: rspack,
  };
  return (configureWebpack as unknown as ModifyWebpackConfig<Configuration, typeof Rspack>[])
    .reduce((rspackConfig, next) => next(rspackConfig, ctx), config);
};


export default getConfig;
