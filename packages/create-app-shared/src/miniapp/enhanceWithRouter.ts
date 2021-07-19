import { ReactCreateElement } from '../types';

function enhanceWithRouter({ createElement }: { createElement: ReactCreateElement }) {
  const withRouter = (Component: React.ComponentType) => {
    function Wrapper(props: any) {
      const history = window.history;
      return createElement(Component, Object.assign({}, props, {
        history,
        location: (history as any).location,
      }));
    }
    // eslint-disable-next-line
    Wrapper.displayName = 'withRouter(' + (Component.displayName || Component.name) + ')';
    Wrapper.WrappedComponent = Component;
    return Wrapper;
  };
  return withRouter;
}

export default enhanceWithRouter;