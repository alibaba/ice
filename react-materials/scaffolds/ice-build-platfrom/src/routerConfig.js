// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Setting from './pages/Setting';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Task from './pages/Task';
import New from './pages/New';

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
    path: '/builder',
    component: Builder,
  },
  {
    path: '/task',
    component: Task,
  },
  {
    path: '/new',
    component: New,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
