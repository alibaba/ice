import { useState } from 'react';
import styles from './index.module.css';
import Comments from '@/components/Comments';
import Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <Counter />
      <Comments id="comments" fallback={<div>loading...</div>} />
      <Footer id="comments-2" fallback={<div>loading...</div>} />
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