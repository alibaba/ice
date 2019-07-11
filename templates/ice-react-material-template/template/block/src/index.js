import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

export default function <%= className %>() {
  return (
    <div className={styles['<%= name %>']}>
      <%= name %>
    </div>
  );
}

<%= className %>.propTypes = {
  value: PropTypes.string
};

<%= className %>.defaultProps = {
  value: 'string data'
};
