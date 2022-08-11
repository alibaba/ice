import react from '@vitejs/plugin-react';
import analyzer from 'rollup-plugin-visualizer';
import * as path from 'path';
import { all } from 'deepmerge';
import { isObject } from 'lodash';
import tsChecker from 'vite-plugin-ts-types';
import { Context, ITaskConfig } from 'build-scripts';
import type { TransformOptions } from '@babel/core';
import eslintReport from 'vite-plugin-eslint-report';
import { normalizePath } from 'vite';
import type { InlineConfig, BuildOptions, PluginOption } from 'vite';
import { recordMap } from './config';
import {
  externalsPlugin,
  importPlugin,
  polyfillPlugin,
  serverHistoryPlugin,
  htmlPlugin,
  ignoreHtmlPlugin,
  mockPlugin,
  ImportDeclarations,
  cssChunk,
} from '../plugins';

import type { ChunkName } from '../plugins';

type Option = BuildOptions & InlineConfig;

const getAnalyzer = (config: ITaskConfig['chainConfig']) => {
  if (!config.plugins.get('webpack-bundle-analyzer')) return;

  return analyzer({ open: true, brotliSize: true, filename: 'ice-stats.html' });
};

const getWebpackChain = (context: Context) => {
  const configArr = context.getWebpackConfig() || [];
  return configArr.find(({name}) => name === 'web')?.chainConfig;
};

// simple array merge for config merge
const arrayMerge = (destinationArray: any[], sourceArray: any[]) => {
  return [...(destinationArray || []), ...(sourceArray || [])];
};

const isBuild = (command: string) => command === 'build';

const getHtmlPlugin = (context: Context) => {
  const { getValue, userConfig, rootDir, command } = context;
  const config = getWebpackChain(context);
  type Opt = {
    template: string
    filename: string
    inject?: boolean
    templateParameters?: Record<string, string>
    favicon?: string
    minify?: boolean
    excludeChunks?: string[]
  }

  let templateParameters = {};

  const isMpa = userConfig.mpa as boolean;
  const ssr = userConfig.ssr as boolean;

  if (!isMpa) {
    templateParameters = config.plugins.get('HtmlWebpackPlugin')
      ? config.plugin('HtmlWebpackPlugin').get('args')[0]?.templateParameters : {};

    return htmlPlugin({
      entry: userConfig.entry as string,    // webpack entry
      template: path.resolve(rootDir, 'public', 'index.html'),
      filename: 'index.html',
      templateParameters,
      rootDir,
      ssr,
      command,
    });
  }

  const pages = {
    index: {
      template: path.resolve(rootDir, 'public', 'index.html'),
      filename: 'index.html',
    },
    ...getValue('MPA_PAGES'),
  } as Record<string, Opt>;
  const entries = userConfig.entry as Record<string, string[]>;
  const pluginKey = `HtmlWebpackPlugin_${Object.keys(entries)[0]}`;
  templateParameters = config.plugins.get(pluginKey)
    ? config.plugin(pluginKey).get('args')[0]?.templateParameters : {};

  const mpaHtmlPlugins = Object.keys(entries).map(entryName => {
    const singlePage = pages[entryName] ?? pages.index;

    return htmlPlugin({
      ...singlePage,
      templateParameters,
      entry: entries[entryName][0],    // webpack entry
      rootDir,
      ssr,
      command,
    });
  });

  return mpaHtmlPlugins;
};

type BabelPreset = [string, Record<string, any>];

const getPluginReact = (context: Context): PluginOption[] => {
  const { userConfig, originalUserConfig, command  } = context;
  const fastRefresh = userConfig.fastRefresh && command === 'start';
  const jsxRuntimeConfig = userConfig.babelPresets
    && (userConfig.babelPresets as BabelPreset[])
      .find(([pluginName, pluginOptions]) => pluginName.includes('@babel/preset-react') && pluginOptions?.runtime === 'automatic');
  const babelPlugins = userConfig.babelPlugins as TransformOptions['plugins'];
  if (fastRefresh || babelPlugins.length > 0 || jsxRuntimeConfig || originalUserConfig.babelPresets) {
    // get exclude rule for babel-loader
    return react({
      // exclude rule for fast refresh
      exclude: [/node_modules/, /[\\/]\.ice[\\/]/],
      fastRefresh,
      jsxRuntime: jsxRuntimeConfig ? 'automatic' : 'classic',
      parserPlugins: ['decorators-legacy'],
      babel: {
        plugins: babelPlugins,
        // 仅用户配置的 babelPresets 生效
        // 通过插件修改后的配置如 ['@babel/preset-react', { runtime: 'automatic' }]，通过 jsxRuntime 配置生效
        presets: originalUserConfig.babelPresets as TransformOptions['presets'],
      }
    });
  }
  return [];
};

