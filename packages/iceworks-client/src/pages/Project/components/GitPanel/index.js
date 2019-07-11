import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import Modal from '@components/Modal';
import ActionStatus from '@components/ActionStatus';
import useModal from '@hooks/useModal';
import showMessage from '@utils/showMessage';
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
    unstageFiles,
  } = dataSource;

  async function onInit(setRemoteUrl) {
    try {
      await gitStore.init(setRemoteUrl);
    } catch (error) {
      showMessage(error);
    }

    await gitStore.refresh();
  }

  async function onRefresh() {
    await gitStore.refresh();
  }

  async function onOpenCreate() {
    setCreateModal(true);
  }

  async function onCreate(name) {
    let error;
    try {
      await gitStore.checkoutLocalBranch(name);
    } catch (err) {
      error = err;
      showMessage(error);
    }

    if (!error) {
      await gitStore.refresh();
      setCreateModal(false);
    }
  }

  async function onOpenEdit() {
    setEditModal(true);
  }

  async function onEdit(setRemoteUrl) {
    await gitStore.setRemote(setRemoteUrl);
    await gitStore.refresh();
    setEditModal(false);
  }

  async function onOpenSwitch() {
    try {
      await gitStore.getBranches();
      setSwitchModal(true);
    } catch (error) {
      showMessage(error);
    }
  }

  async function onSwtich(data) {
    await gitStore.switchBranch(data);
    await gitStore.refresh();
    setSwitchModal(false);
  }

  async function onPull() {
    try {
      await gitStore.pull();
      showMessage('拉取当前分支最新代码成功', 'success');
    } catch (error) {
      showMessage('拉取最新代码失败！');
    }
  }

  async function onPush() {
    try {
      await gitStore.push();
      showMessage('推送当前分支本地代码成功', 'success');
    } catch (error) {
      showMessage('推送本地代码失败！');
    }
  }

  async function onCommit(data) {
    let error;
    try {
      await gitStore.addAndCommit(data);
    } catch (err) {
      showMessage(err);
      error = err;
    }

    if (!error) {
      showMessage('提交成功', 'success');
      await gitStore.refresh();
    }
  }

  const checkoutBranches = localBranches.map((value) => ({ label: value, value }));

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
      {
        type: 'git',
        onClick: onOpenSwitch,
        tip: intl.formatMessage({ id: 'iceworks.project.panel.git.button.switch' }),
      },
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

  let contentElement = null;
  if (!gitStore.refresh.error) {
    if (isRepository) {
      contentElement = (
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
        </div>
      );
    } else {
      contentElement = (
        <GitRemote
          onOk={onInit}
          submitMessage={<FormattedMessage id="iceworks.project.panel.git.addRemote" />}
        />
      );
    }
  }

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
      {contentElement}
      <ActionStatus
        store={stores}
        config={[
          {
            storeName: 'git',
            actions: [
              {
                actionName: 'refresh',
                showLoading: true,
                showError: true,
              },
            ],
          },
        ]}
      />
    </Panel>
  );
};

GitPanel.propTypes = {
  intl: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default injectIntl(GitPanel);
