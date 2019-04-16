window.js_ready = Date.now();

import React from 'react';
import ReactDOM from 'react-dom';

// 载入默认全局样式
import '@icedesign/base/reset.scss';
import 'rc-tooltip/assets/bootstrap.css';

import App from './App';
import ErrorCom from './pages/Error';
import logger from './lib/logger';
import './global.scss';

logger.info('dom ready', window.js_ready - window.dom_start);

// 载入自定义全局样式
const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
document.body.classList.add(`platform-${process.platform}`);

function removeLoading() {
  const loading = document.getElementById('iceworks-loading');
  if (loading) {
    loading.remove();
  }
}

try {
  ReactDOM.render(<App />, container, () => {
    removeLoading();
    window.app_rendered = Date.now();
    logger.info('app rendered', window.app_rendered - window.dom_start);
  });
} catch (e) {
  ReactDOM.render(<ErrorCom error={e} />, container, () => {
    removeLoading();
  });
}
