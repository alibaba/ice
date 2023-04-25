/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest';
import { AppContextProvider } from '../src/AppContext';
import {
  RouteComponent,
  loadRouteModules,
  createRouteLoader,
  getRoutesPath,
  WrapRouteComponent,
} from '../src/routes.js';

describe('routes', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = vi.spyOn(global, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  Object.defineProperty(window, 'open', open);
  const homeItem = {
    default: () => <></>,
    pageConfig: () => ({ title: 'home' }),
    dataLoader: { loader: async () => ({ type: 'getData' }) },
    serverDataLoader: { loader: async () => ({ type: 'getServerData' }) },
    staticDataLoader: { loader: async () => ({ type: 'getStaticData' }) },
  };
  const aboutItem = {
    default: () => <></>,
    pageConfig: () => ({ title: 'about' }),
  };
  const InfoItem = {
    default: () => <></>,
    pageConfig: () => ({ title: 'home' }),
    dataLoader: { loader: async () => ({ type: 'getAsyncData' }), options: { defer: true } },
  };

  const homeLazyItem = {
    Component: homeItem.default,
    loader: createRouteLoader({
      routeId: 'home',
      module: homeItem,
      renderMode: 'CSR',
    }),
  };
  const aboutLazyItem = {
    Component: aboutItem.default,
    loader: createRouteLoader({
      routeId: 'about',
      module: aboutItem,
      renderMode: 'CSR',
    }),
  };
  const routeModules = [
    {
      id: 'home',
      lazy: async () => {
        return homeLazyItem;
      },
    },
    {
      id: 'about',
      lazy: async () => {
        return aboutLazyItem;
      },
    },
  ];

  it('route Component', () => {
    const domstring = renderToString(
      // @ts-ignore
      <AppContextProvider value={{
        routeModules: {
          home: {
            Component: () => <div>home</div>,
          },
        },
      }}
      >
        <RouteComponent id="home" />
      </AppContextProvider>,
    );
    expect(domstring).toBe('<div>home</div>');
  });

  it('route error', () => {
    const currentEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    expect(() => renderToString(
      // @ts-ignore
      <AppContextProvider value={{ routeModules: {} }}>
        <RouteComponent id="home" />
      </AppContextProvider>,
    )).toThrow();
    process.env.NODE_ENV = currentEnv;
  });

  it('route WrapRouteComponent', () => {
    const domstring = renderToString(

      <AppContextProvider
        // @ts-ignore unnecessary to add app context when test WrapRouteComponent.
        value={{ RouteWrappers: [{ Wrapper: ({ children }) => <div>wrapper{children}</div>, layout: false }] }}
      >
        <WrapRouteComponent routeId="test" isLayout={false} routeExports={{ default: () => <div>home</div> }} />
      </AppContextProvider>,
    );
    expect(domstring).toBe('<div>wrapper<div>home</div></div>');
  });

  it('route WrapRouteComponent match layout', () => {
    const domstring = renderToString(

      <AppContextProvider
      // @ts-ignore unnecessary to add app context when test WrapRouteComponent.
        value={{ RouteWrappers: [{ Wrapper: ({ children }) => <div>wrapper{children}</div>, layout: false }] }}
      >
        <WrapRouteComponent routeId="test" isLayout routeExports={{ default: () => <div>home</div> }} />
      </AppContextProvider>,
    );
    expect(domstring).toBe('<div>home</div>');
  });

  it('load route modules', async () => {
    windowSpy.mockImplementation(() => ({}));
    const routeModule = await loadRouteModules(routeModules, {});
    expect(routeModule).toStrictEqual({
      home: homeLazyItem,
      about: aboutLazyItem,
    });
  });

  it('load error module', async () => {
    const routeModule = await loadRouteModules([{
      id: 'error',
      // @ts-ignore
      lazy: async () => {
        throw new Error('err');
        return {};
      },
    }], {});
    expect(routeModule).toStrictEqual({
      error: undefined,
    });
  });

  it('load async route', async () => {
    const { data: deferredResult } = await createRouteLoader({
      routeId: 'home',
      module: InfoItem,
    })();

    const data = await deferredResult.data;

    expect(data).toStrictEqual({
      type: 'getAsyncData',
    });
  });

  it('load route data for SSG', async () => {
    const routesDataSSG = await createRouteLoader({
      routeId: 'home',
      module: homeItem,
      renderMode: 'SSG',
    })();

    expect(routesDataSSG).toStrictEqual({
      data: {
        type: 'getStaticData',
      },
      pageConfig: {
        title: 'home',
      },
    });
  });

  it('load route data for SSR', async () => {
    const routesDataSSR = await createRouteLoader({
      routeId: 'home',
      module: homeItem,
      renderMode: 'SSR',
    })();

    expect(routesDataSSR).toStrictEqual({
      data: {
        type: 'getServerData',
      },
      pageConfig: {
        title: 'home',
      },
    });
  });

  it('load route data for CSR', async () => {
    const routesDataCSR = await createRouteLoader({
      routeId: 'home',
      module: homeItem,
      renderMode: 'CSR',
    })();

    expect(routesDataCSR).toStrictEqual({
      data: {
        type: 'getData',
      },
      pageConfig: {
        title: 'home',
      },
    });
  });

  it('load data from __ICE_DATA_LOADER__', async () => {
    windowSpy.mockImplementation(() => ({
      __ICE_DATA_LOADER__: {
        getData: async (id) => ({ id: `${id}_data` }),
      },
    }));
    const routesDataCSR = await createRouteLoader({
      routeId: 'home',
      module: homeItem,
      renderMode: 'CSR',
    })();

    expect(routesDataCSR).toStrictEqual({
      data: {
        id: 'home_data',
      },
      pageConfig: {
        title: 'home',
      },
    });
  });

  it('get routes config without data', async () => {
    const routesDataCSR = await createRouteLoader({
      routeId: 'about',
      module: aboutItem,
      renderMode: 'CSR',
    })();

    expect(routesDataCSR).toStrictEqual({
      pageConfig: {
        title: 'about',
      },
    });
  });

  it('get routes flatten path', () => {
    const routes = [
      {
        path: 'error',
        id: 'home',
      },
      {
        id: 'index',
      },
    ];
    // @ts-ignore
    const result = getRoutesPath(routes);
    expect(result).toEqual(['/error', '/']);
  });

  it('get flatten path of nested routes', () => {
    const routes = [
      {
        id: 'layout',
        children: [
          {
            id: 'home',
            path: 'home',
          },
          {
            id: 'layout',
            path: 'dashboard',
            children: [
              {
                id: 'about',
                path: 'about',
              },
              {
                id: 'blog',
                path: 'blog',
              },
            ],
          },
        ],
      },
      {
        id: 'index',
        componentName: 'index',
      },
    ];
    // @ts-ignore
    const result = getRoutesPath(routes);
    expect(result).toEqual(['/home', '/dashboard/about', '/dashboard/blog', '/']);
  });
});
