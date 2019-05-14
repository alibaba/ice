const merge = require('lodash/merge');

module.exports = (api, proxyConfig) => {
  const proxyRules = Object.entries(proxyConfig);

  const proxy = proxyRules.map(([match, opts]) => {
    // set enable false to disable proxy rule
    const { enable, target, ...proxyRule } = opts;
    if (enable) {
      return merge({
        target,
        changeOrigin: true,
        logLevel: 'warn',
        onProxyRes: function onProxyReq(proxyRes, req) {
          proxyRes.headers['x-proxy-by'] = 'ice-proxy';
          proxyRes.headers['x-proxy-match'] = match;
          proxyRes.headers['x-proxy-target'] = target;

          let distTarget = target;
          if (target && target.endsWith('/')) {
            distTarget = target.replace(/\/$/, '');
          }
          proxyRes.headers['x-proxy-target-path'] = distTarget + req.url;
        },
      }, proxyRule, { context: match });
    }
    return false;
  }).filter((v) => v);

  api.chainWebpack((config) => {
    config.devServer.proxy(proxy);
  });
};
