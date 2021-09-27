import type { History } from 'history';

interface Storage {
  history: History | null;
}

// eslint-disable-next-line import/no-mutable-exports
let history: Storage['history'] = null;

const storage: Storage = {
  history: null,
};

function getHistory() {
  return storage.history;
}

function setHistory(customHistory: History) {
  history = customHistory;
  storage.history = customHistory;
}

export {
  getHistory,
  setHistory,
  history,
};
