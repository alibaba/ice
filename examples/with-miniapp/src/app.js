/* eslint no-undef:0 */
import { createMiniAppHistory } from 'miniapp-history';

function createApp() {
  const routes = [{
    path: '/about',
    source: 'pages/About/index',
    entryName: 'pages/About/index'
  }];

  window.history = createMiniAppHistory(routes);
  window.location = window.history.location;
}

createApp();
