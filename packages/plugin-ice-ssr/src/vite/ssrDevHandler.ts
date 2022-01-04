import type { ViteDevServer } from 'vite';
import type { NextHandleFunction } from 'connect';

interface SSROptions {
  ssrEntry: string;
}

const createSSRDevHandler = (server: ViteDevServer, options: SSROptions): NextHandleFunction => {
  const { ssrEntry } = options;
  const requestHandler: NextHandleFunction = async (req, res, next) => {
    // just do some filter already known
    if (req.method !== 'GET' || req.originalUrl === '/favicon.ico') {
      return next();
    }
    let htmlTemplate: string;
    try {
      // html content will be provided by vite-plugin-html
      htmlTemplate = await server.transformIndexHtml(req.originalUrl, '');
    } catch (err) {
      server.ssrFixStacktrace(err);
      // fallback
      return next(err);
    }

    try {
      const serverEntryPoint = await server.ssrLoadModule(ssrEntry);
      const render = serverEntryPoint.default;
      const url = req.url;
      req.url = req.originalUrl;
      const { error, html, redirectUrl } = await render({ req, res }, { htmlTemplate, loadableStatsPath: false });
      req.url = url;
      if (redirectUrl) {
        console.log('[SSR]', `Redirect to the new path ${redirectUrl}`);
        res.writeHead(302, {
          Location: redirectUrl
        });
        res.end();
      } else {
        if (error) {
          server.ssrFixStacktrace(error as Error);
        }
        console.log('[SSR] ssr html content', url, req.originalUrl, html);
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      }
    } catch (err) {
      server.ssrFixStacktrace(err);
    }
  };

  return requestHandler;
};

export default createSSRDevHandler;