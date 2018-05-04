// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import BlankLayout from './layouts/BlankLayout';
import Dashboard from './pages/Dashboard';
import PostList from './pages/PostList';
import CreatePost from './pages/CreatePost';
import CateList from './pages/CateList';
import CreateCate from './pages/CreateCate';
import TagList from './pages/TagList';
import CreateTag from './pages/CreateTag';
import UserList from './pages/UserList';
import CreateUser from './pages/CreateUser';
import EditPassword from './pages/EditPassword';
import BasicSetting from './pages/BasicSetting';
import NavigationSetting from './pages/NavigationSetting';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

const routerConfig = [
  {
    path: '/login',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Dashboard,
  },
  {
    path: '/setting',
    layout: HeaderAsideFooterResponsiveLayout,
    component: BasicSetting,
    children: [
      {
        path: '/basic',
        layout: HeaderAsideFooterResponsiveLayout,
        component: BasicSetting,
      },
      {
        path: '/navigation',
        layout: HeaderAsideFooterResponsiveLayout,
        component: NavigationSetting,
      },
    ],
  },
  {
    path: '/user',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserList,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: UserList,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CreateUser,
      },
      {
        path: 'pwd',
        layout: HeaderAsideFooterResponsiveLayout,
        component: EditPassword,
      },
    ],
  },
  {
    path: '/tag',
    layout: HeaderAsideFooterResponsiveLayout,
    component: TagList,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: TagList,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CreateTag,
      },
    ],
  },
  {
    path: '/cate',
    layout: HeaderAsideFooterResponsiveLayout,
    component: CateList,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CateList,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CreateCate,
      },
    ],
  },
  {
    path: '/post',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PostList,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: PostList,
      },
      {
        path: 'create',
        layout: HeaderAsideFooterResponsiveLayout,
        component: CreatePost,
      },
    ],
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
