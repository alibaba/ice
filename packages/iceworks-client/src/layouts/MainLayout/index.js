import React, { useState } from 'react';
import { useSocket } from '@hooks/useSocket';
import NavigationBar from '@components/NavigationBar';
import RouteRender from '@components/RouteRender';
import ConnectionBar from '@components/ConnectionBar';
import GlobalBar from '@components/GlobalBar';
import menuConfig from '@src/menuConfig';
import routerConfig from '@src/routerConfig';
import styles from './index.module.scss';

const MainLayout = () => {
  const [connect, setConnect] = useState(false);
  useSocket('connect', () => setConnect({ connect: true }));
  useSocket('disconnect', () => setConnect({ connect: false }));

  return (
    <div className={styles.container}>
      {connect ? null : <ConnectionBar connect={connect} />}

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
