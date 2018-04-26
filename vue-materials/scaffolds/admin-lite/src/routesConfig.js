import { Dashboard, NotFound } from './pages';
import { HeaderAsideLayout } from './layouts';

const routesConfig = [
  {
    path: '',
    text: 'Dashboard',
    icon: 'el-icon-menu',
    component: HeaderAsideLayout,
    redirect: 'dashboard/analysis',
    children: [
      {
        path: 'dashboard/analysis',
        text: '分析页',
        component: Dashboard,
      },
      {
        path: 'dashboard/monitor',
        text: '监控页',
        component: NotFound,
      },
      {
        path: 'dashboard/workplace',
        text: '工作台',
        component: NotFound,
      },
    ],
  },
  {
    path: '/table',
    text: '表格页',
    icon: 'el-icon-date',
    component: HeaderAsideLayout,
    children: [
      {
        path: 'basic',
        text: '基础表格',
        component: NotFound,
      },
      {
        path: 'fixed',
        text: '固定表格',
        component: NotFound,
      },
    ],
  },
  {
    path: '/form',
    text: '表单页',
    icon: 'el-icon-edit-outline',
    component: HeaderAsideLayout,
    children: [
      {
        path: 'basic',
        text: '典型表单',
        component: NotFound,
      },
      {
        path: 'signup',
        text: '注册表单',
        component: NotFound,
      },
    ],
  },
  {
    path: '/charts',
    text: '图表页',
    icon: 'el-icon-picture-outline',
    component: HeaderAsideLayout,
    children: [
      {
        path: 'line',
        text: '折线图',
        component: NotFound,
      },
      {
        path: 'histogram',
        text: '柱状图',
        component: NotFound,
      },
      {
        path: 'bar',
        text: '条形图',
        component: NotFound,
      },
    ],
  },
  {
    path: '/profile',
    text: '详情页',
    icon: 'el-icon-tickets',
    component: HeaderAsideLayout,
    children: [
      {
        path: 'success',
        text: '基础详情页',
        component: NotFound,
      },
      {
        path: 'fail',
        text: '失败',
        component: NotFound,
      },
    ],
  },
  {
    path: '/result',
    text: '结果页',
    icon: 'el-icon-circle-check-outline',
    component: HeaderAsideLayout,
    children: [
      {
        path: 'success',
        text: '成功',
        component: NotFound,
      },
      {
        path: 'fail',
        text: '失败',
        component: NotFound,
      },
    ],
  },
  {
    path: '*',
    text: '404',
    component: HeaderAsideLayout,
    children: [
      {
        path: '',
        component: NotFound,
      },
    ],
  },
];

const recursiveMenuConfig = (config = []) => {
  const menuConfig = [];

  config.forEach((item) => {
    const menu = {
      path: item.path,
      text: item.text,
      icon: item.icon,
    };
    if (Array.isArray(item.children)) {
      menu.children = recursiveMenuConfig(item.children);
    }
    menuConfig.push(menu);
  });

  return menuConfig;
};

const menuConfig = recursiveMenuConfig(routesConfig);

export { routesConfig, menuConfig };
