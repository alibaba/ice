import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SubRoutes from '@components/SubRoutes';
import SubMenu from '@components/SubMenu';
import SubMenuItem from '@components/SubMenuItem';
import { getMenuData } from '@utils/getMenuData';

import stores from '@stores';

import styles from './index.module.scss';

const Tasks = ({ routes }) => {
  const conf = stores.useStore('configuration');

  function getSubMenuData() {
    const hiddenPaths = [];
    // if ice.config.js not found, hide configuration menu
    if (!conf.dataSource.cli) {
      hiddenPaths.push('/task/configuration');
    }
    const menuData = getMenuData(hiddenPaths) || {};
    const subMenuData = menuData.children || [];
    return subMenuData;
  }

  const [subMenuData, setSubMenuData] = useState([]);

  async function onGetCLIConf() {
    await conf.getCLIConf();
    setSubMenuData(getSubMenuData());
  }

  useEffect(() => {
    onGetCLIConf();
  }, []);

  return (
    <div className={styles.tasksPage}>
      {/* render task submenu */}
      <SubMenu title="iceworks.task.title">
        {subMenuData.map((dataSource, key) => (
          <SubMenuItem dataSource={dataSource} key={key} />
        ))}
      </SubMenu>

      {/* render task sub-routes */}
      <main className={styles.main}>
        <SubRoutes routes={routes} />
      </main>
    </div>
  );
};

Tasks.defaultProps = {
  routes: [],
};

Tasks.propTypes = {
  routes: PropTypes.array,
};

export default Tasks;
