import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const ConnectBar = ({ connect }) => {
  return !connect ? (
    <div className={styles.connectBar}>
      <Icon type="server" size="small" style={{ marginRight: '5px' }} />
      <FormattedMessage id="iceworks.global.disconnect" />
    </div>
  ) : null;
};

ConnectBar.propTypes = {
  connect: PropTypes.bool.isRequired,
};

export default ConnectBar;
