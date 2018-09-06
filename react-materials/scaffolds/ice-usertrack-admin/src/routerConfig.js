// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import Home from './pages/Home';
import Scheme from './pages/Scheme';
import Combine from './pages/Combine';
import AutoTest from './pages/AutoTest';
import Report from './pages/Report';
import Snapshot from './pages/Snapshot';
import Monitor from './pages/Monitor';
import MonitorDetail from './pages/MonitorDetail';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/application/mobile',
    layout: BasicLayout,
    component: Home,
  },
  {
    path: '/application/monitor',
    layout: BasicLayout,
    component: MonitorDetail,
  },
  {
    path: '/maintain/scheme',
    layout: BasicLayout,
    component: Scheme,
  },
  {
    path: '/maintain/combine',
    layout: BasicLayout,
    component: Combine,
  },
  {
    path: '/validate/autotest',
    layout: BasicLayout,
    component: AutoTest,
  },
  {
    path: '/validate/report',
    layout: BasicLayout,
    component: Report,
  },
  {
    path: '/monitor/snapshot',
    layout: BasicLayout,
    component: Snapshot,
  },
  {
    path: '/monitor/version',
    layout: BasicLayout,
    component: Monitor,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
