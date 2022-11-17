import * as path from 'path';
import { createRequire } from 'module';
import fg from 'fast-glob';
import consola from 'consola';
// FIXME when prepack @pmmmwh/react-refresh-webpack-plugin
import ReactRefreshWebpackPlugin from '@ice/bundles/compiled/@pmmmwh/react-refresh-webpack-plugin/lib/index.js';
import bundleAnalyzer from '@ice/bundles/compiled/webpack-bundle-analyzer/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import CssMinimizerPlugin from '@ice/bundles/compiled/css-minimizer-webpack-plugin/index.js';
import TerserPlugin from '@ice/bundles/compiled/terser-webpack-plugin/index.js';
import ForkTsCheckerPlugin from '@ice/bundles/compiled/fork-ts-checker-webpack-plugin/index.js';
import ESlintPlugin from '@ice/bundles/compiled/eslint-webpack-plugin/index.js';
import CopyPlugin from '@ice/bundles/compiled/copy-webpack-plugin/index.js';
import type { NormalModule, Compiler, Configuration } from 'webpack';
import type webpack from 'webpack';
import type { Config, ModifyWebpackConfig } from './types.js';
import configAssets from './config/assets.js';
import configCss from './config/css.js';
import AssetsManifestPlugin from './webpackPlugins/AssetsManifestPlugin.js';
import getCompilerPlugins from './getCompilerPlugins.js';
import getSplitChunksConfig, { FRAMEWORK_BUNDLES } from './config/splitChunks.js';
import compilationPlugin from './unPlugins/compilation.js';
import compileExcludes from './compileExcludes.js';

export { getCSSModuleLocalIdent } from './utils/getCSSModuleLocalIdent.js';

const require = createRequire(import.meta.url);
const { merge } = lodash;
const { BundleAnalyzerPlugin } = bundleAnalyzer;
const watchIgnoredRegexp = ['**/.git/**', '**/node_modules/**'];

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
  webpack: typeof webpack;
  runtimeTmpDir: string;
  userConfigHash: string;
}
type GetWebpackConfig = (options: GetWebpackConfigOptions) => Configuration;
enum JSMinifier {
  terser = 'terser',
  swc = 'swc',
}

function getEntry(rootDir: string, runtimeTmpDir: string) {
  // check entry.client.tsx
  let entryFile = fg.sync('entry.client.{tsx,ts,jsx.js}', {
    cwd: path.join(rootDir, 'src'),
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, runtimeTmpDir, 'entry.client.tsx');
  }

  // const dataLoaderFile = path.join(rootDir, '.ice/data-loader.ts');
  return {
    main: [entryFile],
    // FIXME: https://github.com/ice-lab/ice-next/issues/217, https://github.com/ice-lab/ice-next/issues/199
    // loader: [dataLoaderFile],
  };
}

