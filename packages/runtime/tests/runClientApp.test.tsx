/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it, vi, describe, beforeEach, afterEach } from 'vitest';
import runClientApp, { loadNextPage } from '../src/runClientApp';
import { useAppData } from '../src/AppData';
import { useConfig, useData } from '../src/RouteContext';

describe('run client app', () => {
  let windowSpy;
  let documentSpy;
  const mockData = {
    location: new URL('http://localhost:4000/'),
    history: {
      replaceState: vi.fn(),
    },
    addEventListener: vi.fn(),
  };
  beforeEach(() => {
    process.env.ICE_CORE_ROUTER = 'true';
    windowSpy = vi.spyOn(global, 'window', 'get');
    documentSpy = vi.spyOn(global, 'document', 'get');

    windowSpy.mockImplementation(() => mockData);
    documentSpy.mockImplementation(() => ({
      head: {
        querySelector: () => ({
          content: '',
        }),
      },
      body: {
        appendChild: () => null,
      },
      getElementById: () => null,
      createElement: () => ({
        id: '',
      }),
      querySelectorAll: () => [],
    }));
  });
  afterEach(() => {
    (window as any).__ICE_DATA_LOADER__ = undefined;
    windowSpy.mockRestore();
    documentSpy.mockRestore();
  });

  let domstring = '';

  const serverRuntime = async ({ setRender }) => {
    setRender((container, element) => {
      try {
        domstring = renderToString(element as any);
      } catch (err) { }
    });
  };

  let staticMsg = '';

  const staticRuntime = async () => {
    staticMsg = 'static';
  };

  const wrapperRuntime = async ({ addWrapper }) => {
    const RouteWrapper = ({ children }) => {
      return <div>{children}</div>;
    };
    addWrapper(RouteWrapper, true);
  };

  const providerRuntmie = async ({ addProvider }) => {
    const Provider = ({ children }) => {
      return <div>{children}</div>;
    };
    addProvider(Provider);
    // Add twice.
    addProvider(Provider);
  };

  const basicRoutes = [
    {
      id: 'home',
      path: '/',
      componentName: 'Home',
      load: async () => ({
        default: () => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const appData = useAppData();
          return (
            <div>home{appData?.msg || ''}</div>
          );
        },
        pageConfig: () => ({ title: 'home' }),
        dataLoader: async () => ({ data: 'test' }),
      }),
    },
  ];

  it('run with static runtime', async () => {
    await runClientApp({
      app: {
        dataLoader: async () => {
          return { msg: staticMsg };
        },
      },
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime], statics: [staticRuntime] },
      hydrate: false,
    });
    expect(domstring).toBe('<div>home<!-- -->static</div>');
  });

  it('run client basic', async () => {
    windowSpy.mockImplementation(() => ({
      ...mockData,
      location: new URL('http://localhost:4000/?test=1&runtime=true&baisc'),
    }));

    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client single-router', async () => {
    process.env.ICE_CORE_ROUTER = '';
    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    process.env.ICE_CORE_ROUTER = 'true';
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client with wrapper', async () => {
    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime, wrapperRuntime] },
      hydrate: true,
    });
    expect(domstring).toBe('<div><div>home</div></div>');
  });

  it('run client with app provider', async () => {
    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime, providerRuntmie] },
      hydrate: true,
    });
    expect(domstring).toBe('<div><div><div>home</div></div></div>');
  });

  it('run client with empty route', async () => {
    await runClientApp({
      app: {},
      routes: [],
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
  });

  it('run client with memory router', async () => {
    const routes = [...basicRoutes, {
      id: 'about',
      path: '/about',
      componentName: 'About',
      load: async () => ({
        default: () => {
          return (
            <div>about</div>
          );
        },
      }),
    }];
    await runClientApp({
      app: {
        default: {
          router: {
            type: 'memory',
            initialEntries: ['/about'],
          },
        },
      },
      routes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: true,
    });

    expect(domstring).toBe('<div>about</div>');
    await runClientApp({
      app: {
        default: {
        },
      },
      routes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: true,
    });
  });

  it('run client with memory router - from context', async () => {
    windowSpy.mockImplementation(() => ({
      ...mockData,
      __ICE_APP_CONTEXT__: {
        routePath: '/about',
      },
    }));
    const routes = [...basicRoutes, {
      id: 'about',
      path: '/about',
      componentName: 'About',
      load: async () => ({
        default: () => {
          return (
            <div>about</div>
          );
        },
      }),
    }];
    await runClientApp({
      app: {
      },
      routes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: true,
      memoryRouter: true,
    });

    expect(domstring).toBe('<div>about</div>');
  });

  it('run client with hash router', async () => {
    await runClientApp({
      app: {
        default: {
          router: {
            type: 'hash',
          },
        },
      },
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: true,
    });
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client with app data', async () => {
    let executed = false;
    await runClientApp({
      app: {
        dataLoader: async () => {
          executed = true;
          return { msg: '-getAppData' };
        },
      },
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    expect(domstring).toBe('<div>home<!-- -->-getAppData</div>');
    expect(executed).toBe(true);
  });

  it('run client with app data', async () => {
    let useGlobalLoader = false;
    let executed = false;
    windowSpy.mockImplementation(() => ({
      ...mockData,
      __ICE_DATA_LOADER__: {
        getData: async () => {
          useGlobalLoader = true;
          return { msg: '-globalData' };
        },
      },
    }));

    await runClientApp({
      app: {
        dataLoader: async () => {
          executed = true;
          return { msg: 'app' };
        },
      },
      routes: basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    expect(executed).toBe(false);
    expect(useGlobalLoader).toBe(true);
    expect(domstring).toBe('<div>home<!-- -->-globalData</div>');
  });

  it('run client with AppErrorBoundary', async () => {
    await runClientApp({
      app: {
        default: {
          app: {
            errorBoundary: true,
          },
        },
      },
      routes: [{
        id: 'home',
        path: '/',
        componentName: 'Home',
        load: async () => ({
          default: () => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const config = useConfig();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const data = useData();
            return (
              <div>home{data?.data}{config.title}</div>
            );
          },
          pageConfig: () => ({ title: 'home' }),
          dataLoader: async () => ({ data: 'test' }),
        }),
      }],
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    expect(domstring).toBe('<div>home<!-- -->test<!-- -->home</div>');
  });

  it('load next page', async () => {
    const indexPage = {
      default: () => <></>,
      pageConfig: () => ({ title: 'index' }),
      dataLoader: async () => ({ type: 'getDataIndex' }),
    };
    const aboutPage = {
      default: () => <></>,
      pageConfig: () => ({ title: 'about' }),
      dataLoader: async () => ({ type: 'getDataAbout' }),
    };
    const mockedModules = [
      {
        id: 'index',
        load: async () => {
          return indexPage;
        },
      },
      {
        id: 'about',
        load: async () => {
          return aboutPage;
        },
      },
    ];
    const { routesData, routesConfig, routeModules } = await loadNextPage(
      // @ts-ignore
      [{ route: mockedModules[0] }],
      {
        // @ts-ignore
        matches: [{ route: mockedModules[1] }],
        routesData: {},
        routeModules: {},
      },
    );
    expect(routesData).toStrictEqual({
      index: { type: 'getDataIndex' },
    });
    expect(routesConfig).toStrictEqual({
      index: {
        title: 'index',
      },
    });
    expect(routeModules).toStrictEqual({
      index: indexPage,
    });
  });
});
