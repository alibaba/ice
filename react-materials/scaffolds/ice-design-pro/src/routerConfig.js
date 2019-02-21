// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import BaiscCharts from './pages/BaiscCharts';
import Terms from './pages/Terms';
import Result from './pages/Result';
import BasicList from './pages/BasicList';
import ProjectList from './pages/ProjectList';
import BasicTable from './pages/BasicTable';
import GeneralTable from './pages/GeneralTable';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import Fail from './pages/Fail';
import { Empty, Forbidden, NotFound, ServerError } from './pages/Exception';
import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

const routerConfig = [
  {
    path: '/dashboard/monitor',
    component: Dashboard,
  },
  {
    path: '/chart/general',
    component: Charts,
  },
  {
    path: '/chart/basic',
    component: BaiscCharts,
  },
  {
    path: '/list/basic',
    component: BasicList,
  },
  {
    path: '/list/general',
    component: ProjectList,
  },
  {
    path: '/result/success',
    component: Result,
  },
  {
    path: '/result/fail',
    component: Fail,
  },
  {
    path: '/table/basic',
    component: BasicTable,
  },
  {
    path: '/profile/basic',
    component: Profile,
  },
  {
    path: '/profile/general',
    component: Terms,
  },
  {
    path: '/table/general',
    component: GeneralTable,
  },
  {
    path: '/account/setting',
    component: Setting,
  },
  {
    path: '/exception/500',
    component: ServerError,
  },
  {
    path: '/exception/403',
    component: Forbidden,
  },
  {
    path: '/exception/204',
    component: Empty,
  },
  {
    path: '/exception/404',
    component: NotFound,
  },
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
