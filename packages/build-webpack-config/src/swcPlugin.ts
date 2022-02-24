import { createUnplugin } from 'unplugin';
import { transform } from '@builder/swc';
import * as path from 'path';
import { merge } from '@builder/pack/deps/lodash';
import type { IFrameworkConfig } from './frameworkConfig';

type JSXSuffix = 'jsx' | 'tsx';

interface Options {
  rootDir: string;

  sourceMap?: IFrameworkConfig['sourceMap'];
}

const unplugin = createUnplugin((options: Options) => {
  const { rootDir, sourceMap } = options;
  return {
    name: 'swc-plugin',
    async transform(source: string, id: string) {
      if (/node_modules/.test(id)) {
        return;
      }
      const initOptions = {
        filename: id,
        sourceMaps: !!sourceMap,
      };
      let transformOptions = {};
      if (/\\.jsx?$/.test(id)) {
        transformOptions = getSwcTransformOptions('jsx', rootDir);
      } else if (/\\.tsx?$/.test(id)) {
        transformOptions = getSwcTransformOptions('tsx', rootDir);
      }
      const programmaticOptions = Object.assign({}, transformOptions, initOptions);
      const output = await transform(source, programmaticOptions);
      const { code, map } = output;

      return { code, map };
    },
  };
});

function getSwcTransformOptions(suffix: JSXSuffix, rootDir: string) {
  const reactTransformConfig = hasJsxRuntime(rootDir) ? { runtime: 'automatic' } : {};

  const commonOptions = {
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
      // webpack will evaluate dynamic import, so there need preserve it
      ignoreDynamic: true,
    },
    env: {
      loose: true,
      targets: 'last 2 versions',
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

const webpackPlugin = unplugin.webpack;

export default webpackPlugin;
