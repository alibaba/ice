import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import { Icon, Message } from '@alifd/next';
import CreateRouterModal from './CreateRouterModal';
import DeleteRouterModal from './DeleteRouterModal';

import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

let editIndex = -1;
let deleteIndex = -1;
let action = 'create';

const RouterPanel = () => {
  const {
    on: onCreateModel,
    toggleModal: toggleCreateModal,
  } = useModal();
  const {
    on: onDeleteModel,
    toggleModal: toggleDeleteModal,
  } = useModal();

  const [deleteRouter, setDeleteRouter] = useState({});
  const [modalData, setModalData] = useState({});

  const routersStore = stores.useStore('routers');
  const { dataSource } = routersStore;

  function onRefresh() {
    routersStore.refresh();
  }

  async function onChangeData(data) {
    await routersStore.setData(data);
    onRefresh();
  }

  function onOpenEditModal(data, index) {
    editIndex = index;
    action = 'edit';
    setModalData({
      formData: data,
      action,
      editIndex,
    });
    toggleCreateModal();
  }

  function onOpenCreateModal() {
    action = 'create';
    setModalData({
      formData: {},
      action,
      editIndex: -1,
    });
    toggleCreateModal();
  }

  async function onCreate(value) {
    toggleCreateModal();
    if (action === 'create') {
      dataSource.push(value);
    } else {
      Object.assign(dataSource[editIndex], value);
    }
    await onChangeData(dataSource);
  }

  async function onOpenDeleteModal(index) {
    deleteIndex = index;
    setDeleteRouter(dataSource[index]);
    toggleDeleteModal();
  }

  async function onDeleteRouter() {
    dataSource.splice(deleteIndex, 1);
    await onChangeData(dataSource);
    toggleDeleteModal();
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.router.title" /></h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="small" onClick={onRefresh} />
            <Icon className={styles.icon} type="add" size="small" onClick={onOpenCreateModal} />
          </div>
        </div>
      }
    >
      <div className={styles.main}>
        <DeleteRouterModal
          on={onDeleteModel}
          onCancel={toggleDeleteModal}
          onOk={onDeleteRouter}
          router={deleteRouter}
        />
        <CreateRouterModal
          title="添加路由"
          modalData={modalData}
          on={onCreateModel}
          onCancel={toggleCreateModal}
          onOk={onCreate}
        />
        {dataSource.length ? (
          <div>
            <ul>
              {dataSource.map((item, index) => {
                const { path, component, layout } = item;
                return (
                  <li className={styles.item} key={path}>
                    <strong className={styles.itemCol}>{path}</strong>
                    <span className={styles.itemCol}>{component}</span>
                    <span className={styles.itemCol}>{layout}</span>
                    <span>
                      <Icon
                        type="edit"
                        title="编辑"
                        size="xs"
                        className={styles.icon}
                        onClick={() => onOpenEditModal(item, index)}
                      />
                      <Icon
                        className={styles.icon}
                        type="ashbin"
                        size="xs"
                        onClick={() => onOpenDeleteModal(index)}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div> 
        ) : (
          <div>
            <Message title="暂无路由" type="help">
              点击右上方新建路由
            </Message>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default RouterPanel;
