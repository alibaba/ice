// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import Home from './pages/Home';
import DepartmentManage from './pages/DepartmentManage';
import TeamManage from './pages/TeamManage';
import CostManage from './pages/CostManage';
import QualityManage from './pages/QualityManage';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/manage/company',
    layout: BasicLayout,
    component: Home,
  },
  {
    path: '/manage/department',
    layout: BasicLayout,
    component: DepartmentManage,
  },
  {
    path: '/manage/project',
    layout: BasicLayout,
    component: NotFound,
  },
  {
    path: '/manage/team',
    layout: BasicLayout,
    component: TeamManage,
  },
  {
    path: '/special/cost',
    layout: BasicLayout,
    component: CostManage,
  },
  {
    path: '/special/cluster',
    layout: BasicLayout,
    component: QualityManage,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
