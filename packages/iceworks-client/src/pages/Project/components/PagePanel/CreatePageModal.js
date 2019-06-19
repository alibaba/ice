import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import mockData from '@src/mock';
import stores from '@stores';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';
import pageStores from '../../stores';
import SavePageModal from './SavePageModal';
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
    on: onSaveModal,
    toggleModal: toggleSaveModal,
  } = useModal();
  const [page] = pageStores.useStores(['page']);
  const [progress] = stores.useStores(['progress']);

  async function onCloseSaveModal() {
    await progress.hide();
    toggleSaveModal();
  }

  function onCreateOk() {
    page.setData(pageData);
    toggleSaveModal();
  }

  async function onSaveOk(data) {
    await progress.show({ statusText: <FormattedMessage id="iceworks.project.panel.page.create.progress.start" /> });
    await onOk({
      ...page.dataSource,
      ...data,
    });
    await progress.hide();
    toggleSaveModal();
  }

  useSocket('adapter.page.create.status', ({ text, percent }) => {
    progress.show({ statusText: text, percent });
  });

  return (
    [
      <Modal
        title={<FormattedMessage id="iceworks.project.panel.page.create.title" />}
        visible={on}
        onCancel={onCancel}
        onOk={onCreateOk}
        key="createModal"
      >
        <div className={styles.wrap}>
          测试的搭建页面
        </div>
      </Modal>,
      <SavePageModal
        on={onSaveModal}
        onCancel={onCloseSaveModal}
        onOk={onSaveOk}
        key="saveModal"
      />,
    ]
  );
};

CreatePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreatePageModal;
