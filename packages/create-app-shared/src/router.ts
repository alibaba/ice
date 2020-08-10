import { isMiniAppPlatform } from './env';
import { getHistory } from './history';

const current = {
  pathname: '/',
  visibiltyState: true
};

const router = {
  prev: null,
  current
};

Object.defineProperty(router, 'current', {
  get() {
    if (!isMiniAppPlatform) {
      return current;
    }
    const history = getHistory();
    return Object.assign(current, {
      pathname: history.location.pathname
    });
  },
  set(value) {
    Object.assign(current, value);
  }
});

export default router;
