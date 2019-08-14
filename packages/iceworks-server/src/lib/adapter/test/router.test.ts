import { getProject, storage } from './common';
import Router from '../modules/router';
import { IRouter } from '../../../interface';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter router module', () => {
  let ctx: any;

  let router: any;

  before(async () => {
    const project = await getProject();
    router = new Router({ project, storage });
  });

  beforeEach(() => {
    ctx = app.mockContext({
      i18n: app.i18n,
      logger: app.logger
    });
  });

  it('get all routers', async () => {
    const routers: IRouter[] = await router.getAll(undefined, ctx);
    const { children }: IRouter = routers[0];
    assert.strictEqual(routers.length, 1);
    assert.strictEqual(children.length, 3);
  });

  it('bulk create routers without replacement and parent', async () => {
    let params: object;
    let routerConfigs: IRouter[];
    let testRouterConfig: IRouter;

    params = {
      data: [{
        path: '/test', component: 'BasicLayout', children: [
          {
            path: '/router',
            component: 'NotFound',
          }

        ]
      }],
      options: {
        replacement: false,
      }
    };
    await router.bulkCreate(params, ctx);

    routerConfigs = await router.getAll(undefined, ctx);
    assert.strictEqual(routerConfigs.length, 2);
    testRouterConfig = routerConfigs.find(item => item.path === '/test');
    assert.strictEqual(testRouterConfig.path, '/test');
    assert.strictEqual(testRouterConfig.component, 'BasicLayout');
    assert.strictEqual(testRouterConfig.children[0].path, '/router');
    assert.strictEqual(testRouterConfig.children[0].component, 'NotFound');
  });

  it('bulk create routers without replacement but with parent', async () => {
    const params = {
      data: [
        { path: '/testRouter', component: 'NotFound' }
      ],
      options: {
        replacement: false,
        parent: '/test',
      }
    };
    await router.bulkCreate(params, ctx);

    const routerConfigs = await router.getAll(undefined, ctx);
    assert.strictEqual(routerConfigs.length, 2);
    const testRouterConfig = routerConfigs.find(item => item.path === '/test');
    assert.strictEqual(testRouterConfig.path, '/test');
    assert.strictEqual(testRouterConfig.component, 'BasicLayout');
    assert.strictEqual(testRouterConfig.children[1].path, '/testRouter');
    assert.strictEqual(testRouterConfig.children[1].component, 'NotFound');
  });

  it('bulk create routers with replacement', async () => {
    const params = {
      data: [{
        path: '/test', component: 'BasicLayout', children: [
          {
            path: '/router',
            component: 'NotFound',
          }

        ]
      }],
      options: {
        replacement: true,
      }
    };
    await router.bulkCreate(params, ctx);

    const routerConfigs = await router.getAll(undefined, ctx);
    // all routers with be replaced by the above router
    assert.deepStrictEqual(routerConfigs, params.data);
    const testRouterConfig = routerConfigs.find(item => item.path === '/test');
    assert.strictEqual(testRouterConfig.path, '/test');
    assert.strictEqual(testRouterConfig.component, 'BasicLayout');
    assert.strictEqual(testRouterConfig.children[0].path, '/router');
    assert.strictEqual(testRouterConfig.children[0].component, 'NotFound');
  });

  it('delete router by compoentName', async () => {
    const params = { componentName: 'NotFound' };
    await router.delete(params, ctx);

    const routers: IRouter[] = await router.getAll(undefined, ctx);
    const result = routers.some(router => {
      if (router.children) {
        return (router.children.some(child => {
          return child.component === params.componentName;
        }))
      };
      return router.component === params.componentName;
    });

    assert.strictEqual(result, false);
  });
})