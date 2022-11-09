import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const data = [
    {
      name: 'ice.js',
      age: '7',
    },
    {
      name: 'AppDevTools',
      age: '1',
    },
  ];
  const [isShow, setShow] = useState(true);
  return (
    <div>
      <section x-if={isShow} className={styles.title}>
        <div x-for={d in data} key={d.name}>Name: {d.name} Age: {d.age}</div>
      </section>
      <button onClick={() => setShow(!isShow)}>Toggle Show</button>
    </div>
  );
}

export function getConfig() {
  return {
    title: 'JSX Plus Example',
  };
}
