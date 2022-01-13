import * as React from 'react';
import getRedirectIndexRoute, { IndexComponent } from '../src/utils/getRedirectIndexRoute';

let Layout = null;
let ComponentA = null;
let ComponentB = null;
const i18nConfig = {
  locales: ['en-US', 'zh-CN'], 
  defaultLocale: 'zh-CN',
}
const basename = '/ice';
describe('get-routes-by-locales', () => {
  test('two level', () => {
    const routes = [
      {
        path: '/en-US/',
        layout: Layout,
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
        layout: Layout,
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
      layout: Layout,
      exact: true,
      children: [
        {
          exact: true,
          path: '/',
          component: (props: any) => (
            <IndexComponent
              {...props} 
              i18nConfig={i18nConfig} 
              basename={basename} 
              OriginIndexComponent={ComponentA}
            />
          ),
        },
      ],
    };
    const resultRoute = getRedirectIndexRoute(routes, i18nConfig, basename);
    console.log(resultRoute);
    expect(resultRoute).toMatchObject(expectedRoute);
  })
})