import React from 'react';
import PropTypes from 'prop-types';
import SubMenu from '@components/SubMenu';
import SubMenuItem from '@components/SubMenuItem';
import SubRoutes from '@components/SubRoutes';
import Card from '@components/Card';
import { getMenuData } from '@utils/getMenuData';
import styles from './index.module.scss';

const Main = ({ routes }) => {
  const menuData = getMenuData() || {};
  const subMenuData = menuData.children || [];

  return (
    <div className={styles.wrap}>
      {/* render setting submenu */}
      <SubMenu title="iceworks.setting.title">
        {subMenuData.map((dataSource, key) => (
          <SubMenuItem dataSource={dataSource} key={key} />
        ))}
      </SubMenu>

      {/* render setting sub-routes */}
      <main className={styles.main}>
        <SubRoutes routes={routes} />
      </main>
    </div>
  );
};

Main.defaultProps = {
  routes: [],
};

Main.propTypes = {
  routes: PropTypes.array,
};

export default Main;
