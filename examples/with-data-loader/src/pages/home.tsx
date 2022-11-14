import { useData, defineDataLoader } from 'ice';
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

export function pageConfig() {
  return {
    title: 'Home',
  };
}

export const dataLoader = defineDataLoader(async () => {
  const result = await fetch('https://api.github.com/repos/ice-lab/ice-next');
  const data = await result.json();

  return data;
});
