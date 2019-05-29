/* eslint no-console:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultFallbackComponent from './FallbackComponent';

// Why not use hooks：
// docs: https://reactjs.org/docs/hooks-faq.html#do-hooks-work-with-static-typing
// issue:  https://github.com/facebook/react/issues/14347
class ErrorBoundary extends Component {
  static propTypes = {
    onError: PropTypes.func,
    FallbackComponent: PropTypes.any,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    onError: () => {},
    FallbackComponent: <DefaultFallbackComponent />,
  };

  state = {
    error: null,
  };

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        // can also log the error to an error reporting service
        onError.call(this, error, info ? info.componentStack : '');
      } catch (err) {
        console.log(err);
      }
    }

    this.setState({ error });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error } = this.state;

    if (error !== null) {
      return <FallbackComponent />;
    }

    return children;
  }
}

export const withErrorBoundary = (
  WrappedComponent,
  FallbackComponent,
  onError,
) => {
  const Wrapped = (props) => {
    return (
      <ErrorBoundary
        FallbackComponent={FallbackComponent || DefaultFallbackComponent}
        onError={onError}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  // Give this component a more helpful display name in DevTools.
  // docs: https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
  const ComponentName = WrappedComponent.displayName || WrappedComponent.name;
  Wrapped.displayName = ComponentName
    ? `WithErrorBoundary(${ComponentName})`
    : 'WithErrorBoundary';

  return Wrapped;
};

export default ErrorBoundary;
