import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

export default function <%= className %>({ value }) {
  return (
    <div className={styles['<%= name %>']}>
      <%= name %> {value}
    </div>
  );
}

<%= className %>.propTypes = {
  value: PropTypes.string,
};

<%= className %>.defaultProps = {
  value: 'string data',
};
