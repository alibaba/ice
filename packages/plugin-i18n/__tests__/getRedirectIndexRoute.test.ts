import getRedirectIndexRoute from '../src/utils/getRedirectIndexRoute';

let Layout = null;
let ChildLayout = null;
let ComponentA = null;
let ComponentB = null;
const i18nConfig = {
  locales: ['en-US', 'zh-CN'], 
  defaultLocale: 'zh-CN',
}
const basename = '/ice';
describe('get-redirect-index-routes', () => {
  test('one level routes', () => {
    const routes = [
      {
        path: '/',
        component: ComponentB
      },
      {
        path: '/a',
        component: ComponentA
      }
    ];
    const expectedRoute = {
      path: '/',
      component: expect.any(Function),
      exact: true,
    }
    const resultRoute = getRedirectIndexRoute(routes, i18nConfig, basename);
    expect(resultRoute).toMatchObject(expectedRoute);
  });

  test('two level routes', () => {
    const routes = [
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
            path: '/',
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
    const expectedRoute = {
      path: '/',
      component: Layout,
      exact: true,
      children: [
        {
          exact: true,
          path: '/',
          component: expect.any(Function),
        },
      ],
    };
    const resultRoute = getRedirectIndexRoute(routes, i18nConfig, basename);
    expect(resultRoute).toMatchObject(expectedRoute);
  });

  test('three level routes', () => {
    const routes = [
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
    const expectedRoute = {
      path: '/',
      component: Layout,
      exact: true,
      children: [
        {
          exact: true,
          path: '/',
          children: [
            {
              exact: true,
              path: '/',
              component: expect.any(Function),
            }
          ]
        },
      ],
    };
    const resultRoute = getRedirectIndexRoute(routes, i18nConfig, basename);
    expect(resultRoute).toMatchObject(expectedRoute);
  });

  test('should receive undefined', () => {
    const routes = [
      {
        path: '/b',
        component: ComponentB
      },
      {
        path: '/a',
        component: ComponentA
      }
    ];
    const resultRoute = getRedirectIndexRoute(routes, i18nConfig, basename);
    expect(resultRoute).toBeUndefined();
  })
})