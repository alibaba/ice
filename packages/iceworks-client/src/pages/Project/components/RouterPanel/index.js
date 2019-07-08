import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import { Message, Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import ActionStatus from '@components/ActionStatus';

import CreateRouterModal from './CreateRouterModal';
import DeleteRouterModal from './DeleteRouterModal';

import Panel from '../Panel';
import PanelHead from '../Panel/head';
import stores from '../../stores';
import styles from './index.module.scss';

const { Tooltip } = Balloon;

let createParentIndex = -1;
let editIndex = -1;
let editParentIndex = -1;
let deleteIndex = -1;
let deleteParentIndex = -1;
let action = 'create';

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
  const { dataSource, deleteRoute, addRoute, editRoute } = routerStore;

  async function onRefresh() {
    try {
      await routerStore.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  async function onChangeData(data) {
    await routerStore.bulkCreate({
      data,
      options: {
        replacement: true,
      },
    });
    await onRefresh();
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

  function onOpenCreateModal(parent, parentIndex) {
    action = 'create';
    setModalData({
      formData: {},
      action,
      editIndex: -1,
      parent,
    });
    createParentIndex = parentIndex;
    toggleCreateModal();
  }

  async function onCreate({ formData: value }) {
    toggleCreateModal();
    if (action === 'create') {
      addRoute(createParentIndex, value);
    } else if (action === 'edit') {
      editRoute(editIndex, editParentIndex, value);
    }
    await onChangeData(dataSource);
  }

  async function onOpenDeleteModal({
    index,
    current,
    parentIndex,
  }) {
    deleteIndex = index;
    deleteParentIndex = parentIndex;
    setDeleteRouter(current);
    toggleDeleteModal();
  }

  async function onDeleteRouter() {
    deleteRoute(deleteIndex, deleteParentIndex);
    await onChangeData(dataSource);
    toggleDeleteModal();
  }

  function renderCol({
    item,
    index,
    parent,
    parentIndex,
  }) {
    const { path, component, children, redirect } = item;
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
            {layoutRouter && (
              <Icon
                type="folder"
                size="xs"
                style={{
                  marginRight: 4,
                }}
              />
            )}
            {!path && <Icon
              type="kong"
              size="xs"
            />}
            {path}
          </strong>
          <span className={styles.itemCol}>{component}</span>
          <span className={styles.itemCol}>{redirect}</span>
          <span>
            {layoutRouter && (
              <Tooltip
                trigger={(
                  <Icon
                    type="plus"
                    size="xs"
                    className={styles.icon}
                    onClick={() => onOpenCreateModal(item, index)}
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
                    parentIndex,
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
      onClick: () => onOpenCreateModal(null, -1),
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
                className={`${styles.titleCol} ${styles.titleMiddle}`}
                style={{
                  textAlign: 'center',
                }}
              >
                <FormattedMessage id="iceworks.project.panel.router.title.redirect" />
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
                parentIndex: -1,
              });
            })}
          </ul>
        ) : (!routerStore.refresh.error && (
          <Message title={<FormattedMessage id="iceworks.project.panel.router.none" />} type="help">
            <FormattedMessage id="iceworks.project.panel.router.prompt.create" />
          </Message>
        ))}

        <ActionStatus
          store={stores}
          config={[
            {
              storeName: 'routes',
              actions: [
                {
                  actionName: 'refresh',
                  showLoading: true,
                  showError: true,
                },
                {
                  actionName: 'bulkCreate',
                  showError: true,
                },
              ],
            },
          ]}
        />
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
