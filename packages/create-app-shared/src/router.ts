import { isMiniAppPlatform } from './env';

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
    return Object.assign(current, {
      pathname: (window as any).__pageId
    });
  },
  set(value) {
    Object.assign(current, value);
  }
});

export default router;
