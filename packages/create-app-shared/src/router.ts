const current = {
  pathname: '/',
  visibilityState: true
};

const router = {
  prev: null,
  current
};

Object.defineProperty(router, 'current', {
  get() {
    return Object.assign(current, {
      pathname: (window as any).__pageId
    });
  },
  set(value) {
    Object.assign(current, value);
  }
});

export default router;
