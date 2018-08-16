// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Home from './pages/Home';
import New from './pages/New';
import HotPost from './pages/HotPost';
import Status from './pages/Status';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout/';

const routerConfig = [
  {
    path: '/',
    component: Home,
    layout: HeaderAsideFooterLayout,
  },
  {
    path: '/post/new',
    layout: HeaderAsideFooterLayout,
    component: New,
  },
  {
    path: '/post/analysis',
    layout: HeaderAsideFooterLayout,
    component: HotPost,
  },
  {
    path: '/account/status',
    layout: HeaderAsideFooterLayout,
    component: Status,
  },
  {
    path: '/account/settings',
    layout: HeaderAsideFooterLayout,
    component: Settings,
  },
];

routerConfig.push({
  path: '*',
  layout: HeaderAsideFooterLayout,
  component: NotFound,
});

export default routerConfig;
