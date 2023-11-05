import { useSuspenseData, withSuspense } from 'ice';
import styles from './index.module.css';

const Item = withSuspense((props) => {
  console.log('Render: Item');

  return (
    (<div className={styles.item}>
      <img src={props.src} height="100" width="100" />
    </div>)
  );
});

function Box() {
  const data = useSuspenseData(getData);
  console.log('Render: Box');

  return (
    <div className={styles.box}>
      {
        data.map((item, index) => {
          return <Item id="Item" key={index} src={item} />;
        })
      }
    </div>
  );
}

export default withSuspense(Box);

async function getData() {
  console.log('load box');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 1000);
  });

  const images = [
    'https://gw.alicdn.com/imgextra/i4/O1CN01MwIP7Q1UZhf7JkMIG_!!6000000002532-2-tps-200-200.png',
    'https://gw.alicdn.com/imgextra/i1/O1CN01NfBgL91xnYUxBFXQ9_!!6000000006488-2-tps-206-200.png',
    'https://gw.alicdn.com/imgextra/i3/O1CN01lHL8Gl273QllCawtW_!!6000000007741-2-tps-200-200.png',
    'https://gw.alicdn.com/imgextra/i4/O1CN01ygRBaF1nIjghYokdq_!!6000000005067-2-tps-200-200.png',
    'https://gw.alicdn.com/imgextra/i4/O1CN01jJws8n1RpKKBls0xq_!!6000000002160-2-tps-200-200.png',
  ];

  return [
    images[Math.round(Math.random() * images.length - 1)],
    images[Math.round(Math.random() * images.length - 1)],
    images[Math.round(Math.random() * images.length - 1)],
  ];
}