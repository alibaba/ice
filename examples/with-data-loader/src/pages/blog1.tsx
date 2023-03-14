import { useData, defineDataLoader, Link } from 'ice';
import styles from './index.module.css';

export default function Blog1() {
  const data = useData();

  return (
    <>
      <h2 className={styles.title}>Blog1 With dataLoader</h2>
      <Link to="/blog2">link to blog2</Link>
      <div id="timestamp">{data}</div>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Blog',
  };
}

export const dataLoader = defineDataLoader(async () => {
  console.log('Loading data for blog 1');
  return new Date().getTime();
});
