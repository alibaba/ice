import { Suspense, lazy } from 'react';
import { Link, useData, useConfig, definePageConfig } from 'ice';
// not recommended but works
import { useAppContext } from '@ice/runtime';
import { Button } from 'antd-mobile';
import styles from './index.module.css';

const Bar = lazy(() => import('../components/bar'));

export default function Home(props) {
  console.log('render Home', props);

  const appContext = useAppContext();
  console.log('get AppContext', appContext);

  const data = useData();
  const config = useConfig();

  console.log('render Home', 'data', data, 'config', config);

  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
      <Suspense fallback={<div>hello</div>}>
        <Bar />
        <Button onClick={() => alert('Hello ICE.')}>Click Me</Button>
      </Suspense>
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

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
      });
    }, 1 * 100);
  });
}