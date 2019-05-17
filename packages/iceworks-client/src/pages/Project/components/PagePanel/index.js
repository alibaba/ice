import React, { useState } from 'react';
import moment from 'moment';
import { Icon } from '@alifd/next';
import useModal from '@hooks/useModal';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';
import DeletePageModal from './DeletePageModal';

const Page = () => {
  const [deleteName, setDeleteName] = useState('');
  const {
    on: onDeleteModel,
    toggleModal: toggleDeleteModal,
  } = useModal();
  const pages = stores.useStore('pages');
  const { dataSource } = pages;

  function onRefresh() {
    pages.refresh();
  }

  function onDelete(name) {
    setDeleteName(name);
    toggleDeleteModal();
  }

  async function deletePage() {
    await pages.delete(deleteName);
    pages.refresh();
    toggleDeleteModal();
  }

  const pagePreDelete =
    pages.dataSource.find(({ name }) => {
      return name === deleteName;
    }) || {};

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3>页面列表</h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="refresh" size="small" onClick={onRefresh} />
            <Icon className={styles.icon} type="add" size="small" />
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
        <ul>
          {dataSource.map(({ name, birthtime }, index) => {
            return (
              <li className={styles.item} key={index}>
                <strong>{name}</strong>
                <time>{moment(birthtime).format('YYYY-MM-DD hh:mm')}</time>
                <Icon className={styles.icon} type="ashbin" size="xs" onClick={() => onDelete(name)} />
              </li>
            );
          })}
        </ul>
      </div>
    </Panel>
  );
};

export default Page;
