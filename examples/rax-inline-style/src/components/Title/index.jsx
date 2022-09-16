import { createElement } from 'rax';
import Text from 'rax-text';

import styles from './index.module.css';

export default () => {
  return <Text className={styles['title']}>Welcome to Your Rax App</Text>;
};
