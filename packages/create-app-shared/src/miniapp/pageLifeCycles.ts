import { SHOW, HIDE, MINIAPP_PAGE_LIFECYCLE } from '../constants';

type UseEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => void;
type Listener = () => any;

function addPageLifeCycle(cycle: string, callback: Listener) {
  document.addEventListener(MINIAPP_PAGE_LIFECYCLE[cycle], callback);
}

function createPageLifeCycle(useEffect: UseEffect) {
  return (cycle: string, callback: Listener) => {
    useEffect(() => {
      // When component did mount, it will trigger usePageShow callback
      if (cycle === SHOW) {
        callback();
      }

      addPageLifeCycle(cycle, callback);

      return () => {
        document.removeEventListener(MINIAPP_PAGE_LIFECYCLE[cycle], callback);
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
        addPageLifeCycle(SHOW, this.onShow.bind(this));
      }
      if (this.onHide) {
        addPageLifeCycle(HIDE, this.onHide.bind(this));
      }
    }

    public componentWillUnmount() {
      // eslint-disable-next-line no-unused-expressions
      super.componentWillUnmount?.();
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
