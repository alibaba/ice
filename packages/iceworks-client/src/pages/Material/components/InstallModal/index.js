import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import styles from './index.module.scss';

const InstallModal = ({
  on, onCancel, onOk, component,
}) => {
  const { source = {} } = component;
  return (
    <Modal
      title="组件下载"
      visible={on}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div className={styles.wrapper}>
        <div className={styles.item}>
          组件包名：{source.npm}
        </div>
        <div className={styles.item}>
          组件版本：{source.version}
        </div>
      </div>
    </Modal>
  );
};

InstallModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
};

export default InstallModal;
