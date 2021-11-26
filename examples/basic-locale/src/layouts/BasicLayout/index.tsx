import styles from './index.module.less';

function BasicLayout({ children }) {
  return (
    <main className={styles.basicLayout}>
      <h1>Here is Basic Layout</h1>
      {children}
    </main>
  );
}

export default BasicLayout;
