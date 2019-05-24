import React from 'react';
import PropTypes from 'prop-types';
import mockData from '@src/mock';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import stores from '../../stores';
import SavePageModel from './SavePageModel';
import styles from './CreatePageModal.module.scss';

// TODO
const pageData = {
  blocks: mockData.blocks,
  layout: mockData.layout,
};

const CreatePageModal = ({
  on, onCancel, onOk,
}) => {
  const {
    on: onSaveModel,
    toggleModal: toggleSaveModal,
  } = useModal();
  const page = stores.useStore('page');
  function onClose() {
    onCancel();
  }
  function onCreateOk() {
    page.setData(pageData);
    toggleSaveModal();
  }

  async function onSaveOk(data) {
    await onOk({
      ...page.dataSource,
      ...data,
    });
    toggleSaveModal();
  }

  return (
    <div>
      <Modal
        title="创建页面"
        visible={on}
        onCancel={onClose}
        onOk={onCreateOk}
      >
        <div className={styles.wrap}>
          测试的搭建页面
        </div>
      </Modal>
      <SavePageModel
        on={onSaveModel}
        onCancel={toggleSaveModal}
        onOk={onSaveOk}
      />
    </div>
  );
};

CreatePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreatePageModal;
