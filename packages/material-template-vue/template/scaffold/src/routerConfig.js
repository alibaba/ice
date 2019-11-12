// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Home from './pages/Home';
import About from './pages/About';
import BlankLayout from './layouts/BlankLayout';

const routerConfig = [
  {
    path: '/',
    layout: BlankLayout,
    component: Home,
  },
  {
    path: '/about',
    layout: BlankLayout,
    component: About,
  },
];

export default routerConfig;
