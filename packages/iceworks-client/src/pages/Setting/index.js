import React from 'react';
import PropTypes from 'prop-types';
import SubMenu from '@components/SubMenu';
import RouteRender from '@components/RouteRender';
import { getMenuData } from '@utils/getMenuData';
import styles from './index.module.scss';

const Setting = ({ routes }) => {
  const menuData = getMenuData() || {};
  const subMenuData = menuData.children || [];

  return (
    <div className={styles.settingPage}>
      {/* render setting submenu */}
      <SubMenu data={subMenuData} title="iceworks.setting.title" />

      {/* render setting subroute */}
      {routes.map((route, i) => (
        <RouteRender key={i} {...route} />
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
