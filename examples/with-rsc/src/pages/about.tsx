import { Suspense } from 'react';
import styles from './about.module.css';
import Counter from '@/components/Counter.client';
import CommentsWithServerError from '@/components/CommentsWithServerError';
import ErrorBoundary from '@/components/ErrorBoundary';

if (!global.requestCount) {
  global.requestCount = 0;
}

export default function Home() {
  console.log('Render: Index');

  return (
    <div className={styles.about}>
      <h2>About Page</h2>
      <div>server request count:  { global.requestCount++ }</div>
      <Counter />
      <h3>Comments Wtih Server Error</h3>
      <ErrorBoundary>
        <Suspense fallback={<>loading server comments</>}>
          {/* @ts-ignore */}
          <CommentsWithServerError />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
