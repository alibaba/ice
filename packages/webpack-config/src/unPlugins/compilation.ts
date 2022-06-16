import { createRequire } from 'module';
import type { ReactConfig } from '@builder/swc';
import { transform, type Config as SwcConfig } from '@builder/swc';
import type { UnpluginOptions } from 'unplugin';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';

const { merge } = lodash;

type JSXSuffix = 'jsx' | 'tsx';

interface Options {
  mode: 'development' | 'production' | 'none';
  compileIncludes?: (string | RegExp)[];
  sourceMap?: Config['sourceMap'];
  compileExcludes?: RegExp[];
  swcOptions?: Config['swcOptions'];
}

interface TransformOptions extends SwcConfig {
  filename: string;
}

const require = createRequire(import.meta.url);
const regeneratorRuntimePath = require.resolve('regenerator-runtime');

const compilationPlugin = (options: Options): UnpluginOptions => {
  const { sourceMap, mode, compileIncludes = [], compileExcludes, swcOptions = {} } = options;
  const dev = mode !== 'production';
  const compileRegex = compileIncludes.map((includeRule) => {
    return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
  });

  const extensionRegex = /\.(jsx?|tsx?|mjs)$/;
  return {
    name: 'compilation-plugin',
    transformInclude(id) {
      return extensionRegex.test(id) && !compileExcludes.some((regex) => regex.test(id));
    },
    // @ts-expect-error TODO: source map types
    async transform(source: string, id: string) {
      if ((/node_modules/.test(id) && !compileRegex.some((regex) => regex.test(id)))) {
        return;
      }

      const suffix = (['jsx', 'tsx'] as JSXSuffix[]).find(suffix => new RegExp(`\\.${suffix}?$`).test(id));

      const programmaticOptions: TransformOptions = {
        filename: id,
      };

      const { jsxTransform = true, removeExportExprs } = swcOptions;

      let needTransform = false;

      // common transform only works for webpack, esbuild has it's own compilation
      if (jsxTransform) {
        const commonOptions = getJsxTransformOptions({ suffix, dev });

        // auto detect development mode
        if (
          mode &&
          commonOptions?.jsc?.transform?.react &&
          !Object.prototype.hasOwnProperty.call(commonOptions.jsc.transform.react, 'development')
        ) {
          commonOptions.jsc.transform.react.development = mode === 'development';
        }

        Object.assign(programmaticOptions, { sourceMaps: !!sourceMap }, commonOptions);
        needTransform = true;
      }

      if (removeExportExprs && /(.*)pages(.*)\.(jsx?|tsx?|mjs)$/.test(id)) {
        Object.assign(programmaticOptions, { removeExportExprs });
        needTransform = true;
      }

      // Files other than page entries do not need to be transform in esbuild.
      if (!needTransform) {
        return false;
      }

      try {
        const output = await transform(source, programmaticOptions);
        const { code, map } = output;

        return { code, map };
      } catch (e) {
        // catch error for Unhandled promise rejection
      }
    },
  };
};

function getJsxTransformOptions({
  suffix,
  dev,
}: {
  suffix: JSXSuffix;
  dev: boolean;
}) {
  const reactTransformConfig: ReactConfig = {
    refresh: dev,
    runtime: 'automatic',
    importSource: '@ice/runtime', // The exact import source is '@ice/runtime/jsx-runtime'
  };

  const commonOptions: SwcConfig = {
    jsc: {
      transform: {
        react: reactTransformConfig,
        legacyDecorator: true,
        // @ts-expect-error fix me when @builder/swc fix type error
        regenerator: {
          importPath: regeneratorRuntimePath,
        },
      },
      externalHelpers: false,
    },
    module: {
      type: 'es6',
      noInterop: false,
      // webpack will evaluate dynamic import, so there need preserve it
      ignoreDynamic: true,
    },
    env: {
      loose: true,
    },
  };

  const jsOptions = merge({
    jsc: {
      parser: {
        jsx: true,
        dynamicImport: true,
        functionBind: true,
        exportDefaultFrom: true,
        exportNamespaceFrom: true,
        decorators: true,
      },
    },
  }, commonOptions);

  const tsOptions = merge({
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: true,
        dynamicImport: true,
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
