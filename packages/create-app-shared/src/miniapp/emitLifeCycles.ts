import router from './router';

function emitLifeCycles() {
  router.current = {
    pathname: (window as any).__pageId,
    visibilityState: true,
  };
}

export default emitLifeCycles;
