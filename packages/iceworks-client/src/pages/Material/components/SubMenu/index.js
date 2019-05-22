import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import logger from '@utils/logger';
import styles from './index.module.scss';

const SubMenu = ({ data, title, onChange }) => {
  const [state, setState] = useState({
    current: 0,
  });

  function handleChange(index, item) {
    logger.debug(item);
    setState({ current: index });

    if (typeof onChange === 'function') {
      onChange(item.source);
    }
  }

  return (
    <div className={styles.subMenu}>
      {title ? <h2 className={styles.subMenuTitle}>{title}</h2> : null}
      {data.map((item, index) => {
        return (
          <div
            className={cx(styles.subMenuItem, { [styles.active]: state.current === index })}
            key={index}
            onClick={() => handleChange(index, item)}
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
  onChange: f => f,
};

SubMenu.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func,
};

export default SubMenu;
