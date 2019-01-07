// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Home from './pages/Home';
import DepartmentManage from './pages/DepartmentManage';
import TeamManage from './pages/TeamManage';
import CostManage from './pages/CostManage';
import QualityManage from './pages/QualityManage';
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
    path: '/manage/company',
    component: Home,
  },
  {
    path: '/manage/department',
    component: DepartmentManage,
  },
  {
    path: '/manage/team',
    component: TeamManage,
  },
  {
    path: '/special/cost',
    component: CostManage,
  },
  {
    path: '/special/cluster',
    component: QualityManage,
  },
  {
    path: '/account/setting',
    component: Setting,
  },
];

export default routerConfig;
