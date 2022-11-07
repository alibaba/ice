import { createRequire } from 'module';
import swc from '@swc/core';
import type { Options as SwcConfig, ReactConfig } from '@swc/core';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '../types.js';

const { merge } = lodash;
const require = createRequire(import.meta.url);

type JSXSuffix = 'jsx' | 'tsx';

interface Options {
  mode: 'development' | 'production' | 'none';
  fastRefresh: boolean;
  compileIncludes?: (string | RegExp)[];
  sourceMap?: Config['sourceMap'];
  compileExcludes?: RegExp[];
  swcOptions?: Config['swcOptions'];
  cacheDir?: string;
  polyfill?: Config['polyfill'];
  env?: boolean;
}

const compilationPlugin = (options: Options): UnpluginOptions => {
  const {
    sourceMap,
    mode,
    fastRefresh,
    compileIncludes = [],
    compileExcludes,
    swcOptions = {},
    cacheDir,
    polyfill,
    env,
  } = options;

  const { removeExportExprs, compilationConfig, keepPlatform, keepExports, getRoutePaths } = swcOptions;

  const compileRegex = compileIncludes.map((includeRule) => {
    return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
  });

  function isRouteEntry(id) {
    const routes = getRoutePaths();

    const matched = routes.find(route => {
      return id.indexOf(route) > -1;
    });

    return !!matched;
  }

  function isAppEntry(id) {
    return /(.*)src\/app/.test(id);
  }

  const extensionRegex = /\.(jsx?|tsx?|mjs)$/;
  return {
    name: 'compilation-plugin',
    transformInclude(id) {
      return extensionRegex.test(id) && !compileExcludes.some((regex) => regex.test(id));
    },
    async transform(source: string, id: string) {
      if ((/node_modules/.test(id) && !compileRegex.some((regex) => regex.test(id)))) {
        return;
      }

      const suffix = (['jsx', 'tsx'] as JSXSuffix[]).find(suffix => new RegExp(`\\.${suffix}?$`).test(id));

      const programmaticOptions: SwcConfig = {
        filename: id,
        sourceMaps: !!sourceMap,
      };

      const commonOptions = getJsxTransformOptions({ suffix, fastRefresh, polyfill, env });

      // auto detect development mode
      if (
        mode &&
        commonOptions?.jsc?.transform?.react &&
        !Object.prototype.hasOwnProperty.call(commonOptions.jsc.transform.react, 'development')
      ) {
        commonOptions.jsc.transform.react.development = mode === 'development';
      }

      merge(programmaticOptions, commonOptions);

      if (compilationConfig) {
        merge(programmaticOptions, compilationConfig);
      }

      const swcPlugins = [];
      // handle app.tsx and page entries only
      if (removeExportExprs) {
        if (isRouteEntry(id) || isAppEntry(id)) {
          swcPlugins.push([
            require.resolve('@ice/swc-plugin-remove-export'),
            removeExportExprs,
          ]);
        }
      }

      if (keepExports) {
        if (isRouteEntry(id)) {
          swcPlugins.push([
            require.resolve('@ice/swc-plugin-keep-export'),
            keepExports,
          ]);
        } else if (isAppEntry(id)) {
          let keepList;

          if (keepExports.indexOf('getConfig') > -1) {
            // when build for getConfig, should keep default, it equals to getAppConfig
            keepList = keepExports.concat(['default']);
          } else {
            keepList = keepExports;
          }

          swcPlugins.push([
            require.resolve('@ice/swc-plugin-keep-export'),
            keepList,
          ]);
        }
      }

      if (keepPlatform) {
        swcPlugins.push([
          require.resolve('@ice/swc-plugin-keep-platform'),
          keepPlatform,
        ]);
      }

      if (swcPlugins.length > 0) {
        merge(programmaticOptions, {
          jsc: {
            experimental: {
              cacheRoot: cacheDir,
              plugins: swcPlugins,
            },
          },
        });
      }

      try {
        const output = await swc.transform(source, programmaticOptions);

        const { code } = output;
        let { map } = output;
        return { code, map };
      } catch (error) {
        // Catch error for unhandled promise rejection.
        if (this) {
          // Handled by unplugin.
          this.error(error);
          return { code: null, map: null };
        } else {
          // Handled by webpack.
          throw error;
        }
      }
    },
  };
};

interface GetJsxTransformOptions {
  suffix: JSXSuffix;
  fastRefresh: boolean;
  polyfill: Config['polyfill'];
  env: boolean;
}

function getJsxTransformOptions({
  suffix,
  fastRefresh,
  polyfill,
  env,
}: GetJsxTransformOptions) {
  const reactTransformConfig: ReactConfig = {
    refresh: fastRefresh,
    runtime: 'automatic',
    importSource: '@ice/runtime', // The exact import source is '@ice/runtime/jsx-runtime'
  };

  const commonOptions: SwcConfig = {
    jsc: {
      transform: {
        react: reactTransformConfig,
        legacyDecorator: true,
      },
      // This option will greatly reduce your file size while bundling.
      // This option depends on `@swc/helpers`.
      externalHelpers: false,
    },
    module: {
      type: 'es6',
      noInterop: false,
    },
  };
  if (env) {
    commonOptions.env = {
      loose: false,
      ...(polyfill ? {
        mode: polyfill,
        coreJs: '3.26',
      } : {}),
    };
  } else {
    // Set target `es2022` for default transform when env is false.
    commonOptions.jsc.target = 'es2022';
  }
  const syntaxFeatures = {
    dynamicImport: true,
    decorators: true,
    privateMethod: true,
    importMeta: true,
    exportNamespaceFrom: true,
  };
  const jsOptions = merge({
    jsc: {
      parser: {
        jsx: true,
        ...syntaxFeatures,
      },
    },
  }, commonOptions);

  const tsOptions = merge({
    jsc: {
      parser: {
        tsx: true,
        ...syntaxFeatures,
        syntax: 'typescript',
      },
    },
  }, commonOptions);

  if (suffix === 'jsx') {
    return jsOptions;
  } else if (suffix === 'tsx') {
    return tsOptions;
  }
  return commonOptions;
}

export default compilationPlugin;
