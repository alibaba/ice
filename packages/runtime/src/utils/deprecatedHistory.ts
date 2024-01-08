import type { History, To } from '@remix-run/router';

let disableWarning = false;

export function disableHistoryWarning() {
  disableWarning = true;
}

export function deprecatedHistory(history: History) {
  const originHistory = { ...history };
  const deprecatedMessage = 'history.push and history.replace is not recommended to use outside of react component. The usage will be deprecated in the next minor version.';
  history.push = function (to: To, state?: any) {
    if (!disableWarning) {
      console.warn(deprecatedMessage);
    }
    originHistory.push(to, state);
  };
  history.replace = function (to: To, state?: any) {
    if (!disableWarning) {
      console.warn(deprecatedMessage);
    }
    originHistory.replace(to, state);
  };
  return history;
}
