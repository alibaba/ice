import { useData } from 'ice';
import styles from './index.module.css';

export default function Home() {
  const data = useData();

  return (
    <>
      <h2 className={styles.title}>With dataLoader</h2>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Home',
  };
}

export async function getData() {
  const result = await fetch('https://api.github.com/repos/ice-lab/ice-next');
  const data = await result.json();

  return data;
}
