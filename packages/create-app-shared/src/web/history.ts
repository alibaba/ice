import { createBrowserHistory, createHashHistory, createMemoryHistory, History } from 'history';
import type { CreateHistory, InitHistory } from '../createInitHistory';
import createInitHistory from '../createInitHistory';

const createHistory: CreateHistory = ({ type, basename, location }) => {
  let history: History;
  if (process.env.__IS_SERVER__) {
    history = createMemoryHistory();
    (history as any).location = location;
  }
  if (type === 'hash') {
    history = createHashHistory({ basename });
  } else if (type === 'browser') {
    history = createBrowserHistory({ basename });
  } else {
    history = createMemoryHistory();
  }
  return history;
};

const initHistory: InitHistory = createInitHistory(createHistory);

export {
  initHistory
};
export default createHistory;