const getRedirectImport = (context: Context) => {
  const importDeclarations = context.getValue('importDeclarations') || {};
  // formate importDeclarations
  const redirects = Object.keys(importDeclarations).map((name) => ({
    name,
    ...importDeclarations[name]
  })) as ImportDeclarations[];
  return redirects;
};

/**
 * Exposed
 */
export const wp2vite = (context: Context): InlineConfig => {
  const { commandArgs = {}, userConfig, originalUserConfig, rootDir, command } = context;
  const config = getWebpackChain(context);

  let viteConfig: Partial<Record<keyof Option, any>> = {
    configFile: false,
    root: rootDir,
    esbuild: {
      // Fix https://github.com/alibaba/ice/issues/5401
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    // ice 开发调试时保证 cjs 依赖转为 esm 文件
    plugins: [
      !commandArgs?.disableMock && userConfig.mock && mockPlugin((userConfig.mock as { exclude?: string[]})?.exclude),
      getAnalyzer(config),
      // TODO: User Config Type Completion
      externalsPlugin(userConfig.externals as any),
      // import xx from 'ice' 的重定向逻辑
      importPlugin({ source: 'ice', redirectImports: getRedirectImport(context) }),
      // spa 与 mpa 中对 html 的处理
      serverHistoryPlugin(config.devServer.get('historyApiFallback')),
      getHtmlPlugin(context),
      userConfig.tsChecker && tsChecker(),
      polyfillPlugin({
        value: originalUserConfig.polyfill as any,
        browserslist: userConfig.browserslist as any,
        hash: userConfig.hash as boolean,
        outputAssetsPath: userConfig.outputAssetsPath as any,
        rootDir,
      }),
      userConfig.ignoreHtmlTemplate ? ignoreHtmlPlugin(rootDir) : null,
      ...getPluginReact(context),
      userConfig.cssChunkNames && cssChunk(userConfig.cssChunkNames as ChunkName),
    ].filter(Boolean),
  };
  if (userConfig.eslint !== false) {
    let eslintOptions = { ignoreInitial: false };
    if (userConfig.eslint === true) {
      // lint only changed files, skip lint on start
      eslintOptions.ignoreInitial = true;
    } else {
      eslintOptions = {
        ...eslintOptions,
        ...(userConfig.eslint as Object),
      };
    }
    viteConfig.plugins.push(eslintReport(eslintOptions));
  }

  if (isObject(userConfig.vite)) {
    // 保证 userConfig.vite 优先级最高
    viteConfig = all([
      recordMap(config, context),
      viteConfig,
      userConfig.vite
    ], { arrayMerge });
  }

  const devServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
  };

  const entryExts = /(\.ts|\.tsx|\.js|\.jsx)$/i;

  // 依赖预构建解析入口
  const getAnalysisEntries = () => {
    let appEntry = userConfig.entry;
    if (!userConfig.mpa) {
      if (Array.isArray(appEntry)) {
        appEntry = {
          index: appEntry,
        };
      } else if (typeof appEntry === 'string') {
        appEntry = {
          index: [appEntry],
        };
      }
    }
    const entries = Object.keys(appEntry).map(e => {
      const url = appEntry[e][0];
      // js entries is needed when analyze dependencies in pre build parse
      // format path in case of win32 system
      return normalizePath(entryExts.exec(url) ? url : `${url}.*`);
    });

    return entries;
  };

  if (!isBuild(command)) {
    return all([
      {
        mode: 'development',
        optimizeDeps: {
          entries: getAnalysisEntries(),
          // vite 无法分析 link 的依赖，需要手动加入以下依赖，防止 ice 维护时报错
          include: ['react-app-renderer', 'create-app-shared'],
        },
        server: devServerConfig,
      },
      viteConfig,
    ], { arrayMerge });
  } else {
    return all([{
      build: {
        commonjsOptions: {
          exclude: ['react-app-renderer', 'create-app-shared'],
        },
        rollupOptions: {
          // by default, the context of a module is set to be undefined,
          // vite config the top-level this refer to globalThis, see https://github.com/vitejs/vite/pull/5312
          // modify to globalThis when SSR
          context: undefined,
        },
      },
    }, viteConfig], { arrayMerge });
  }
};
