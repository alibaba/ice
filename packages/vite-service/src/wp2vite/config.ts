import * as path from 'path';
import * as fs from 'fs';
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

const mapWithBrowserField = (packageName: string, resolvePath: string): Record<string, string> => {
  const aliasMap = {};
  // check field `package.exports`, make sure `${packageName}/package.json` can be resolved
  try {
    const packagePath = require.resolve(`${resolvePath}/package.json`);
    const data = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    if (isObject(data.browser)) {
      Object.keys(data.browser).forEach((requirePath) => {
        const pathExtname = path.extname(requirePath);
        const aliasKey = path.join(packageName, pathExtname ? requirePath.replace(pathExtname, '') : requirePath);
        aliasMap[aliasKey] = path.join(resolvePath, data.browser[requirePath]);
      });
    }
  } catch (err) {
    console.error(`[Error] fail to resolve alias {${packageName}: ${resolvePath}}`, err);
  }
  return aliasMap;
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
      // webpack/hot is not necessary in mode vite
      const blackList = ['webpack/hot'];
      const packagesWithBrowserField = ['react-dom'];
      const framework = process.env.__FRAMEWORK_NAME__ || 'ice';
      const data: Record<string, any> = Object.keys(value).reduce(
        (acc, key) => {
          if (!blackList.some((word) => value[key]?.includes(word))) {
            // TODO: if vite ssr disable resolve path with browser field
            if (packagesWithBrowserField.includes(key)) {
              const aliasMap = mapWithBrowserField(key, value[key]);
              Object.keys(aliasMap).forEach((aliasKey) => {
                acc[aliasKey] = aliasMap[aliasKey];
              });
            }
            acc[key] = value[key];
          }
          return acc;
        },
        {}
      );

      // 删除原webpack体系下的framework alias
      // trail $ 在 vite alias下无精确匹配的能力
      delete data[`${framework}$`];
      delete data[framework];

      // built-in alias for ～antd and ～@alifd/next which commonly unused in style files
      ['antd', '@alifd/next'].forEach((pkg) => {
        data[`~${pkg}`] = pkg;
      });

      // Object to Array
      const result: {find: string | RegExp, replacement: string}[] = Object.entries(data).map(([find, replacement]) => {
        return { find, replacement };
      });
      // alias 到指向 framework runtime 入口
      result.push({
        find: new RegExp(`^${framework}$`),
        replacement: path.resolve(rootDir, `.${framework}/index.ts`),
      });
      // 支持原{{framework}}/xxx 的目录能力
      result.push({
        find: new RegExp(`^${framework}/(.+)$`),
        replacement: path.resolve(rootDir, `.${framework}/pages/$1`),
      });
      return result;
    },
  },
  'resolve.extensions': {
    name: 'resolve.extensions',
    transform: (value) => ['.mjs', '.mts', ...value],
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
      // vite proxy do not support config of onProxyRes, onError, logLevel, pathRewrite
      // transform devServer.proxy to server.proxy
      let hasProxy = false;
      const proxyConfig = {};
      (value || []).forEach(({ context, enable, onProxyRes, onError, pathRewrite, ...rest }) => {
        if (enable !== false) {
          if (!hasProxy) {
            hasProxy = true;
            console.log('Proxy setting detected. HTTPS will be downgraded to TLS only (HTTP/2 will be disabled)');
          }

          proxyConfig[context] = {
            ...rest,
            rewrite: (requestPath: string) => {
              if (pathRewrite && isObject(pathRewrite)) {
                return Object.keys(pathRewrite).reduce((acc, rewriteRule) => {
                  return acc.replace(new RegExp(rewriteRule), pathRewrite[rewriteRule]);
                }, requestPath);
              } else {
                return requestPath;
              }
            },
            configure: (proxy, options) => {
              if (rest.configure) {
                rest.configure(proxy, options);
              }
              if (onProxyRes) {
                proxy.on('proxyRes', onProxyRes);
              }
              if (onError) {
                proxy.on('error', onError);
              }
            },
          };
        }
      });
      return hasProxy ? proxyConfig : undefined;
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
          .filter((pluginKey) => !!postcssPlugins[pluginKey])
          // eslint-disable-next-line global-require,import/no-dynamic-require
          .map(pluginKey => require(pluginKey)(postcssPlugins[pluginKey]));
        return {
          ...(userConfig?.postcssOptions as PostcssOptions),
          plugins: normalizedPlugins.length > 0 ? normalizedPlugins : [],
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
