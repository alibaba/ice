import React from 'react';
import PropTypes from 'prop-types';
import { Message, Loading } from '@alifd/next';
import styles from './index.module.scss';

const ActionStatus = (props) => {
  const { store, config } = props;
  const namespaces = config.map(item => item.storeName);
  const storesBinding = store.useStores(namespaces);
  const loadingFlags = [];
  const errors = [];
  config.forEach((child, index) => {
    const { actions } = child;
    const bindings = storesBinding[index];
    actions.forEach((item) => {
      const { actionName, showLoading, showError } = item;
      const action = bindings[actionName];
      if (showLoading) {
        loadingFlags.push(action.loading);
      }
      if (showError) {
        errors.push(action.error);
      }
    });
  });

  const loadingVisible = loadingFlags.some(flag => flag);
  const error = errors.find(item => item);

  if (!loadingVisible && !error) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
    >
      {loadingVisible && (
        <Loading color="#fff" />
      )}
      {error && (
        <Message
          align="tc, tc"
          type="error"
          closable
          visible
        >
          {error.message}
        </Message>
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
