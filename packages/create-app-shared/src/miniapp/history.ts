import { createMiniAppHistory } from 'miniapp-history';
import type { History } from 'history';

interface Route {
  path: string;
  source: string;
}

function createHistory({
  routes,
}: {
  routes?: Route[];
}) {
  if (process.env.__IS_SERVER__) {
    // miniapp is not support ssr
    return null;
  }
  (window as any).history = createMiniAppHistory(routes) as History;
  window.location = (window.history as any).location;
  return (window as any).history;
}

export default createHistory;