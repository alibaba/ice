// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import LibManagement from './pages/LibManagement';
import LibBorrow from './pages/LibBorrow';
import LibRecommend from './pages/LibRecommend';
import LibDonation from './pages/LibDonation';

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
    component: LibManagement,
  },
  {
    path: '/borrow',
    component: LibBorrow,
  },
  {
    path: '/recommend',
    component: LibRecommend,
  },
  {
    path: '/donation',
    component: LibDonation,
  },
];

export default routerConfig;
