import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Message } from '@alifd/next';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
import GitRemote from './GitRemote';
import Main from './Main';
import CreateBranchModal from './CreateBranchModal';
import SwtichBranchModal from './SwtichBranchModal';
import stores from '../../stores';
import styles from './index.module.scss';

const GitPanel = ({ intl, title, description }) => {
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
    unstageFiles,
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
    await gitStore.refresh();
    setEditModal(false);
  }

  // async function onOpenSwitch() {
  //   try {
  //     await gitStore.getBranches();
  //     setSwitchModal(true);
  //   } catch (error) {
  //     Message.show({
  //       type: 'error',
  //       title: '获取分支失败！',
  //       content: error.message,
  //       align: 'tr tr',
  //     });
  //   }
  // }

  async function onSwtich(data) {
    await gitStore.switchBranch(data);
    await gitStore.refresh();
    setSwitchModal(false);
  }

  async function onPull() {
    try {
      await gitStore.pull();
      Message.show({
        type: 'success',
        title: 'Pull',
        content: '拉取当前分支最新代码成功',
        align: 'tr tr',
      });
    } catch (error) {
      Message.show({
        type: 'error',
        title: '拉取最新代码失败！',
        content: error.message,
        align: 'tr tr',
      });
    }
  }

  async function onPush() {
    try {
      await gitStore.push();
      Message.show({
        type: 'success',
        title: 'Push',
        content: '推送当前分支本地代码成功',
        align: 'tr tr',
      });
    } catch (error) {
      Message.show({
        type: 'error',
        title: '推送本地代码失败！',
        content: error.message,
        align: 'tr tr',
      });
    }
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
  if (locals.length) {
    checkoutBranches.push({
      label: 'local',
      value: 'local',
      children: locals,
    });
  }
  if (origin.length) {
    checkoutBranches.push({
      label: 'origin',
      value: 'origin',
      children: origins,
    });
  }

  const operations = isRepository ?
    [
      {
        type: 'reload',
        onClick: onRefresh,
        tip: intl.formatMessage({ id: 'iceworks.project.panel.git.button.refresh' }),
      },
      {
        type: 'plus',
        onClick: onOpenCreate,
        tip: intl.formatMessage({ id: 'iceworks.project.panel.git.button.add' }),
      },
      // temporarily removed
      // {
      //   type: 'git',
      //   onClick: onOpenSwitch,
      //   tip: intl.formatMessage({ id: 'iceworks.project.panel.git.button.switch' }),
      // },
      {
        type: 'down-arrow',
        onClick: onPull,
        tip: intl.formatMessage({ id: 'iceworks.project.panel.git.button.pull' }),
      },
      {
        type: 'up-arrow',
        onClick: onPush,
        tip: intl.formatMessage({ id: 'iceworks.project.panel.git.button.push' }),
      },
      {
        type: 'edit',
        onClick: onOpenEdit,
        tip: intl.formatMessage({ id: 'iceworks.project.panel.git.button.edit' }),
      },
    ] :
    [];

  return (
    <Panel
      header={
        <PanelHead
          title={title}
          description={description}
          operations={operations}
        >
          {currentBranch ? <span className={styles.branch} key="branch">({currentBranch})</span> : null}
        </PanelHead>
      }
    >
      {
        isRepository ?
          <div className={styles.wrap}>
            <Main
              dataSource={unstageFiles}
              onOk={onCommit}
            />
            <Modal
              title={intl.formatMessage({ id: 'iceworks.project.panel.git.edit.title' })}
              visible={onEditModal}
              onCancel={() => setEditModal(false)}
              onOk={onEdit}
              footer={false}
            >
              <div className={styles.editModal}>
                <GitRemote
                  onOk={onEdit}
                  remoteUrl={remoteUrl}
                  submitMessage={<FormattedMessage id="iceworks.global.button.yes" />}
                />
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
          <GitRemote
            onOk={onInit}
            submitMessage={<FormattedMessage id="iceworks.project.panel.git.addRemote" />}
          />
      }
    </Panel>
  );
};

GitPanel.propTypes = {
  intl: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default injectIntl(GitPanel);
