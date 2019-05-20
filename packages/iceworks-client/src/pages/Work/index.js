import React from 'react';
import PropTypes from 'prop-types';
import SubRoutes from '@components/SubRoutes';
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

      {/* render work sub-routes */}
      <main className={styles.main}>
        <SubRoutes routes={routes} />
      </main>
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
