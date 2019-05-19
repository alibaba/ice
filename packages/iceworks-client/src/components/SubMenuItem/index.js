/* eslint no-nested-ternary:0 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const SubMenuItem = ({ dataSource }) => {
  const { name, path, icon, image, desc } = dataSource;
  return (
    <div className={styles.item}>
      <NavLink
        exact
        key={path}
        to={path}
        className={styles.link}
        activeStyle={{ background: '#eee' }}
      >
        {icon ? (
          <Icon type={icon} className={styles.icon} />
        ) : image ? (
          <div className={styles.image}>{image}</div>
        ) : null}
        <div className={styles.info}>
          <h5 className={styles.name}>
            <FormattedMessage id={name} />
          </h5>
          {desc ? <p className={styles.desc}>{desc}</p> : null}
        </div>
      </NavLink>
    </div>
  );
};

SubMenuItem.defaultProps = {};

SubMenuItem.propTypes = {
  dataSource: PropTypes.object.isRequired,
};

export default SubMenuItem;
