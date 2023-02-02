import { useData, defineDataLoader, useAppData } from 'ice';
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
  const result = await fetch('https://api.github.com/repos/ice-lab/ice-next');
  const data = await result.json();
  const { target } = import.meta;
  const { renderer } = import.meta;
  console.log('target, renderer:', target, renderer);
  return data;
});
