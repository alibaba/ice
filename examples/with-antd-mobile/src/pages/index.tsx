import { Button } from 'antd-mobile';
import styles from './index.module.css';
import { useCounterContext } from '@/store';

export default function Home() {
  const { count, increment, decrement } = useCounterContext();
  return (
    <>
      <h2 className={styles.title}>Counter</h2>
      <Button onClick={() => increment()}>+</Button>
      <span className={styles.count}>{count}</span>
      <Button onClick={() => decrement()}>-</Button>
    </>
  );
}
