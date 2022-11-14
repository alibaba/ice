import React from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest';
import type { RouteComponent as IRouteComponent } from '../src/types';
import RouteWrapper from '../src/RouteWrapper';
import { AppContextProvider } from '../src/AppContext';
import {
  filterMatchesToLoad,
  createRouteElements,
  RouteComponent,
  loadRouteModules,
  loadRoutesData,
  getRoutesConfig,
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
    getData: async () => ({ type: 'getData' }),
    getServerData: async () => ({ type: 'getServerData' }),
    getStaticData: async () => ({ type: 'getStaticData' }),
  };
  const aboutItem = {
    default: () => <></>,
    pageConfig: () => ({ title: 'about' }),
  };
  const routeModules = [
    {
      id: 'home',
      load: async () => {
        return homeItem as IRouteComponent;
      },
    },
    {
      id: 'about',
      load: async () => {
        return aboutItem as IRouteComponent;
      },
    },
  ];

  it('route Component', () => {
    const domstring = renderToString(
      // @ts-ignore
      <AppContextProvider value={{ routeModules: {
        home: {
          default: () => <div>home</div>,
        },
      } }}
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

  it('load route modules', async () => {
    windowSpy.mockImplementation(() => ({}));
    const routeModule = await loadRouteModules(routeModules, { home: homeItem });
    expect(routeModule).toStrictEqual({
      home: homeItem,
      about: aboutItem,
    });
  });

  it('load error module', async () => {
    const routeModule = await loadRouteModules([{
      id: 'error',
      // @ts-ignore
      load: async () => {
        throw new Error('err');
        return {};
      },
    }], {});
    expect(routeModule).toStrictEqual({
      error: undefined,
    });
  });

  it('load route data', async () => {
    const routeModule = await loadRouteModules(routeModules);
    const routesDataSSG = await loadRoutesData(
      // @ts-ignore
      [{ route: routeModules[0] }],
      {},
      routeModule,
      'SSG',
    );
    const routesDataSSR = await loadRoutesData(
      // @ts-ignore
      [{ route: routeModules[0] }],
      {},
      routeModule,
      'SSR',
    );
    const routesDataCSR = await loadRoutesData(
      // @ts-ignore
      [{ route: routeModules[0] }],
      {},
      routeModule,
      'CSR',
    );
    expect(routesDataSSG).toStrictEqual({
      home: {
        type: 'getStaticData',
      },
    });
    expect(routesDataSSR).toStrictEqual({
      home: {
        type: 'getServerData',
      },
    });
    expect(routesDataCSR).toStrictEqual({
      home: {
        type: 'getData',
      },
    });
  });

  it('load data from __ICE_DATA_LOADER__', async () => {
    windowSpy.mockImplementation(() => ({
      __ICE_DATA_LOADER__: async (id) => ({ id: `${id}_data` }),
    }));
    const routesData = await loadRoutesData(
      // @ts-ignore
      [{ route: routeModules[0] }],
      {},
      {},
      'SSG',
    );
    expect(routesData).toStrictEqual({
      home: {
        id: 'home_data',
      },
    });
  });

  it('get routes config', async () => {
    const routeModule = await loadRouteModules(routeModules);
    const routesConfig = getRoutesConfig(
      // @ts-ignore
      [{ route: routeModules[0] }],
      { home: {} },
      routeModule,
    );
    expect(routesConfig).toStrictEqual({
      home: {
        title: 'home',
      },
    });
  });

  it('get routes config when failed get route module', async () => {
    const routesConfig = getRoutesConfig(
      // @ts-ignore
      [{ route: routeModules[0] }],
      { home: {} },
      {},
    );
    expect(routesConfig).toStrictEqual({
      home: {},
    });
  });

  it('create route element', () => {
    const routeElement = createRouteElements([{
      path: '/',
      id: 'home',
      componentName: 'home',
    }]);
    expect(routeElement).toEqual([{
      componentName: 'home',
      element: (
        <RouteWrapper id="home">
          <RouteComponent
            id="home"
          />
        </RouteWrapper>
      ),
      id: 'home',
      path: '/',
    }]);
  });

  it('create route with children', () => {
    const routeElement = createRouteElements([{
      path: '/',
      id: 'home',
      componentName: 'home',
      children: [{
        path: '/about',
        id: 'about',
        componentName: 'about',
      }],
    }]);
    expect(routeElement).toEqual([{
      componentName: 'home',
      element: (
        <RouteWrapper id="home">
          <RouteComponent
            id="home"
          />
        </RouteWrapper>
      ),
      children: [{
        componentName: 'about',
        element: (
          <RouteWrapper id="about">
            <RouteComponent
              id="about"
            />
          </RouteWrapper>
        ),
        id: 'about',
        path: '/about',
      }],
      id: 'home',
      path: '/',
    }]);
  });

  it('filter new matches', () => {
    const oldMatches = [
      {
        pathname: '/',
        route: {
          id: '/page/layout',
        },
      },
      {
        pathname: '/',
        route: {
          id: '/page/home',
        },
      },
    ];

    const newMatches = [
      {
        pathname: '/',
        route: {
          id: '/page/layout',
        },
      },
      {
        pathname: '/about',
        route: {
          id: '/page/about',
        },
      },
    ];

    // @ts-ignore
    const matches = filterMatchesToLoad(oldMatches, newMatches);

    expect(
      matches,
    ).toEqual([{
      pathname: '/about',
      route: {
        id: '/page/about',
      },
    }]);
  });

  it('filter matches with path changed', () => {
    const oldMatches = [
      {
        pathname: '/users/123',
        route: {
          id: '/users/123',
        },
      },
    ];

    const newMatches = [
      {
        pathname: '/users/456',
        route: {
          id: '/users/456',
        },
      },
    ];

    // @ts-ignore
    const matches = filterMatchesToLoad(oldMatches, newMatches);

    expect(
      matches,
    ).toEqual([
      {
        pathname: '/users/456',
        route: {
          id: '/users/456',
        },
      },
    ]);
  });
});
