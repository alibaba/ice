import React from 'react';
import PropTypes from 'prop-types';
import SubMenu from '@components/SubMenu';
import SubMenuItem from '@components/SubMenuItem';
import SubRoutes from '@components/SubRoutes';
import { getMenuData } from '@utils/getMenuData';
import styles from './index.module.scss';

const SettingSubMenu = ({ routes }) => {
  const menuData = getMenuData() || {};
  const subMenuData = menuData.children || [];

  return (
    <div className={styles.settingSubMenu}>
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

SettingSubMenu.defaultProps = {
  routes: [],
};

SettingSubMenu.propTypes = {
  routes: PropTypes.array,
};

export default SettingSubMenu;
