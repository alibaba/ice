const httpProxyMiddleware = require('http-proxy-middleware');
const getProxyConfig = require('./config/getProxyConfig');

// 附加中间件流程
module.exports = (app) => {
  const proxyConfig = getProxyConfig();

  const proxyRules = Object.entries(proxyConfig);

  proxyRules.forEach(([match, target]) => {
    const opts = {
      context: match,
      target,
      changeOrigin: true,
      logLevel: 'warn',
      onProxyRes: function onProxyReq(proxyRes, req, res) {
        proxyRes.headers['x-proxy-by'] = 'ice-proxy';
        proxyRes.headers['x-proxy-match'] = match;
        proxyRes.headers['x-proxy-target'] = target;
        if (target.endsWith('/')) {
          target = target.replace(/\/$/, '');
        }
        proxyRes.headers['x-proxy-target-path'] = target + req.url;
      },
    };

    const exampleProxy = httpProxyMiddleware(match, opts);
    app.use(exampleProxy);
  });
};
