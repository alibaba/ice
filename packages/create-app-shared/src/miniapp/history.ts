import { createMiniAppHistory } from 'miniapp-history';
import type { History } from 'history';
import createInitHistory from '../createInitHistory';
import { setHistory } from '../storage';
import type { CreateHistory, InitHistory } from '../createInitHistory';

const createHistory: CreateHistory = ({ routes }) => {
  if (process.env.__IS_SERVER__) {
    // miniapp is not support ssr
    return null;
  }
  (window as any).history = createMiniAppHistory(routes) as History;
  window.location = (window.history as any).location;
  setHistory((window as any).history);
  return (window as any).history;
};

const initHistory: InitHistory = createInitHistory(createHistory);
export {
  initHistory
};
export default createHistory;