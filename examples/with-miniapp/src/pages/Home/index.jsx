import * as React from 'react';
import styles from './index.module.scss';

const Guide = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to icejs miniapp!</h2>
      <p className={styles.description}>This is a awesome project, enjoy it!</p>
    </div>
  );
};

export default Guide;
