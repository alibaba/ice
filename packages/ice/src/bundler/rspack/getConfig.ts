import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { compilationPlugin, compileExcludes } from '@ice/webpack-config';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import type { Configuration, Compiler } from '@rspack/core';
import { getRouteExportConfig } from '../../service/config.js';
import ServerRunnerPlugin from '../../webpack/ServerRunnerPlugin.js';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
import getServerCompilerPlugin from '../../utils/getServerCompilerPlugin.js';
import type { ExtendsPluginAPI } from '../../types/plugin.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, RUNTIME_TMP_DIR, WEB } from '../../constant.js';
import type { BundlerOptions } from '../types.js';
import AssetManifest from './plugins/AssetManifest.js';

type GetConfig = (
  context: Context<Config, ExtendsPluginAPI>,
  options: BundlerOptions
) => Promise<Configuration[]>;

const require = createRequire(import.meta.url);

const getConfig: GetConfig = async (context, options) => {
  const {
    taskConfigs,
    spinner,
    hooksAPI: {
      serverRunner,
      serverCompiler,
    },
  } = options;
  const {
    rootDir,
    userConfig,
    extendsPluginAPI: {
      serverCompileTask,
      getRoutesFile,
    },
  } = context;

  // TODO: consider multiple tasks.
  const {
    mode,
    publicPath = '/',
    cacheDir,
    outputDir,
    sourceMap,
    externals = {},
    alias = {},
    compileIncludes,
    polyfill,
    swcOptions,
    hash,
    define = {},
    server,
  } = taskConfigs[0]?.config || {};
  const absoluteOutputDir = path.isAbsolute(outputDir) ? outputDir : path.join(rootDir, outputDir);
  // const dev = mode !== 'production';
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

  const { reCompile, ensureRoutesConfig } = getRouteExportConfig(rootDir);

  const config: Configuration = {
    entry: {
      main: [path.join(rootDir, RUNTIME_TMP_DIR, 'entry.client.tsx')],
    },
    name: 'web',
    mode: 'development',
    externals,
    output: {
      clean: true,
      publicPath,
      path: absoluteOutputDir,
      filename: `js/${hashKey ? `[name]-[${hashKey}].js` : '[name].js'}`,
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
    },
    context: rootDir,
    module: {
      rules: [
        // Compliation rules for js / ts.
        {
          test: compilation.transformInclude,
          use: [{
            loader: require.resolve('@ice/webpack-config/compilation-loader'),
            options: {
              transform: compilation.transform,
            },
          }],
        },
        // TODO: Rules for assets.
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
        {
          resourceQuery: /url/,
          type: 'asset/resource',
        },
        // TODO: Rules for css.
        {
          test: /\.css$/,
          use: [
            {
              loader: require.resolve('@ice/bundles/compiled/postcss-loader'),
              options: {
                postcssOptions: {
                  // TODO: postcss options.
                },
              },
            },
          ],
          type: 'css',
        },
      ],
    },
    resolve: {
      alias,
      // TODO: conditionNames.
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 100,
    },
    optimization: {
      // TODO: config optimization.
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          framework: {
            name: 'framework',
            test: /react|react-dom/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /node_modules[/\\]/,
            name: false,
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
        maxInitialRequests: 25,
        minSize: 20000,
      },
    },
    // TODO: config devtools.
    // devtool: dev ? 'cheap-module-source-map' : false,
    plugins: [
      // TODO: assets manifest plugin.
      new AssetManifest({
        fileName: 'assets-manifest.json',
      }),
      // Add spinner for webpack task.
      (compiler: Compiler) => {
        compiler.hooks.beforeCompile.tap('spinner', () => {
          spinner.text = 'Compiling task web...\n';
        });
        compiler.hooks.afterEmit.tap('spinner', () => {
          spinner.stop();
        });
      },
      // Add Server runner plugin.
      // TODO: some logic with webpack.
      serverRunner ? new ServerRunnerPlugin(serverRunner, ensureRoutesConfig)
        : getServerCompilerPlugin(serverCompiler, {
          rootDir,
          serverEntry: server?.entry,
          outputDir: absoluteOutputDir,
          serverCompileTask,
          userConfig,
          ensureRoutesConfig,
          runtimeDefineVars: {
            [IMPORT_META_TARGET]: JSON.stringify(WEB),
            [IMPORT_META_RENDERER]: JSON.stringify('server'),
          },
        }),
      // TODO: some logic with webpack.
      new ReCompilePlugin(reCompile, (files) => {
        console.log('xxx changed files', files);
        return false;
      }),
    ].filter(Boolean),
    builtins: {
      define: {
        ...define,
        'process.env.ICE_CORE_ROUTER': JSON.stringify('true'),
        'process.env.ICE_CORE_SSR': 'false',
        'process.env.ICE_CORE_SSG': 'false',
      },
      provide: {
        process: [require.resolve('process/browser')],
      },
    },
    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      hot: true,
    },
  };
  return [config];
};


export default getConfig;
