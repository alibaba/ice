import * as path from 'path';
import { createRequire } from 'module';
import { compilationPlugin, compileExcludes } from '@ice/webpack-config';
import type { Configuration } from '@rspack/core';
import { getRouteExportConfig } from '../../service/config.js';
import { RUNTIME_TMP_DIR, IMPORT_META_TARGET, IMPORT_META_RENDERER } from '../../constant.js';
import { getReCompilePlugin, getServerPlugin, getSpinnerPlugin } from '../config/plugins.js';
import { getExpandedEnvs } from '../../utils/runtimeEnv.js';
import type { BundlerOptions, Context } from '../types.js';
import AssetManifest from './plugins/AssetManifest.js';
import getSplitChunks from './splitChunks.js';
import getDefine from './getDefine.js';
import getAssetsRule from './assetsRule.js';
import getCssRules from './cssRules.js';

type GetConfig = (
  context: Context,
  options: BundlerOptions
) => Promise<Configuration[]>;

const require = createRequire(import.meta.url);

const getConfig: GetConfig = async (context, options) => {
  const {
    taskConfigs,
    spinner,
    routeManifest,
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

  return taskConfigs.map((taskConfig) => {
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
      splitChunks,
      target,
      enableRpx2Vw = true,
      postcss,
      proxy,
      devServer = {},
    } = taskConfig?.config || {};
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

    const { reCompile, ensureRoutesConfig } = getRouteExportConfig(rootDir);
    const cssFilename = `css/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`;
    const config: Configuration = {
      entry: {
        main: [path.join(rootDir, RUNTIME_TMP_DIR, 'entry.client.tsx')],
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
              loader: require.resolve('@ice/webpack-config/compilation-loader'),
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
      plugins: [
        new AssetManifest({
          fileName: 'assets-manifest.json',
        }),
        // Add spinner for webpack task.
        getSpinnerPlugin(spinner),
        // Add Server runner plugin.
        getServerPlugin({
          serverRunner,
          ensureRoutesConfig,
          serverCompiler,
          target,
          rootDir,
          serverEntry: server?.entry,
          outputDir,
          serverCompileTask,
          userConfig,
        }),
        // Add ReCompile plugin when routes config changed.
        getReCompilePlugin(reCompile, routeManifest),
      ].filter(Boolean),
      builtins: {
        define: getDefine(define, {
          [IMPORT_META_TARGET]: JSON.stringify(target),
          [IMPORT_META_RENDERER]: JSON.stringify('client'),
        }, getExpandedEnvs),
        provide: {
          process: [require.resolve('process/browser')],
          $ReactRefreshRuntime$: [require.resolve('./client/reactRefresh.cjs')],
        },
        devFriendlySplitChunks: true,
        css: {
          modules: {
            localIdentName: '[local]_[hash:8]',
          },
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
      },
    };
    return config;
  });
};


export default getConfig;
