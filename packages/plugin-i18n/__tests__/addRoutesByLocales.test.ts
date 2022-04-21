import addRoutesByLocales from '../src/utils/addRoutesByLocales';

let Layout = null;
let ComponentA = null;
let ComponentB = null;

const i18nConfig = { 
  locales: ['en-US', 'zh-CN'], 
  defaultLocale: 'zh-CN',
}

describe('add-routes-by-locales', () => {
  test('one level', () => {
    const routes = [
      {
        path: '/',
        exact: true,
        component: ComponentA,
      },
      {
        path: '/b',
        exact: true,
        component: ComponentB,
      },
    ];
    const expectedRoutes = [
      {
        path: '/zh-CN',
        exact: true,
        component: ComponentA,
      },
      {
        path: '/zh-CN/b',
        exact: true,
        component: ComponentB,
      },
      {
        path: '/en-US',
        exact: true,
        component: ComponentA,
      },
      {
        path: '/en-US/b',
        exact: true,
        component: ComponentB,
      },
      {
        path: '/',
        exact: true,
        component: ComponentA,
      },
      {
        path: '/b',
        exact: true,
        component: ComponentB,
      },
    ];
    const resultRoutes = addRoutesByLocales(routes, i18nConfig);
    expect(resultRoutes).toEqual(expectedRoutes);
  })

  test('two levels', () => {
    const routes = [
      {
        path: '/',
        component: Layout,
        children: [
          {
            exact: true,
            path: '/a',
            component: ComponentA,
          },
          {
            path: '/b',
            exact: true,
            component: ComponentB,
          },
        ],
      },
    ];
    const expectedRoutes = [
      {
        path: '/zh-CN',
        component: Layout,
        children: [
          {
            exact: true,
            path: '/zh-CN/a',
            component: ComponentA,
          },
          {
            path: '/zh-CN/b',
            exact: true,
            component: ComponentB,
          },
        ],
      },
      {
        path: '/en-US',
        component: Layout,
        children: [
          {
            exact: true,
            path: '/en-US/a',
            component: ComponentA,
          },
          {
            path: '/en-US/b',
            exact: true,
            component: ComponentB,
          },
        ],
      },
      {
        path: '/',
        component: Layout,
        children: [
          {
            exact: true,
            path: '/a',
            component: ComponentA,
          },
          {
            path: '/b',
            exact: true,
            component: ComponentB,
          },
        ],
      },
    ];
    const resultRoutes = addRoutesByLocales(routes, i18nConfig);

    expect(resultRoutes).toEqual(expectedRoutes);
  })

  test('multi levels', () => {
    const routes = [
      {
        path: '/',
        component: Layout,
        children: [
          {
            path: '/a',
            children: [
              {
                exact: true,
                path: '/a/about',
                component: ComponentA,
              }
            ]
          },
          {
            path: '/',
            exact: true,
            children: [
              {
                exact: true,
                path: '/',
                component: ComponentB,
              }
            ]
          },
        ]
      },
    ];
    const expectedRoutes = [
      {
        path: '/zh-CN',
        component: Layout,
        children: [
          {
            path: '/zh-CN/a',
            children: [
              {
                exact: true,
                component: ComponentA,
                path: '/zh-CN/a/about'
              }
            ]
          },
          {
            path: '/zh-CN',
            exact: true,
            children: [
              {
                exact: true,
                component: ComponentB,
                path: '/zh-CN'
              }
            ]
          }
        ]
      },
      {
        path: '/en-US',
        component: Layout,
        children: [
          {
            path: '/en-US/a',
            children: [
              {
                exact: true,
                component: ComponentA,
                path: '/en-US/a/about'
              }
            ]
          },
          {
            path: '/en-US',
            exact: true,
            children: [
              {
                exact: true,
                component: ComponentB,
                path: '/en-US'
              }
            ]
          }
        ]
      },
      {
        path: '/',
        component: Layout,
        children: [
          {
            path: '/a',
            children: [
              {
                exact: true,
                path: '/a/about',
                component: ComponentA,
              }
            ]
          },
          {
            path: '/',
            exact: true,
            children: [
              {
                exact: true,
                path: '/',
                component: ComponentB,
              }
            ]
          },
        ]
      },
    ];
    const resultRoutes = addRoutesByLocales(routes, i18nConfig);
    expect(resultRoutes).toEqual(expectedRoutes);
  })
})