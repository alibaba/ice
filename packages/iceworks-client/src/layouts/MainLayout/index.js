import React, { useEffect } from 'react';
import NavigationBar from '@components/NavigationBar';
import SubRoutes from '@components/SubRoutes';
import ConnectModal from '@components/ConnectModal';
import GlobalBar from '@components/GlobalBar';
import menuConfig from '@src/menuConfig';
import routerConfig from '@src/routerConfig';
import stores from '@stores';
import appConfig from '../../appConfig';
import styles from './index.module.scss';

const MainLayout = () => {
  const [project, user] = stores.useStores(['project', 'user']);

  useEffect(() => {
    project.refresh();
    if (appConfig.isAliInternal) {
      user.refresh();
    }
  }, []);

  async function onLogin(data) {
    await user.login(data);
  }

  return (
    <div className={styles.container}>
      <ConnectModal />
      <div className={styles.content}>
        <NavigationBar
          menuData={menuConfig}
          user={user.dataSource}
          onLogin={onLogin}
        />
        <div className={styles.main}>
          <SubRoutes routes={routerConfig} />
        </div>
      </div>
      <GlobalBar project={project} />
    </div>
  );
};

export default MainLayout;
