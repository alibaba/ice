import * as path from 'path';
import * as fs from 'fs';
import * as friendlyTypeImports from 'rollup-plugin-friendly-type-imports';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { all } from 'deepmerge';
import { isObject, isArray, set, get } from 'lodash';
import { Context, ITaskConfig } from 'build-scripts';
import { InlineConfig, BuildOptions } from 'vite';
import { indexHtmlPlugin, externalsPlugin, importPlugin, polyfillPlugin } from './plugins';

type Option = BuildOptions & InlineConfig;

type Result = {
  devConfig: InlineConfig;
  prodConfig: BuildOptions;
};

type Transformer = (
  value: any,
  ctx?: Context,
  chain?: ITaskConfig['chainConfig']
) => any;

type ConfigMap = Record<string, string | string[] | {
  name: string | string[]
  transform: Transformer
}>

/**
 * 设置 vite 字段的值
 */
const setViteConfig = (acc: object, value: any, viteRow: string | string[], isTransform = false) => {
  if (value === undefined) return;

  const config = isArray(viteRow) ? viteRow : [viteRow];
  config.forEach((cfg, index) => {
    set(acc, cfg, isTransform && isArray(viteRow) ? value[index] : value);
  });
};

const transformPlugin = (pluginName: string): Transformer => {
  return (...args) => {
    if (!args[2] || !args[2].plugins.has(pluginName)) return;

    const opts = args[2].plugin(pluginName).get('args') ?? [];
    return opts[0];
  };
};

const transformPreProcess = (loaderName: string, rule: string): Transformer => {
  return (...args) => {
    const opt = args[2].module.rules.get(rule).use(loaderName).get('options');
    return opt;
  };
};

/**
 * 常用简单配置转换
 */
const configMap: ConfigMap = {
  'output.path': {
    name: 'build.outDir',
    transform: (value, ctx) => path.relative(ctx.rootDir, value),
  },
  'output.publicPath': 'base',
  'resolve.alias': {
    name: 'resolve.alias',
    transform: (value, ctx) => {
      const { rootDir } = ctx;
      const blackList = ['webpack/hot', 'node_modules'];
      const data: Record<string, any> = Object.keys(value).reduce(
        (acc, key) => {
          if (!blackList.some((word) => value[key]?.includes(word)))
            acc[key] = value[key];
          return acc;
        },
        {}
      );

      // alias 到指向 ice runtime 入口
      data.ice = path.resolve(rootDir, '.ice/index.ts');

      return data;
    },
  },
  'resolve.extensions': {
    name: 'resolve.extensions',
    transform: (value) => ['.mjs', ...value],
  },
  // minify
  'optimization.minimize': {
    name: 'build.minify',
    transform: (value) => {
      // TODO: Warning
      return value && 'terser';
    },
  },
  'config.devtool': 'build.sourcemap',
  'devServer.watchOptions.static.watch': 'server.watch',
  'devServer.proxy': 'server.proxy',
  'plugins.DefinePlugin': {
    name: 'defined',
    transform: transformPlugin('DefinePlugin'),
  },
  'plugins.TerserPlugin': {
    name: 'build.terserOptions',
    transform: transformPlugin('TerserPlugin'),
  },
  sass: {
    name: 'css.preprocessorOptions.scss',
    transform: transformPreProcess('sass-loader', 'scss'),
  },
  less: {
    name: 'css.preprocessorOptions.less',
    transform: transformPreProcess('less-loader', 'less'),
  },
  // 保证在 link 开发调试时引入的 react 是一个实例
  dedupe: {
    name: 'resolve.dedupe',
    transform: () => ['react', 'react-dom'],
  },
  postcss: {
    name: 'css.postcss',
    transform: (e, { userConfig }) => {
      return userConfig.postcssOptions;
    }
  },
  // hash & outputAssetsPath (OAP)
  hashAndOAP: {
    name: [
      'build.rollupOptions.output.entryFileNames',
      'build.rollupOptions.output.chunkFileNames',
      'build.rollupOptions.output.assetFileNames',
    ],
    transform: (e, { userConfig }) => {
      const data = userConfig.outputAssetsPath as Record<string, string>;
      const hash = userConfig.hash === true ? 'hash' : userConfig.hash;
      const hashStr = hash ? `.[${hash}]` : '';

      const { js, css } = data;

      const assetFileNames = (assetInfo: { name: string }) => {
        if (path.extname(assetInfo.name) === '.css') {
          return `${css}/[name]${hashStr}[extname]`;
        }
        return `[name]${hashStr}[extname]`;
      };

      return [
        `${js}/[name]${hashStr}.js`,
        `${js}/[name]${hashStr}.js`,
        assetFileNames,
      ];
    }
  },
};

/**
 * 配置转化函数
 */
const recordMap = (
  chain: ITaskConfig['chainConfig'],
  ctx: Context
): Partial<Record<keyof Option, any>> => {
  const cfg = chain.toConfig();
  return Object.keys(configMap).reduce((acc, key) => {
    const viteConfig = configMap[key];
    const webpackValue = get(cfg, key);

    // 如果后面接的是对象
    if (isObject(viteConfig) && !isArray(viteConfig)) {
      const value = viteConfig.transform(webpackValue, ctx, chain);
      setViteConfig(acc, value, viteConfig.name, true);
      return acc;
    }

    setViteConfig(acc, webpackValue, viteConfig);
    return acc;
  }, {});
};

export const wp2vite = (context: Context): Result => {
  const { commandArgs = {}, userConfig, rootDir } = context;
  const configArr = context.getWebpackConfig();
  const config = configArr[0];

  let viteConfig: Partial<Record<keyof Option, any>> = {
    configFile: false,
    // ice 开发调试时保证 cjs 依赖转为 esm 文件
    optimizeDeps: {
      include: ['react-app-renderer', 'create-app-shared'],
    },
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

  console.log(viteConfig);

  const devServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
    open: true,
  };

  const devConfig = all([
    {
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
