import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';

const OpenProject = ({ on, toggleModal }) => {
  return (
    <Modal
      title="打开项目"
      visible={on}
      onCancel={toggleModal}
    >
      测试
    </Modal>
  );
};

OpenProject.propTypes = {
  on: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default OpenProject;
