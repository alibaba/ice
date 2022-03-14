import formatRoutes from '../src/runtime/formatRoutes';
import { IRouterConfig } from '../src/types';

let mockComponentA = null;
let mockComponentB = null;
let mockComponentC = null;

describe('format-routes', () => {
  beforeEach(() => {
    mockComponentA = () => {}
    mockComponentB = () => {}
    mockComponentC = () => {}
  });

  test('one level', () => {
    const routes: IRouterConfig[] = [
      {
        path: '/',
        exact: true,
        component: mockComponentA as any,
      },
      {
        path: '/test',
        component: mockComponentB as any,
      },
    ];
    const formatedRoutes = formatRoutes(routes);

    expect(formatedRoutes[0].path).toBe('/');
    expect(formatedRoutes[1].path).toBe('/test');

    expect((formatedRoutes[0].component as any).pageConfig).toEqual({
      componentName: 'mockComponentA'
    });

    expect((formatedRoutes[1].component as any).pageConfig).toEqual({
      componentName: 'mockComponentB'
    });

  })

  test('multi level', () => {
    const routes: IRouterConfig[] = [
      {
        path: '/',
        exact: true,
        component: mockComponentA as any,
      },
      {
        path: '/test',
        children: [
          {
            exact: true,
            path: '/plan',
            children: [{
              path: '/a',
              component: mockComponentB as any,
            }]
          },
          {
            path: '/',
            component: mockComponentC as any,
          },
        ],
      },
    ];
    const formatedRoutes = formatRoutes(routes);

    expect(formatedRoutes[0].path).toBe('/');
    expect(formatedRoutes[1].path).toBe('/test');

    expect(formatedRoutes[1].children[0].path).toBe('/test/plan');
    expect(formatedRoutes[1].children[1].path).toBe('/test');

    expect(formatedRoutes[1].children[0].children[0].path).toBe('/test/plan/a');
    expect((formatedRoutes[1].children[0].children[0].component as any).pageConfig).toEqual({
      componentName: 'mockComponentB'
    });

    expect(formatedRoutes[1].children[1].children).toBeUndefined();

  })

  test('children priority', () => {
    const routes: IRouterConfig[] = [
      {
        path: '/test',
        component: mockComponentA as any,
        children: [
          {
            exact: true,
            path: '/plan',
            component: mockComponentB as any,
          },
          {
            path: '/',
            component: mockComponentC as any,
          },
        ],
      },
    ];

    const formatedRoutes = formatRoutes(routes);

    expect((formatedRoutes[0].component as any).pageConfig).toBeUndefined();
    expect((formatedRoutes[0].children[0].component as any).pageConfig).toEqual({
      componentName: 'mockComponentB'
    });
    expect((formatedRoutes[0].children[1].component as any).pageConfig).toEqual({
      componentName: 'mockComponentC'
    });
  })

  test('call formatRoutes function more than one times with the same routes', () => {
    const routes: IRouterConfig[] = [
      {
        path: '/test',
        component: mockComponentA as any,
        children: [
          {
            exact: true,
            path: '/plan',
            component: mockComponentB as any,
          },
          {
            path: '/',
            component: mockComponentC as any,
          },
        ],
      },
    ];

    const formattedRoutes = formatRoutes(routes);
    const anotherFormattedRoutes = formatRoutes(routes);

    expect(formattedRoutes[0].children[0].path).toBe('/test/plan');
    expect(anotherFormattedRoutes[0].children[0].path).toBe('/test/plan');
  })
})