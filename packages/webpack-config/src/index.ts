import * as path from 'path';
import { createRequire } from 'module';
import fg from 'fast-glob';
import consola from 'consola';
// FIXME when prepack @pmmmwh/react-refresh-webpack-plugin
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import bundleAnalyzer from '@ice/bundles/compiled/webpack-bundle-analyzer/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import CssMinimizerPlugin from '@ice/bundles/compiled/css-minimizer-webpack-plugin/index.js';
import TerserPlugin from '@ice/bundles/compiled/terser-webpack-plugin/index.js';
import ForkTsCheckerPlugin from '@ice/bundles/compiled/fork-ts-checker-webpack-plugin/index.js';
import ESlintPlugin from '@ice/bundles/compiled/eslint-webpack-plugin/index.js';
import type { Configuration, WebpackPluginInstance } from 'webpack';
import type webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Config } from '@ice/types';
import { createUnplugin } from 'unplugin';
import browserslist from 'browserslist';
import configAssets from './config/assets.js';
import configCss from './config/css.js';
import AssetsManifestPlugin from './webpackPlugins/AssetsManifestPlugin.js';
import getTransformPlugins from './unPlugins/index.js';

const require = createRequire(import.meta.url);
const { merge } = lodash;
const { BundleAnalyzerPlugin } = bundleAnalyzer;
const watchIgnoredRegexp = ['**/.git/**', '**/node_modules/**'];

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
  webpack: typeof webpack;
}
type WebpackConfig = Configuration & { devServer?: DevServerConfiguration };
type GetWebpackConfig = (options: GetWebpackConfigOptions) => WebpackConfig;

function getEntry(rootDir: string) {
  // check entry.client.ts
  let entryFile = fg.sync('entry.client.{tsx,ts,jsx.js}', {
    cwd: path.join(rootDir, 'src'),
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, '.ice/entry.client.ts');
  }
  return {
    runtime: ['react', 'react-dom', '@ice/runtime'],
    main: {
      import: [entryFile],
      dependOn: 'runtime',
    },
  };
}

const getWebpackConfig: GetWebpackConfig = ({ rootDir, config, webpack }) => {
  const {
    mode,
    define = {},
    externals = {},
    publicPath = '/',
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
    alias = {},
    sourceMap,
    middlewares,
    proxy,
    configureWebpack,
    experimental,
    hash,
    minify,
    minimizerOptions = {},
    cacheDirectory,
    https,
    analyzer,
    tsCheckerOptions,
    eslintOptions,
  } = config;

  const dev = mode !== 'production';
  const supportedBrowsers = getSupportedBrowsers(rootDir, dev);
  const hashKey = hash === true ? 'hash:8' : (hash || '');
  // formate alias
  const aliasWithRoot = {};
  Object.keys(alias).forEach((key) => {
    aliasWithRoot[key] = alias[key].startsWith('.') ? path.join(rootDir, alias[key]) : alias[key];
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
  // create plugins
  const webpackPlugins = getTransformPlugins(config).map((plugin) => createUnplugin(() => plugin).webpack());

  const terserOptions: any = merge({
    compress: {
      ecma: 5,
      unused: false,
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

  const webpackConfig: WebpackConfig = {
    mode,
    experiments: {
      layers: true,
      cacheUnaffected: true,
      topLevelAwait: true,
      ...(experimental || {}),
    },
    entry: () => getEntry(rootDir),
    externals,
    output: {
      publicPath,
      path: path.isAbsolute(outputDir) ? outputDir : path.join(rootDir, outputDir),
      filename: `js/${hashKey ? `[name]-[${hashKey}].js` : '[name].js'}`,
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
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
        ...loaders,
      ],
    },
    resolve: {
      alias: aliasWithRoot,
      extensions: ['.ts', '.tsx', '.jsx', '...'],
      fallback: {
        // TODO: add more fallback module
        events: require.resolve('events'),
        stream: false,
      },
    },
    watchOptions: {
      // add a delay before rebuilding once routes changed
      // webpack can not found routes component after it is been deleted
      aggregateTimeout: 200,
      ignored: watchIgnoredRegexp,
    },
    optimization: {
      minimize: minify,
      minimizer: [
        new TerserPlugin({
          // keep same with compilation
          // use swcMinify with fix error of pure_funcs
          // minify: TerserPlugin.swcMinify
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
    },
    cache: {
      type: 'filesystem',
      version: `${process.env.__ICE_VERSION__}|${JSON.stringify(config)}`,
      buildDependencies: { config: [path.join(rootDir, 'package.json')] },
      cacheDirectory,
    },
    // custom stat output by stats.toJson() calls in plugin-app
    stats: 'none',
    infrastructureLogging: {
      level: 'warn',
    },
    performance: false,
    devtool: getDevtoolValue(sourceMap),
    plugins: [
      ...webpackPlugins,
      dev && new ReactRefreshWebpackPlugin({
        exclude: [/node_modules/, /bundles\/compiled/],
      }),
      new webpack.DefinePlugin({
        ...defineVars,
        ...runtimeDefineVars,
      }),
      new AssetsManifestPlugin({
        fileName: 'assets-manifest.json',
        outputDir: path.join(rootDir, '.ice'),
      }),
      analyzer && new BundleAnalyzerPlugin(),
      tsCheckerOptions && new ForkTsCheckerPlugin(tsCheckerOptions),
      eslintOptions && new ESlintPlugin(eslintOptions),
    ].filter(Boolean) as unknown as WebpackPluginInstance[],
    devServer: {
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
    },
  };

  if (dev) {
    if (!webpackConfig.optimization) {
      webpackConfig.optimization = {};
    }
    // do not figure out file exports when dev
    webpackConfig.optimization.providedExports = false;
    webpackConfig.optimization.usedExports = false;
  }

  if (process.env.WEBPACK_LOGGING) {
    webpackConfig.infrastructureLogging = {
      level: 'verbose',
      debug: /FileSystemInfo/,
    };
    webpackConfig.stats = 'verbose';
  }

  // pipe webpack by built-in functions and custom functions
  const ctx = {
    ...config,
    supportedBrowsers,
    hashKey,
    webpack,
  };
  const finalWebpackConfig = [configCss, configAssets, ...(configureWebpack || [])].reduce((result, next) => {
    return next(result, ctx);
  }, webpackConfig);
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

function getSupportedBrowsers(
  dir: string,
  isDevelopment: boolean,
): string[] | undefined {
  let browsers: any;
  try {
    browsers = browserslist.loadConfig({
      path: dir,
      env: isDevelopment ? 'development' : 'production',
    });
  } catch {
    consola.debug('[browsers]', 'fail to load config of browsers');
  }

  return browsers;
}

export {
  getWebpackConfig,
  getTransformPlugins,
};
