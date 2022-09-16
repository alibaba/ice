import { useEffect } from 'react';
import { useRequest } from 'ice';
import service from '../service';
import styles from './index.module.css';

export default function Home() {
  const { data, error, loading, request } = useRequest(service.getUser);

  useEffect(() => {
    request();
    // eslint-disable-next-line
  }, []);

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data || loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <h2 className={styles.title}>Name: {data.name} Age: {data.age}</h2>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Home',
  };
}
