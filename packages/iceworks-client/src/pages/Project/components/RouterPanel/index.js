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
let deleteParent = null;

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

  function onOpenEditModal({
    data,
    index,
    parent,
  }) {
    editIndex = index;
    action = 'edit';
    setModalData({
      formData: data,
      action,
      editIndex,
      parent,
    });
    toggleCreateModal();
  }

  function onOpenCreateModal(parent) {
    action = 'create';
    setModalData({
      formData: {},
      action,
      editIndex: -1,
      parent,
    });
    toggleCreateModal();
  }

  async function onCreate({ formData: value, parent }) {
    toggleCreateModal();
    if (action === 'create') {
      if (parent) {
        parent.routes.push(value);
      } else {
        dataSource.push(value);
      }
    } else if (action === 'edit') {
      if (parent) {
        Object.assign(parent.routes[editIndex], value);
      } else {
        Object.assign(dataSource[editIndex], value);
      }
    }
    await onChangeData(dataSource);
  }

  async function onOpenDeleteModal({
    index,
    parent,
    current,
  }) {
    deleteIndex = index;
    deleteParent = parent;
    setDeleteRouter(current);
    toggleDeleteModal();
  }

  async function onDeleteRouter() {
    if (deleteParent) {
      deleteParent.routes.splice(deleteIndex, 1);
    } else {
      dataSource.splice(deleteIndex, 1);
    }
    await onChangeData(dataSource);
    toggleDeleteModal();
  }

  function renderCol(item, index, parent) {
    const { path, component, routes } = item;
    return [
      (
        <li className={styles.item} key={index}>
          <strong
            className={styles.itemCol}
            style={{
              textIndent: parent ? '20px' : 0,
            }}
          >{path}
          </strong>
          <span className={styles.itemCol}>{component}</span>
          <span>
            {Array.isArray(routes) && (
              <Icon
                type="add"
                title="创建"
                size="xs"
                className={styles.icon}
                onClick={() => onOpenCreateModal(item)}
              />
            )}
            <Icon
              type="edit"
              title="编辑"
              size="xs"
              className={styles.icon}
              onClick={() => onOpenEditModal({
                data: item,
                index,
                parent,
              })}
            />
            <Icon
              className={styles.icon}
              type="ashbin"
              size="xs"
              onClick={() => onOpenDeleteModal({
                index,
                parent,
                current: item,
              })}
            />
          </span>
        </li>
      ),
      routes && (
        routes.map((route, routeIndex) => renderCol(route, routeIndex, item))
      ),
    ];
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.router.title" /></h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="small" onClick={onRefresh} />
            <Icon className={styles.icon} type="add" size="small" onClick={() => onOpenCreateModal()} />
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
                return renderCol(item, index);
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
