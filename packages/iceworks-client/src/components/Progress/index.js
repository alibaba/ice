import React from 'react';
import { Progress as OriginalProgress } from '@alifd/next';
import stores from '@stores';
import styles from './index.module.scss';

const Progress = () => {
  const progress = stores.useStore('progress');
  const { statusText, show, percent } = progress.dataSource;

  return (
    show ?
      <div className={styles.wrap}>
        {statusText ? <span className={styles.status}>{statusText}</span> : null}
        <div className={styles.progress}>
          <OriginalProgress
            percent={percent}
          />
        </div>
      </div> :
      null
  );
};

export default Progress;
