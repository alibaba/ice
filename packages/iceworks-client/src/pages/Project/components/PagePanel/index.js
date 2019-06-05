import React, { useState } from 'react';
import moment from 'moment';
import { Icon, Message } from '@alifd/next';
import useModal from '@hooks/useModal';
import logger from '@utils/logger';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';
import DeletePageModal from './DeletePageModal';
import CreatePageModal from './CreatePageModal';

const PagePanel = () => {
  const [deleteName, setDeleteName] = useState('');
  const {
    on: onDeleteModal,
    toggleModal: toggleDeleteModal,
  } = useModal();
  const {
    on: onCreateModal,
    toggleModal: toggleCreateModal,
  } = useModal();
  const [pages] = stores.useStores(['pages']);
  const { dataSource } = pages;

  function onRefresh() {
    pages.refresh();
  }

  function onCreate() {
    toggleCreateModal();
  }

  function onDelete(name) {
    setDeleteName(name);
    toggleDeleteModal();
  }

  async function deletePage() {
    await pages.delete(deleteName);

    toggleDeleteModal();

    Message.show({
      align: 'tr tr',
      type: 'success',
      content: '删除页面成功',
    });

    pages.refresh();
  }

  async function createPage(data) {
    logger.info('create page data:', data);

    await pages.create(data);

    toggleCreateModal();

    Message.show({
      align: 'tr tr',
      type: 'success',
      content: '创建页面成功',
    });

    pages.refresh();
  }

  const pagePreDelete =
    pages.dataSource.find(({ name }) => {
      return name === deleteName;
    }) || {};

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.page.title" /></h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="small" onClick={onRefresh} />
            <Icon className={styles.icon} type="add" size="small" onClick={onCreate} />
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
        <CreatePageModal
          on={onCreateModal}
          onCancel={toggleCreateModal}
          onOk={createPage}
        />
        {
          dataSource.length ?
            <div>
              <ul>
                {dataSource.map(({ name, birthtime }) => {
                  return (
                    <li className={styles.item} key={name}>
                      <strong>{name}</strong>
                      <time>{moment(birthtime).format('YYYY-MM-DD hh:mm')}</time>
                      <Icon className={styles.icon} type="ashbin" size="xs" onClick={() => onDelete(name)} />
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

export default PagePanel;
