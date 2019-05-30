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

const TaskModal = ({ data, on, toggleModal, onConfirm }) => {
  let newValues = {};

  const onChange = (values) => {
    newValues = values;
  };

  const onOk = () => {
    onConfirm(newValues);
    toggleModal();
  };

  return (
    <Modal
      title="设置"
      visible={on}
      onCancel={toggleModal}
      onOk={onOk}
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

TaskModal.defaultProps = {
  onConfirm: () => {},
};

TaskModal.propTypes = {
  data: PropTypes.array.isRequired,
  on: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
};

export default TaskModal;
