// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import ModelManagement from './pages/ModelManagement';
import ModelMarket from './pages/ModelMarket';
import ModelPerformance from './pages/ModelPerformance';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
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
    path: '/management',
    component: ModelManagement,
  },
  {
    path: '/market',
    component: ModelMarket,
  },
  {
    path: '/performance',
    component: ModelPerformance,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
