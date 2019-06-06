import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SubMenu from '@components/SubMenu';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import { Button } from '@alifd/next';
import logger from '@utils/logger';
import styles from './index.module.scss';

const MaterialSubMenu = ({
  data, onChange, onAddMaterial, current,
}) => {
  function handleChange(source, item) {
    logger.debug(item);
    onChange(source);
  }

  return (
    <SubMenu title="iceworks.material.title">
      <div className={styles.itemWrapper}>
        {data.map((item) => {
          const { source, logo, name } = item;
          return (
            <div
              className={cx(styles.subMenuItem, { [styles.active]: current === source })}
              key={source}
              onClick={() => handleChange(source, item)}
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
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.opts}>
        <Button className={styles.btn} type="primary" size="medium" onClick={onAddMaterial}>
          <Icon type="plus" size="l" />
          <span><FormattedMessage id="iceworks.material.add" /></span>
        </Button>
      </div>
    </SubMenu>
  );
};

MaterialSubMenu.defaultProps = {
  current: '',
  onChange: f => f,
  onAddMaterial: f => f,
};

MaterialSubMenu.propTypes = {
  current: PropTypes.string,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onAddMaterial: PropTypes.func,
};

export default MaterialSubMenu;
