import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from '@alifd/next';
import { injectIntl } from 'react-intl';
import Modal from '@components/Modal';
import styles from './SwtichBranchModal.module.scss';

const originData = {};

function SwtichBranchModal({ onOk, on, onCancel, dataSource, intl }) {
  const [data, setData] = useState(originData);

  async function onSave() {
    await onOk(data);
    setData(originData);
  }

  async function onClose() {
    setData(originData);
    await onCancel();
  }

  function onOriginChange(value) {
    setData({
      checkoutBranch: value,
    });
  }

  return (
    <Modal
      title={intl.formatMessage({ id: 'iceworks.project.panel.git.switch.title' })}
      visible={on}
      onCancel={onClose}
      onOk={onSave}
    >
      <div className={styles.wrap}>
        <span>Checkout</span>
        <Select
          placeholder={intl.formatMessage({ id: 'iceworks.project.panel.git.switch.select' })}
          onChange={onOriginChange}
          dataSource={dataSource}
          displayRender={(label) => label[1]}
        />
      </div>
    </Modal>
  );
}

SwtichBranchModal.defaultProps = {
  dataSource: [],
};

SwtichBranchModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  dataSource: PropTypes.array,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SwtichBranchModal);
