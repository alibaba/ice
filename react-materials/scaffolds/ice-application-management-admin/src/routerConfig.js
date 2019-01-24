// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Account from './pages/Account';
import Query from './pages/Query';
import UserLogin from './pages/UserLogin';
import App from './pages/App';
import Home from './pages/Home';

const routerConfig = [
  {
    path: '/dashboard',
    component: Home,
  },
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/query',
    component: Query,
  },
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/app',
    component: App,
  },
];

export default routerConfig;
