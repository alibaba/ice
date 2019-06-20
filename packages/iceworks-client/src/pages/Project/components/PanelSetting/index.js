import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@alifd/next';
import Ellipsis from '@icedesign/ellipsis';
import styles from './index.module.scss';

const PanelSetting = ({ panels, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.head}>面板设置</h2>
      {
        panels.map(({ title, description, cover, isAvailable, name }) => {
          return (
            <div key={name} className={styles.item}>
              <div className={styles.cover}>
                <img src={cover} alt={name} />
              </div>
              <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>
                  <Ellipsis showTooltip lineLimit={1} text={description} />
                </div>
              </div>
              <Switch
                checked={isAvailable}
                onChange={async (checked) => {
                  await onChange(name, checked);
                }}
              />
            </div>
          );
        })
      }
    </div>
  );
};

PanelSetting.propTypes = {
  panels: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PanelSetting;
