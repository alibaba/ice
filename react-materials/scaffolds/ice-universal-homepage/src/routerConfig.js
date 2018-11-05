// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import NormalLayout from './layouts/NormalLayout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: NormalLayout,
    component: HomePage,
  },
  {
    path: '/one',
    layout: BasicLayout,
    component: Dashboard,
  },
  {
    path: '/two',
    layout: BasicLayout,
    component: Dashboard,
  },
  {
    path: '/three',
    layout: BasicLayout,
    component: Dashboard,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
