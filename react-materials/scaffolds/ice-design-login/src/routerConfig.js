// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BlankLayout from './layouts/BlankLayout';
import UserLayout from './layouts/UserLayout';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: UserLayout,
    component: UserLogin,
  },
  {
    path: '/register',
    layout: UserLayout,
    component: UserRegister,
  },
  {
    path: '*',
    layout: BlankLayout,
    component: NotFound,
  },
];

export default routerConfig;
