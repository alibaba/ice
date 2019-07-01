import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Panel = ({ header, children }) => {
  return (
    <div className={styles.wrapper}>
      { header }
      <div className={styles.main}>
        <div className={styles.box}>
          {children}
        </div>
      </div>
    </div>
  );
};

Panel.defaultProps = {
  header: null,
};

Panel.propTypes = {
  header: PropTypes.element,
  children: PropTypes.element.isRequired,
};

export default Panel;
