import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import { Icon } from '@alifd/next';
import NavigationTreeConfig from '../../../../components/NavigationTreeConfig';
import CreateNavigationModal from './CreateNavigationModal';
import DeleteNavigationModal from './DeleteNavigationModal';
import traverse from '../../../../utils/traverse';

import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const NavigationPanel = () => {
  const {
    on: onCreateModel,
    toggleModal: toggleCreateModal,
  } = useModal();
  const {
    on: onDeleteModel,
    toggleModal: toggleDeleteModal,
  } = useModal();

  const [modalData, setModalData] = useState({
    action: 'create',
  });
  const [deleteNavigation, setDeleteNavigation] = useState({});
  const navigationsStore = stores.useStore('navigations');
  const { dataSource } = navigationsStore;
  const { asideMenuConfig } = dataSource;

  function onRefresh() {
    navigationsStore.refresh();
  }

  function onOpenModal(data) {
    setModalData(data);
    toggleCreateModal();
  }

  function onOpenCreateModal() {
    onOpenModal({
      action: 'create',
      formData: {},
    });
  }

  async function onChangeTree(navigationTree) {
    await navigationsStore.setData({
      type: 'asideMenu',
      data: navigationTree,
    });
    onRefresh();
  }

  async function onCreate(action, value) {
    toggleCreateModal();
    if (action === 'create') {
      asideMenuConfig.push(value);
    } else {
      traverse(asideMenuConfig, (config) => {
        if (config.id === value.id) {
          Object.assign(config, value);
          return true;
        }
        return false;
      }, true);
    }
    await onChangeTree(asideMenuConfig);
  }

  function onOpenDeleteModal(navigation) {
    setDeleteNavigation(navigation);
    toggleDeleteModal();
  }

  async function onDelete() {
    toggleDeleteModal();
    traverse(asideMenuConfig, (config, parentList, index) => {
      if (config.id === deleteNavigation.id) {
        parentList.splice(index, 1);
        return true;
      }
      return false;
    }, true);
    await onChangeTree(asideMenuConfig);
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.navigation.title" /></h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="small" onClick={onRefresh} />
            <Icon className={styles.icon} type="add" size="small" onClick={onOpenCreateModal} />
          </div>
        </div>
      }
    >
      <div className={styles.main}>
        <CreateNavigationModal
          title="添加导航"
          modalData={modalData}
          on={onCreateModel}
          onCancel={toggleCreateModal}
          onOk={onCreate}
        />
        <DeleteNavigationModal
          on={onDeleteModel}
          onCancel={toggleDeleteModal}
          onOk={onDelete}
          navigation={deleteNavigation}
        />
        <NavigationTreeConfig
          items={asideMenuConfig}
          onChange={onChangeTree}
          onOpenEditModal={onOpenModal}
          onDeleteLink={onOpenDeleteModal}
        />
      </div>
    </Panel>
  );
};

export default NavigationPanel;
