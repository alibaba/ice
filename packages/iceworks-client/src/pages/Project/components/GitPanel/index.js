import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon as NextIcon, Message } from '@alifd/next';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import Panel from '../Panel';
import GitRemote from './GitRemote';
import Main from './Main';
import CreateBranchModal from './CreateBranchModal';
import SwtichBranchModal from './SwtichBranchModal';
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
  const {
    on: onSwtichModal,
    setModal: setSwitchModal,
  } = useModal();
  const gitStore = stores.useStore('git');
  const { dataSource } = gitStore;
  const {
    isRepository,
    remoteUrl,
    currentBranch,
    localBranches,
    originBranches,
    unstagedFiles,
  } = dataSource;

  async function onInit(setRemoteUrl) {
    await gitStore.init(setRemoteUrl);
    await gitStore.refresh();
  }

  async function onRefresh() {
    await gitStore.refresh();
  }

  async function onOpenCreate() {
    setCreateModal(true);
  }

  async function onCreate(name) {
    await gitStore.checkoutLocalBranch(name);
    await gitStore.refresh();
    setCreateModal(false);
  }

  async function onOpenEdit() {
    setEditModal(true);
  }

  async function onEdit(setRemoteUrl) {
    await gitStore.setRemote(setRemoteUrl);
    setEditModal(false);
  }

  async function onOpenSwitch() {
    await gitStore.getBranches();
    setSwitchModal(true);
  }

  async function onSwtich(data) {
    await gitStore.switchBranch(data);
    await gitStore.refresh();
    setSwitchModal(false);
  }

  async function onPull() {
    await gitStore.pull();
    Message.show({
      type: 'success',
      title: 'Pull',
      content: '拉取当前分支最新代码成功',
      align: 'tr tr',
    });
  }

  async function onPush() {
    await gitStore.push();
    Message.show({
      type: 'success',
      title: 'Push',
      content: '推送当前分支本地代码成功',
      align: 'tr tr',
    });
  }

  async function onCommit(data) {
    await gitStore.addAndCommit(data);
    await gitStore.refresh();
    Message.show({
      type: 'success',
      title: 'Commit',
      content: '提交成功',
      align: 'tr tr',
    });
  }

  const locals = localBranches.map((value) => ({ label: value, value }));
  const origins = originBranches.map((value) => ({ label: value, value }));
  const checkoutBranches = [];
  if (locals.length > 0) {
    checkoutBranches.push({
      label: 'local',
      value: 'local',
      children: locals,
    });
  }
  if (origin.length > 0) {
    checkoutBranches.push({
      label: 'origin',
      value: 'origin',
      children: origins,
    });
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
                <Icon className={styles.icon} type="git" size="small" onClick={onOpenSwitch} />
                <Icon className={styles.icon} type="down-arrow" size="small" onClick={onPull} />
                <Icon className={styles.icon} type="up-arrow" size="small" onClick={onPush} />
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
            <Main
              dataSource={unstagedFiles}
              onOk={onCommit}
            />
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
            <SwtichBranchModal
              on={onSwtichModal}
              onCancel={() => setSwitchModal(false)}
              onOk={onSwtich}
              dataSource={checkoutBranches}
            />
          </div> :
          <GitRemote onOk={onInit} />
      }
    </Panel>
  );
};

export default GitPanel;
