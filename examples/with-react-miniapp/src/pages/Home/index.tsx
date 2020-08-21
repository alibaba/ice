import * as React from 'react';
import { usePageShow, usePageHide } from 'ice';
import Title from 'mini-ali-ui/es/title/index';
import Text from './components/Text';
import styles from './index.module.scss';

const Home = (props) => {
  usePageShow(() => {
    console.log('page show...');
  });

  usePageHide(() => {
    console.log('page hide...');
  });

  const { history } = props;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to icejs miniapp!</h2>
      <div className={styles.description}>This is a awesome project, enjoy it!</div>
      <Text />
      <div onClick={() => {
        console.log('Click');
        history.push('/about');
      }}>go about</div>
      <Title
        hasLine
        type="arrow"
        onActionTap={() => {
          console.log('标题被击中了');
        }}
      >我是 mini-ali-ui 的 title 组件</Title>
    </div>
  );
};

export default Home;
