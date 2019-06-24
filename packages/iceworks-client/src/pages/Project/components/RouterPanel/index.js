import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import { Message, Balloon } from '@alifd/next';
import Icon from '@components/Icon';

import CreateRouterModal from './CreateRouterModal';
import DeleteRouterModal from './DeleteRouterModal';

import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const { Tooltip } = Balloon;

let editIndex = -1;
let editParentIndex = -1;
let deleteIndex = -1;
let action = 'create';
let deleteParent = null;

const RouterPanel = ({ intl }) => {
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

  const routerStore = stores.useStore('routes');
  const { dataSource } = routerStore;

  function onRefresh() {
    routerStore.refresh();
  }

  async function onChangeData(data) {
    await routerStore.bulkCreate({
      data,
      options: {
        replacement: true,
      },
    });
    onRefresh();
  }

  function onOpenEditModal({
    data,
    index,
    parent,
    parentIndex,
  }) {
    editIndex = index;
    editParentIndex = parentIndex;
    action = 'edit';
    setModalData({
      formData: data,
      action,
      editIndex,
      editParentIndex,
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

  function renderCol({
    item,
    index,
    parent,
    parentIndex,
  }) {
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
                type="plus"
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
                parentIndex,
              })}
            />
            <Icon
              className={styles.icon}
              type="trash"
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
        routes.map((route, routeIndex) => renderCol({
          item: route,
          index: routeIndex,
          parent: item,
          parentIndex: index,
        }))
      ),
    ];
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.router.title" /></h3>
          <div className={styles.icons}>
            <Tooltip
              trigger={(
                <Icon
                  className={styles.icon}
                  type="reload"
                  size="small"
                  onClick={onRefresh}
                />
              )}
              align="b"
            >
              {intl.formatMessage({ id: 'iceworks.project.panel.router.button.refresh' })}
            </Tooltip>
            <Tooltip
              trigger={(
                <Icon
                  className={styles.icon}
                  type="plus"
                  size="small"
                  onClick={() => onOpenCreateModal()}
                />
              )}
              align="b"
            >
              {intl.formatMessage({ id: 'iceworks.project.panel.router.button.add' })}
            </Tooltip>
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
          <ul>
            {dataSource.map((item, index) => {
              return renderCol({
                item,
                index,
              });
            })}
          </ul>
        ) : (
          <Message title="暂无路由" type="help">
            点击右上方新建路由
          </Message>
        )}
      </div>
    </Panel>
  );
};

RouterPanel.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RouterPanel);
