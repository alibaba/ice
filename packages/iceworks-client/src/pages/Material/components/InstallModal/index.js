import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const InstallModal = ({
  on, onCancel, onOk, component,
}) => {
  const { source = {} } = component;
  return (
    <Modal
      title={<FormattedMessage id="iceworks.material.install.component.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <FormattedMessage id="iceworks.material.install.component.pacakgeName" />{source.npm}
        </div>
        <div className={styles.item}>
          <FormattedMessage id="iceworks.material.install.component.packageVersion" />{source.version}
        </div>
      </div>
    </Modal>
  );
};

InstallModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
};

export default InstallModal;
