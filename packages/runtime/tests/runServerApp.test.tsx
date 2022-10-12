import React from 'react';
import { expect, it, describe } from 'vitest';
import { renderToHTML, renderToResponse } from '../src/runServerApp';
import { Meta, Title, Links, Main, Scripts } from '../src/Document';

describe('run server app', () => {
  process.env.ICE_CORE_ROUTER = 'true';
  const basicRoutes = [
    {
      id: 'home',
      path: 'home',
      componentName: 'home',
      load: async () => ({
        default: () => {
          return (
            <div>home</div>
          );
        },
        getConfig: () => ({ title: 'home' }),
        getData: async () => ({ data: 'test' }),
      }),
    },
  ];

  const assetsManifest = {
    publicPath: '/',
    assets: {},
    entries: [],
    pages: {
      home: ['js/home.js'],
    },
  };

  const Document = () => (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3.0 Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main />
        <Scripts />
      </body>
    </html>
  );

  it('render to html', async () => {
    const html = await renderToHTML({
      // @ts-ignore
      req: {
        url: '/home',
      },
    }, {
      app: {},
      assetsManifest,
      runtimeModules: [],
      routes: basicRoutes,
      Document,
      renderMode: 'SSR',
    });
    // @ts-ignore
    expect(html?.value?.includes('<div>home</div>')).toBe(true);
    // @ts-ignore
    expect(html?.value?.includes('js/home.js')).toBe(true);
  });

  it('render to html basename', async () => {
    const html = await renderToHTML({
      // @ts-ignore
      req: {
        url: '/home',
      },
    }, {
      app: {},
      assetsManifest,
      runtimeModules: [],
      routes: basicRoutes,
      Document,
      renderMode: 'SSR',
      basename: '/ice',
    });
    // @ts-ignore
    expect(html?.statusCode).toBe(404);
  });

  it('render to html serverOnlyBasename', async () => {
    const html = await renderToHTML({
      // @ts-ignore
      req: {
        url: '/home',
      },
    }, {
      app: {},
      assetsManifest,
      runtimeModules: [],
      routes: basicRoutes,
      Document,
      renderMode: 'SSR',
      serverOnlyBasename: '/',
      basename: '/ice',
    });
    // @ts-ignore
    expect(html?.statusCode).toBe(200);
  });

  it('render to 404 html', async () => {
    const html = await renderToHTML({
      // @ts-ignore
      req: {
        url: '/about',
      },
    }, {
      app: {},
      assetsManifest,
      runtimeModules: [],
      routes: basicRoutes,
      Document,
    });
    // @ts-ignore
    expect(html?.statusCode).toBe(404);
  });

  it('router hash', async () => {
    const html = await renderToHTML({
      // @ts-ignore
      req: {
        url: '/home',
      },
    }, {
      app: {
        default: {
          router: {
            type: 'hash',
          },
        },
      },
      assetsManifest,
      runtimeModules: [],
      routes: basicRoutes,
      Document,
    });
    // @ts-ignore
    expect(html?.statusCode).toBe(200);
    // @ts-ignore
    expect(html?.value?.includes('<div>home</div>')).toBe(false);
  });

  it('fallback to csr', async () => {
    const html = await renderToHTML({
      // @ts-ignore
      req: {
        url: '/home',
      },
    }, {
      app: {},
      assetsManifest,
      runtimeModules: [],
      routes: [{
        id: 'home',
        path: 'home',
        componentName: 'Home',
        load: async () => ({
          default: () => {
            throw new Error('err');
            return (
              <div>home</div>
            );
          },
        }),
      }],
      Document,
    });
    // @ts-ignore
    expect(html?.value?.includes('<div>home</div>')).toBe(false);
  });

  it('render to response', async () => {
    let htmlContent = '';
    await renderToResponse({
      // @ts-ignore
      req: {
        url: '/home',
      },
      res: {
        destination: {},
        // @ts-ignore
        setHeader: () => {},
        // @ts-ignore
        end: (content) => {
          htmlContent = content;
        },
      },
    }, {
      app: {},
      assetsManifest,
      runtimeModules: [],
      routes: basicRoutes,
      Document,
      renderMode: 'SSR',
      routePath: '/',
      documentOnly: true,
    });
    expect(!!htmlContent).toBe(true);
    expect(htmlContent.includes('<div>home</div')).toBe(false);
  });
});