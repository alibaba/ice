// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

// core components/pages
import DashboardPage from 'pages/Dashboard';
import UserProfile from 'pages/UserProfile';
import TableList from 'pages/TableList';
import Typography from 'pages/Typography';
import Icons from 'pages/Icons';
import NotificationsPage from 'pages/Notifications';
import UpgradeToPro from 'pages/UpgradeToPro';

const routerConfig = [
  {
    path: '/dashboard',
    component: DashboardPage,
  },
  {
    path: '/user',
    component: UserProfile,
  },
  {
    path: '/table',
    component: TableList,
  },
  {
    path: '/typography',
    component: Typography,
  },
  {
    path: '/icons',
    component: Icons,
  },
  {
    path: '/notifications',
    component: NotificationsPage,
  },
  {
    path: '/upgrade-to-pro',
    component: UpgradeToPro,
  },
];

export default routerConfig;
