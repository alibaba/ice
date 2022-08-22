import type { History } from 'history';

// Value of history will be modified after render Router.
let routerHistory: History | null = null;

function setHistory(customHistory: History) {
  routerHistory = customHistory;
}

export {
  routerHistory,
  setHistory,
};