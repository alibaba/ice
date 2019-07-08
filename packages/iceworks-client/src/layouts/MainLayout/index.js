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
  const [project, user] = stores.useStores(['project', 'user']);

  async function onInit() {
    try {
      await project.refresh();
      if (appConfig.isAliInternal) {
        await user.refresh();
      }
    } catch (error) {
      showMessage(error);
    }
  }
  async function onLogin(data) {
    try {
      await user.login(data);
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
