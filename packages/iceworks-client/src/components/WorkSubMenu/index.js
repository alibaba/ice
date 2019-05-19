import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import SubMenu from '@components/SubMenu';
import styles from './index.module.scss';

const DevSubMenu = ({ data, title }) => {
  return (
    <SubMenu title={title}>
      <div className={styles.wrapper}>
        {data.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={styles.item}
              activeStyle={{ background: '#eee' }}
            >
              <FormattedMessage id={item.name} />
            </NavLink>
          );
        })}
      </div>
    </SubMenu>
  );
};

DevSubMenu.defaultProps = {
  title: '',
};

DevSubMenu.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default DevSubMenu;
