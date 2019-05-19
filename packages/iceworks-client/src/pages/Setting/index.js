import React from 'react';
import PropTypes from 'prop-types';
import SubMenu from '@components/SubMenu';
import SubMenuItem from '@components/SubMenuItem';
import RouteRender from '@components/RouteRender';
import { getMenuData } from '@utils/getMenuData';
import styles from './index.module.scss';

const Setting = ({ routes }) => {
  const menuData = getMenuData() || {};
  const subMenuData = menuData.children || [];

  return (
    <div className={styles.settingPage}>
      {/* render setting submenu */}
      <SubMenu title="iceworks.setting.title">
        {subMenuData.map((dataSource, key) => (
          <SubMenuItem dataSource={dataSource} key={key} />
        ))}
      </SubMenu>

      {/* render setting subroute */}
      {routes.map((route, key) => (
        <RouteRender key={key} {...route} />
      ))}
    </div>
  );
};

Setting.defaultProps = {
  routes: [],
};

Setting.propTypes = {
  routes: PropTypes.array,
};

export default Setting;
