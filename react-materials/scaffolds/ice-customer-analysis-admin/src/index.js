import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import router from './router';

const ICE_CONTAINER = document.getElementById('ice-container');
const APP = <HashRouter>{router()}</HashRouter>;

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(APP, ICE_CONTAINER);
