import React, { useEffect } from 'react';
import stores from '@stores';
import styles from './index.module.scss';

const GlobalBar = () => {
  const project = stores.useStore('project');

  useEffect(() => {
    project.refresh();
  }, []);

  return (
    <div className={styles.globalBar}>
      {project.dataSource.projectInfo.projectName}
    </div>
  );
};

export default GlobalBar;
