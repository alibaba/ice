const { merge } = require('lodash');

export default function(config, swcOptions) {
  config.module
    .rule('swc')
    .use('swc-loader')
    .tap((options) => {
      return merge(options, swcOptions);
    });
}
