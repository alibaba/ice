import { createElement } from 'rax';
import { withRouter as webSPAWithRouter } from 'rax-use-router';
import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp } from 'universal-env';

let withRouter;

if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp) {
  withRouter = function(Component) {
    function Wrapper(props) {
      const history = window.history;
      return createElement(Component, Object.assign({}, props, {
        history: history,
        location: history.location
      }));
    };
    Wrapper.displayName = 'withRouter(' + (Component.displayName || Component.name) + ')';
    Wrapper.WrappedComponent = Component;
    return Wrapper;
  };
} else {
  withRouter = webSPAWithRouter;
}

export default withRouter;
