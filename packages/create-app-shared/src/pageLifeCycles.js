import { getHistory } from './history';
import { SHOW, HIDE } from './constants';
import { isMiniAppPlatform } from './env';

// visibleListeners => { [path]: { show: [], hide: [] } }
const visibleListeners = {};

function addPageLifeCycle(cycle, callback) {
  const history = getHistory();
  if (history) {
    const pathname = history.location.pathname;
    if (!visibleListeners[pathname]) {
      visibleListeners[pathname] = {
        [SHOW]: [],
        [HIDE]: []
      };
    }
    visibleListeners[pathname][cycle].push(callback);
  }
}

function emit(cycle, path, ...args) {
  // Ensure queue exists
  if (visibleListeners[path] && visibleListeners[path][cycle]) {
    for (let i = 0, l = visibleListeners[path][cycle].length; i < l; i++) {
      visibleListeners[path][cycle][i](...args);
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
      const history = getHistory();
      if (history) {
        const pathname = history.location.pathname;
        addPageLifeCycle(cycle, callback);

        return () => {
          if (visibleListeners[pathname]) {
            const index = visibleListeners[pathname][cycle].indexOf(callback);
            if (index > -1) {
              visibleListeners[pathname][cycle].splice(index, 1);
            }
          }
        };
      }
    }, []);
  };
}

function withPageLifeCycle(Component) {
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
      const history = getHistory();
      if (history) {
        // Keep the path name corresponding to current page component
        this.pathname = history.location.pathname;
      }
    }

    componentWillUnmount() {
      visibleListeners[this.pathname] = null;
    }
  }
  // eslint-disable-next-line
  Wrapper.displayName = 'withPageLifeCycle(' + (Component.displayName || Component.name) + ')';
  return Wrapper;
}

if (isMiniAppPlatform) {
  // eslint-disable-next-line
  window.addEventListener('pageshow', () => {
    const history = getHistory();
    emit(SHOW, history.location.pathname);
  });
  // eslint-disable-next-line
  window.addEventListener('pagehide', () => {
    const history = getHistory();
    emit(HIDE, history.location.pathname);
  });
}

function createUsePageLifeCycle({ useEffect }) {
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

export {
  emit,
  createUsePageLifeCycle,
  withPageLifeCycle
};
