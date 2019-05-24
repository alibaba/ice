import React from 'react';
import PropTypes from 'prop-types';
import SubRoutes from '@components/SubRoutes';
import SubMenu from '@components/SubMenu';
import SubMenuItem from '@components/SubMenuItem';
import { getMenuData } from '@utils/getMenuData';

import styles from './index.module.scss';

const Tasks = ({ routes }) => {
  const menuData = getMenuData() || {};
  const subMenuData = menuData.children || [];

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
