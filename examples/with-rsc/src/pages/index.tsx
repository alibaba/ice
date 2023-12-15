import { Suspense } from 'react';
// import { useAppContext } from 'ice';
import styles from './index.module.css';
import EditButton from '@/components/EditButton.client';
import Counter from '@/components/Counter.client';
import Comments from '@/components/Comments';

export default function Home() {
  console.log('Render: Index');

  // const appContext = useAppContext();
  // console.log(appContext);

  return (
    <div className={styles.app}>
      <h2>Home Page</h2>
      <Counter />
      <Suspense fallback={<>loading</>}>
        {/* @ts-ignore */}
        <Comments />
      </Suspense>
      <EditButton noteId="editButton">
        hello world
      </EditButton>
    </div>
  );
}
