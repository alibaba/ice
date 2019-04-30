import React from 'react';
import stores from '@stores';
import styles from './index.module.scss';

const GlobalBar = () => {
  const project = stores.useStore('project');

  return (
    <div className={styles.globalBar}>
      {project.dataSource.name}
    </div>
  );
};

export default GlobalBar;
