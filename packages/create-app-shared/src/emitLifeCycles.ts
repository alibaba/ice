import type { History } from 'history';
import { getHistory } from './storage';
import router from './router';
import { LAUNCH, SHOW, HIDE } from './constants';
import { emit as appEmit } from './appLifeCycles';
import { emit as pageEmit } from './pageLifeCycles';

function emitLifeCycles() {
  // Get history
  const history = getHistory() as History;
  const pathname = history && history.location ?
    history.location.pathname : typeof window !== 'undefined' && window.location.pathname;

  // Set current router
  router.current = {
    pathname,
    visibilityState: true
  };

  // Emit app lifecycle
  appEmit(LAUNCH);
  appEmit(SHOW);

  if (history && history.listen) {
    // Listen history change
    history.listen((location) => {
      if (location.pathname !== router.current.pathname) {
        // Flow router info
        router.prev = {
          ...router.current
        };
        router.current = {
          pathname: location.pathname,
          visibilityState: true
        };
        router.prev.visibiltyState = false;
        pageEmit(HIDE, router.prev.pathname);
        pageEmit(SHOW, router.current.pathname);
      }
    });
  }
}

export default emitLifeCycles;
