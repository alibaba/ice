import { Outlet, Link } from 'ice';
import styles from './index.module.css';

export default () => {
  return (
    <div>
      <h1>Sales</h1>
      <div className={styles.tabs}>
        <Link to="/sales/overview">overview</Link>
        <Link to="/sales/recommends">recommends</Link>
        <Link to="/sales/favorites">favorites</Link>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};
