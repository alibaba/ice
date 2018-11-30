const path = require('path');
const appendRouter = require('../src/router/appendRouter');
const removeRouter = require('../src/router/removeRouter');

describe('Router 操作测试', () => {
  const cwd = path.join(__dirname, 'features/router');
  test('添加 router', () => {
    const routerConfigFilePath = path.join(cwd, 'src/routerConfig.js');

    const expected = `import Page3 from './pages/Page3';
import Hello from './pages/Hello';
import BlankLayout from './layouts/BlankLayout';
const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
  {
    path: '/new',
    layout: BlankLayout,
    component: Hello,
  },
];
export default routerConfig;
`;
    return appendRouter({
      path: 'new',
      component: 'Hello',
      pagePath: './pages/Hello',
      layoutName: 'BlankLayout',
      layoutPath: './layouts/BlankLayout',
      routerConfigFilePath: routerConfigFilePath,
    }).then((actual) => {
      expect(actual).toEqual(expected);
    });
  });

  test('添加 preview router', () => {
    const routerConfigFilePath = path.join(cwd, 'src/routerConfig.js');

    const expected = `import Page3 from './pages/Page3';
import IceworksPreviewPage from './pages/IceworksPreviewPage';
import BlankLayout from './layouts/BlankLayout';
const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
  {
    path: '/IceworksPreviewPage',
    layout: BlankLayout,
    component: IceworksPreviewPage,
  },
];
export default routerConfig;
`;
    return appendRouter({
      path: 'IceworksPreviewPage',
      component: 'IceworksPreviewPage',
      pagePath: './pages/IceworksPreviewPage',
      layoutName: 'BlankLayout',
      layoutPath: './layouts/BlankLayout',
      routerConfigFilePath: routerConfigFilePath,
    }).then((actual) => {
      expect(actual).toEqual(expected);
    });
  });

  test('添加 preview router 排序在 404 前', () => {
    const routerConfigFilePath = path.join(cwd, 'src/routerConfigHas404.js');

    const expected = `import Page3 from './pages/Page3';
import NotFound from './pages/NotFound';
import IceworksPreviewPage from './pages/IceworksPreviewPage';
import BlankLayout from './layouts/BlankLayout';
const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
  {
    path: '/IceworksPreviewPage',
    layout: BlankLayout,
    component: IceworksPreviewPage,
  },
  {
    path: '*',
    component: NotFound,
    layout: BlankLayout,
  },
];
export default routerConfig;
`;
    return appendRouter({
      path: 'IceworksPreviewPage',
      component: 'IceworksPreviewPage',
      pagePath: './pages/IceworksPreviewPage',
      layoutName: 'BlankLayout',
      layoutPath: './layouts/BlankLayout',
      routerConfigFilePath: routerConfigFilePath,
    }).then((actual) => {
      expect(actual).toEqual(expected);
    });
  });

  test('添加 preview router 已经存在', () => {
    const routerConfigFilePath = path.join(
      cwd,
      'src/routerConfigHasPreview.js',
    );

    const expected = `import Page3 from './pages/Page3';
import IceworksPreviewPage from './pages/IceworksPreviewPage';
import BlankLayout from './layouts/BlankLayout';
const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
  {
    path: '/IceworksPreviewPage',
    layout: BlankLayout,
    component: IceworksPreviewPage,
  },
];
export default routerConfig;
`;
    return appendRouter({
      path: 'IceworksPreviewPage',
      component: 'IceworksPreviewPage',
      pagePath: './pages/IceworksPreviewPage',
      layoutName: 'BlankLayout',
      layoutPath: './layouts/BlankLayout',
      routerConfigFilePath: routerConfigFilePath,
    }).then((actual) => {
      expect(actual).toEqual(expected);
    });
  });

  test('添加 preview router 更换 Layout', () => {
    const routerConfigFilePath = path.join(
      cwd,
      'src/routerConfigHasPreview.js',
    );

    const expected = `import Page3 from './pages/Page3';
import IceworksPreviewPage from './pages/IceworksPreviewPage';
import NewLayout from './layouts/NewLayout';
import BlankLayout from './layouts/BlankLayout';
const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
  {
    path: '/IceworksPreviewPage',
    layout: NewLayout,
    component: IceworksPreviewPage,
  },
];
export default routerConfig;
`;
    return appendRouter({
      path: 'IceworksPreviewPage',
      component: 'IceworksPreviewPage',
      pagePath: './pages/IceworksPreviewPage',
      layoutName: 'NewLayout',
      layoutPath: './layouts/NewLayout',
      routerConfigFilePath: routerConfigFilePath,
    }).then((actual) => {
      expect(actual).toEqual(expected);
    });
  });

  test('删除 router', () => {
    const routerConfigFilePath = path.join(cwd, 'src/routerConfig2.js');
    const expected = `import Page3 from './pages/Page3';
import BlankLayout from './layouts/BlankLayout';
const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
];
export default routerConfig;
`;
    return removeRouter({
      path: '/IceworksPreviewPage',
      pagePath: './pages/IceworksPreviewPage',
      routerConfigFilePath: routerConfigFilePath,
    }).then((actual) => {
      expect(actual).toEqual(expected);
    });
  });
});
