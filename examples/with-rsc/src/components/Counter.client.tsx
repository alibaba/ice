'use client';
import { useState } from 'react';
import styles from './index.module.css';

export default function Counter() {
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