const { cloneDeep, merge } = require('@builder/pack/deps/lodash');
const SwcPlugin = require('webpack-plugin-swc').default;

const EXCLUDE_REGX = /node_modules/;

module.exports = (config, swcOptions) => {
  if (swcOptions) {
    // Delete babel loader
    ['jsx', 'tsx'].forEach((rule) => {
      config.module.rules.delete(rule).end();
    });
    const swcLoader = require.resolve('@builder/swc-loader');

    // Delete TerserPlugin and add swc plugin
    if(config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
      config.optimization
        .minimizer('SwcPlugin')
        .use(SwcPlugin, [{}]);
    }

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
        'type': 'commonjs',
         'noInterop': false
      },
      env: {
        loose: true,
      },
      ...swcOptions,
    };

    const jsOptions = merge({
      jsc: {
        parser: {
          dynamicImport: true,
          functionBind: true,
          exportDefaultFrom: true,
          exportNamespaceFrom: true,
          decorators: true,
        },
      }
    }, commonOptions);

    ['js', 'jsx'].forEach((ruleName) => {
      const testRegx = new RegExp(`\\.${ruleName}$`);
      const options = cloneDeep(jsOptions);
      options.jsc.parser.jsx = ruleName === 'jsx';
      config.module
        .rule(ruleName)
        .test(testRegx)
        .exclude.add(EXCLUDE_REGX)
        .end()
        .use('swc-loader')
        .loader(swcLoader)
        .options(options)
        .end();
    });

    const tsOptions = merge({
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          dynamicImport: true,
          decorators: true,
        }
      },
    }, commonOptions);

    ['ts', 'tsx'].forEach((ruleName) => {
      const testRegx = new RegExp(`\\.${ruleName}$`);
      const options = cloneDeep(tsOptions);
      options.jsc.parser.tsx = ruleName === 'tsx';

      config.module
        .rule(ruleName)
        .test(testRegx)
        .exclude.add(EXCLUDE_REGX)
        .end()
        .use('swc-loader')
        .loader(swcLoader)
        .options(options)
        .end();
    });
  }
};
