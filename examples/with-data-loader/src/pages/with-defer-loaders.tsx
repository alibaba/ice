import { useData, defineDataLoader } from 'ice';
import * as React from 'react';
import { Await } from 'react-router-dom';
import styles from './index.module.css';

export default function Home() {
  const data = useData();

  return (
    <>
      <h2 className={styles.title}>With dataLoader</h2>
      <React.Suspense
        fallback={<p>Loading item info...</p>}
      >
        <Await
          resolve={data[0]}
          errorElement={
            <p>Error loading!</p>
          }
        >
          {(itemInfo) => {
            return (
              <p>
                Item id is {itemInfo.id}
              </p>
            );
}}
        </Await>
      </React.Suspense>
      <React.Suspense
        fallback={<p>Loading item info...</p>}
      >
        <Await
          resolve={data[1]}
          errorElement={
            <p>Error loading!</p>
          }
        >
          {(itemInfo) => {
            return (
              <p>
                Item price is {itemInfo.price}
              </p>
            );
}}
        </Await>
      </React.Suspense>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Home',
  };
}

export const dataLoader = defineDataLoader([
  async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 1233,
        });
      }, 100);
    });
    return await promise;
  },
  async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          price: 9.99,
        });
      }, 2000);
    });
    return await promise;
  },
], { defer: true });

