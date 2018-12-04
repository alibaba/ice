/* eslint import/first:0 */
import ReactDOM from 'react-dom';
import router from './router';

// 载入默认全局样式 normalize
import '@alifd/next/reset.scss';

const ICE_CONTAINER = document.getElementById('ice-container');
if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(router(), ICE_CONTAINER);
