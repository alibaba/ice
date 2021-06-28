import { createBrowserHistory, createHashHistory, createMemoryHistory, History } from 'history';

function createHistory({
  type,
  basename,
}: {
  type?: string;
  basename?: string;
}) {
  let history: History;
  if (type === 'hash') {
    history = createHashHistory({ basename });
  } else if (type === 'browser') {
    history = createBrowserHistory({ basename });
  } else {
    history = createMemoryHistory();
  }
  return history;
}

export default createHistory;
