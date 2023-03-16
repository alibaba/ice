import { useData, defineDataLoader, Link } from 'ice';
import styles from './index.module.css';

export default function Blog2() {
  const data = useData();

  return (
    <>
      <h2 className={styles.title}>Blog2 With dataLoader</h2>
      <Link to="/blog1">link to blog1</Link>
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
  console.log('Loading data for blog 2');
  return new Date().getTime();
});
