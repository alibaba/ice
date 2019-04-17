import React from 'react';
import PropTypes from 'prop-types';
import RouteRender from '@components/RouteRender';
import SubMenu from '@components/SubMenu';
import { getMenuData } from '@utils/getMenuData';

import styles from './index.module.scss';

const Work = ({ routes }) => {
  const menuData = getMenuData() || {};
  const subMenuData = menuData.children || [];

  return (
    <div className={styles.workPage}>
      {/* render sub menu */}
      <SubMenu data={subMenuData} title="工程管理" />

      {/* render sub route */}
      {routes.map((route, i) => (
        <RouteRender key={i} {...route} />
      ))}
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
