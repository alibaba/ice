import { Suspense } from 'react';
import styles from './index.module.css';
import EditButton from '@/components/EditButton';
import Counter from '@/components/Counter';
import Comments from '@/components/Comments';

export default function Home() {
  console.log('Render: Index');

  return (
    <div className={styles.app}>
      <h2>Home Page</h2>
      <Counter />
      <Suspense fallback="loading">
        {/* @ts-ignore */}
        <Comments />
      </Suspense>
      <EditButton noteId="editButton">
        click me
      </EditButton>
    </div>
  );
}
