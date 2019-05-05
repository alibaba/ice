import React from 'react';
import NavigationBar from '@components/NavigationBar';
import RouteRender from '@components/RouteRender';
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
          {routerConfig.map((route, index) => (
            <RouteRender key={index} {...route} />
          ))}
        </div>
      </div>

      <GlobalBar />
    </div>
  );
};

export default MainLayout;
