// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import Analysis from './pages/Analysis';
import NotFound from './pages/NotFound';
import Dismantling from './pages/Dismantling';
import Allocation from './pages/Allocation';
import Selfhelp from './pages/Selfhelp';
import List from './pages/List';
import Batch from './pages/Batch';

const routerConfig = [
  {
    path: '/',
    layout: BasicLayout,
    component: Analysis,
  },
  {
    path: '/dismantling',
    layout: BasicLayout,
    component: Dismantling,
  },
  {
    path: '/allocation',
    layout: BasicLayout,
    component: Allocation,
  },
  {
    path: '/selfHelp',
    layout: BasicLayout,
    component: Selfhelp,
  },
  {
    path: '/list',
    layout: BasicLayout,
    component: List,
  },
  {
    path: '/batch',
    layout: BasicLayout,
    component: Batch,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
