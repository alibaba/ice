import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Input } from '@alifd/next';

// TODO
const OpenProject = ({ on, onCancel, onOk }) => {
  const [path, setPath] = useState('');

  return (
    <Modal
      title="打开项目"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk(path)}
    >
      <span>
        项目路径：
        <Input
          value={path}
          onChange={(value) => {
            setPath(value);
          }}
          placeholder="/"
        />
      </span>
    </Modal>
  );
};

OpenProject.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default OpenProject;