const getWebpackConfig: GetWebpackConfig = ({ rootDir, config, webpack, runtimeTmpDir, userConfigHash }) => {
  const {
    mode,
    define = {},
    externals = {},
    publicPath = '/',
    outputDir,
    loaders = [],
    plugins = [],
    alias = {},
    sourceMap,
    middlewares,
    proxy,
    configureWebpack,
    experimental,
    hash,
    minify,
    minimizerOptions = {},
    enableCache = true,
    cacheDir,
    https,
    analyzer,
    tsCheckerOptions,
    eslintOptions,
    entry,
    output = {},
    splitChunks,
    assetsManifest,
    concatenateModules,
    devServer,
    fastRefresh,
    logging,
    swcOptions,
    compileIncludes,
    optimization = {},
    performance,
    enableCopyPlugin,
    polyfill,
    enableRpx2Vw = true,
  } = config;
  const absoluteOutputDir = path.isAbsolute(outputDir) ? outputDir : path.join(rootDir, outputDir);
  const dev = mode !== 'production';
  const hashKey = hash === true ? 'hash:8' : (hash || '');
  // formate alias
  const aliasWithRoot = {};
  Object.keys(alias).forEach((key) => {
    const aliasValue = alias[key];
    aliasWithRoot[key] = (aliasValue && typeof aliasValue === 'string' && aliasValue.startsWith('.')) ? path.join(rootDir, aliasValue) : aliasValue;
  });

  // auto stringify define value
  const defineVars = {};
  Object.keys(define).forEach((key) => {
    defineVars[key] = JSON.stringify(define[key]);
  });

  const runtimeDefineVars = {};
  const RUNTIME_PREFIX = /^ICE_/i;
  Object.keys(process.env).filter((key) => {
    return RUNTIME_PREFIX.test(key) || ['NODE_ENV'].includes(key);
  }).forEach((key) => {
    runtimeDefineVars[`process.env.${key}`] =
      /^ICE_CORE_/i.test(key)
        // ICE_CORE_* will be updated dynamically, so we need to make it effectively
        ? webpack.DefinePlugin.runtimeValue(() => JSON.stringify(process.env[key]), true)
        : JSON.stringify(process.env[key]);
  });

  const lazyCompilationConfig = dev && experimental?.lazyCompilation ? {
    lazyCompilation: {
      test: (module: NormalModule) => {
        // do not lazy for framework bundles
        const frameworkRegex = new RegExp(`[\\\\/]node_modules[\\\\/](${FRAMEWORK_BUNDLES.join('|')})[\\\\/]`);
        return !frameworkRegex.test(module?.resourceResolveData?.path);
      },
      ...(typeof experimental?.lazyCompilation === 'object' ? { ...experimental.lazyCompilation } : {}),
    },
  } : {};
  // get compile plugins
  const compilerWebpackPlugins = getCompilerPlugins(config, 'webpack');

  const terserOptions: any = merge({
    compress: {
      ecma: 5,
      unused: true,
      // The following two options are known to break valid JavaScript code
      // https://github.com/vercel/next.js/issues/7178#issuecomment-493048965
      comparisons: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    format: {
      safari10: true,
      comments: false,
      // Fixes usage of Emoji and certain Regex
      ascii_only: true,
    },
  }, minimizerOptions);
  const compilation = compilationPlugin({
    cacheDir,
    sourceMap,
    fastRefresh,
    mode,
    compileIncludes,
    compileExcludes,
    swcOptions,
    polyfill,
    env: true,
  });
  const webpackConfig = {
    mode,
    experiments: {
      layers: true,
      cacheUnaffected: true,
      topLevelAwait: true,
      ...lazyCompilationConfig,
      ...(experimental || {}),
    },
    entry: entry || (() => getEntry(rootDir, runtimeTmpDir)),
    externals,
    output: {
      publicPath,
      path: absoluteOutputDir,
      filename: `js/${hashKey ? `[name]-[${hashKey}].js` : '[name].js'}`,
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
      ...output,
    },
    context: rootDir,
    module: {
      parser: {
        javascript: {
          importExportsPresence: 'warn',
          exportsPresence: 'warn',
        },
      },
      rules: [
        // Use webpack loader instead of webpack plugin which is generated by unplugin.
        // Reason: https://github.com/unjs/unplugin/issues/154
        {
          test: compilation.transformInclude,
          use: {
            loader: require.resolve('./webpackLoaders/compilationLoader.cjs'),
            options: {
              transform: compilation.transform,
            },
          },
        },
        ...loaders,
      ],
    },
    resolve: {
      alias: aliasWithRoot,
      symlinks: true,
      extensions: ['.ts', '.tsx', '.jsx', '...'],
      mainFields: ['browser', 'module', 'jsnext:main', 'main'],
      fallback: {
        // TODO: add more fallback module
        events: require.resolve('events'),
        stream: false,
        fs: false,
        path: false,
      },
    },
    resolveLoader: {
      modules: ['node_modules'],
    },
    watchOptions: {
      // add a delay before rebuilding once routes changed
      // webpack can not found routes component after it is been deleted
      aggregateTimeout: 200,
      ignored: watchIgnoredRegexp,
    },
    optimization: {
      splitChunks: splitChunks == false
        ? { minChunks: Infinity, cacheGroups: { default: false } }
        : getSplitChunksConfig(rootDir),
      minimize: !!minify,
      minimizer: [
        new TerserPlugin({
          // Minify of swc is still experimental, config `minify: 'swc'` faster minification.
          minify: minify === JSMinifier.swc ? TerserPlugin.swcMinify : TerserPlugin.terserMinify,
          extractComments: false,
          terserOptions,
        }),
        new CssMinimizerPlugin({
          parallel: false,
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
      ...optimization,
    } as Configuration['optimization'],
    cache: enableCache ? {
      type: 'filesystem',
      version: `${process.env.__ICE_VERSION__}|${userConfigHash}`,
      buildDependencies: { config: [path.join(rootDir, 'package.json')] },
      cacheDirectory: path.join(cacheDir, 'webpack'),
    } : false,
    // custom stat output by stats.toJson() calls in plugin-app
    stats: 'none',
    infrastructureLogging: {
      level: 'warn',
    },
    performance: performance || false,
    devtool: getDevtoolValue(sourceMap),
    plugins: [
      ...plugins,
      ...compilerWebpackPlugins,
      dev && fastRefresh && new ReactRefreshWebpackPlugin({
        exclude: [/node_modules/, /bundles[\\\\/]compiled/],
        // use webpack-dev-server overlay instead
        overlay: false,
      }),
      new webpack.ProvidePlugin({
        process: require.resolve('process/browser'),
      }),
      new webpack.DefinePlugin({
        ...defineVars,
        ...runtimeDefineVars,
      }),
      assetsManifest && new AssetsManifestPlugin({
        fileName: 'assets-manifest.json',
        outputDir: path.join(rootDir, runtimeTmpDir),
      }),
      analyzer && new BundleAnalyzerPlugin(),
      tsCheckerOptions && new ForkTsCheckerPlugin(tsCheckerOptions),
      eslintOptions && new ESlintPlugin(eslintOptions),
      // copy plugin only active in production
      // otherwise it will add assets to webpack compilation
      (enableCopyPlugin || !dev) && new CopyPlugin({
        patterns: [{
          from: path.join(rootDir, 'public'),
          to: absoluteOutputDir,
          // ignore assets already in compilation.assets such as js and css files
          force: false,
          noErrorOnMissing: true,
          globOptions: {
            dot: true,
            gitignore: true,
          },
        }],
      }),
    ].filter(Boolean),
    devServer: merge({
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      proxy,
      hot: true,
      compress: true,
      webSocketServer: 'ws',
      devMiddleware: {
        publicPath,
      },
      static: {
        watch: {
          ignored: watchIgnoredRegexp,
        },
      },
      client: {
        overlay: true,
        logging: 'info',
      },
      setupMiddlewares: middlewares,
      https,
    }, devServer || {}) as Config['devServer'],
  } as Configuration;
  // tnpm / cnpm 安装时，webpack 5 的持久缓存无法生成，长时间将导致 OOM
  // 原因：[managedPaths](https://webpack.js.org/configuration/other-options/#managedpaths) 在 tnpm / cnpm 安装的情况下失效，导致持久缓存在处理 node_modules
  // 通过指定 [immutablePaths](https://webpack.js.org/configuration/other-options/#immutablepaths) 进行兼容
  // 依赖路径中同时包含包名和版本号即可满足 immutablePaths 的使用

  // 通过安装后的 package.json 中是否包含 __npminstall_done 字段来判断是否为 tnpm / cnpm 安装模式
  if (require('../package.json').__npminstall_done) {
    const nodeModulesPath = path.join(rootDir, 'node_modules');
    webpackConfig.snapshot = {
      immutablePaths: [nodeModulesPath],
    };
  }
  if (dev && !concatenateModules) {
    if (!webpackConfig.optimization) {
      webpackConfig.optimization = {};
    }
    // do not figure out file exports when dev
    webpackConfig.optimization.providedExports = false;
    webpackConfig.optimization.usedExports = false;
  }

  if (logging) {
    const infra = logging.includes('infrastructure');
    const profile = logging.includes('profile');
    const summary = logging.includes('summary');
    const assets = logging.includes('assets');

    if (infra) {
      webpackConfig.infrastructureLogging = {
        level: 'verbose',
        debug: /FileSystemInfo/,
      };
      webpackConfig.stats = 'verbose';
    }

    if (profile || summary) {
      webpackConfig.plugins!.push((compiler: Compiler) => {
        compiler.hooks.done.tap('webpack-logging', (stats) => {
          console.log(
            stats.toString(profile ? {
              colors: true,
              logging: 'verbose',
            } : {
              preset: 'summary',
              assets,
              colors: true,
              timings: true,
            }),
          );
        });
      });
    }

    if (profile) {
      const ProgressPlugin = webpack.ProgressPlugin as typeof webpack.ProgressPlugin;
      webpackConfig.plugins!.push(
        new ProgressPlugin({
          profile: true,
        }),
      );
      webpackConfig.profile = true;
    }
  }

  // pipe webpack by built-in functions and custom functions
  const ctx = {
    ...config,
    rootDir,
    hashKey,
    webpack,
    enableRpx2Vw,
  };
  const finalWebpackConfig = [configCss, configAssets, ...(configureWebpack || [])]
    .reduce((result, next: ModifyWebpackConfig<Configuration, typeof webpack>) => next(result, ctx), webpackConfig);
  consola.debug('[webpack]', finalWebpackConfig);
  return finalWebpackConfig;
};

function getDevtoolValue(sourceMap: Config['sourceMap']) {
  if (typeof sourceMap === 'string') {
    return sourceMap;
  } else if (sourceMap === false) {
    return false;
  }

  return 'source-map';
}

export {
  getWebpackConfig,
  getCompilerPlugins,
};
