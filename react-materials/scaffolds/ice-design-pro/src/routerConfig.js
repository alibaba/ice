// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import Portlets from './pages/Portlets';
import Terms from './pages/Terms';
import Result from './pages/Result';
import Fail from './pages/Fail';
import ServerError from './pages/ServerError';
import Forbidden from './pages/Forbidden';
import Empty from './pages/Empty';
import List from './pages/List';
import CardList from './pages/CardList';
import BasicTable from './pages/BasicTable';
import TableDisplay from './pages/TableDisplay';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterLayout,
    component: Dashboard,
  },
  {
    path: '/table',
    layout: HeaderAsideFooterLayout,
    component: BasicTable,
    children: [
      {
        path: 'basic-table',
        layout: HeaderAsideFooterLayout,
        component: BasicTable,
      },
      {
        path: 'table-display',
        layout: HeaderAsideFooterLayout,
        component: TableDisplay,
      },
    ],
  },
  {
    path: '/list',
    layout: HeaderAsideFooterLayout,
    component: List,
    children: [
      {
        path: 'article-list',
        layout: HeaderAsideFooterLayout,
        component: List,
      },
      {
        path: 'card-list',
        layout: HeaderAsideFooterLayout,
        component: CardList,
      },
    ],
  },
  {
    path: '/exception',
    layout: HeaderAsideFooterLayout,
    component: ServerError,
    children: [
      {
        path: '500',
        layout: HeaderAsideFooterLayout,
        component: ServerError,
      },
      {
        path: '403',
        layout: HeaderAsideFooterLayout,
        component: Forbidden,
      },
      {
        path: '204',
        layout: HeaderAsideFooterLayout,
        component: Empty,
      },
      {
        path: '404',
        layout: HeaderAsideFooterLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/result',
    layout: HeaderAsideFooterLayout,
    component: Result,
    children: [
      {
        path: 'success',
        layout: HeaderAsideFooterLayout,
        component: Result,
      },
      {
        path: 'fail',
        layout: HeaderAsideFooterLayout,
        component: Fail,
      },
    ],
  },
  {
    path: '/portlets',
    layout: HeaderAsideFooterLayout,
    component: Portlets,
    children: [
      {
        path: 'base',
        layout: HeaderAsideFooterLayout,
        component: Portlets,
      },
      {
        path: 'terms',
        layout: HeaderAsideFooterLayout,
        component: Terms,
      },
    ],
  },
  {
    path: '/chart',
    layout: HeaderAsideFooterLayout,
    component: Charts,
    children: [
      {
        path: 'chart-list',
        layout: HeaderAsideFooterLayout,
        component: Charts,
      },
    ],
  },
  {
    path: '*',
    layout: HeaderAsideFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
