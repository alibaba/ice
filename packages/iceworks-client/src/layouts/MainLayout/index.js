import React from 'react';
import NavigationBar from '@components/NavigationBar';
import SubRoutes from '@components/SubRoutes';
import GlobalBar from '@components/GlobalBar';
import menuConfig from '@src/menuConfig';
import routerConfig from '@src/routerConfig';
import styles from './index.module.scss';

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <NavigationBar menuData={menuConfig} />
        <div className={styles.main}>
          <SubRoutes routes={routerConfig} />
        </div>
      </div>
      <GlobalBar />
    </div>
  );
};

export default MainLayout;
