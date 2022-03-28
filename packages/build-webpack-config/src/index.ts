import path from 'path';
import { createRequire } from 'module';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from '@builder/pack/deps/mini-css-extract-plugin/cjs.js';
import CssMinimizerPlugin from '@builder/pack/deps/css-minimizer-webpack-plugin/cjs.js';
import safeParser from '@builder/pack/deps/postcss-safe-parser/safe-parse.js';
import TerserPlugin from '@builder/pack/deps/terser-webpack-plugin/cjs.js';
import webpack, { type Configuration } from 'webpack';
import postcss from 'postcss';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Config } from '@ice/types';
import type { CommandArgs } from 'build-scripts';
import { createUnplugin } from 'unplugin';
import { getRuntimeEnvironment } from './clientEnv.js';
import AssetsManifestPlugin from './webpackPlugins/AssetsManifestPlugin.js';
import getTransformPlugins from './unPlugins/index.js';

const require = createRequire(import.meta.url);

const watchIgnoredRegexp = ['**/.git/**', '**/node_modules/**'];

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
  commandArgs?: CommandArgs;
}
type WebpackConfig = Configuration & { devServer?: DevServerConfiguration };
type GetWebpackConfig = (options: GetWebpackConfigOptions) => WebpackConfig;
type CSSRuleConfig = [string, string?, Record<string, any>?];

const getWebpackConfig: GetWebpackConfig = ({ rootDir, config, commandArgs = {} }) => {
  const {
    mode,
    externals = {},
    publicPath = '/',
    devPublicPath = '/',
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
    alias = {},
    sourceMap,
    middlewares,
    proxy,
  } = config;

  const dev = mode !== 'production';
  const defineStaticVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
    'process.env.__IS_SERVER__': false,
  };
  const runtimeEnv = getRuntimeEnvironment();
  const defineRuntimeVariables = {};
  Object.keys(runtimeEnv).forEach((key) => {
    const runtimeValue = runtimeEnv[key];
    // set true to flag the module as uncacheable
    defineRuntimeVariables[key] = webpack.DefinePlugin.runtimeValue(runtimeValue, true);
  });

  // create plugins
  const webpackPlugins = getTransformPlugins(rootDir, config).map((plugin) => createUnplugin(() => plugin).webpack());

  const webpackConfig: WebpackConfig = {
    mode,
    entry: path.join(rootDir, '.ice/entry.client'),
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    context: rootDir,
    module: {
      rules: [
        ...([
          ['css'],
          ['less', require.resolve('@builder/pack/deps/less-loader'), ({ lessOptions: { javascriptEnabled: true } })],
          ['scss', require.resolve('@builder/pack/deps/sass-loader')],
        ] as CSSRuleConfig[]).map((config) => configCSSRule(config)).flat(),
        {
          test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'assets/[hash].[ext]',
              },
            },
          ],
        },
        ...loaders,
      ],
    },
    resolve: {
      alias: {
        ...alias,
      },
      extensions: ['.ts', '.tsx', '.jsx', '...'],
      fallback: {
        // TODO: add more fallback module
        events: require.resolve('events'),
      },
    },
    watchOptions: {
      ignored: watchIgnoredRegexp,
    },
    optimization: {
      minimizer: [
        '...',
        new TerserPlugin({
          minify: TerserPlugin.esbuildMinify,
          parallel: true,
          extractComments: false,
          terserOptions: {
            compress: {
              unused: false,
            },
            output: {
              ascii_only: true,
              comments: 'some',
              beautify: false,
            },
            mangle: true,
          },
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
            processorOptions: {
              parser: safeParser,
            },
          },
        }),
      ],
    },
    cache: {
      type: 'filesystem',
      version: `${process.env.__ICE_VERSION__}|${JSON.stringify(config)}`,
      buildDependencies: { config: [path.join(rootDir, 'package.json')] },
      cacheDirectory: path.join(rootDir, 'node_modules', '.cache', 'webpack'),
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
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.DefinePlugin({
        ...defineStaticVariables,
        ...defineRuntimeVariables,
      }),
      new webpack.ProvidePlugin({ process: 'process/browser' }),
      new AssetsManifestPlugin({
        fileName: 'assets-manifest.json',
        outputDir: path.join(rootDir, '.ice'),
      }),
      dev && new ReactRefreshWebpackPlugin({ esModule: true, forceEnable: true }),
    ].filter(Boolean),
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
        publicPath: devPublicPath,
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
    },
  };

  return webpackConfig;
};

function configCSSRule(config: CSSRuleConfig) {
  const [style, loader, loaderOptions] = config;
  const cssLoaderOpts = {
    sourceMap: true,
  };
  const cssModuleLoaderOpts = {
    ...cssLoaderOpts,
    modules: {
      auto: (resourcePath: string) => resourcePath.endsWith(`.module.${style}`),
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    },
  };
  const postcssOpts = {
    // lock postcss version
    implementation: postcss,
    postcssOptions: {
      config: false,
      plugins: [
        ['@builder/pack/deps/postcss-nested'],
        ['@builder/pack/deps/postcss-preset-env', {
          // Without any configuration options, PostCSS Preset Env enables Stage 2 features.
          stage: 3,
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4',
          ],
        }],
      ],
    },
  };
  return {
    test: new RegExp(`\\.${style}$`),
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        // compatible with commonjs syntax: const styles = require('./index.module.less')
        options: { esModule: false },
      },
      {
        loader: require.resolve('@builder/pack/deps/css-loader'),
        options: cssModuleLoaderOpts,
      },
      {
        loader: require.resolve('@builder/pack/deps/postcss-loader'),
        options: {
          ...cssLoaderOpts,
          ...postcssOpts,
        },
      },
      loader && {
        loader,
        options: { ...cssLoaderOpts, ...loaderOptions },
      },
    ].filter(Boolean),
  };
}

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
  getTransformPlugins,
};
