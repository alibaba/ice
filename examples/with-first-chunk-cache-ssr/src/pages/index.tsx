import { useSuspenseData, withSuspense } from 'ice';
import styles from './index.module.css';
import List from '@/components/List/index';
import Box from '@/components/Box/index';

const StreamEnd = withSuspense(() => {
  const data = useSuspenseData(getData);
  console.log(`Render: ${data}`);

  return (
    <script dangerouslySetInnerHTML={{ __html: 'window.dispatchEvent(new Event(\'stream-end\'));' }} />
  );
});


async function getData() {
  console.log('stream end');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 2000);
  });

  return 'Stream end';
}


export default function Home() {
  console.log('Render: Home');

  return (
    <div>
      <Header />
      <Box id="Box" fallback={<div className={styles.boxFallback} />} />
      <List id="List" fallback={<div className={styles.boxFallback} />} />
      {/* https://github.com/xiaoxiaojx/blog/issues/37 */}
      <div dangerouslySetInnerHTML={{ __html: '<div style="height:0;width:0;">\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b</div>' }} />
      <StreamEnd id="StreamEnd" />
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