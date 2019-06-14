import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, CascaderSelect } from '@alifd/next';
import { injectIntl } from 'react-intl';
import Modal from '@components/Modal';
import styles from './SwtichBranchModal.module.scss';

const originData = {};

function SwtichBranchModal({ onOk, on, onCancel, dataSource, intl }) {
  const [data, setData] = useState(originData);
  const { originBranch, checkoutBranch } = data;

  async function onSave() {
    await onOk(data);
    setData(originData);
  }

  async function onClose() {
    setData(originData);
    await onCancel();
  }

  function onOriginChange(value, _, extra) {
    setData({
      originBranch: value,
      checkoutBranch: extra.selectedPath[0].label === 'local' ? value : '',
    });
  }

  function onCheckoutChange(value) {
    setData({
      ...data,
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
        <CascaderSelect
          placeholder={intl.formatMessage({ id: 'iceworks.project.panel.git.switch.select' })}
          onChange={onOriginChange}
          dataSource={dataSource}
          displayRender={(label) => label[1]}
        />
        <span>As</span>
        <Input
          placeholder={intl.formatMessage({ id: 'iceworks.project.panel.git.switch.input' })}
          onChange={onCheckoutChange}
          value={checkoutBranch}
          disabled={!originBranch}
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
