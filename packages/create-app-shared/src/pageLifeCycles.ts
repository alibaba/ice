import * as React from 'react';
import { SHOW, HIDE } from './constants';
import router from './router';
import type { UseEffect, Listener } from './types';

// visibleListeners => { [pathname]: { show: [], hide: [] } }
const visibleListeners = {};

function addPageLifeCycle(cycle: string, callback: Listener) {
  const pathname = router.current.pathname;
  if (!visibleListeners[pathname]) {
    visibleListeners[pathname] = {
      [SHOW]: [],
      [HIDE]: []
    };
  }
  visibleListeners[pathname][cycle].push(callback);
}

export function emit(cycle: string, pathname?: string, ...args: any) {
  // Ensure queue exists
  if (visibleListeners[pathname] && visibleListeners[pathname][cycle]) {
    for (let i = 0, l = visibleListeners[pathname][cycle].length; i < l; i++) {
      visibleListeners[pathname][cycle][i](...args);
    }
  }
}

function createPageLifeCycle(useEffect: UseEffect) {
  return (cycle: string, callback: Listener) => {
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

export function withPageLifeCycle<P>(Component: React.ComponentClass<P>) {
  class Wrapper extends Component {
    private onShow: () => void;

    private onHide: () => void;

    private pathname: string;

    constructor(props: P, context?: any) {
      super(props, context);
      if (this.onShow) {
        // trigger onShow after addPageLifeCycle
        this.onShow();
        addPageLifeCycle(SHOW, this.onShow.bind(this));
      }
      if (this.onHide) {
        addPageLifeCycle(HIDE, this.onHide.bind(this));
      }
      // Keep the path name corresponding to current page component
      this.pathname = router.current.pathname;
    }

    public componentWillUnmount() {
      // eslint-disable-next-line no-unused-expressions
      super.componentWillUnmount?.();
      visibleListeners[this.pathname] = null;
    }
  }
  Wrapper.displayName = `withPageLifeCycle(${  Component.displayName || Component.name  })`;
  return Wrapper as React.ComponentClass;
}

export function createUsePageLifeCycle({ useEffect }) {
  const usePageShow = (callback: Listener) => {
    createPageLifeCycle(useEffect)(SHOW, callback);
  };

  const usePageHide = (callback: Listener) => {
    createPageLifeCycle(useEffect)(HIDE, callback);
  };

  return {
    usePageShow,
    usePageHide
  };
}
