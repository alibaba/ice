import { createBrowserHistory, createHashHistory, createMemoryHistory, History } from 'history';
import type { CreateHistory, InitHistory } from '../createInitHistory';
import createInitHistory from '../createInitHistory';
import { setHistory } from '../storage';

const createHistory: CreateHistory = ({ type, basename, location }) => {
  let history: History;
  if (process.env.__IS_SERVER__) {
    history = createMemoryHistory();
    (history as any).location = location;
  } else if (type === 'hash') {
    history = createHashHistory({ basename });
  } else if (type === 'browser') {
    history = createBrowserHistory({ basename });
  } else {
    history = createMemoryHistory();
  }
  setHistory(history);
  return history;
};

const initHistory: InitHistory = createInitHistory(createHistory);

export {
  initHistory
};
export default createHistory;
