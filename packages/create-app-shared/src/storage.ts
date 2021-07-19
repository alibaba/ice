import type { History } from 'history';

interface Storage {
  history: History | null;
}

const storage: Storage = {
  history: null,
};

function getHistory() {
  return storage.history;
}

function setHistory(customHistory: History) {
  storage.history = customHistory;
}

const history = storage.history;

export {
  getHistory,
  setHistory,
  history,
};