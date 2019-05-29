/* eslint no-console:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logger from '@utils/logger';
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
    onError: (error) => logger.error(error),
    FallbackComponent: <DefaultFallbackComponent />,
  };

  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error, info) {
    const { onError } = this.props;

    this.setState({ error, info }, () => {
      onError(error, info);
    });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return <FallbackComponent error={error} info={info} />;
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
      <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
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
