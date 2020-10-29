import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';
import { createMiniAppHistory } from 'miniapp-history';
import { isMiniAppPlatform, isWeex, isKraken } from './env';

// eslint-disable-next-line
let history;

function createHistory({ routes, customHistory, type, basename, location }: any) {
  if (process.env.__IS_SERVER__) {
    history = createMemoryHistory();
    history.location = location;
  } else if (customHistory) {
    history = customHistory;
  } else {
    // Force memory history when env is weex or kraken
    if (isWeex || isKraken) {
      type = 'memory';
    }
    if (type === 'hash') {
      history = createHashHistory({ basename });
    } else if (type === 'browser') {
      history = createBrowserHistory({ basename });
    } else if (isMiniAppPlatform) {
      (window as any).history = createMiniAppHistory(routes);
      window.location = (window.history as any).location;
      history = window.history;
    }
  }
  return history;
}

function getHistory() {
  return isMiniAppPlatform ? window.history : history;
}

export { getHistory, createHistory, history };
