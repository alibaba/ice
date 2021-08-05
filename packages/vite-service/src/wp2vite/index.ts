import * as fs from 'fs';
import * as friendlyTypeImports from 'rollup-plugin-friendly-type-imports';
import reactRefresh from '@vitejs/plugin-react-refresh';
import analyzer from 'rollup-plugin-visualizer';
import { all } from 'deepmerge';
import { isObject } from 'lodash';
import { Context, ITaskConfig } from 'build-scripts';
import { InlineConfig, BuildOptions } from 'vite';
import { recordMap } from './config';
import { indexHtmlPlugin, externalsPlugin, importPlugin, polyfillPlugin } from './plugins';

type Option = BuildOptions & InlineConfig;

type Result = {
  devConfig: InlineConfig;
  prodConfig: BuildOptions;
};

const getAnalyzer = (config: ITaskConfig['chainConfig']) => {
  if (!config.plugins.get('webpack-bundle-analyzer')) return;

  return analyzer({ open: true, brotliSize: true, filename: 'ice-stats.html' });
};

export const wp2vite = (context: Context): Result => {
  const { commandArgs = {}, userConfig, rootDir } = context;
  const configArr = context.getWebpackConfig();
  const config = configArr[0];

  let viteConfig: Partial<Record<keyof Option, any>> = {
    configFile: false,
    // ice 开发调试时保证 cjs 依赖转为 esm 文件
    plugins: [
      // 避免 import re-exported types 时 crash 并提示 "does not provide an export named XXX"
      friendlyTypeImports({
        readFile: async (id) => {
          // 只对 .ts 与 .tsx 后缀进行导出转换
          if (!['.ts', '.tsx'].some((i) => id.endsWith(i))) return null;

          try {
            return await fs.promises.readFile(id, 'utf8');
          } catch {
            return null;
          }
        },
      }),
      getAnalyzer(config.chainConfig),
      externalsPlugin(userConfig.externals as any),
      importPlugin({ rootDir }),
      indexHtmlPlugin({
        entry: userConfig.entry,
        temp: 'public',
        ignoreHtmlTemplate: userConfig.ignoreHtmlTemplate as boolean,
        rootDir,
      }),
      polyfillPlugin({
        value: userConfig.polyfill as any,
        browserslist: userConfig.browserslist as any
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

  const devConfig = all([
    {
      optimizeDeps: {
        entries: entryExts.exec(userConfig.entry as string) ? userConfig.entry : `${userConfig.entry}.*`,
        include: ['react-app-renderer', 'create-app-shared'],
      },
      server: devServerConfig,
      define: {
        'process.env': {},
        global: {
          __app_mode__: 'start',
        },
      },
      plugins: [reactRefresh()],
    },
    viteConfig,
  ]);

  const prodConfig = all([{
    define: {
      __app_mode__: 'build'
    }
  }, viteConfig]);

  return { devConfig, prodConfig };
};
