const current = {
  pathname: '/',
  visibilityState: document.visibilityState === 'visible',
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
