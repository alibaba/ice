import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Message, Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import useModal from '@hooks/useModal';
import logger from '@utils/logger';
import { injectIntl, FormattedMessage } from 'react-intl';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';
import DeletePageModal from './DeletePageModal';
import BuildPageModal from './BuildPageModal';

const { Tooltip } = Balloon;

const PagePanel = ({ intl }) => {
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
  const [pages] = stores.useStores(['pages']);
  const menuStore = stores.useStore('menu');
  const routerStore = stores.useStore('routes');
  const { dataSource } = pages;

  function onRefresh() {
    pages.refresh();
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
    await pages.delete(deleteName);
    const { deletePaths } = await routerStore.delete({
      componentName: deleteName,
    });
    await menuStore.delete({
      paths: deletePaths,
    });

    toggleDeleteModal();

    Message.show({
      align: 'tr tr',
      type: 'success',
      content: '删除页面成功',
    });

    pages.refresh();
    menuStore.refresh();
    routerStore.refresh();
  }

  async function createPage(data) {
    const { menuName, routePath, name, routeGroup } = data;
    logger.info('create page data:', data);

    await pages.create(data);

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

    Message.show({
      align: 'tr tr',
      type: 'success',
      content: '创建页面成功',
    });

    pages.refresh();
    menuStore.refresh();
    routerStore.refresh();
  }

  async function addBlocks(newBlocks) {
    await pages.addBlocks({ blocks: newBlocks, name: editingName });

    setAddBlocksModal(false);

    Message.show({
      align: 'tr tr',
      type: 'success',
      content: '添加区块成功',
    });

    pages.refresh();
  }

  const pagePreDelete =
    pages.dataSource.find(({ name }) => {
      return name === deleteName;
    }) || {};
  const pageEditing =
    pages.dataSource.find(({ name }) => {
      return name === editingName;
    }) || {};

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.page.title" /></h3>
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
              {intl.formatMessage({ id: 'iceworks.project.panel.page.button.refresh' })}
            </Tooltip>
            <Tooltip
              trigger={(
                <Icon
                  className={styles.icon}
                  type="plus"
                  size="small"
                  onClick={onCreate}
                />
              )}
              align="b"
            >
              {intl.formatMessage({ id: 'iceworks.project.panel.page.button.add' })}
            </Tooltip>
          </div>
        </div>
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
            <div>
              <Message title="暂无页面" type="help">
                点击右上方新建页面
              </Message>
            </div>
        }
      </div>
    </Panel>
  );
};

PagePanel.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PagePanel);
