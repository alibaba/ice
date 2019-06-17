import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@alifd/next';
import Modal from '@components/Modal';
import styles from './index.module.scss';

const PanelSettingModal = ({
  on, onCancel, onOk, panels,
}) => {
  return (
    <Modal
      title="面板设置"
      visible={on}
      onCancel={onCancel}
      onOk={onOk}
      footer={false}
    >
      <div className={styles.wrapper}>
        {
          panels.map(({ title, description, cover, isAvailable, name }) => {
            return (
              <div key={name}>
                <div>
                  <img src={cover} alt={name} />
                </div>
                <div>
                  <div>{title}</div>
                  <div>{description}</div>
                </div>
                <Switch checked={isAvailable} />
              </div>
            );
          })
        }
      </div>
    </Modal>
  );
};

PanelSettingModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  panels: PropTypes.array.isRequired,
};

export default PanelSettingModal;
