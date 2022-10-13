import { Suspense, lazy } from 'react';
import { Link, useData, useAppData, useConfig } from 'ice';
// not recommended but works
import { useAppContext } from '@ice/runtime';
import { useRequest } from 'ahooks';
import type { AppData } from 'ice';
import './index.css';
import styles from './index.module.css';
import lessStyles from './index.module.less';
import sassStyles from './index.module.scss';

const Bar = lazy(() => import('../components/bar'));

export default function Home(props) {
  const appContext = useAppContext();
  const appData = useAppData<AppData>();
  const data = useData();
  const config = useConfig();

  if (typeof window !== 'undefined') {
    console.log('render Home', props);
    console.log('get AppData', appData);
    console.log('get AppContext', appContext);
    console.log('render Home', 'data', data, 'config', config);
  }

  const { data: foo } = useRequest(() => fetch('/api/foo').then(res => res.json()));
  const { data: users } = useRequest(() => fetch('/api/users').then(res => res.json()));
  const { data: userInfo } = useRequest(() => fetch('/api/users/a', { method: 'POST' }).then(res => res.json()));
  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
      <div>count: {data.count}</div>
      <Suspense fallback={<div>hello</div>}>
        <Bar />
      </Suspense>
      <div className={styles.data}>
        <div className={lessStyles.data}>foo: {JSON.stringify(foo)}</div>
        <div className={sassStyles.data}>users: {JSON.stringify(users)}</div>
        <div>userInfo: {JSON.stringify(userInfo)}</div>
        <div>data from: <span id="data-from">{data.from}</span></div>
      </div>
    </>
  );
}

export function getConfig() {
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

export function getData({ pathname, query }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
        count: 100,
        pathname,
        query,
      });
    }, 1 * 100);
  });
}

export function getServerData() {
  return {
    name: 'Home',
    count: 100,
    from: 'getServerData',
  };
}

export function getStaticData() {
  return {
    name: 'Home',
    count: 100,
    from: 'getStaticData',
  };
}
