import { getHistory } from './history';
import { isMiniAppPlatform } from './env';
import { SHOW, HIDE } from './constants';
import router from './router';

// visibleListeners => { [pathname]: { show: [], hide: [] } }
const visibleListeners = {};

function addPageLifeCycle(cycle, callback) {
  const pathname = router.current.pathname;

  if (!visibleListeners[pathname]) {
    visibleListeners[pathname] = {
      [SHOW]: [],
      [HIDE]: []
    };
  }
  visibleListeners[pathname][cycle].push(callback);
}

export function emit(cycle: any, pathname?: string, ...args) {
  // Ensure queue exists
  if (visibleListeners[pathname] && visibleListeners[pathname][cycle]) {
    for (let i = 0, l = visibleListeners[pathname][cycle].length; i < l; i++) {
      visibleListeners[pathname][cycle][i](...args);
    }
  }
}

function createPageLifeCycle(useEffect) {
  return (cycle, callback) => {
    useEffect(() => {
      // When component did mount, it will trigger usePageShow callback
      if (cycle === SHOW) {
        callback();
      }
      const pathname = router.current.pathname;

      addPageLifeCycle(cycle, callback);

      return () => {
        if (visibleListeners[pathname]) {
          const index = visibleListeners[pathname][cycle].indexOf(callback);
          if (index > -1) {
            visibleListeners[pathname][cycle].splice(index, 1);
          }
        }
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  };
}

export function withPageLifeCycle(Component) {
  class Wrapper extends Component {
    constructor() {
      super();
      if (this.onShow) {
        if (!isMiniAppPlatform) {
          // In MiniApp platform show event will trigger after addPageLifeCycle, so it needn't be execute in constructor
          this.onShow();
        }
        addPageLifeCycle(SHOW, this.onShow.bind(this));
      }
      if (this.onHide) {
        addPageLifeCycle(HIDE, this.onHide.bind(this));
      }
      // Keep the path name corresponding to current page component
      this.pathname = router.current.pathname;
    }

    private componentWillUnmount() {
      visibleListeners[this.pathname] = null;
    }
  }
  Wrapper.displayName = `withPageLifeCycle(${  Component.displayName || Component.name  })`;
  return Wrapper as any;
}

if (isMiniAppPlatform) {
  // eslint-disable-next-line
  window.addEventListener('pageshow', () => {
    // Get history
    const history = getHistory();
    emit(SHOW, history.location.pathname);
  });
  // eslint-disable-next-line
  window.addEventListener('pagehide', () => {
    // Get history
    const history = getHistory();
    emit(HIDE, history.location.pathname);
  });
}

export function createUsePageLifeCycle({ useEffect }) {
  const usePageShow = (callback) => {
    createPageLifeCycle(useEffect)(SHOW, callback);
  };

  const usePageHide = (callback) => {
    createPageLifeCycle(useEffect)(HIDE, callback);
  };

  return {
    usePageShow,
    usePageHide
  };
}
