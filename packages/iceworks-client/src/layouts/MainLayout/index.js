import React, { useEffect } from 'react';
import showMessage from '@utils/showMessage';
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
  const [projectStore, userStore] = stores.useStores(['project', 'user']);

  async function onInit() {
    try {
      await projectStore.refresh();
    } catch (error) {
      // ignore project refresh error
    }

    if (appConfig.isAliInternal) {
      await userStore.refresh();
    }
  }
  async function onLogin(data) {
    try {
      await userStore.login(data);
    } catch (error) {
      showMessage(error);
    }
  }

  useEffect(() => {
    onInit();
  }, []);

  return (
    <div className={styles.container}>
      <ConnectModal />
      <div className={styles.content}>
        <NavigationBar
          menuData={menuConfig}
          user={userStore.dataSource}
          onLogin={onLogin}
        />
        <div className={styles.main}>
          <SubRoutes routes={routerConfig} />
        </div>
      </div>
      <GlobalBar project={projectStore.dataSource} />
    </div>
  );
};

export default MainLayout;
