import { project, storage } from './common';
import Router from '../modules/router';
import { IRouter } from '../../../interface';

const { app, assert } = require('midway-mock/bootstrap');

describe('Test adapter router module', () => {
  let ctx: any;
  let router: any;

  before(() => {
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
    assert.equal(routers.length, 1);
    assert.equal(children.length, 3);
  });

  it('bulk create routers', async () => {
    let params;
    let routerConfigs: IRouter[];
    let testRouterConfig: IRouter;

    // test replacement is false without parent
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
    assert.equal(routerConfigs.length, 2);
    testRouterConfig = routerConfigs[0];
    assert.equal(testRouterConfig.path, '/test');
    assert.equal(testRouterConfig.component, 'BasicLayout');
    assert.equal(testRouterConfig.children[0].path, '/router');
    assert.equal(testRouterConfig.children[0].component, 'NotFound');

    // test replacement is false with parent
    params = {
      data: [
        { path: '/testRouter', component: 'NotFound' }
      ],
      options: {
        replacement: false,
        parent: '/test',
      }
    };
    await router.bulkCreate(params, ctx);

    routerConfigs = await router.getAll(undefined, ctx);
    assert.equal(routerConfigs.length, 2);
    testRouterConfig = routerConfigs[0];
    assert.equal(testRouterConfig.path, '/test');
    assert.equal(testRouterConfig.component, 'BasicLayout');
    assert.equal(testRouterConfig.children[1].path, '/testRouter');
    assert.equal(testRouterConfig.children[1].component, 'NotFound');

    // test replacement is true
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
        replacement: true,
      }
    };
    await router.bulkCreate(params, ctx);

    routerConfigs = await router.getAll(undefined, ctx);
    // all routers with be replaced by the above router
    assert.equal(routerConfigs.length, 1);
    testRouterConfig = routerConfigs[0];
    assert.equal(testRouterConfig.path, '/test');
    assert.equal(testRouterConfig.component, 'BasicLayout');
    assert.equal(testRouterConfig.children[0].path, '/router');
    assert.equal(testRouterConfig.children[0].component, 'NotFound');
  });

  it('delete router', async () => {
    // delete router by compoentName
    const params = { componentName: 'NotFound' };
    await router.delete(params, ctx);
    const routers: IRouter[] = await router.getAll(undefined, ctx);
    let totalNotFoundComponents = 0;
    routers.forEach(router => {
      if (router.component === 'NotFound') {
        totalNotFoundComponents += 1;
      }
      if (router.children) {
        router.children.forEach(child => {
          if (child.component === 'NotFound') {
            totalNotFoundComponents += 1;
          }
        });
      }
    });

    assert.equal(totalNotFoundComponents, 0);
  });
})