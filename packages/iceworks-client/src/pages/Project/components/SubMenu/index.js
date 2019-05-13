import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const SubMenu = () => {
  return (
    <div className={styles.subMenu}>
      <h2 className={styles.subMenuTitle}>
        <FormattedMessage id="iceworks.project.title" />
      </h2>
    </div>
  );
};

export default SubMenu;
