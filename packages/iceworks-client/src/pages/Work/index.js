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
      {/* render work submenu */}
      <SubMenu data={subMenuData} title="iceworks.work.title" />

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
