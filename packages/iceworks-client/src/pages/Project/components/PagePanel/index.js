import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Message } from '@alifd/next';
import Icon from '@components/Icon';
import ActionStatus from '@components/ActionStatus';
import useModal from '@hooks/useModal';
import logger from '@utils/logger';
import showMessage from '@utils/showMessage';
import { injectIntl } from 'react-intl';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
import stores from '../../stores';
import styles from './index.module.scss';
import DeletePageModal from './DeletePageModal';
import BuildPageModal from './BuildPageModal';

const PagePanel = ({ intl, title, description }) => {
  const [deleteName, setDeleteName] = useState('');
  const [editingName, setEditingName] = useState('');
  const {
    on: onDeleteModal,
    toggleModal: toggleDeleteModal,
  } = useModal();
  const {
    on: onCreatePageModal,
    setModal: setCreatePageModal,
  } = useModal();
  const {
    on: onAddBlocksModal,
    setModal: setAddBlocksModal,
  } = useModal();
  const [pagesStore] = stores.useStores(['pages']);
  const menuStore = stores.useStore('menu');
  const routerStore = stores.useStore('routes');
  const { dataSource } = pagesStore;

  function onRefresh() {
    pagesStore.refresh();
  }

  function onCreate() {
    setCreatePageModal(true);
  }

  function onDelete(name) {
    setDeleteName(name);
    toggleDeleteModal();
  }

  function onAddBlocks(name) {
    setEditingName(name);
    setAddBlocksModal(true);
  }

  async function deletePage() {
    await pagesStore.delete(deleteName);
    const { deletePaths } = await routerStore.delete({
      componentName: deleteName,
    });
    await menuStore.delete({
      paths: deletePaths,
    });

    toggleDeleteModal();

    showMessage('删除页面成功', 'success');

    pagesStore.refresh();
    menuStore.refresh();
    routerStore.refresh();
  }

  async function createPage(data) {
    const { menuName, routePath, name, routeGroup } = data;
    logger.info('create page data:', data);

    await pagesStore.create(data);

    logger.info('created page.');

    // create router and menu after success create page
    await routerStore.bulkCreate({
      data: [{
        path: routePath,
        component: name,
      }],
      options: {
        parent: routeGroup,
      },
    });

    logger.info('created router.');

    // add menu if exist menuName
    if (menuName) {
      await menuStore.bulkCreate({
        data: [{
          name: menuName,
          path: routePath,
        }],
      });
    }

    logger.info('created menu.');

    setCreatePageModal(false);

    showMessage('创建页面成功', 'success');

    pagesStore.refresh();
    menuStore.refresh();
    routerStore.refresh();
  }

  async function addBlocks(newBlocks) {
    await pagesStore.addBlocks({ blocks: newBlocks, name: editingName });

    setAddBlocksModal(false);

    showMessage('添加区块成功', 'success');

    pagesStore.refresh();
  }

  const pagePreDelete =
    pagesStore.dataSource.find(({ name }) => {
      return name === deleteName;
    }) || {};
  const pageEditing =
    pagesStore.dataSource.find(({ name }) => {
      return name === editingName;
    }) || {};

  const operations = [
    {
      type: 'reload',
      onClick: onRefresh,
      tip: intl.formatMessage({ id: 'iceworks.project.panel.page.button.refresh' }),
    },
    {
      type: 'plus',
      onClick: onCreate,
      tip: intl.formatMessage({ id: 'iceworks.project.panel.page.button.add' }),
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
        <DeletePageModal
          on={onDeleteModal}
          onCancel={toggleDeleteModal}
          onOk={deletePage}
          page={pagePreDelete}
        />
        {
          onCreatePageModal ?
            <BuildPageModal
              on={onCreatePageModal}
              onCancel={() => setCreatePageModal(false)}
              onOk={createPage}
            /> :
            null
        }
        {
          onAddBlocksModal ?
            <BuildPageModal
              on={onAddBlocksModal}
              onCancel={() => setAddBlocksModal(false)}
              onOk={addBlocks}
              existedBlocks={pageEditing.blocks}
            /> :
            null
        }
        {
          dataSource.length ?
            <div>
              <ul>
                {dataSource.map(({ name, birthtime }) => {
                  return (
                    <li className={styles.item} key={name}>
                      <strong>{name}</strong>
                      <time>{moment(birthtime).format('YYYY-MM-DD hh:mm')}</time>
                      <Icon className={styles.icon} type="new-page" size="xs" onClick={() => onAddBlocks(name)} />
                      <Icon className={styles.icon} type="trash" size="xs" onClick={() => onDelete(name)} />
                    </li>
                  );
                })}
              </ul>
            </div> :
            (
              !pagesStore.refresh.error &&
              <Message title="暂无页面" type="help">
                点击右上方新建页面
              </Message>
            )
        }
        <ActionStatus
          store={stores}
          config={[
            {
              storeName: 'pages',
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
      </div>
    </Panel>
  );
};

PagePanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PagePanel);
