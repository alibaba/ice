import { isMiniAppPlatform } from './env';

function enhanceWithRouter({ withRouter, createElement }) {
  if (isMiniAppPlatform) {
    withRouter = function (Component) {
      function Wrapper(props) {
        // eslint-disable-next-line
        const history = window.history;
        return createElement(
          Component,
          Object.assign({}, props, {
            history,
            location: (history as any).location,
          })
        );
      }
      // eslint-disable-next-line
      Wrapper.displayName = 'withRouter(' + (Component.displayName || Component.name) + ')';
      Wrapper.WrappedComponent = Component;
      return Wrapper;
    };
  }

  return withRouter;
}

export default enhanceWithRouter;
