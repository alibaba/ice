import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import styles from './index.module.css';

import Logo from '@/components/Logo';

export default function Home() {
  return (
    <View className={styles.homeContainer}>
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <Text className={styles.homeTitle}>Welcome to Your Rax App</Text>
      <Text className={styles.homeInfo}>More information about Rax</Text>
      <Text className={styles.homeInfo}>Visit https://rax.js.org</Text>
    </View>
  );
}
