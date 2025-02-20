/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { expect, it, vi, describe, beforeEach, afterEach } from 'vitest';
import { fetch, Request, Response } from '@remix-run/web-fetch';
import { useAppData } from '@ice/runtime-kit';
import runClientApp from '../src/runClientApp';

describe('run client app', () => {
  let windowSpy;
  let documentSpy;
  if (!globalThis.fetch) {
    // @ts-expect-error
    globalThis.fetch = fetch;
    // @ts-expect-error
    globalThis.Request = Request;
    // @ts-expect-error
    globalThis.Response = Response;
  }
  const mockData = {
    location: new URL('http://localhost:4000/'),
    history: {
      replaceState: vi.fn(),
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
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
      } catch (err) {
        domstring = '';
      }
    });
  };

  let staticMsg = '';

  const staticRuntime = async () => {
    staticMsg = 'static';
  };

  const providerRuntmie = async ({ addProvider }) => {
    const Provider = ({ children }) => {
      return <div>{children}</div>;
    };
    addProvider(Provider);
    // Add twice.
    addProvider(Provider);
  };

  const homeItem = {
    default: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const appData = useAppData();
      return (
        <div>home{appData?.msg || ''}</div>
      );
    },
    pageConfig: () => ({ title: 'home' }),
    dataLoader: {
      loader: async () => ({ data: 'test' }),
    },
  };
  const basicRoutes = [
    {
      id: 'home',
      path: '/',
      componentName: 'Home',
      lazy: () => {
        return {
          Component: homeItem.default,
        };
      },
    },
  ];

  it('run with static runtime', async () => {
    await runClientApp({
      app: {
        dataLoader: {
          loader: async () => {
            return { msg: staticMsg };
          },
        },
      },
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
      runtimeModules: { commons: [serverRuntime], statics: [staticRuntime] },
      hydrate: true,
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
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client single-router', async () => {
    const sigleRoutes = [
      {
        id: 'home',
        path: '/',
        lazy: () => {
          return {
            Component: homeItem.default,
            loader: () => {},
          };
        },
      },
    ];
    process.env.ICE_CORE_ROUTER = '';
    await runClientApp({
      app: {},
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => sigleRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    process.env.ICE_CORE_ROUTER = 'true';
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client with app provider', async () => {
    await runClientApp({
      app: {},
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
      runtimeModules: { commons: [serverRuntime, providerRuntmie] },
      hydrate: true,
    });
    expect(domstring).toBe('<div><div><div>home</div></div></div>');
  });

  it('run client with memory router', async () => {
    const routes = [...basicRoutes, {
      id: 'about',
      path: '/about',
      componentName: 'About',
      Component: () => {
        return (
          <div>about</div>
        );
      } }];
    await runClientApp({
      app: {
        default: {
          router: {
            type: 'memory',
            initialEntries: ['/about'],
          },
        },
      },
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => routes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: true,
    });

    expect(domstring).toBe('<div>about</div>');
    await runClientApp({
      app: {
        default: {
        },
      },
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
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
      Component: () => {
        return (
          <div>about</div>
        );
      } }];
    await runClientApp({
      app: {
      },
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => routes,
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
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: true,
    });
    expect(domstring).toBe('<div>home</div>');
  });

  it('run client with app data', async () => {
    let executed = false;
    await runClientApp({
      app: {
        dataLoader: {
          loader: async () => {
            executed = true;
            return { msg: '-getAppData' };
          },
        },
      },
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
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
        dataLoader: {
          loader: async () => {
            executed = true;
            return { msg: 'app' };
          },
        },
      },
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
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
      // @ts-ignore don't need to pass params in test case.
      createRoutes: () => basicRoutes,
      runtimeModules: { commons: [serverRuntime] },
      hydrate: false,
    });
    expect(domstring).toBe('<div>home</div>');
  });
});
