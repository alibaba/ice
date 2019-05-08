import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import DynamicForm from '@components/DynamicForm';

const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 16,
    offset: 1,
  },
};

const SettingsModal = ({ data, on, toggleModal }) => {
  const onChange = (values) => {
    console.log(values);
  };

  return (
    <Modal
      title="设置"
      visible={on}
      onCancel={toggleModal}
      style={{ width: '520px' }}
    >
      <DynamicForm
        config={data}
        formItemLayout={formItemLayout}
        onChange={onChange}
      />
    </Modal>
  );
};

SettingsModal.propTypes = {
  data: PropTypes.array.isRequired,
  on: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default SettingsModal;
