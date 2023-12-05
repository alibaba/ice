import * as path from 'path';
import { createRequire } from 'module';
import { compilationPlugin, compileExcludes, getDefineVars, getCompilerPlugins, getJsxTransformOptions } from '@ice/shared-config';
import type { Config, ModifyWebpackConfig } from '@ice/shared-config/types';
import type { Configuration, rspack as Rspack } from '@rspack/core';
import lodash from '@ice/bundles/compiled/lodash/index.js';
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

const { merge } = lodash;
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
    minify,
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
    minimizerOptions = {},
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

  const { rspack: { DefinePlugin, ProvidePlugin, SwcJsMinimizerRspackPlugin } } = await import('@ice/bundles/esm/rspack.js');
  const cssFilename = `css/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`;
  // get compile plugins
  const compilerWebpackPlugins = getCompilerPlugins(rootDir, taskConfig || {}, 'rspack', { isServer: false });
  const jsMinimizerPluginOptions: any = merge({
    compress: {
      ecma: 5,
      unused: true,
      dead_code: true,
      // The following two options are known to break valid JavaScript code
      // https://github.com/vercel/next.js/issues/7178#issuecomment-493048965
      comparisons: false,
      inline: 2,
      passes: 4,
    },
    mangle: {
      safari10: true,
    },
    format: {
      safari10: true,
      comments: false,
      // Fixes usage of Emoji and certain Regex
      asciiOnly: true,
    },
    module: true,
  }, minimizerOptions);
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
        {
          // TODO: use regexp to improve performance.
          test: compilation.transformInclude,
          use: {
            loader: 'builtin:compilation-loader',
            options: {
              swcOptions: getJsxTransformOptions({ rootDir, mode, fastRefresh: false, polyfill, enableEnv: true }),
              transformFeatures: {
                removeExport: swcOptions.removeExportExprs,
                keepExport: swcOptions.keepExports,
              },
            },
          },
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
      minimize: !!minify,
      splitChunks: typeof splitChunks == 'object'
        ? splitChunks
        : getSplitChunks(rootDir, splitChunks),
    },
    // @ts-expect-error plugin instance defined by default in not compatible with rspack.
    plugins: [
      ...plugins,
      // Unplugin should be compatible with rspack.
      ...compilerWebpackPlugins,
      new DefinePlugin(getDefineVars(define, runtimeDefineVars, getExpandedEnvs)),
      new ProvidePlugin({
        process: [require.resolve('process/browser')],
        $ReactRefreshRuntime$: [require.resolve('./client/reactRefresh.cjs')],
      }),
      !!minify && new SwcJsMinimizerRspackPlugin(jsMinimizerPluginOptions),
    ].filter(Boolean),
    builtins: {
      css: {
        modules: { localIdentName },
      },
    },
    experiments: {
      rspackFuture: {
        disableTransformByDefault: true,
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
    features: {},
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
