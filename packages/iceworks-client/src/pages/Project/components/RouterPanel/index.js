import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import { Message, Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import goldlog from '@utils/goldlog'

import CreateRouterModal from './CreateRouterModal';
import DeleteRouterModal from './DeleteRouterModal';

import Panel from '../Panel';
import PanelHead from '../Panel/head';
import stores from '../../stores';
import styles from './index.module.scss';

const { Tooltip } = Balloon;

let editIndex = -1;
let editParentIndex = -1;
let deleteIndex = -1;
let action = 'create';
let deleteParent = null;

const RouterPanel = ({ intl, title, description }) => {
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
        parent.children.push(value);
      } else {
        dataSource.push(value);
      }
    } else if (action === 'edit') {
      if (parent) {
        Object.assign(parent.children[editIndex], value);
      } else {
        Object.assign(dataSource[editIndex], value);
      }
    }
    await onChangeData(dataSource);
    goldlog('create-router', {
      type: 'project',
    });
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
      deleteParent.children.splice(deleteIndex, 1);
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
    const { path, component, children } = item;
    const layoutRouter = Array.isArray(children);
    return [
      (
        <li className={styles.item} key={index}>
          <strong
            className={styles.itemCol}
            style={{
              textIndent: parent ? '20px' : 0,
            }}
          >
            <Icon
              type={layoutRouter ? 'folder' : 'menu'}
              size="xs"
              style={{
                marginRight: 4,
              }}
            />
            {path}
          </strong>
          <span className={styles.itemCol}>{component}</span>
          <span>
            {layoutRouter && (
              <Tooltip
                trigger={(
                  <Icon
                    type="plus"
                    size="xs"
                    className={styles.icon}
                    onClick={() => onOpenCreateModal(item)}
                  />
                )}
                align="b"
              >
                <FormattedMessage id="iceworks.project.panel.router.create.title" />
              </Tooltip>
            )}
            <Tooltip
              trigger={(
                <Icon
                  type="edit"
                  size="xs"
                  className={styles.icon}
                  onClick={() => onOpenEditModal({
                    data: item,
                    index,
                    parent,
                    parentIndex,
                  })}
                />
              )}
              align="b"
            >
              <FormattedMessage id="iceworks.project.panel.router.edit.title" />
            </Tooltip>
            <Tooltip
              trigger={(
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
              )}
              align="b"
            >
              <FormattedMessage id="iceworks.project.panel.router.delete.title" />
            </Tooltip>
          </span>
        </li>
      ),
      children && (
        children.map((route, routeIndex) => renderCol({
          item: route,
          index: routeIndex,
          parent: item,
          parentIndex: index,
        }))
      ),
    ];
  }

  const operations = [
    {
      type: 'reload',
      onClick: onRefresh,
      tip: intl.formatMessage({ id: 'iceworks.project.panel.router.button.refresh' }),
    },
    {
      type: 'plus',
      onClick: onOpenCreateModal,
      tip: intl.formatMessage({ id: 'iceworks.project.panel.router.button.add' }),
    },
  ];

  return (
    <Panel
      header={
        <PanelHead
          title={title}
          description={description}
          operations={operations}
        />
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
            <li className={styles.title}>
              <strong className={`${styles.titleCol}`}>
                <FormattedMessage id="iceworks.project.panel.router.title.path" />
              </strong>
              <strong
                className={`${styles.titleCol} ${styles.titleMiddle}`}
                style={{
                  textAlign: 'center',
                }}
              >
                <FormattedMessage id="iceworks.project.panel.router.title.component" />
              </strong>
              <strong
                className={`${styles.titleCol} ${styles.operater}`}
              >
                <FormattedMessage id="iceworks.project.panel.router.title.operate" />
              </strong>
            </li>
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RouterPanel);
