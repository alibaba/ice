import { useAppContext } from 'ice';
import styles from './about.module.css';
import RefreshButton from '@/components/RefreshButton.client';
import Counter from '@/components/Counter.client';

if (!global.requestCount) {
  global.requestCount = 0;
}

export default function Home() {
  console.log('Render: Index');

  const appContext = useAppContext();
  console.log(appContext);

  return (
    <div className={styles.about}>
      <h2>About Page</h2>
      <div>server request count:  { global.requestCount++ }</div>
      <Counter />
      <RefreshButton>
        Refresh Button
      </RefreshButton>
    </div>
  );
}
