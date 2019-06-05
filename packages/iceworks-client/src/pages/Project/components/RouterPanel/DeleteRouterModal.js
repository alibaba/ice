import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';

const DeleteRouterModal = ({
  on, onCancel, onOk, router,
}) => {
  const { path } = router;

  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.router.delete.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk()}
    >
      <div>
        <FormattedMessage id="iceworks.project.panel.router.delete.content" values={{ name: path }} />
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
