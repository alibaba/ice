// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/formatter';
import { asideMenuConfig } from './menuConfig';

<% if (redux.enabled && redux.registerLoginModule) { %>
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
<% } %>

import Dashboard from './pages/Dashboard';

const routerConfig = [
  {
    path: '/dashboard/monitor',
    component: Dashboard,
  },
  <% if (redux.enabled && redux.registerLoginModule) { %>
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  <% } %>
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
