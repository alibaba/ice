import * as path from 'path';
import { isObject, isArray, set, get } from 'lodash';
import { Context, ITaskConfig } from 'build-scripts';
import { InlineConfig, BuildOptions } from 'vite';
import type { ProcessOptions } from 'postcss';

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

interface MinifierConfig {
  type: 'esbuild' | 'swc' | 'terser';
  options?: Record<string, any>;
}

interface PostcssOptions extends ProcessOptions {
  plugins?: { [pluginName: string]: Record<string, any> };
}

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
  return (...[,,webpackChain]) => {
    if (!webpackChain || !webpackChain.plugins.has(pluginName)) return;

    const opts = webpackChain.plugin(pluginName).get('args') ?? [];
    return opts[0];
  };
};

const transformMinimizer = (minimizerName: string): Transformer => {
  return (...[,,webpackChain]) => {
    // @ts-ignore
    if (!webpackChain || !webpackChain.optimization.minimizers.has(minimizerName)) return;

    const opts = webpackChain.optimization.minimizer(minimizerName).get('args') ?? [];
    return opts[0];
  };
};

const transformPreProcess = (loaderName: string, rule: string): Transformer => {
  // filter options for sassOptions and lessOptions
  const optionsMap = {
    scss: 'sassOptions',
    less: 'lessOptions',
  };
  // additionalData is special option for pre processor
  // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/css.ts#L1035
  const pickOptions = ['additionalData'];
  const optionsKey: string = optionsMap[rule];

  return (...args) => {
    const opt = args[2].module.rules.get(rule).use(loaderName).get('options');
    const preProcessOptions = (optionsKey ? opt?.[optionsKey] : opt) || {};
    pickOptions.forEach(pickKey => {
      if (opt?.[pickKey]) {
        preProcessOptions[pickKey] = opt[pickKey];
      }
    });
    return preProcessOptions;
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

      // built-in alias for ～antd and ～@alifd/next which commonly unused in style files
      ['antd', '@alifd/next'].forEach((pkg) => {
        data[`~${pkg}`] = pkg;
      });

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
    transform: (value, { userConfig }) => {
      if (value) {
        const { minify } = userConfig;
        if (minify) {
          const minifier = (minify as unknown as MinifierConfig).type
            || (typeof minify === 'boolean' ? 'terser' : minify) as string;
          if (['esbuild', 'terser'].includes(minifier)) {
            return minifier;
          } else {
            console.log(`minify '${minifier}' is not supported in vite mode, specify 'terser' as minifier`);
          }
        }
      } else {
        return false;
      }
    },
  },
  'devtool': {
    name: 'build.sourcemap',
    transform: (devtool) => {
      // build.sourcemap of support inline | hidden
      if (devtool) {
        const sourcemap = ['inline', 'hidden'].find((mapType) => {
          return !!devtool.match(new RegExp(mapType));
        });
        return sourcemap || !!devtool;
      }
      return false;
    },
  },
  'devServer.watchOptions.static.watch': 'server.watch',
  'devServer.proxy': {
    name: 'server.proxy',
    transform: (value: Record<string, any>[]) => {
      // vite proxy do not support config of onProxyRes, onError, logLevel
      // transform devServer.proxy to server.proxy
      const proxyConfig = {};
      (value || []).forEach(({ context, enable, onProxyRes, onError, ...rest }) => {
        if (enable !== false) {
          proxyConfig[context] = {
            ...rest,
            configure: (proxy, options) => {
              if (rest.configure) {
                rest.configure(proxy, options);
              }
              proxy.on('proxyRes', onProxyRes);
              proxy.on('error', onError);
            },
          };
        }
      });
      return proxyConfig;
    },
  },
  'devServer.https': 'server.https',
  'plugins.DefinePlugin': {
    name: 'define',
    transform: transformPlugin('DefinePlugin'),
  },
  'plugins.TerserPlugin': {
    name: 'build.terserOptions',
    transform: (...args) => {
      const terserPluginOptions = transformMinimizer('TerserPlugin')(...args);
      return terserPluginOptions?.terserOptions;
    },
  },
  'plugin.ESBuild': {
    name: 'build.target',
    transform: (...args) => {
      // build.target is performed with esbuild and the value should be a valid esbuild target option
      const esbuildMinifyOptions = transformMinimizer('ESBuild')(...args);
      return esbuildMinifyOptions?.target;
    },
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
      if (userConfig?.postcssOptions) {
        const postcssPlugins = (userConfig?.postcssOptions as PostcssOptions)?.plugins || {};
        const normalizedPlugins = Object.keys(postcssPlugins)
          .filter((pluginKey) => !postcssPlugins[pluginKey])
          .map(pluginKey => [pluginKey, postcssPlugins[pluginKey]]);
        return {
          ...(userConfig?.postcssOptions as PostcssOptions),
          plugins: normalizedPlugins.length > 1 ? normalizedPlugins : [],
        };
      }
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