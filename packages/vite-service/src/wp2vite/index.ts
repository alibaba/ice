import reactRefresh from '@vitejs/plugin-react-refresh';
import analyzer from 'rollup-plugin-visualizer';
import * as path from 'path';
import { all } from 'deepmerge';
import { isObject } from 'lodash';
import { Context, ITaskConfig } from 'build-scripts';
import { InlineConfig, BuildOptions } from 'vite';
import { recordMap } from './config';
import {
  externalsPlugin,
  importPlugin,
  polyfillPlugin,
  serverHistoryPlugin,
  htmlPlugin,
} from '../plugins';

type Option = BuildOptions & InlineConfig;

const getAnalyzer = (config: ITaskConfig['chainConfig']) => {
  if (!config.plugins.get('webpack-bundle-analyzer')) return;

  return analyzer({ open: true, brotliSize: true, filename: 'ice-stats.html' });
};

const getWebpackConfig = (context: Context) => {
  const configArr = context.getWebpackConfig();
  return configArr[0];
};

const getHtmlPlugin = (context: Context) => {
  const { getValue, userConfig, rootDir } = context;
  type Opt = {
    inject: boolean
    templateParameters: Record<string, string>
    favicon: string
    template: string
    minify: boolean
    filename: string
    excludeChunks: string[]
  }

  const isMpa = userConfig.mpa as boolean;

  if (!isMpa) {
    return htmlPlugin({
      entry: userConfig.entry as string,    // webpack entry
      template: path.resolve(rootDir, 'public', 'index.html'),
      filename: 'index.html',
      rootDir
    });
  }

  const pages = getValue('MPA_PAGES') as Record<string, Opt>;
  const rewrites = getValue('MPA_REWRITES') as any;
  const entries = userConfig.entry as Record<string, string[]>;

  const mpaHtmlPlugins = Object.keys(pages).map(pageName => {
    const singlePage = pages[pageName];

    return htmlPlugin({
      ...singlePage,
      entry: entries[pageName][0],    // webpack entry
      rootDir
    });
  });

  const serverPlugin = serverHistoryPlugin({ rewrites });

  return [...mpaHtmlPlugins, serverPlugin];
};

/**
 * Exposed
 */
export const wp2vite = (context: Context): InlineConfig => {
  const { commandArgs = {}, userConfig, rootDir, command } = context;
  const config = getWebpackConfig(context);

  let viteConfig: Partial<Record<keyof Option, any>> = {
    configFile: false,
    // ice 开发调试时保证 cjs 依赖转为 esm 文件
    plugins: [
      serverHistoryPlugin(config.chainConfig.devServer.get('historyApiFallback')),
      getAnalyzer(config.chainConfig),
      // TODO: User Config Type Completion
      externalsPlugin(userConfig.externals as any),
      importPlugin({ rootDir }),
      // spa 与 mpa 中对 html 的处理
      getHtmlPlugin(context),
      polyfillPlugin({
        value: userConfig.polyfill as any,
        browserslist: userConfig.browserslist as any,
        hash: userConfig.hash as boolean,
        outputAssetsPath: userConfig.outputAssetsPath as any,
        rootDir,
      })
    ],
  };

  if (isObject(userConfig.vite)) {
    // 保证 userConfig.vite 优先级最高
    viteConfig = all([
      recordMap(config.chainConfig, context),
      viteConfig,
      userConfig.vite
    ]);
  }

  const devServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
    open: true,
  };

  const entryExts = /(\.ts|\.tsx|\.js|\.jsx)$/i;

  // 依赖预构建解析入口
  const opdEntries = () => {
    let _entry = userConfig.entry;
    if (!userConfig.mpa) {
      _entry = { index: [_entry] };
    }

    const entries = Object.keys(_entry).map(e => {
      const url = _entry[e][0];
      return entryExts.exec(url) ? url : `${url}.*`;
    });

    return entries;
  };

  if (command === 'start') {
    return all([
      {
        optimizeDeps: {
          entries: opdEntries(),
          // vite 无法分析 link 的依赖，需要手动加入以下依赖，防止 ice 维护时报错
          include: ['react-app-renderer', 'create-app-shared'],
        },
        server: devServerConfig,
        define: {
          'process.env': {},
          global: {
            __app_mode__: 'start',
          },
        },
        plugins: [
          reactRefresh({
            // Exclude node_modules and ice runtime
            exclude: [/node_modules/, /\.ice/],
          })
        ],
      },
      viteConfig,
    ]);
  } else {
    return all([{
      build: {
        commonjsOptions: {
          exclude: ['react-app-renderer', 'create-app-shared'],
        },
      },
      define: {
        __app_mode__: 'build'
      }
    }, viteConfig]);
  }
};
