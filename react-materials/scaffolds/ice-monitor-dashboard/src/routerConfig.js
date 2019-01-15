// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Business from './pages/Business';
import DataCenter from './pages/DataCenter';
import TrafficStatistics from './pages/TrafficStatistics';
import UserStatistics from './pages/UserStatistics';
import UserActivities from './pages/UserActivities';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Setting from './pages/Setting';

const routerConfig = [
  {
    path: '/account/login',
    component: UserLogin,
  },
  {
    path: '/account/register',
    component: UserRegister,
  },
  {
    path: '/dashboard',
    component: Business,
  },
  {
    path: '/traffic/statistics',
    component: TrafficStatistics,
  },
  {
    path: '/user/statistics',
    component: UserStatistics,
  },
  {
    path: '/user/activities',
    component: UserActivities,
  },
  {
    path: '/datacenter',
    component: DataCenter,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
