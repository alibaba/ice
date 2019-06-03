import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';

const DependencyIncompatibleModal = ({
  on, onCancel, onOk, incompatibleDependencyText, projectDependencyText,
}) => {
  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.dependency.main.incompatible.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div>
        <FormattedMessage
          id="iceworks.project.panel.dependency.main.incompatible.content"
          values={{ incompatibleDependencyText, projectDependencyText }}
        />
      </div>
    </Modal>
  );
};

DependencyIncompatibleModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  incompatibleDependencyText: PropTypes.string.isRequired,
  projectDependencyText: PropTypes.string.isRequired,
};

export default DependencyIncompatibleModal;
