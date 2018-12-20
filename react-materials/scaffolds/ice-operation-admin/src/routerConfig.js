// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Edit from './pages/Edit';
import View from './pages/View';

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
    path: '/home',
    component: Home,
  },
  {
    path: '/edit',
    component: Edit,
  },
  {
    path: '/view',
    component: View,
  },
];

export default routerConfig;
