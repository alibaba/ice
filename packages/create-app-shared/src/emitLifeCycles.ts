import { getHistory } from './history';
import router from './router';
import { LAUNCH, SHOW, HIDE } from './constants';
import { emit as appEmit } from './appLifeCycles';
import { emit as pageEmit } from './pageLifeCycles';
import { isMiniAppPlatform } from './env';

function emitLifeCycles() {
  // Get history
  const history = getHistory();
  const pathname = history.location.pathname;

  // Set current router
  router.current = {
    pathname,
    visibiltyState: true
  };

  if (!isMiniAppPlatform) {
    // Emit app lifecycle
    appEmit(LAUNCH);
    appEmit(SHOW);

    // Listen history change
    history.listen((location) => {
      if (location.pathname !== router.current.pathname) {
      // Flow router info
        router.prev = router.current;
        router.current = {
          pathname: location.pathname,
          visibiltyState: true
        };
        router.prev.visibiltyState = false;
        pageEmit(HIDE, router.prev.pathname);
        pageEmit(SHOW, router.current.pathname);
      }
    });
  }
}

export default emitLifeCycles;
