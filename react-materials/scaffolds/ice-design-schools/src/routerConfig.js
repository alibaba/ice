// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserManagement from './pages/UserManagement';
import TestManagement from './pages/TestManagement';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Home,
  },
  {
    path: '/permission/users',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserManagement,
  },
  {
    path: '/test/paper',
    layout: HeaderAsideFooterResponsiveLayout,
    component: TestManagement,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
