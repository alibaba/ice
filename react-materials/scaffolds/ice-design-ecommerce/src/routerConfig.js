// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Goods from './pages/Goods';
import OrderList from './pages/OrderList';
import Trade from './pages/Trade';
import Customer from './pages/Customer';
import Statcenter from './pages/Statcenter';
import Setting from './pages/Setting';

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
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/trade',
    component: Trade,
  },
  {
    path: '/goods',
    component: Goods,
  },
  {
    path: '/order/list',
    component: OrderList,
  },
  {
    path: '/customer',
    component: Customer,
  },
  {
    path: '/statcenter',
    component: Statcenter,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
