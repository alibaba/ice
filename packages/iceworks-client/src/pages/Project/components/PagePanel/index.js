import React, { useState } from 'react';
import moment from 'moment';
import { Message } from '@alifd/next';
import Icon from '@components/Icon';
import useModal from '@hooks/useModal';
import logger from '@utils/logger';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';
import DeletePageModal from './DeletePageModal';
import BuildPageModal from './BuildPageModal';

const PagePanel = () => {
  const [deleteName, setDeleteName] = useState('');
  const {
    on: onDeleteModal,
    toggleModal: toggleDeleteModal,
  } = useModal();
  const {
    on: onBuildPageModal,
    setModal: setBuildPageModal,
  } = useModal();
  const [pages] = stores.useStores(['pages']);
  const menuStore = stores.useStore('menu');
  const routerStore = stores.useStore('routes');
  const { dataSource } = pages;

  function onRefresh() {
    pages.refresh();
  }

  function onCreate() {
    setBuildPageModal(true);
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

    setBuildPageModal(false);

    Message.show({
      align: 'tr tr',
      type: 'success',
      content: '创建页面成功',
    });

    pages.refresh();
    menuStore.refresh();
    routerStore.refresh();
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
            <Icon className={styles.icon} title="刷新" type="reload" size="small" onClick={onRefresh} />
            <Icon className={styles.icon} title="添加页面" type="plus" size="small" onClick={onCreate} />
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
        {onBuildPageModal ? <BuildPageModal
          on={onBuildPageModal}
          onCancel={() => setBuildPageModal(false)}
          onOk={createPage}
        /> : null}
        {
          dataSource.length ?
            <div>
              <ul>
                {dataSource.map(({ name, birthtime }) => {
                  return (
                    <li className={styles.item} key={name}>
                      <strong>{name}</strong>
                      <time>{moment(birthtime).format('YYYY-MM-DD hh:mm')}</time>
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

export default PagePanel;
