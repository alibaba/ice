import { createBrowserHistory, createHashHistory, createMemoryHistory, History, Location } from 'history';

function createHistory({
  type,
  basename,
  location,
}: {
  type?: string;
  basename?: string;
  location?: Location;
}) {
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
}

export default createHistory;
