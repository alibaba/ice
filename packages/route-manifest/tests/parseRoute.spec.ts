import { expect, test, describe } from 'vitest';
import { parseRoute } from '../src/index';


describe('parseRoute function', () => {
  test('basic-routes', () => {
    const routes = parseRoute(
      {
        path: '/',
        component: 'index.tsx',
      },
    );
    expect(routes).toMatchSnapshot();
  });
  test('with layout', () => {
    const routes = parseRoute(
      {
        path: '/',
        component: 'layout.tsx',
        children: [
          {
            path: 'home',
            component: 'home.tsx',
          },
          {
            path: 'about',
            component: 'about.tsx',
          },
          {
            path: '/',
            component: 'index.tsx',
          },
        ],
      },
    );
    expect(routes).toMatchSnapshot();
  });
  test('nested layout', () => {
    const routes = parseRoute(
      {
        path: '/',
        component: 'layout.tsx',
        children: [
          {
            path: 'home',
            component: 'home.tsx',
            children: [
              {
                path: '1',
                component: 'home1.tsx',
              },
              {
                path: '2',
                component: 'home2.tsx',
              },
            ],
          },
          {
            path: 'about',
            component: 'about.tsx',
          },
        ],
      },
    );
    expect(routes).toMatchSnapshot();
  });
});
