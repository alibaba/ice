import { createRequire } from 'module';
import swc from '@swc/core';
import type { Options as SwcConfig, ReactConfig } from '@swc/core';
import type { UnpluginOptions } from 'unplugin';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';

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
}

const compilationPlugin = (options: Options): UnpluginOptions => {
  const { sourceMap, mode, fastRefresh, compileIncludes = [], compileExcludes, swcOptions = {}, cacheDir } = options;
  const compileRegex = compileIncludes.map((includeRule) => {
    return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
  });

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

      const commonOptions = getJsxTransformOptions({ suffix, fastRefresh });

      // auto detect development mode
      if (
        mode &&
        commonOptions?.jsc?.transform?.react &&
        !Object.prototype.hasOwnProperty.call(commonOptions.jsc.transform.react, 'development')
      ) {
        commonOptions.jsc.transform.react.development = mode === 'development';
      }

      merge(programmaticOptions, commonOptions);

      const { removeExportExprs, compilationConfig, keepPlatform } = swcOptions;

      if (compilationConfig) {
        merge(programmaticOptions, compilationConfig);
      }

      const swcPlugins = [];
      // handle app.tsx and page entries only
      if (removeExportExprs) {
        if (/(.*)pages(.*)\.(jsx?|tsx?|mjs)$/.test(id)) {
          swcPlugins.push([
            require.resolve('@ice/swc-plugin-remove-export'),
            removeExportExprs,
          ]);
        } else if (/(.*)src\/app/.test(id)) {
          let removeList;

          // FIXME: https://github.com/ice-lab/ice-next/issues/487
          if (removeExportExprs.indexOf('getConfig') === -1) {
            // when build for getConfig, should keep default, it equals to getAppConfig
            removeList = removeExportExprs.filter(key => key !== 'default');
          } else {
            // when build for getData, should remove all other exports
            removeList = removeExportExprs;
          }

          swcPlugins.push([
            require.resolve('@ice/swc-plugin-remove-export'),
            removeList,
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
      } catch (e) {
        // catch error for Unhandled promise rejection
        this.error(e);
        return { code: null, map: null };
      }
    },
  };
};

interface GetJsxTransformOptions {
  suffix: JSXSuffix;
  fastRefresh: boolean;
}

function getJsxTransformOptions({
  suffix,
  fastRefresh,
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
      externalHelpers: false,
    },
    module: {
      type: 'es6',
      noInterop: false,
    },
    env: {
      loose: true,
    },
  };
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
