import * as path from 'path';
import type { IFrameworkPlugin } from '@ice/service';
import { merge } from '@builder/pack/deps/lodash';

type JSXSuffix = 'jsx' | 'tsx';

const plugin: IFrameworkPlugin = ({ registerTask, context }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';

  registerTask('web', {
    entry: path.join(rootDir, 'src/app'),
    mode,
    loaders: [
      ['jsx', 'tsx'].map((suffix: JSXSuffix) => ({
        test: new RegExp(`\\.${suffix}?$`),
        use: {
          loader: require.resolve('@builder/swc-loader'),
          options: getSwcLoaderOptions(suffix),
      },
      })),
    ],
   });
};

function getSwcLoaderOptions(suffix: JSXSuffix) {
  // let reactTransformConfig = getValue('REACT_TRANSFORM_CONFIG');
  //   if (!reactTransformConfig) {
  //     reactTransformConfig = getValue('HAS_JSX_RUNTIME') ? { runtime: 'automatic' } : {};
  //   }
  // TODO: get reactTransformConfig by JSX_RUNTIME
  const reactTransformConfig = { runtime: 'automatic' };
  // TODO: user swc options?
  const swcOptions = {};
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
    },
    ...swcOptions,
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

export default plugin;
