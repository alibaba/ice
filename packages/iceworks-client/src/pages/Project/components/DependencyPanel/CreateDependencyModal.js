import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Input } from '@alifd/next';
import styles from './CreateDependencyModal.module.scss';

const CreateDependencyModal = ({
  on, onCancel, onOk,
}) => {
  const [value, setState] = useState('');

  function onChange(text) {
    const newValue = text.split(/\s+/).filter((dep) => !!dep.trim()).map((dep) => {
      const [packageName, version] = dep.split('@');
      return {
        package: packageName,
        version: version || 'latest',
      };
    });
    setState(newValue);
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
          className={styles.textarea}
        />
      </div>
    </Modal>
  );
};

CreateDependencyModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateDependencyModal;
