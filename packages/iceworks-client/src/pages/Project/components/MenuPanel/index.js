import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import { Icon, Tab } from '@alifd/next';
import MenuTreeConfig from '../../../../components/MenuTreeConfig';
import CreateMenuModal from './CreateMenuModal';
import DeleteMenuModal from './DeleteMenuModal';
import traverse from '../../../../utils/traverse';

import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const { Item: TabPane } = Tab;
let currentTab = 'aside';

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
  const { asideMenuConfig, headerMenuConfig } = dataSource;

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
        type: currentTab,
      },
    });
    onRefresh();
  }

  async function onCreate(action, value) {
    toggleCreateModal();
    const data = currentTab === 'aside' ? asideMenuConfig : headerMenuConfig;
    if (action === 'create') {
      data.push(value);
    } else {
      traverse(data, (config) => {
        if (config.id === value.id) {
          Object.assign(config, value);
          return true;
        }
        return false;
      }, true);
    }
    await onChangeTree(data);
  }

  function onOpenDeleteModal(menu) {
    setDeleteMenu(menu);
    toggleDeleteModal();
  }

  async function onDelete() {
    const data = currentTab === 'aside' ? asideMenuConfig : headerMenuConfig;
    toggleDeleteModal();
    traverse(data, (config, parentList, index) => {
      if (config.id === deleteMenu.id) {
        parentList.splice(index, 1);
        return true;
      }
      return false;
    }, true);
    await onChangeTree(data);
  }

  function onChangeTab(value) {
    currentTab = value;
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
        <Tab
          size="small"
          contentStyle={{ padding: '10px 0 0' }}
          onChange={onChangeTab}
        >
          <TabPane
            title={<FormattedMessage id="iceworks.project.panel.menu.tab.asideMenu" />}
            key="aside"
          >
            <MenuTreeConfig
              items={asideMenuConfig}
              onChange={onChangeTree}
              onOpenEditModal={onOpenModal}
              onDeleteLink={onOpenDeleteModal}
            />
          </TabPane>
          <TabPane
            title={<FormattedMessage id="iceworks.project.panel.menu.tab.headerMenu" />}
            key="header"
          >
            <MenuTreeConfig
              items={headerMenuConfig}
              onChange={onChangeTree}
              onOpenEditModal={onOpenModal}
              onDeleteLink={onOpenDeleteModal}
            />
          </TabPane>
        </Tab>
      </div>
    </Panel>
  );
};

export default MenuPanel;
