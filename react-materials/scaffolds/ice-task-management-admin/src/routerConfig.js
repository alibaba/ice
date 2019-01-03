// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Document from './pages/Document';
import Services from './pages/Services';
import Member from './pages/Member';
import Setting from './pages/Setting';
import AddDocument from './pages/AddDocument';
import AddMember from './pages/AddMember';
import Activities from './pages/Activities';

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
    component: Dashboard,
  },
  {
    path: '/document',
    component: Document,
  },
  {
    path: '/services',
    component: Services,
  },
  {
    path: '/activities',
    component: Activities,
  },
  {
    path: '/member',
    component: Member,
  },
  {
    path: '/add/document',
    component: AddDocument,
  },
  {
    path: '/add/member',
    component: AddMember,
  },
  {
    path: '/setting',
    component: Setting,
  },
];

export default routerConfig;
