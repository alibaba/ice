import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';

const CreatePageModal = ({
  on, onCancel, onOk,
}) => {
  const [blocks, setState] = useState([]);

  function onClose() {
    onCancel();
    setState([]);
  }

  return (
    <Modal
      title="创建页面"
      visible={on}
      onCancel={onClose}
      onOk={() => onOk({ blocks })}
    >
      <div>
        测试
      </div>
    </Modal>
  );
};

CreatePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreatePageModal;
