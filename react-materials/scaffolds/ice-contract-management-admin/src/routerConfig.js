// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import ContractCenter from './pages/ContractCenter';
import MyContract from './pages/MyContract';
import ContractSearch from './pages/ContractSearch';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: BasicLayout,
    component: ContractCenter,
  },
  {
    path: '/contract/my',
    layout: BasicLayout,
    component: MyContract,
  },
  {
    path: '/contract/search',
    layout: BasicLayout,
    component: ContractSearch,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
