const current = {
  pathname: '/',
  visibilityState: typeof document !== 'undefined'
    ? document.visibilityState === 'visible'
    : true, // Considering SSR or other non-browser environment.
};

const router = {
  prev: null,
  current
};

Object.defineProperty(router, 'current', {
  get() {
    return current;
  },
  set(value) {
    Object.assign(current, value);
  }
});

export default router;
