import React from 'react';
import PropTypes from 'prop-types';
import SubMenu from '@components/SubMenu';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import { Button } from '@alifd/next';
import SubMenuItem from './SubMenuItem';
import styles from './index.module.scss';

const MaterialSubMenu = ({
  data, onChange, onAddMaterial, current, onDelete,
}) => {
  const { official, custom } = data;
  const hasCustomMaterial = custom && custom.length > 0;

  return (
    <SubMenu title="iceworks.material.title">
      <div className={styles.itemWrapper}>
        <div>
          <div className={styles.separator}><FormattedMessage id="iceworks.material.customMaterial" /></div>
          {official.map((item) => {
            return (
              <SubMenuItem
                key={`official-${item.source}`}
                current={current}
                material={item}
                onChange={onChange}
                enableDelete={false}
              />
            );
          })}
        </div>
        {
          hasCustomMaterial ?
            <div>
              <div className={styles.separator}><FormattedMessage id="iceworks.material.officialMaterial" /></div>
              {custom.map((item) => {
                return (
                  <SubMenuItem
                    key={`custom-${item.source}`}
                    current={current}
                    material={item}
                    onChange={onChange}
                    enableDelete
                    onDelete={onDelete}
                  />
                );
              })}
            </div>
          : null
        }
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
  onDelete: f => f,
  onAddMaterial: f => f,
};

MaterialSubMenu.propTypes = {
  current: PropTypes.string,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onAddMaterial: PropTypes.func,
};

export default MaterialSubMenu;
