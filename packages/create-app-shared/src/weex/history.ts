import { createMemoryHistory } from 'history';
import createInitHistory from '../createInitHistory';
import type { CreateHistory, InitHistory } from '../createInitHistory';
import { setHistory } from '../storage';

const createHistory: CreateHistory = () => {
  // Force memory history when env is weex or kraken
  const history = createMemoryHistory();
  setHistory(history);
  return history;
};

const initHistory: InitHistory = createInitHistory(createHistory);
export {
  initHistory
};

export default createHistory;