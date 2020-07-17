import React from 'react';
import ReactDOM from 'react-dom';
import { IceRouter } from 'ice/Router';
import { createHashHistory } from 'history';

// import routes from './routes'; // 配置式路由，可通过 src/routes.ts 配置路由表
import routes from '../.ice/routes'; // 约定式路由位于 项目根目录/.ice文件夹下

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

const routerProps = {
  routes,
  history: createHashHistory({ basename: 'ice' })
};

ReactDOM.render(<IceRouter {...routerProps } />, ICE_CONTAINER);
