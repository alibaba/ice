import { useSuspenseData, withSuspense } from 'ice';
import logo from '../../../ice.png';
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

  return [
    logo,
    logo,
    logo,
  ];
}