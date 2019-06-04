import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import styles from './index.module.scss';

// TODO
const OpenProjectModal = ({ on, onCancel, onOk }) => {
  const [path, setPath] = useState('');

  return (
    <Modal
      title="打开项目"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk(path)}
    >
      <div className={styles.wrap}>
        test
      </div>
    </Modal>
  );
};

OpenProjectModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default OpenProjectModal;
