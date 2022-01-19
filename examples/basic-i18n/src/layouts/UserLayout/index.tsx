import { FormattedMessage } from 'react-intl';
import styles from './index.module.less';

function UserLayout({ children }) {
  return (
    <main className={styles.userLayout}>
      <h1><FormattedMessage id="userLayout" /></h1>
      {children}
    </main>
  );
}

export default UserLayout;
