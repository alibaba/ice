const path = require('path');
const { merge } = require('@builder/pack/deps/lodash');

const EXCLUDE_REGEX = /node_modules/;

let logged = false;

module.exports = (config, swcOptions, context, { log, getValue }) => {
  const { rootDir } = context;
  if (swcOptions) {
    if (!logged) {
      logged = true;
      log.info('[swc]', 'swc enabled, configurations about babel will be ignored');
    }
    ['jsx', 'tsx'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        // add include rule while source file will never matched
        config.module.rule(rule)
          .exclude.clear().end()
          .include.clear().add(path.join(rootDir, '__not_exists_file__.js'));
      }
    });
    const swcLoader = require.resolve('@builder/swc-loader');
    let reactTransformConfig = getValue('REACT_TRANSFORM_CONFIG');
    if (!reactTransformConfig) {
      reactTransformConfig = getValue('HAS_JSX_RUNTIME') ? { runtime: 'automatic' } : {};
    }
    // add swc rule
    const commonOptions = {
      jsc: {
        transform: {
          react: reactTransformConfig,
          legacyDecorator: true
        },
        externalHelpers: true
      },
      module: {
        type: 'commonjs',
        noInterop: false
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
      }
    }, commonOptions);

    config.module
      .rule('pre-compile-loader')
      .test(/\.tsx?$/)
      .enforce('pre')
      .use('pre-compile-loader')
      .loader(path.join(__dirname, '../Loaders/PreCompileLoader'))
      .options({
        jsc: {
          transform: {
            react: reactTransformConfig,
          },
        },
      })
      .end();

    config.module
      .rule('swc')
      .test(/\.(j|t)sx?$/)
      .exclude.add(EXCLUDE_REGEX)
      .end()
      .use('swc-loader')
      .loader(swcLoader)
      .options(jsOptions)
      .end();
  }
};
