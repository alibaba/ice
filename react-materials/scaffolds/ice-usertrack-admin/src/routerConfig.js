// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Home from './pages/Home';
import Scheme from './pages/Scheme';
import Combine from './pages/Combine';
import AutoTest from './pages/AutoTest';
import Report from './pages/Report';
import Snapshot from './pages/Snapshot';
import Monitor from './pages/Monitor';
import MonitorDetail from './pages/MonitorDetail';
import Setting from './pages/Setting';
import EditForm from './pages/EditForm';

const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/application/mobile',
    component: Home,
  },
  {
    path: '/application/monitor',
    component: MonitorDetail,
  },
  {
    path: '/application/edit',
    component: EditForm,
  },
  {
    path: '/maintain/scheme',
    component: Scheme,
  },
  {
    path: '/maintain/combine',
    component: Combine,
  },
  {
    path: '/validate/autotest',
    component: AutoTest,
  },
  {
    path: '/validate/report',
    component: Report,
  },
  {
    path: '/monitor/snapshot',
    component: Snapshot,
  },
  {
    path: '/monitor/version',
    component: Monitor,
  },
  {
    path: '/account/setting',
    component: Setting,
  },
];

export default routerConfig;
