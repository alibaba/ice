import React, { useState } from 'react';
import moment from 'moment';
import { Icon, Message } from '@alifd/next';
import IceNotification from '@icedesign/notification';
import useModal from '@hooks/useModal';
import logger from '@utils/logger';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';
import DeletePageModal from './DeletePageModal';
import CreatePageModal from './CreatePageModal';

const Page = () => {
  const [deleteName, setDeleteName] = useState('');
  const {
    on: onDeleteModel,
    toggleModal: toggleDeleteModal,
  } = useModal();
  const {
    on: onCreateModel,
    toggleModal: toggleCreateModal,
  } = useModal();
  const pages = stores.useStore('pages');
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
    pages.refresh();
    toggleDeleteModal();
    IceNotification.success({
      message: '删除页面成功',
      description: '操作不可逆！',
    });
  }

  async function createPage(data) {
    logger.info('create page data:', data);
    await pages.create(data);

    toggleCreateModal();

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
          on={onDeleteModel}
          onCancel={toggleDeleteModal}
          onOk={deletePage}
          page={pagePreDelete}
        />
        <CreatePageModal
          on={onCreateModel}
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

export default Page;
