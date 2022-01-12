import { FormattedMessage } from 'react-intl';
import styles from './index.module.less';

function BasicLayout({ children }) {
  return (
    <main className={styles.basicLayout}>
      <h1><FormattedMessage id="basicLayout" /></h1>
      {children}
    </main>
  );
}

export default BasicLayout;
