import * as React from 'react';
import { useAppContext, Link } from 'ice';
import styles from './index.module.css';

export default function Home() {
  // const appContext = useAppContext();

  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
    </>
  );
}

export function getPageConfig() {
  return {
    auth: ['admin'],
  };
}

export function getInitialData() {
  return {
    name: 'home',
  };
}