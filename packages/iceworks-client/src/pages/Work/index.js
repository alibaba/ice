import React from 'react';
import PropTypes from 'prop-types';
import RouteRender from '@components/RouteRender';
import SubMenu from '@components/SubMenu';
import SubMenuItem from '@components/SubMenuItem';
import { getMenuData } from '@utils/getMenuData';

import styles from './index.module.scss';

const Work = ({ routes }) => {
  const menuData = getMenuData() || {};
  const subMenuData = menuData.children || [];

  return (
    <div className={styles.workPage}>
      {/* render work submenu */}
      <SubMenu title="iceworks.work.title">
        {subMenuData.map((dataSource, key) => (
          <SubMenuItem dataSource={dataSource} key={key} />
        ))}
      </SubMenu>

      {/* render work subroute */}
      <div className={styles.main}>
        {routes.map((route, i) => (
          <RouteRender key={i} {...route} />
        ))}
      </div>
    </div>
  );
};

Work.defaultProps = {
  routes: [],
};

Work.propTypes = {
  routes: PropTypes.array,
};

export default Work;
