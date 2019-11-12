import React from 'react';
import { Loading } from '@alifd/next';

import styles from './index.module.scss';

export default () => (
  <div className={styles.container}>
    <Loading />
  </div>
);
