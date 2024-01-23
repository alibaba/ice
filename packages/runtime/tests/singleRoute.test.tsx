import React from 'react';
import { expect, it, describe } from 'vitest';

import {
  useRoutes,
  Router,
  createHistory,
  matchRoutes,
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from '../src/singleRouter';

describe('route with layout', () => {
  it('basic layout', () => {
    const routes = [
      {
        path: '/',
        children: [
          {
            path: '/home',
          },
        ],
      },
    ];
    const location = {
      pathname: '/home',
    };
    const matchedRoutes = matchRoutes(routes, location, '/');
    expect(matchedRoutes).toHaveLength(2);
  });

  it('nest layout', () => {
    const routes = [
      {
        path: '/',
        children: [
          {
            path: '/home',
            children: [
              {
                path: '/home/child',
              },
            ],
          },
        ],
      },
    ];
    const location = {
      pathname: '/home/child',
    };
    const matchedRoutes = matchRoutes(routes, location, '/');
    expect(matchedRoutes).toHaveLength(3);
  });
});

describe('single route api', () => {
  it('useRoutes', () => {
    expect(useRoutes([{ element: <div>test</div> }])).toStrictEqual(
      <React.Fragment>
        <div>
          test
        </div>
      </React.Fragment>);
  });

  it('Router', () => {
    expect(Router({ children: <div>test</div> })).toStrictEqual(
      <React.Fragment>
        <div>
          test
        </div>
      </React.Fragment>);
  });

  it('createHistory', () => {
    expect(createHistory().location).toBe('');
  });

  it('matchRoutes - single route', () => {
    const routes = [
      {
        path: 'users',
        element: <div>user</div>,
      },
    ];
    const location = {
      pathname: '/test',
    };
    const matchedRoutes = matchRoutes(routes, location, '/');
    expect(matchedRoutes).toHaveLength(1);
    expect(matchedRoutes?.[0].route.path).toBe('users');
  });

  it('matchRoutes - mutiple route', () => {
    const routes = [
      {
        path: 'users',
        element: <div>user</div>,
      },
      {
        path: 'posts',
        element: <div>post</div>,
      },
    ];
    const location = {
      pathname: '/posts',
    };
    const matchedRoutes = matchRoutes(routes, location, '/');
    expect(matchedRoutes).toHaveLength(1);
    expect(matchedRoutes[0].route.path).toBe('posts');
  });

  it('matchRoutes - basename', () => {
    const routes = [
      {
        path: 'users',
        element: <div>user</div>,
      },
      {
        path: 'posts',
        element: <div>post</div>,
      },
    ];
    const matchedRoutes = matchRoutes(routes, '/basename/posts', '/basename');
    expect(matchedRoutes).toHaveLength(1);
    expect(matchedRoutes[0].route.path).toBe('posts');
  });

  it('Link', () => {
    expect(Link()).toBe(null);
  });

  it('Outlet', () => {
    expect(Outlet()).toStrictEqual(<React.Fragment />);
  });

  it('useParams', () => {
    expect(useParams()).toStrictEqual({});
  });

  it('useSearchParams', () => {
    expect(useSearchParams()[0]).toStrictEqual({});
  });

  it('useLocation', () => {
    expect(useLocation()).toStrictEqual({});
  });

  it('useNavigate', () => {
    expect(useNavigate()).toStrictEqual({});
  });
});
