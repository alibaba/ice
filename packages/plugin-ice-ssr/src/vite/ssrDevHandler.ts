import * as fs from 'fs-extra';
import * as path from 'path';
import type { ViteDevServer } from 'vite';
import type { NextHandleFunction } from 'connect';

interface SSROptions {
  rootDir: string;
  ssrEntry: string;
}

const createSSRDevHandler = (server: ViteDevServer, options: SSROptions): NextHandleFunction => {
  const { rootDir, ssrEntry } = options;
  const getTemplate = async (url: string): Promise<string> => {
    const template = fs.readFileSync(path.join(rootDir, 'public', 'index.html'), 'utf-8');
    return  await server.transformIndexHtml(url, template);
  };
  const requestHandler: NextHandleFunction = async (req, res, next) => {
    // just do some filter already known
    if (req.method !== 'GET' || req.originalUrl === '/favicon.ico') {
      return next();
    }
    let htmlTemplate: string;
    try {
      htmlTemplate = await getTemplate(req.originalUrl);
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
        // TODO redirect
      } else {
        if (error) {
          server.ssrFixStacktrace(error as Error);
        }
        console.log('[SSR] ssr html content', url, req.originalUrl, html);
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      }
    } catch (err) {
      // fallback to CSR
      // res.setHeader('Content-Type', 'text/html');
      // res.end(htmlTemplate);

      server.ssrFixStacktrace(err);
      // next(err);
    }
  };

  return requestHandler;
};

export default createSSRDevHandler;