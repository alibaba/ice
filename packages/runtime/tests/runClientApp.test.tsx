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
      getElementById: () => null,
      querySelectorAll: () => [],
    }));
  });
  afterEach(() => {
    windowSpy.mockRestore();
    documentSpy.mockRestore();
  });

  let domstring = '';

  const serverRuntime = async ({ setRender }) => {
    setRender((container, element) => {
      try {
        domstring = renderToString(element as any);
      } catch (err) {}
    });
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
        getConfig: () => ({ title: 'home' }),
        getData: async () => ({ data: 'test' }),
      }),
    },
  ];

  it('run client basic', async () => {
    windowSpy.mockImplementation(() => ({
      ...mockData,
      location: new URL('http://localhost:4000/?test=1&runtime=true&baisc'),
    }));

    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: [serverRuntime],
      hydrate: false,
    });
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client single-router', async () => {
    process.env.ICE_CORE_ROUTER = '';
    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: [serverRuntime],
      hydrate: false,
    });
    process.env.ICE_CORE_ROUTER = 'true';
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client with wrapper', async () => {
    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: [serverRuntime, wrapperRuntime],
      hydrate: true,
    });
    expect(domstring).toBe('<div><div>home</div></div>');
  });

  it('run client with app provider', async () => {
    await runClientApp({
      app: {},
      routes: basicRoutes,
      runtimeModules: [serverRuntime, providerRuntmie],
      hydrate: true,
    });
    expect(domstring).toBe('<div><div><div>home</div></div></div>');
  });

  it('run client with empty route', async () => {
    await runClientApp({
      app: {},
      routes: [],
      runtimeModules: [serverRuntime],
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
      runtimeModules: [serverRuntime],
      hydrate: true,
    });

    expect(domstring).toBe('<div>about</div>');
    await runClientApp({
      app: {
        default: {
        },
      },
      routes,
      runtimeModules: [serverRuntime],
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
      runtimeModules: [serverRuntime],
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
      runtimeModules: [serverRuntime],
      hydrate: true,
    });
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client with app data', async () => {
    let executed = false;
    await runClientApp({
      app: {
        getAppData: async () => {
          executed = true;
          return { msg: '-getAppData' };
        },
      },
      routes: basicRoutes,
      runtimeModules: [serverRuntime],
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
      __ICE_DATA_LOADER__: async () => {
        useGlobalLoader = true;
        return { msg: '-globalData' };
      },
    }));

    await runClientApp({
      app: {
        getAppData: async () => {
          executed = true;
          return { msg: 'app' };
        },
      },
      routes: basicRoutes,
      runtimeModules: [serverRuntime],
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
          getConfig: () => ({ title: 'home' }),
          getData: async () => ({ data: 'test' }),
        }),
      }],
      runtimeModules: [serverRuntime],
      hydrate: false,
    });
    expect(domstring).toBe('<div>home<!-- -->test<!-- -->home</div>');
  });

  it('load next page', async () => {
    const homePage = {
      default: () => <></>,
      getConfig: () => ({ title: 'home' }),
      getData: async () => ({ type: 'getDataHome' }),
    };
    const aboutPage = {
      default: () => <></>,
      getConfig: () => ({ title: 'about' }),
      getData: async () => ({ type: 'getDataAbout' }),
    };
    const mockedModules = [
      {
        id: 'home',
        load: async () => {
          return homePage;
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
      home: { type: 'getDataHome' },
    });
    expect(routesConfig).toStrictEqual({
      home: {
        title: 'home',
      },
    });
    expect(routeModules).toStrictEqual({
      home: homePage,
    });
  });
});