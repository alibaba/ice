import type { Configuration } from 'webpack';
import * as path from 'path';
import type { IFrameworkConfig } from './frameworkConfig';
import { merge } from '@builder/pack/deps/lodash';

type JSXSuffix = 'jsx' | 'tsx';

interface GetWebpackConfigOptions {
  rootDir: string;
  frameworkConfig: IFrameworkConfig;
}

export function getWebpackConfig({ rootDir, frameworkConfig }: GetWebpackConfigOptions): Configuration {
  const {
    mode,
    externals = {},
    publicPath = '/',
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
  } = frameworkConfig;

  return {
    mode,
    entry: path.join(rootDir, 'src/app'),
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    module: {
      rules: [
          ...(['jsx', 'tsx'].map((suffix: JSXSuffix) => ({
          test: new RegExp(`\\.${suffix}?$`),
          use: {
            loader: require.resolve('@builder/swc-loader'),
            options: getSwcLoaderOptions(suffix, rootDir),
          },
        }))),
        ...loaders
      ],
    },
    resolve: {
      alias: {
        'ice': path.join(rootDir, '.ice', 'index.ts')
      },
      extensions: ['.ts', '.tsx', '.jsx', '...'],
    },
  };
}

function getSwcLoaderOptions(suffix: JSXSuffix, rootDir: string) {
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