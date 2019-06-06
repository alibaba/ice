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

  return (
    <SubMenu title="iceworks.material.title">
      <div className={styles.itemWrapper}>
        <div className={styles.separator}>官方物料</div>
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
        <div className={styles.separator}>自定义物料</div>
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
