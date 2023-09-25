import { useAppContext } from 'ice';
import { Suspense } from 'react';
import styles from './index.module.css';
// import EditButton from '@/components/EditButton.client';
// import Counter from '@/components/Counter.client';
import Feeds from '@/components/Feeds';

export default async function Home() {
  console.log('Render: Index');

  const data = await getData('http://localhost:4000/getData');

  // const appContext = useAppContext();
  // console.log(appContext);

  return (
    <div className={styles.app}>
      {/* @ts-ignore */}
      <h2>Home Page {data?.name}</h2>
      {/* <Counter />
      <EditButton noteId="editButton">
        hello world
      </EditButton> */}
      <Suspense fallback={<p>Loading feed...</p>}>
        {/* @ts-ignore */}
        <Feeds />
      </Suspense>
    </div>
  );
}

export async function getData(url: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}