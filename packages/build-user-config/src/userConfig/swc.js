const { merge } = require('lodash');

const EXCLUDE_REGX = /node_modules/;

module.exports = (config, swcOptions) => {
  if (swcOptions) {
    if(config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
    }
    const swcLoader = require.resolve('swc-loader');
    const isDev = process.env.NODE_ENV === 'development';
    // delete babel rule
    ['jsx', 'tsx'].forEach((rule) => {
      config.module.rules.delete(rule).end();
    });
    // add swc rule
    const transformOptions = {
      'react': {
        pragma: 'createElement',
        pragmaFrag: 'Fragment',
        throwIfNamespace: false,
        'development': isDev,
      },
      'legacyDecorator': true
    };

    const customOptions = {
      ...swcOptions,
      minify: !isDev,
    };
    const jsOptions = {
      jsc: {
        parser: {
          jsx: true,
          dynamicImport: true,
          functionBind: true,
          exportDefaultFrom: true,
          exportNamespaceFrom: true,
          decorators: true,
        },
        transform: transformOptions,
        loose: true
      },
    };

    const tsOptions = {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          dynamicImport: true,
          decorators: true,
        },
        transform: transformOptions,
        loose: true
      },
    };

    config.module
      .rule('jsx')
      .test(/\.jsx?$/)
      .exclude.add(EXCLUDE_REGX)
      .end()
      .use('swc-loader')
      .loader(swcLoader)
      .options(merge(jsOptions, customOptions))
      .end();

    config.module
      .rule('tsx')
      .test(/\.tsx?$/)
      .exclude.add(EXCLUDE_REGX)
      .end()
      .use('swc-loader')
      .loader(swcLoader)
      .options(tsOptions, customOptions)
      .end();
  }
};
