import formatRoutes from '../src/runtime/formatRoutes';
import { IRouterConfig } from '../src/types';

const mockComponent = () => {};

describe('format-routes', () => {
  test('one level', () => {
    const routes: IRouterConfig[] = [
      {
        path: '/',
        exact: true,
        component: mockComponent as any,
      },
      {
        path: '/test',
        component: mockComponent as any,
      },
    ];
    const formatedRoutes = formatRoutes(routes);


    expect(formatedRoutes[0].path).toBe('/');
    expect(formatedRoutes[1].path).toBe('/test');

    expect((formatedRoutes[0].component as any).pageConfig).toEqual({
      componentName: 'mockComponent'
    });

    expect((formatedRoutes[0].component as any).pageConfig).toEqual({
      componentName: 'mockComponent'
    });

  })

  test('multi level', () => {
    const routes: IRouterConfig[] = [
      {
        path: '/',
        exact: true,
        component: mockComponent as any,
      },
      {
        path: '/test',
        children: [
          {
            exact: true,
            path: '/plan',
            children: [{
              path: '/a',
              component: mockComponent as any,
            }]
          },
          {
            path: '/',
            component: mockComponent as any,
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
      componentName: 'mockComponent'
    });

    expect(formatedRoutes[1].children[1].children).toBeUndefined();

  })

  test('childrens priority', () => {
    const routes: IRouterConfig[] = [
      {
        path: '/test',
        component: mockComponent as any,
        children: [
          {
            exact: true,
            path: '/plan',
            component: mockComponent as any,
          },
          {
            path: '/',
            component: mockComponent as any,
          },
        ],
      },
    ];
    const formatedRoutes = formatRoutes(routes);

    expect((formatedRoutes[0].component as any).pageConfig).toBeUndefined();
    expect((formatedRoutes[0].children[0].component as any).pageConfig).toEqual({
      componentName: 'mockComponent'
    });
    expect((formatedRoutes[0].children[1].component as any).pageConfig).toEqual({
      componentName: 'mockComponent'
    });
  })
})