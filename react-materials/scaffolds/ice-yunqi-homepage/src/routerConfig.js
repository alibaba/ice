// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import Home from './pages/Home';
import Guests from './pages/Guests';
import Partner from './pages/Partner';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: HeaderFooterLayout,
    component: Home,
  },
  {
    path: '/guests',
    layout: HeaderFooterLayout,
    component: Guests,
  },
  {
    path: '/partner',
    layout: HeaderFooterLayout,
    component: Partner,
  },
  {
    path: '*',
    layout: HeaderFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
