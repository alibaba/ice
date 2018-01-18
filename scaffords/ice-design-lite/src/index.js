import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/lib/_components/@alife/next-core/lib/index.scss';
import routes from './routes';

// 以下代码 ICE 自动生成, 请勿修改
const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(routes, ICE_CONTAINER);
