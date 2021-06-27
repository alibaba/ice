const { merge } = require('lodash');

export default function(config, swcOptions) {
  ['js', 'jsx', 'ts', 'tsx'].forEach((rule) => {
    config.module
      .rule(rule)
      .use('swc-loader')
      .tap((options) => {
        return merge(options, swcOptions);
      });
  });
}
