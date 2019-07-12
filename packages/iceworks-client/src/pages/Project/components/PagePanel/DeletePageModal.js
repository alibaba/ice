import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';

const DeletePageModal = ({
  on, onCancel, onOk, page,
}) => {
  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.page.delete.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk()}
    >
      <FormattedMessage id="iceworks.project.panel.page.delete.content" values={{ name: page.name }} />
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
