import { useEffect, useState } from 'react';
import styles from './index.module.css';

export default function About() {
  const [data, setData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const result = await fetch('https://api.github.com/repos/ice-lab/ice-next');
    const data = await result.json();

    setData(data);
  }

  return (
    <>
      <h2 className={styles.title}>With useEffect</h2>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Home',
  };
}