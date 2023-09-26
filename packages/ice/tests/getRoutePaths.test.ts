import { afterAll, expect, it, describe } from 'vitest';
import getRoutePaths from '../src/utils/getRoutePaths.js';

describe('getRoutePaths', () => {
  it('index route with layout', () => {
    const routeManifest = [
      {
        children: [
          {},
        ],
      },
    ];
    // @ts-ignore for mock routeManifest.
    const routePaths = getRoutePaths(routeManifest);
    expect(routePaths).toEqual(['/']);
  });
  it('nested level 1', () => {
    const routeManifest = [
      {
        children: [
          {
            path: 'a',
          },
          {
            path: 'b',
          },
        ],
      },
    ];
    // @ts-ignore for mock routeManifest.
    const routePaths = getRoutePaths(routeManifest);
    expect(routePaths).toEqual(['/a', '/b']);
  });

  it('nested level 2', () => {
    const routeManifest = [
      {
        children: [
          {
            path: 'a',
            children: [
              {
                path: 'a1',
              },
              {
                path: 'a2',
              },
            ],
          },
          {
            path: 'b',
          },
        ],
      },
    ];
    // @ts-ignore for mock routeManifest.
    const routePaths = getRoutePaths(routeManifest, '/');
    expect(routePaths).toEqual(['/a/a1', '/a/a2', '/b']);
  });

  it('nested level 3', () => {
    const routeManifest = [
      {
        children: [
          {
            path: 'a',
            children: [
              {
                path: 'a1',
                children: [
                  {
                    path: 'a11',
                  },
                ],
              },
            ],
          },
          {
            path: 'b',
          },
        ],
      },
    ];
    // @ts-ignore for mock routeManifest.
    const routePaths = getRoutePaths(routeManifest);
    expect(routePaths).toEqual(['/a/a1/a11', '/b']);
  });
});
