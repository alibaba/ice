import { Outlet, Link } from 'ice';
import styles from './index.module.css';

export default () => {
  return (
    <div>
      <h1>Sales</h1>
      <div className={styles.tabs}>
        <Link to="/rewrite/overview">overview</Link>
        <Link to="/rewrite/recommends">recommends</Link>
        <Link to="/rewrite/favorites">favorites</Link>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};
