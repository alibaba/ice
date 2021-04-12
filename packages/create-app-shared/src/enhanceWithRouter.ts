import { RouteComponentProps, WithRouterStatics, WithRouterProps } from 'react-router';
import { isMiniAppPlatform } from './env';

// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/ca5e189854d26c10bd5e9ba078ab33bd3749af43/types/react-router/index.d.ts#L172
export interface IWithRouter {
  <P extends RouteComponentProps<any>, C extends React.ComponentType<P>>(
    component: C & React.ComponentType<P>,
  ): React.ComponentClass<Omit<P, keyof RouteComponentProps<any>> & WithRouterProps<C>> & WithRouterStatics<C>;
}

function enhanceWithRouter({ withRouter, createElement }): IWithRouter {
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
