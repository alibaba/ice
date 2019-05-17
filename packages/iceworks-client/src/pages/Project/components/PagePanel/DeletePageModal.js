import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';

const DeletePageModal = ({
  on, onCancel, onOk, page,
}) => {
  const [deleteFiles, setState] = useState(false);

  function onClose() {
    onCancel();
    setState(false);
  }
  return (
    <Modal
      title="删除页面"
      visible={on}
      onCancel={onClose}
      onOk={() => onOk({ deleteFiles })}
    >
      <div>
        确定移除页面 &quot;{page.name}&quot; ？
      </div>
    </Modal>
  );
};

DeletePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
};

export default DeletePageModal;
