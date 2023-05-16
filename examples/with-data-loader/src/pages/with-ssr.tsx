import { useData, defineDataLoader, defineServerDataLoader, Await } from 'ice';
import styles from './index.module.css';

export default function Home() {
  const data = useData();

  return (
    <>
      <h2 className={styles.title}>With dataLoader</h2>
      <Await resolve={data} fallback={<p>Loading item info...</p>} errorElement={<p>Error loading!</p>}>
        {(itemInfo) => {
          return <p>Item id is {itemInfo.id}</p>;
        }}
      </Await>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Home',
  };
}

export const dataLoader = defineDataLoader(async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1233,
      });
    }, 100);
  });
  return await promise;
}, { defer: true });

export const serverDataLoader = defineServerDataLoader(async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1233,
      });
    }, 100);
  });
  return await promise;
});