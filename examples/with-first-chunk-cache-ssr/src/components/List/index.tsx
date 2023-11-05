import { useSuspenseData, withSuspense } from 'ice';
import styles from './index.module.css';

const Item = withSuspense((props) => {
  console.log('Render: List');

  return (
    (<div className={styles.item} >
      <img className={styles.image} src={props.src} alt="logo" height="100" width="100" />
      <div>
        <div className={styles.title}>{props.title}</div>
        <div>{props.description}</div>
      </div>
    </div>)
  );
});

function List() {
  const data = useSuspenseData(getData);
  console.log('Render: List');

  return (
    <div className={styles.list}>
      {
        data.map((item, index) => {
          return (<Item
            id="Item"
            description={item.description}
            src={item.logo}
            title={item.title}
            key={index}
          />);
        })
      }
    </div>
  );
}

export default withSuspense(List);

async function getData() {
  console.log('load list');

  await new Promise<any>((resolve) => {
    setTimeout(() => resolve(null), 2000);
  });

  const images = [
    'https://gw.alicdn.com/imgextra/i4/O1CN01MwIP7Q1UZhf7JkMIG_!!6000000002532-2-tps-200-200.png',
    'https://gw.alicdn.com/imgextra/i1/O1CN01NfBgL91xnYUxBFXQ9_!!6000000006488-2-tps-206-200.png',
    'https://gw.alicdn.com/imgextra/i3/O1CN01lHL8Gl273QllCawtW_!!6000000007741-2-tps-200-200.png',
    'https://gw.alicdn.com/imgextra/i4/O1CN01ygRBaF1nIjghYokdq_!!6000000005067-2-tps-200-200.png',
    'https://gw.alicdn.com/imgextra/i4/O1CN01jJws8n1RpKKBls0xq_!!6000000002160-2-tps-200-200.png',
  ];

  return [
    {
      logo: images[Math.round(Math.random() * images.length - 1)],
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo: images[Math.round(Math.random() * images.length - 1)],
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo: images[Math.round(Math.random() * images.length - 1)],
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo: images[Math.round(Math.random() * images.length - 1)],
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo: images[Math.round(Math.random() * images.length - 1)],
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
  ];
}