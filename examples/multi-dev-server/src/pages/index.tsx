import { useState, lazy } from 'react';
import styles from './index.module.css';
import logo from '@/assets/logo.png';

export default function IndexPage() {
  const [count, setCount] = useState(1);
  const updateCount = () => setCount((c) => c + 1);

  return (
    <div className={styles.app}>
      <header>
        <img src={logo} alt="logo" />
        <p>Hello ice.js 3</p>
        <p>
          APP_NAME:{' '}
          {
            // @ts-expect-error
            APP_NAME
          }
        </p>
      </header>
      <main>
        <button className={styles.button} type="button" onClick={updateCount}>
          👍🏻 {count}
        </button>
        <p>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Learn React
          </a>
          {' | '}
          <a href="https://v3.ice.work/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Learn ice.js
          </a>
        </p>
      </main>
    </div>
  );
}
