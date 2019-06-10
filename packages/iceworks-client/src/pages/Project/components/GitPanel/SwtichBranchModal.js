import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, CascaderSelect } from '@alifd/next';
import Modal from '@components/Modal';
import styles from './SwtichBranchModal.module.scss';

const originData = {};

function SwtichBranchModal({ onOk, on, onCancel, dataSource }) {
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
      title="切换分支"
      visible={on}
      onCancel={onClose}
      onOk={onSave}
    >
      <div className={styles.wrap}>
        <span>Checkout</span>
        <CascaderSelect
          placeholder="选择分支"
          onChange={onOriginChange}
          dataSource={dataSource}
          displayRender={(label) => label[1]}
        />
        <span>As</span>
        <Input
          onChange={onCheckoutChange}
          placeholder="请输入本地分支名称"
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
};

export default SwtichBranchModal;
