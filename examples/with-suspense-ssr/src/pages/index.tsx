import { useState } from 'react';
import { Suspense } from 'ice';
import styles from './index.module.css';
import * as Comments from '@/components/Comments';
import * as Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <Counter />
      <Suspense module={Comments} />
      <Suspense module={Footer} />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  function updateCount() {
    setCount(count + 1);
  }

  return (
    <button className={styles.button} type="button" onClick={updateCount}>
      👍🏻 {count}
    </button>
  );
}