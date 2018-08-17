const httpProxyMiddleware = require('http-proxy-middleware');

const webpackDevMock = require('webpack-dev-mock');
// 附加中间件流程
module.exports = (app, proxyConfig) => {
  if (proxyConfig) {
    const proxyRules = Object.entries(proxyConfig);

    proxyRules.forEach(([match, opts]) => {
      if (opts.enable) {
        const proxyOptions = {
          context: match,
          target: opts.target,
          changeOrigin: true,
          logLevel: 'warn',
          onProxyRes: function onProxyReq(proxyRes, req, res) {
            proxyRes.headers['x-proxy-by'] = 'ice-proxy';
            proxyRes.headers['x-proxy-match'] = match;
            proxyRes.headers['x-proxy-target'] = opts.target;
            if (opts.target && opts.target.endsWith('/')) {
              opts.target = opts.target.replace(/\/$/, '');
            }
            proxyRes.headers['x-proxy-target-path'] = opts.target + req.url;
          },
        };

        const exampleProxy = httpProxyMiddleware(match, proxyOptions);
        app.use(exampleProxy);
      }
    });
  }

  webpackDevMock(app);
};
