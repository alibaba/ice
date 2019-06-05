import React, { useEffect } from 'react';
import NavigationBar from '@components/NavigationBar';
import SubRoutes from '@components/SubRoutes';
import GlobalBar from '@components/GlobalBar';
import menuConfig from '@src/menuConfig';
import routerConfig from '@src/routerConfig';
import stores from '@stores';
import styles from './index.module.scss';

const MainLayout = () => {
  const project = stores.useStore('project');

  useEffect(() => {
    project.refresh();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <NavigationBar menuData={menuConfig} />
        <div className={styles.main}>
          <SubRoutes routes={routerConfig} />
        </div>
      </div>
      <GlobalBar project={project} />
    </div>
  );
};

export default MainLayout;
