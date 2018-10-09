// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import Dashboard from './pages/Dashboard';
import Document from './pages/Document';
import Services from './pages/Services';
import Member from './pages/Member';
import Setting from './pages/Setting';

const routerConfig = [
  {
    path: '/',
    layout: BasicLayout,
    component: Dashboard,
  },
  {
    path: '/document',
    layout: BasicLayout,
    component: Document,
  },
  {
    path: '/services',
    layout: BasicLayout,
    component: Services,
  },
  {
    path: '/member',
    layout: BasicLayout,
    component: Member,
  },
  {
    path: '/setting',
    layout: BasicLayout,
    component: Setting,
  },
];

export default routerConfig;
