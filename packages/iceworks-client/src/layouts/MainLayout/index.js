import React, { useEffect, useState } from 'react';
import NavigationBar from '@components/NavigationBar';
import SubRoutes from '@components/SubRoutes';
import ConnectModal from '@components/ConnectModal';
import GlobalBar from '@components/GlobalBar';
import menuConfig from '@src/menuConfig';
import routerConfig from '@src/routerConfig';
import stores from '@stores';
import socket from '../../socket';
import styles from './index.module.scss';

const MainLayout = () => {
  const project = stores.useStore('project');
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    project.refresh();
  }, []);

  socket.on('connect', () => {
    setConnect(true);
  });

  socket.on('disconnect', () => {
    setConnect(false);
  });

  return (
    <div className={styles.container}>
      <ConnectModal connect={connect} />
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
