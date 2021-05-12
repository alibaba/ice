import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  History,
  Location
} from 'history';
import { createMiniAppHistory } from 'miniapp-history';
import { isMiniAppPlatform, isWeex, isKraken } from './env';
import { DEFAULE_APP_CONFIG } from './constants';

// eslint-disable-next-line
let history: History;
function createHistory({
  routes,
  customHistory,
  type,
  basename,
  location
}: {
  routes?: any[],
  customHistory?: History,
  type?: string,
  basename?: string,
  location?: Location
}) {
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
      (window as any).history = createMiniAppHistory(routes) as History;
      window.location = (window.history as any).location;
      history = (window as any).history;
    } else {
      history = createMemoryHistory();
    }
  }
  return history;
}

function getHistory() {
  return history;
}

function setHistory(appConfig, initialContext) {
  const { router } = appConfig;
  const { type = DEFAULE_APP_CONFIG.router.type, basename, history: customHistory } = router;
  const location = initialContext ? initialContext.location : null;
  const newHistory = createHistory({ type, basename, location, customHistory });

  createHistory({ type, basename, location, customHistory });
  appConfig.router.history = newHistory;
}

export { getHistory, createHistory, setHistory, history };
