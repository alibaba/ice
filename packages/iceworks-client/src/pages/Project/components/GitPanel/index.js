import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon as NextIcon } from '@alifd/next';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import Panel from '../Panel';
import GitRemote from './GitRemote';
import CreateBranchModal from './CreateBranchModal';
import stores from '../../stores';
import styles from './index.module.scss';

const GitPanel = () => {
  const {
    on: onEditModal,
    setModal: setEditModal,
  } = useModal();
  const {
    on: onCreateModal,
    setModal: setCreateModal,
  } = useModal();
  const gitStore = stores.useStore('git');
  const { dataSource } = gitStore;
  const { isRepository, remoteUrl, currentBranch } = dataSource;

  async function onInit(setRemoteUrl) {
    await gitStore.init(setRemoteUrl);
    await gitStore.refresh();
  }

  async function onOpenCreate() {
    setCreateModal(true);
  }

  async function onRefresh() {
    await gitStore.refresh();
  }

  async function onOpenEdit() {
    setEditModal(true);
  }

  async function onEdit(setRemoteUrl) {
    await gitStore.setRemote(setRemoteUrl);
    setEditModal(false);
  }

  async function onCreate(name) {
    await gitStore.checkoutLocalBranch(name);
    await gitStore.refresh();
    setCreateModal(false);
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3>
            <FormattedMessage id="iceworks.project.panel.git.title" />
            {currentBranch ? <span className={styles.branch}>({currentBranch})</span> : null}
          </h3>
          {
            isRepository ?
              <div className={styles.icons}>
                <NextIcon className={styles.icon} type="add" size="small" onClick={onOpenCreate} />
                <Icon className={styles.icon} type="edit" size="small" onClick={onOpenEdit} />
                <NextIcon className={styles.icon} type="refresh" size="small" onClick={onRefresh} />
              </div> :
              null
          }
        </div>
      }
    >
      {
        isRepository ?
          <div className={styles.wrap}>
            是一个仓库
            <Modal
              title="修改仓库地址"
              visible={onEditModal}
              onCancel={() => setEditModal(false)}
              onOk={onEdit}
              footer={false}
            >
              <div className={styles.editModal}>
                <GitRemote onOk={onEdit} remoteUrl={remoteUrl} />
              </div>
            </Modal>
            <CreateBranchModal
              on={onCreateModal}
              onCancel={() => setCreateModal(false)}
              onOk={onCreate}
            />
          </div> :
          <GitRemote onOk={onInit} />
      }
    </Panel>
  );
};

export default GitPanel;
