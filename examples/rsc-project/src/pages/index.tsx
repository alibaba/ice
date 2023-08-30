import { Suspense } from 'react';
import { Link, useData, useConfig, definePageConfig, defineDataLoader } from 'ice';
// Not recommended but works.
import styles from './index.module.css';

export default function Home() {
  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
      <Suspense fallback={<div>hello</div>} />
    </>
  );
}

export const pageConfig = definePageConfig(() => {
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
});

