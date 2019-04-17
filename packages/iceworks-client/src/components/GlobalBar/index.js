import React from 'react';
import ThemeToggler from '@components/ThemeToggler';
import styles from './index.module.scss';

const GlobalBar = () => {
  return (
    <div className={styles.globalBar}>
      <ThemeToggler />
    </div>
  );
};

export default GlobalBar;
