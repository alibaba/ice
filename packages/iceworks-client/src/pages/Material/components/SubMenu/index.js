import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SubMenu from '@components/SubMenu';
import Icon from '@components/Icon';
import { Button } from '@alifd/next';
import logger from '@utils/logger';
import styles from './index.module.scss';

const defaultIcons = ['puzzle', 'blocks', 'book', 'template'];

const MaterialSubMenu = ({
  data, onChange, onAddMaterial, onDeleteMaterial,
}) => {
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

  function handleDelete(index, item) {
    if (typeof onChange === 'function') {
      onDeleteMaterial(index, item);
    }
  }

  return (
    <SubMenu title="iceworks.material.title">
      <div className={styles.itemWrapper}>
        {data.map((item, index) => {
          /* eslint-disable-next-line */
          const randomIcon = index & 3;

          return (
            <div
              className={cx(styles.subMenuItem, { [styles.active]: state.current === index })}
              key={index}
              onClick={() => handleChange(index, item)}
            >
              <Icon type={defaultIcons[randomIcon]} className={styles.icon} />
              <div className={styles.info}>
                <h5 className={styles.name}>
                  {item.name}
                </h5>
              </div>
              <Icon type="trash" className={styles.del} onCLick={() => handleDelete(index, item)} />
            </div>
          );
        })}
      </div>
      <div className={styles.opts}>
        <Button className={styles.btn} type="primary" size="medium" onClick={onAddMaterial}>
          <Icon type="plus" size="l" />
          <span>添加物料</span>
        </Button>
      </div>
    </SubMenu>
  );
};

MaterialSubMenu.defaultProps = {
  onChange: f => f,
  onAddMaterial: f => f,
  onDeleteMaterial: f => f,
};

MaterialSubMenu.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onAddMaterial: PropTypes.func,
  onDeleteMaterial: PropTypes.func,
};

export default MaterialSubMenu;
