'use client';
import { useState } from 'react';
import { useAppContext } from 'ice';
import styles from './counter.module.css';

export default function Counter() {
  const [count, setCount] = useState(0);

  function updateCount() {
    setCount(count + 1);
  }

  const appContext = useAppContext();
  console.log(appContext);

  return (
    <button className={styles.button} type="button" onClick={updateCount}>
      👍🏻 {count}
    </button>
  );
}