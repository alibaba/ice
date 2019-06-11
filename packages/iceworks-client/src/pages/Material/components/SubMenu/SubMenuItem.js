import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '@components/Icon';
import logger from '@utils/logger';
import styles from './index.module.scss';

const MaterialSubMenu = ({
  material, current, enableDelete, onChange, onDelete,
}) => {
  function handleChange(source, item) {
    logger.debug('select item', item);
    onChange(source);
  }
  function handleDelete(source, item, event) {
    event.preventDefault();
    event.stopPropagation();
    logger.debug('delete item', item);
    onDelete(source);
  }

  const { source, logo, name, description } = material;
  return (
    <div
      className={cx(styles.subMenuItem, { [styles.active]: current === source })}
      onClick={() => handleChange(source, material)}
    >
      <div className={styles.logo}>
        {
          logo
            ? <img src={logo} alt={name} />
            : <div className={styles.avatar}>{name.slice(0, 1)}</div>
        }
      </div>
      <div className={styles.info}>
        <h5 className={styles.name}>
          {name}
        </h5>
        {
          description
          ? <p className={styles.description}>{description}</p>
          : null
        }
      </div>
      {
        enableDelete ? <Icon type="trash" className={styles.del} onClick={(event) => handleDelete(source, material, event)} /> : null
      }
    </div>
  );
};

MaterialSubMenu.defaultProps = {
  current: '',
  onChange: f => f,
  onDelete: f => f,
  enableDelete: false,
};

MaterialSubMenu.propTypes = {
  current: PropTypes.string,
  enableDelete: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  material: PropTypes.object.isRequired,
};

export default MaterialSubMenu;
