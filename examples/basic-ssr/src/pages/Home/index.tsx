import React, { useState, useEffect } from 'react';
import { request, Link, logger, Helmet, store as appStore } from 'ice';
import pageStore from './store';
import styles from './index.module.scss';

export default function Home(props) {
  logger.info('Home props', props);

  const [dataSource, setData] = useState<number[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setData([4, 5, 6, 7]);
    }, 1 * 1000);
  }, []);

  const [userState] = appStore.useModel('user');
  const [counterState] = pageStore.useModel('counter');

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="keywords" content={props.keywords} />
        <meta name="description" content={props.description} />
      </Helmet>
      <h2 className={styles.title}>{props.title}</h2>
      <div>counterState: {counterState.count}</div>
      <div>name: {userState.name}</div>
      <div>id: {userState.id}</div>
      <div>address: {props.profile && props.profile.address}</div>
      <div>data: {dataSource.join(' ')}</div>
      <br />
      <Link to="/about">about</Link>
      <Link to="/dashboard">dashboard</Link>
    </>
  );
}

Home.getInitialProps = async () => {
  const res = await request('/profile');
  return { ...res.data, title: 'Home Page...' };
};
