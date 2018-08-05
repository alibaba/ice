// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Dashboard from 'pages/Dashboard';
import Notifications from 'pages/Notifications';
import Icons from 'pages/Icons';
import TableList from 'pages/TableList';
import Upgrade from 'pages/Upgrade';
import UserPage from 'pages/UserPage';

const routerConfig = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/icons',
    name: 'Icons',
    component: Icons,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
  },
  {
    path: '/user-page',
    name: 'User Profile',
    component: UserPage,
  },
  {
    path: '/extended-tables',
    name: 'Table List',
    component: TableList,
  },
  {
    pro: true,
    path: '/upgrade',
    name: 'Upgrade to PRO',
    component: Upgrade,
  },
];

routerConfig.push({
  redirect: true,
  path: '/',
  pathTo: '/dashboard',
  name: 'Dashboard',
});

export default routerConfig;
