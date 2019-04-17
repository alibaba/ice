import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const SubMenu = ({ data, title }) => {
  return (
    <div className={styles.subMenu}>
      {title ? <h2 className={styles.subMenuTitle}>{title}</h2> : null}
      {data.map((item) => {
        return (
          <Link key={item.path} to={item.path} className={styles.subMenuItem}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

SubMenu.defaultProps = {
  title: '',
};

SubMenu.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default SubMenu;
