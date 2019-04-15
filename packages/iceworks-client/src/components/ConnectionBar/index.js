import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const ConnectionBar = ({ connect }) => {
  return (
    <div className={styles.connectionBar}>
      {connect ? (
        <FormattedMessage id="iceworks.global.connect" />
      ) : (
        <FormattedMessage id="iceworks.global.disconnect" />
      )}
    </div>
  );
};

ConnectionBar.propTypes = {
  connect: PropTypes.bool.isRequired,
};

export default ConnectionBar;
