import * as path from 'path';
import { createRequire } from 'module';
import { getDefineVars, getCompilerPlugins, getJsxTransformOptions, getAliasWithRoot, skipCompilePackages } from '@ice/shared-config';
import type { Config, ModifyWebpackConfig } from '@ice/shared-config/types';
import type { Configuration, rspack as Rspack } from '@rspack/core';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import { coreJsPath } from '@ice/bundles';
import RefreshPlugin from '@ice/bundles/esm/plugin-refresh.js';
import getSplitChunks, { getFrameworkBundles } from './splitChunks.js';
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

interface BuiltinFeatures {
  splitChunksStrategy?: {
    name: string;
    topLevelFrameworks: string[];
  };
  assetsManifest?: boolean;
}

const require = createRequire(import.meta.url);

const { merge } = lodash;

const getConfig: GetConfig = async (options) => {
  const {
    rootDir,
    taskConfig,
    runtimeTmpDir,
    getExpandedEnvs,
    runtimeDefineVars,
    localIdentName,
    rspack,
  } = options;

  const {
    cacheDir,
    mode,
    minify,
    publicPath = '/',
    outputDir = 'build',
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
    optimizePackageImports = [],
  } = taskConfig || {};
  const isDev = mode === 'development';
  const absoluteOutputDir = path.isAbsolute(outputDir) ? outputDir : path.join(rootDir, outputDir);
  const hashKey = hash === true ? 'hash:8' : (hash || '');

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
  const builtinFeatures: BuiltinFeatures = {
    assetsManifest: true,
  };
  let splitChunksStrategy = null;
  // Use builtin splitChunks strategy by default.
  if (splitChunks === true || splitChunks === 'chunks') {
    builtinFeatures.splitChunksStrategy = {
      name: 'chunks',
      topLevelFrameworks: getFrameworkBundles(rootDir),
    };
  } else {
    splitChunksStrategy = typeof splitChunks == 'object'
      ? splitChunks
      : getSplitChunks(rootDir, splitChunks);
  }
  // Get built-in exclude packages.
  const compileExclude = skipCompilePackages.map((pkg) => {
    return `node_modules[\\/](${pkg}[\\/]|_${pkg.replace('/', '_')}@[^/]+[\\/])`;
  });
  let excludeRule: string;

  if (!compileIncludes || compileIncludes?.length === 0) {
    excludeRule = 'node_modules';
  } else if (!compileIncludes?.includes('node_modules') && compileIncludes?.length > 0) {
    excludeRule = `node_modules[\\/](?!${compileIncludes.map((pkg: string) => {
      return `${pkg}[\\/]|_${pkg.replace('/', '_')}@[^/]+[\\/]`;
    }).join('|')}).*`;
  }
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
          test: /\.(jsx?|tsx?|mjs)$/,
          // Set enforce: 'post' to make sure the compilation-loader is executed after other transformers.
          enforce: 'post',
          ...(excludeRule ? { exclude: new RegExp(excludeRule) } : {}),
          use: {
            loader: 'builtin:compilation-loader',
            options: {
              swcOptions: getJsxTransformOptions({ suffix: 'jsx', rootDir, mode, fastRefresh: isDev, polyfill, enableEnv: true }),
              transformFeatures: {
                removeExport: swcOptions.removeExportExprs,
                keepExport: swcOptions.keepExports,
                optimizeImport: optimizePackageImports,
              },
              compileRules: {
                // "bundles/compiled" is the path when using @ice/bundles.
                exclude: [...compileExclude, 'bundles/compiled'],
              },
            },
          },
          type: 'javascript/auto',
        },
        {
          test: /__barrel_optimize__/,
          use: ({ realResource }: { realResource: string }) => {
            const names = (
              realResource.match(/\?names=([^&]+)!=!/)?.[1] || ''
            ).split(',');
            return [{
              loader: 'builtin:barrel-loader',
              options: {
                names,
                cacheDir,
              },
            }];
          },
          type: 'javascript/auto',
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
      extensions: ['...', '.ts', '.tsx', '.jsx'],
      alias: {
        // Always lock the corejs version, it is decided by shared-config.
        'core-js': coreJsPath,
        ...getAliasWithRoot(rootDir, alias),
      },
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 100,
    },
    optimization: {
      minimize: !!minify,
      ...(splitChunksStrategy ? { splitChunks: splitChunksStrategy } : {}),
    },
    // @ts-expect-error plugin instance defined by default in not compatible with rspack.
    plugins: [
      ...plugins,
      // Unplugin should be compatible with rspack.
      ...compilerWebpackPlugins,
      isDev && new RefreshPlugin(),
      new DefinePlugin(getDefineVars(define, runtimeDefineVars, getExpandedEnvs)),
      new ProvidePlugin({
        process: [require.resolve('process/browser')],
      }),
      !!minify && new SwcJsMinimizerRspackPlugin(jsMinimizerPluginOptions),
    ].filter(Boolean),
    builtins: {
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
    features: builtinFeatures,
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
