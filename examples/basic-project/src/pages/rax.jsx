import { createElement, useEffect, useRef } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Logo from '@/components/Logo';
import styles from './index.module.css';

export default function Home() {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      console.log('ref for View', ref);
    }
  }, []);
  return (
    <View
      ref={ref}
      className={styles.homeContainer}
      style={{
        width: '750rpx',
      }}
      onAppear={() => { console.log('view appear'); }}
    >
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <Text className={styles.homeTitle}>Welcome to Your Rax App</Text>
      <Text className={styles.homeInfo}>More information about Rax</Text>
      <Text className={styles.homeInfo}>Visit https://rax.js.org</Text>
    </View>
  );
}
