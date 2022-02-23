import React from 'react';
import styles from './users.module.css';
import AreaWrapper from '../AreaWrapper';

const data = [
  {
    name: '淘宝',
    image: 'https://img.alicdn.com/tfs/TB1zdJliDtYBeNjy1XdXXXXyVXa-184-76.png',
  },
  {
    name: '菜鸟',
    image: 'https://img.alicdn.com/tfs/TB1LgSMibuWBuNjSszgXXb8jVXa-206-72.png',
  },
  {
    name: '新华智云',
    image: 'https://img.alicdn.com/tfs/TB1jFDwiamWBuNjy1XaXXXCbXXa-284-56.png',
    fill: true,
  },
  {
    name: '口碑',
    image: 'https://img.alicdn.com/tfs/TB147fnikSWBuNjSszdXXbeSpXa-180-68.png',
    fill: true,
  },
  {
    name: '钉钉',
    image: 'https://img.alicdn.com/tfs/TB1fdJliDtYBeNjy1XdXXXXyVXa-208-78.png',
  },
  {
    name: '阿里健康',
    image: 'https://img.alicdn.com/tfs/TB19a2XikyWBuNjy0FpXXassXXa-244-68.png',
  },
  {
    name: 'AliExpress',
    image: 'https://img.alicdn.com/tfs/TB1m7veieuSBuNjSsziXXbq8pXa-262-62.png',
  },
  {
    name: '阿里妈妈',
    image: 'https://img.alicdn.com/tfs/TB10Mjkib1YBuNjSszhXXcUsFXa-208-76.png',
  },
  {
    name: '闲鱼',
    image: 'https://img.alicdn.com/tfs/TB1DPSIibGYBuNjy0FoXXciBFXa-128-60.png',
    fill: true,
  },
  {
    name: '阿里云',
    image: 'https://img.alicdn.com/tfs/TB1y9TNioR1BeNjy0FmXXb0wVXa-254-74.png',
    fill: true,
  },
  {
    name: '优酷',
    image: 'https://img.alicdn.com/tfs/TB1SpDwiamWBuNjy1XaXXXCbXXa-242-46.png',
  },
  {
    name: '阿里通信',
    image: 'https://img.alicdn.com/tfs/TB1EkveieuSBuNjSsziXXbq8pXa-240-78.png',
    fill: true,
  },
];

function Users() {
  return (
    <AreaWrapper
      title={'谁在使用'}
      decs={'飞冰广泛服务于阿里巴巴众多面向运营、商家以及消费者端的业务'}
      contentStyle={styles.content}
      style={{
        minHeight: 'auto',
      }}
      isBlock
    >
      {data.map((item, index) => (
        <div key={index} className={styles.logo}>
          <img alt={item.name} src={item.image} className={item.fill && styles.fill} />
        </div>
      ))}
    </AreaWrapper>
  );
}

export default Users;
