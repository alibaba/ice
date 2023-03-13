import { useData, defineDataLoader, useAppData, Link } from 'ice';
import styles from './index.module.css';

export default function Home() {
  const data = useData();
  const appData = useAppData();

  console.log(appData);

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
  console.log('Loading data for Home');
  const result = await fetch('https://api.github.com/repos/ice-lab/ice-next');
  const data = await result.json();
  console.log('target, renderer:', import.meta.target, import.meta.renderer);
  return data;
});
