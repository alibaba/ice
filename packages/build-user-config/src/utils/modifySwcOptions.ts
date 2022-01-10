const { merge } = require('lodash');

export default function(config, swcOptions) {
  ['jsx', 'tsx'].forEach((suffix) => {
    config.module
      .rule(`swc-${suffix}`)
      .use('swc-loader')
      .tap((options) => {
        return merge(options, swcOptions);
      });
  });
}
