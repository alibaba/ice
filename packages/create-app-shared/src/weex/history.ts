import { createMemoryHistory } from 'history';
import createInitHistory from '../createInitHistory';
import type { CreateHistory, InitHistory } from '../createInitHistory';

const createHistory: CreateHistory = () => {
  // Force memory history when env is weex or kraken
  return createMemoryHistory();
};

const initHistory: InitHistory = createInitHistory(createHistory);
export {
  initHistory
};

export default createHistory;