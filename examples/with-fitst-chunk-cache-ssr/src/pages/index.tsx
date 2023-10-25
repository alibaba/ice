import styles from './index.module.css';
import List from '@/components/List/index';
import Box from '@/components/Box/index';


export default function Home() {
  console.log('Render: Home');

  return (
    <div>
      <Header />
      <Box id="Box" fallback={<div className={styles.boxFallback} />} />
      <List id="List" fallback={<div className={styles.boxFallback} />} />
    </div>
  );
}

function Header() {
  return (
    <div className={styles.header} >
      First chunk Demo
    </div>
  );
}