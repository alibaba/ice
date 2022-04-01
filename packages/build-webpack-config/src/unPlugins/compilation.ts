import path from 'path';
import { createRequire } from 'module';
import { transform, type Config as SwcConfig } from '@builder/swc';
import type { UnpluginOptions } from 'unplugin';
import lodash from '@builder/pack/deps/lodash/lodash.js';
import type { Config } from '@ice/types';

const { merge } = lodash;

type JSXSuffix = 'jsx' | 'tsx';

interface Options {
  rootDir: string;
  mode: 'development' | 'production' | 'none';
  isServer?: boolean;
  sourceMap?: Config['sourceMap'];
}

const require = createRequire(import.meta.url);
const regeneratorRuntimePath = require.resolve('regenerator-runtime');

const compilationPlugin = (options: Options): UnpluginOptions => {
  const { rootDir, sourceMap, mode, isServer } = options;
  const dev = mode !== 'production';

  return {
    name: 'compilation-plugin',
    async transform(source: string, id: string) {
      // TODO specific runtime plugin name
      if ((/node_modules/.test(id) && !/[\\/]runtime[\\/]/.test(id))) {
        return;
      }

      const suffix = (['jsx', 'tsx'] as JSXSuffix[]).find(suffix => new RegExp(`\\.${suffix}?$`).test(id));
      if (!suffix) {
        return;
      }

      const programmaticOptions = {
        filename: id,
        sourceMaps: !!sourceMap,
        ...getSwcTransformOptions({ suffix, rootDir, dev, isServer }),
      };
      // auto detect development mode
      if (mode && programmaticOptions.jsc && programmaticOptions.jsc.transform &&
              programmaticOptions.jsc.transform.react &&
              !Object.prototype.hasOwnProperty.call(programmaticOptions.jsc.transform.react, 'development')) {
        programmaticOptions.jsc.transform.react.development = mode === 'development';
      }
      const output = await transform(source, programmaticOptions);
      const { code, map } = output;

      return { code, map };
    },
  };
};

function getSwcTransformOptions({
  suffix,
  rootDir,
  dev,
  isServer,
}: {
    suffix: JSXSuffix;
    rootDir: string;
    dev: boolean;
    isServer?: boolean;
  }) {
  const baseReactTransformConfig = {
    refresh: dev && !isServer,
   };
  const reactTransformConfig = merge(baseReactTransformConfig, hasJsxRuntime(rootDir) ? { runtime: 'automatic' } : {});

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
      // @ts-expect-error module type only support cjs umd amd, fix me when @builder/swc fix type error
      type: 'es6',
      noInterop: false,
      // webpack will evaluate dynamic import, so there need preserve it
      ignoreDynamic: true,
    },
    env: {
      loose: true,
    },
  };
  if (isServer) {
    commonOptions.env.targets = 'node >= 12';
  }

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

function hasJsxRuntime(rootDir: string) {
  try {
    // auto detect of jsx runtime
    // eslint-disable-next-line
    const tsConfig = require(path.join(rootDir, 'tsconfig.json'));
    if (tsConfig?.compilerOptions?.jsx !== 'react-jsx') {
      return false;
    }
    // ensure react/jsx-runtime
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
}

export default compilationPlugin;
