import * as React from 'react';
import styles from './index.module.scss';

const Layout = ({ children }) => {
  return (
    <div>
      <h2 className={styles.title}>SSR</h2>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;