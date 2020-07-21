/* eslint no-undef:0 */
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from 'history';
import { createMiniAppHistory } from 'miniapp-history';
import { isMiniAppPlatform } from './env';

let history;

function createHistory({ routes, customHistory, type, basename }) {
  if (customHistory) {
    history = customHistory;
  } else if (type === 'hash') {
    history = createHashHistory({ basename });
  } else if (type === 'browser') {
    history = createBrowserHistory({ basename });
  } else if (isMiniAppPlatform) {
    window.history = createMiniAppHistory(routes);
    window.location = window.history.location;
    history = window.history;
  } else {
    history = createMemoryHistory();
  }
  return history;
}

function getHistory() {
  return isMiniAppPlatform ? window.history : history;
}

export { getHistory, createHistory };
