import { createMemoryHistory } from 'history';

function createHistory() {
  // Force memory history when env is weex or kraken
  return createMemoryHistory();
}

export default createHistory;