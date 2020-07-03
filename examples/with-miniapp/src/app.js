/* eslint no-undef:0 */
import { createMiniAppHistory } from 'miniapp-history';

function runApp() {
  const routes = [{
    path: '/about',
    source: 'pages/About/index',
    entryName: 'pages/About/index'
  }, {
    path: '/home',
    source: 'pages/Home/index',
    entryName: 'pages/Home/index'
  }];

  window.history = createMiniAppHistory(routes);
  window.location = window.history.location;
}

runApp();
