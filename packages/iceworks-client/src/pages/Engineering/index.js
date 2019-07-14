import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import SubRoutes from '@components/SubRoutes';
import SubMenu from '@components/SubMenu';
import SubMenuItem from '@components/SubMenuItem';
import { getMenuData } from '@utils/getMenuData';
import stores from '@stores';
import styles from './index.module.scss';

const Engineering = ({ routes }) => {
  const projectStore = stores.useStore('project');

  function isConfExist() {
    return projectStore.dataSource.panels.some((panel) => {
      return panel.name === 'Configuration';
    });
  }

  function getSubMenuData() {
    const hiddenPaths = [];
    // if configuration panel not found, hide configuration menu
    if (!isConfExist()) {
      hiddenPaths.push('/task/configuration');
    }
    const menuData = getMenuData(hiddenPaths) || {};
    const subMenuData = menuData.children || [];
    return subMenuData;
  }

  const [subMenuData, setSubMenuData] = useState([]);

  useEffect(() => {
    setSubMenuData(getSubMenuData());
  }, []);

  if (!projectStore.dataSource.name) {
    return (
      <div className={styles.noProject}>
        <h5><FormattedMessage id="iceworks.global.no.project" /></h5>
      </div>
    );
  }

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

Engineering.defaultProps = {
  routes: [],
};

Engineering.propTypes = {
  routes: PropTypes.array,
};

export default Engineering;
