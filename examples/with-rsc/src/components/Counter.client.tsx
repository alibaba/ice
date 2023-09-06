'use client';
import { useState } from 'react';
import styles from './index.module.css';
import { clientPrint } from './EditButton.client';

export default function Counter({ children }) {
  const [count, setCount] = useState(0);

  function updateCount() {
    setCount(count + 1);
  }

  return (
    <button className={styles.button} type="button" onClick={updateCount}>
      👍🏻 {count}
      <div> {clientPrint('clientPrint call')} </div>
      {children}
    </button>
  );
}