const { merge } = require('lodash');

export default function(config, swcOptions) {
  config.module
    .rule('jsx')
    .use('swc-loader')
    .tap((options) => {
      return merge(options, swcOptions);
    });
}
