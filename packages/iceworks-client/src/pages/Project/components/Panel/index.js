import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Panel = ({ header, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {header}
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
};

Panel.propTypes = {
  header: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
};

export default Panel;
