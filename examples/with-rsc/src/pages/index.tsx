import { useAppContext } from 'ice';
import styles from './index.module.css';
import Container from '@/components/Container';

export default function Home() {
  console.log('Render: Index');

  const appContext = useAppContext();
  console.log(appContext);

  return (
    <div className={styles.app}>
      <h2>Home Page</h2>
      <Container />
    </div>
  );
}
