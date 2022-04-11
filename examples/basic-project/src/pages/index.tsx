import * as React from 'react';
import { useAppContext, Link } from 'ice';
import type { PageConfig } from '@ice/runtime/esm/types';
import styles from './index.module.css';

export default function Home(props) {
  // const appContext = useAppContext();

  console.log('render Home', props);

  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
    </>
  );
}

export function getPageConfig(): PageConfig {
  return {
    title: 'Home',
    meta: [
      {
        name: 'theme-color',
        content: '#000',
      },
      {
        name: 'title-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
}

export function getInitialData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
      });
    }, 1 * 100);
  });
}