import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const NavigationBar = ({ menuData }) => {
  return (
    <div className={styles.aside}>
      {menuData.map((item) => {
        return (
          <NavLink to={item.path} key={item.path} className={styles.navItem}>
            <Icon
              type={item.icon}
              size="large"
              className={styles.navItemIcon}
            />
            <span className={styles.navItemText}>{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

NavigationBar.defaultProps = {
  menuData: [],
};

NavigationBar.propTypes = {
  menuData: PropTypes.array,
};

export default NavigationBar;
