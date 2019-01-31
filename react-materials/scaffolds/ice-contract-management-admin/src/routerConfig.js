// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import ContractCenter from './pages/ContractCenter';
import MyContract from './pages/MyContract';
import ContractSearch from './pages/ContractSearch';

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
    path: '/contract/my',
    component: MyContract,
  },
  {
    path: '/contract/search',
    component: ContractSearch,
  },
  {
    path: '/contract/index',
    component: ContractCenter,
  },
];

export default routerConfig;
