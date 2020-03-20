import React, { useState, useEffect } from 'react'
import { Link, logger, store as appStore } from 'ice'
import styles from './index.module.scss'

export default function Home(props) {
  logger.info('Home props', props);

  const [dataSource, setData] = useState<number[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setData([4, 5, 6, 7]);
    }, 1 * 1000);
  }, []);

  const [userState] = appStore.useModel('user');

  return (
    <>
      <h2 className={styles.title}>{props.title}</h2>
      <div>
        <div><strong>Name：</strong>{userState.name}</div>
        <div><strong>id：</strong>{userState.id}</div>
        <div><strong>data：</strong>{dataSource.join(' ')}</div>
      </div>
      <br />
      <Link to="/about">about</Link>
      <Link to="/dashboard">dashboard</Link>
    </>
  );
}

Home.getInitialProps = async () => {
  return { title: 'Home Page...' }
};
