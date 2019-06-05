import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';
import { Input } from '@alifd/next';
import styles from './CreateDependencyModal.module.scss';

const CreateDependencyModal = ({
  on, onCancel, onOk,
}) => {
  const [value, setState] = useState('');

  function onChange(text) {
    const newValue = text.split(/\s+/).filter((dep) => !!dep.trim()).map((dep) => {
      const splitIndex = dep.lastIndexOf('@');

      // @alifd/next || @aliff/next@1.0.0 || react || react@16.0.0
      const packageName = splitIndex ? dep.slice(0, splitIndex) : dep;
      const version = splitIndex ? dep.slice(splitIndex + 1) : '';
      return {
        package: packageName,
        version: version || 'latest',
      };
    });
    setState(newValue);
  }

  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.dependency.create.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk(value)}
    >
      <FormattedMessage id="iceworks.project.panel.dependency.create.placeholder">
        {(placeholder) => (
          <Input.TextArea
            onChange={onChange}
            placeholder={placeholder}
            className={styles.textarea}
          />
        )}
      </FormattedMessage>
    </Modal>
  );
};

CreateDependencyModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateDependencyModal;
