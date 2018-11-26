// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import Portlets from './pages/Portlets';
import Terms from './pages/Terms';
import Result from './pages/Result';
import Fail from './pages/Fail';
import ServerError from './pages/ServerError';
import Forbidden from './pages/Forbidden';
import Empty from './pages/Empty';
import BasicList from './pages/BasicList';
import CardList from './pages/CardList';
import BasicTable from './pages/BasicTable';
import GeneralTable from './pages/GeneralTable';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/table/basic',
    component: BasicTable,
  },
  {
    path: '/table/general',
    component: GeneralTable,
  },
  {
    path: '/chart/list',
    component: Charts,
  },
  {
    path: '/list/basic',
    component: BasicList,
  },
  {
    path: '/list/card',
    component: CardList,
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
    path: '/portlets/base',
    component: Portlets,
  },
  {
    path: '/portlets/terms',
    component: Terms,
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
