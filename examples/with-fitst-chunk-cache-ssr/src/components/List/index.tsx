import { useSuspenseData, withSuspense } from 'ice';
import logo from '../../../ice.png';
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
        data.map(item => {
          return (<Item
            id="Item"
            description={item.description}
            src={item.logo}
            title={item.title}
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

  return [
    {
      logo,
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo,
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo,
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo,
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
    {
      logo,
      title: 'ice.js',
      description: '这是 ICE 框架',
    },
  ];
}