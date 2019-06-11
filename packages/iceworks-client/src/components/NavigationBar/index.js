import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import User from '@components/User';
import styles from './index.module.scss';

const NavigationBar = ({ menuData, user, onLogin }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        {menuData.map((item) => {
          return (
            <NavLink
              to={item.path}
              key={item.path}
              className={styles.item}
              activeStyle={{ borderLeft: '3px solid #fff' }}
            >
              <Icon
                type={item.icon}
                size="large"
                className={styles.navItemIcon}
              />
              <span className={styles.navItemText}>
                <FormattedMessage id={item.name} />
              </span>
            </NavLink>
          );
        })}
      </div>
      <div className={styles.user}>
        <User {...user} onLogin={onLogin} />
      </div>
    </div>
  );
};

NavigationBar.defaultProps = {
  menuData: [],
  user: {},
};

NavigationBar.propTypes = {
  menuData: PropTypes.array,
  user: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
};

export default NavigationBar;
