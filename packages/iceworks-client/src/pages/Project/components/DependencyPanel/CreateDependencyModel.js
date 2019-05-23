import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Input } from '@alifd/next';

const CreateDependencyModel = ({
  on, onCancel, onOk,
}) => {
  const [value, setState] = useState('');

  async function onChange(text) {
    setState(text.split(/\s+/).filter((dep) => !!dep.trim()).map((dep) => {
      const [_package, version] = dep.split('@');
      return {
        package: _package,
        version: version || 'latest',
      };
    }));
  }

  return (
    <Modal
      title="添加依赖"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk(value)}
    >
      <div>
        <Input.TextArea
          onChange={onChange}
          placeholder="请输入 npm 包名以及版本号，例如：lodash@latest。按回车输入多个依赖。"
          style={{ width: 300 }}
        />
      </div>
    </Modal>
  );
};

CreateDependencyModel.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateDependencyModel;
