import { createElement } from 'rax';
import Image from 'rax-image';

import styles from './index.module.css';

export default (props) => {
  const { uri } = props;
  const source = { uri };
  return <Image className={styles.logo} source={source} />;
};
