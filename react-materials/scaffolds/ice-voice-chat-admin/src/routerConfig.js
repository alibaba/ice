// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import Projects from './pages/Projects';
import Skill from './pages/Skill';
import Entities from './pages/Entities';
import Repository from './pages/Repository';
import Generalization from './pages/Generalization';
import Function from './pages/Function';
import Publish from './pages/Publish';
import Analysis from './pages/Analysis';
import Setting from './pages/Setting';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: BasicLayout,
    component: Projects,
  },
  {
    path: '/skill',
    layout: BasicLayout,
    component: Skill,
  },
  {
    path: '/entities',
    layout: BasicLayout,
    component: Entities,
  },
  {
    path: '/repository',
    layout: BasicLayout,
    component: Repository,
  },
  {
    path: '/repository',
    layout: BasicLayout,
    component: Repository,
  },
  {
    path: '/generalization',
    layout: BasicLayout,
    component: Generalization,
  },
  {
    path: '/function',
    layout: BasicLayout,
    component: Function,
  },
  {
    path: '/publish',
    layout: BasicLayout,
    component: Publish,
  },
  {
    path: '/analysis',
    layout: BasicLayout,
    component: Analysis,
  },
  {
    path: '/setting',
    layout: BasicLayout,
    component: Setting,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
