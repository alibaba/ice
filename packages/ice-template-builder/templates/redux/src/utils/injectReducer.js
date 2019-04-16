import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => (WrappedComponent) => {
  const getWrappedComponentName = () => {
    if (WrappedComponent.displayName) {
      const reg = /\b(\w*)\)*$/;
      const displayName = reg.exec(WrappedComponent.displayName)[1];
      return displayName;
    }

    return WrappedComponent.name || 'Component';
  };

  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    static displayName = getWrappedComponentName(WrappedComponent);

    componentWillMount() {
      const { injectReducer } = this.injectors;
      injectReducer(key, reducer);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
