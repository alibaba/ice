// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import Analysis from './pages/Analysis';
import Schedule from './pages/Schedule';
import Conversion from './pages/Conversion';

const routerConfig = [
  {
    path: '/',
    layout: BasicLayout,
    component: Analysis,
  },
  {
    path: '/schedule',
    layout: BasicLayout,
    component: Schedule,
  },
  {
    path: '/conversion',
    layout: BasicLayout,
    component: Conversion,
  },
];

export default routerConfig;
