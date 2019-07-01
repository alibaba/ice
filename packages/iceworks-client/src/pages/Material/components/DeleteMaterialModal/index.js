import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Modal from '@components/Modal';
import styles from './index.module.scss';

const DeleteMaterialModal = ({
  on, onCancel, onOk, loading,
}) => {
  const initDeleteFiles = false;
  const [deleteFiles, setState] = useState(initDeleteFiles);

  function onClose() {
    onCancel();
    setState(initDeleteFiles);
  }
  return (
    <Modal
      title={<FormattedMessage id="iceworks.material.delete" />}
      visible={on}
      onCancel={onClose}
      onOk={() => onOk({ deleteFiles })}
      okProps={{ loading }}
    >
      <div className={styles.wrapper}>
        <FormattedMessage id="iceworks.material.deleteConfirm" />
      </div>
    </Modal>
  );
};

DeleteMaterialModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DeleteMaterialModal;
