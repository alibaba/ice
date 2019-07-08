import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Message, Loading } from '@alifd/next';
import useLoadingTheme from '@hooks/useLoadingTheme';
import styles from './index.module.scss';

const ActionStatus = (props) => {
  const { store, config } = props;
  const namespaces = config.map(item => item.storeName);
  const storesBinding = store.useStores(namespaces);
  const { loadingTheme } = useLoadingTheme();
  const loadingFlags = [];
  const errors = [];

  config.forEach((child, index) => {
    const { actions } = child;
    const bindings = storesBinding[index];
    actions.forEach((item) => {
      const { actionName, showLoading, showError, errorType = 'inline' } = item;
      const action = bindings[actionName];
      if (showLoading) {
        loadingFlags.push(action.loading);
      }
      if (showError) {
        errors.push({
          content: action.error,
          type: errorType,
        });
      }
    });
  });
  const loadingVisible = loadingFlags.some(flag => flag);
  const error = errors.find((item) => {
    return item.content;
  });
  const [errorVisible, setErrorVisible] = useState(!!error);

  useEffect(() => {
    let timer;
    if (error) {
      setErrorVisible(true);
      if (error.type === 'toast') {
        timer = setTimeout(() => {
          setErrorVisible(false);
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error && error.content]);

  if (!loadingVisible && !errorVisible) {
    return null;
  }
  return (
    <div
      className={styles.overlay}
    >
      {loadingVisible && (
        <Loading color={loadingTheme.color} />
      )}
      {errorVisible && error && (
        <Message
          align="tc, tc"
          type="error"
          visible
          title={error.content.message}
        />
      )}
    </div>
  );
};

ActionStatus.defaultProps = {
};

ActionStatus.propTypes = {
  store: PropTypes.object.isRequired,
  config: PropTypes.array.isRequired,
};

export default ActionStatus;
