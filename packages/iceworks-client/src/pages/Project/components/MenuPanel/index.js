import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import { Icon } from '@alifd/next';
import MenuTreeConfig from '../../../../components/MenuTreeConfig';
import CreateMenuModal from './CreateMenuModal';
import DeleteMenuModal from './DeleteMenuModal';
import traverse from '../../../../utils/traverse';

import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const MenuPanel = () => {
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
  const [deleteMenu, setDeleteMenu] = useState({});
  const menuStore = stores.useStore('menu');
  const { dataSource } = menuStore;
  const { asideMenuConfig } = dataSource;

  function onRefresh() {
    menuStore.refresh();
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

  async function onChangeTree(menuTree) {
    await menuStore.bulkCreate({
      data: menuTree,
      options: {
        replacement: true,
      },
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

  function onOpenDeleteModal(menu) {
    setDeleteMenu(menu);
    toggleDeleteModal();
  }

  async function onDelete() {
    toggleDeleteModal();
    traverse(asideMenuConfig, (config, parentList, index) => {
      if (config.id === deleteMenu.id) {
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
          <h3><FormattedMessage id="iceworks.project.panel.menu.title" /></h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="xs" onClick={onRefresh} />
            <Icon className={styles.icon} type="add" size="xs" onClick={onOpenCreateModal} />
          </div>
        </div>
      }
    >
      <div className={styles.main}>
        <CreateMenuModal
          title="添加导航"
          modalData={modalData}
          on={onCreateModel}
          onCancel={toggleCreateModal}
          onOk={onCreate}
        />
        <DeleteMenuModal
          on={onDeleteModel}
          onCancel={toggleDeleteModal}
          onOk={onDelete}
          menu={deleteMenu}
        />
        <MenuTreeConfig
          items={asideMenuConfig}
          onChange={onChangeTree}
          onOpenEditModal={onOpenModal}
          onDeleteLink={onOpenDeleteModal}
        />
      </div>
    </Panel>
  );
};

export default MenuPanel;
