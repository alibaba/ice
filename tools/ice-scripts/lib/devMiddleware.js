const httpProxyMiddleware = require('http-proxy-middleware');
const webpackDevMock = require('webpack-dev-mock');
const merge = require('lodash/merge');

// 附加中间件流程
module.exports = (app, proxyConfig) => {
  if (proxyConfig) {
    const proxyRules = Object.entries(proxyConfig);

    proxyRules.forEach(([match, opts]) => {
      const { enable, target, ...proxyRule } = opts;

      if (enable) {
        const proxyOptions = merge({
          target,
          changeOrigin: true,
          logLevel: 'warn',
          onProxyRes: function onProxyReq(proxyRes, req, res) {
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

        const exampleProxy = httpProxyMiddleware(match, proxyOptions);
        app.use(exampleProxy);
      }
    });
  }

  webpackDevMock(app);
};
