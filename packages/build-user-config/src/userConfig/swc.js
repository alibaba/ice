const path = require('path');
const { merge } = require('@builder/pack/deps/lodash');

const EXCLUDE_REGEX = /node_modules/;

module.exports = (config, swcOptions, context, { log }) => {
  const { rootDir } = context;
  if (swcOptions) {
    log.info('[swc]', 'swc enabled, configurations about babel will be ignored');
    ['jsx', 'tsx'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        // add include rule while source file will never matched
        config.module.rule(rule)
          .exclude.clear().end()
          .include.clear().add(path.join(rootDir, '__not_exists_file__.js'));
      }
    });
    const swcLoader = require.resolve('@builder/swc-loader');

    // add swc rule
    const commonOptions = {
      jsc: {
        transform: {
          react: {},
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
