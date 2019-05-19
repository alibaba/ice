import React from 'react';
import PropTypes from 'prop-types';
import logger from '@utils/logger';
import styles from './index.module.scss';

const SubMenu = ({ data, title }) => {
  const handleClick = (item) => {
    logger.debug(item);
  };

  return (
    <div className={styles.subMenu}>
      {title ? <h2 className={styles.subMenuTitle}>{title}</h2> : null}
      {data.map((item, index) => {
        return (
          <div
            className={styles.subMenuItem}
            key={index}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </div>
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
