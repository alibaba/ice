import * as path from 'path';
import { isObject, isArray, set, get } from 'lodash';
import { Context, ITaskConfig } from 'build-scripts';
import { InlineConfig, BuildOptions } from 'vite';

type Option = BuildOptions & InlineConfig;

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

      // Object to Array
      return Object.entries(data).map(([find, replacement]) => {
        return { find, replacement };
      });
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
  'devServer.https': 'server.https',
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
  vendor: {
    name: 'build.rollupOptions.output.manualChunks',
    transform: (e, { userConfig }) => {
      if (!userConfig.vendor) {
        return false;
      }
      // Tips: userConfig.vendor === true 时不会去设置 manualChunks，正常导出 vendor
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
      const data = userConfig.outputAssetsPath as { css: string; js: string };
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
export const recordMap = (
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