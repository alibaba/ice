import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';

const DeleteRouterModal = ({
  on, onCancel, onOk, router,
}) => {
  const { path } = router;

  return (
    <Modal
      title="删除导航"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk()}
    >
      <div>
        <span>确定移除路由 &quot;{path}&quot; ？</span>
      </div>
    </Modal>
  );
};

DeleteRouterModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default DeleteRouterModal;
