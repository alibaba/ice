// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Projects from './pages/Projects';
import Skill from './pages/Skill';
import Entities from './pages/Entities';
import Repository from './pages/Repository';
import Generalization from './pages/Generalization';
import Function from './pages/Function';
import Publish from './pages/Publish';
import Analysis from './pages/Analysis';
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
    path: '/dashboard',
    component: Projects,
  },
  {
    path: '/skill',
    component: Skill,
  },
  {
    path: '/entities',
    component: Entities,
  },
  {
    path: '/repository',
    component: Repository,
  },
  {
    path: '/repository',
    component: Repository,
  },
  {
    path: '/generalization',
    component: Generalization,
  },
  {
    path: '/function',
    component: Function,
  },
  {
    path: '/publish',
    component: Publish,
  },
  {
    path: '/analysis',
    component: Analysis,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
