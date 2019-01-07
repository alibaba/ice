// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import TestManagement from './pages/TestManagement';
import Setting from './pages/Setting';
import AddStudent from './pages/AddStudent';

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
    path: '/users',
    component: UserManagement,
  },
  {
    path: '/paper',
    component: TestManagement,
  },
  {
    path: '/add',
    component: AddStudent,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
