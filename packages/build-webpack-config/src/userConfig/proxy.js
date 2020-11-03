const merge = require('lodash/merge');

module.exports = (config, proxyConfig) => {
  const proxyRules = Object.entries(proxyConfig);
  if (proxyRules.length) {
    const proxy = proxyRules.map(([match, opts]) => {
      // set enable false to disable proxy rule
      const { enable, target, ...proxyRule } = opts;
      if (enable !== false) {
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
          onError: function onError(err, req, res) {
            // proxy server error can't trigger onProxyRes
            res.writeHead(500, {
              'x-proxy-by': 'ice-proxy',
              'x-proxy-match': match,
              'x-proxy-target': target,
            });
            res.end(`proxy server error: ${err.message}`);
          },
        }, proxyRule, { context: match });
      }
      return false;
    }).filter((v) => v);
    config.devServer.proxy(proxy);
  }
};
