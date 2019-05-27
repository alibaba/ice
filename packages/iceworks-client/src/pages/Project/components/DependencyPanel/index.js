import React from 'react';
import { Icon, Tab, Dialog, Message } from '@alifd/next';
import classNames from 'classnames';
import useSocket from '@hooks/useSocket';
import { FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import logger from '@utils/logger';
import CreateDependencyModel from './CreateDependencyModel';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const { Item: TabPane } = Tab;

const STATUS_RESETING = 'reseting';

const DependencyPanel = () => {
  const {
    on: onCreateModel,
    toggleModal: toggleCreateModal,
  } = useModal();
  const dependenciesStore = stores.useStore('dependencies');
  const { dataSource } = dependenciesStore;
  const { dependencies, devDependencies } = dataSource;

  async function onCreate() {
    if (dataSource.status === STATUS_RESETING) {
      return;
    }

    toggleCreateModal();
  }

  async function onRefresh() {
    await dependenciesStore.refresh();
  }

  async function onReset() {
    if (dataSource.status === STATUS_RESETING) {
      return;
    }

    Dialog.confirm({
      title: '安装项目依赖',
      content: (
        <div className={styles.confirmContent}>
          将重置安装项目所有依赖，安装期间无法进启动调试服务、新建页面、构建项目操作，请耐心等待。
        </div>
      ),
      onOk: () => {
        dependenciesStore.setStatus(STATUS_RESETING);
        dependenciesStore.reset();
      },
    });
  }

  async function onUpgrade(packageName, isDev) {
    dependenciesStore.upgrade({ package: packageName, isDev });
  }

  async function create(value) {
    try {
      await dependenciesStore.creates(value);
      toggleCreateModal();
    } catch (error) {
      if (error.code === 'INCOMPATIBLE') {
        Dialog.confirm({
          title: '不兼容性提示',
          content: (
            <div className={styles.confirmContent}>
              新添加的依赖
              {' '}
              {error.info.map(({ pacakge: packageName, version }) => `${packageName}@${version}`).join(',')}
              {' '}
              主版本号与项目依赖
              {error.info.map(({ pacakge: packageName }) => {
                const { specifyVersion } = dependencies.find(({ package: projectPackage }) =>
                  projectPackage === packageName);
                return `${packageName}@${specifyVersion}`;
              }).join(',')}
              {' '}
              主版本号发生改变可能存在不兼容的 API 修改，确定要继续吗？
            </div>
          ),
          onOk: async () => {
            await dependenciesStore.creates(value, true);
            toggleCreateModal();
          },
        });
      }
    }
  }

  useSocket('project.dependency.reset.data', (data) => {
    logger.info('project.dependency.reset.data', data);
  });

  useSocket('project.dependency.reset.exit', (code) => {
    if (code === 0) {
      Message.show({
        align: 'tr tr',
        type: 'success',
        content: '项目依赖安装成功',
      });
      dependenciesStore.refresh();
    } else {
      Message.error({
        align: 'tr tr',
        type: 'error',
        title: '项目依赖安装失败',
        content: '请查看控制台日志输出',
      });
    }
  });

  useSocket('project.dependency.upgrade.data', (data) => {
    logger.info('project.dependency.upgrade.data', data);
  });

  useSocket('project.dependency.upgrade.exit', (code) => {
    if (code === 0) {
      Message.show({
        align: 'tr tr',
        type: 'success',
        title: '项目依赖更新成功',
        content: '依赖列表已经刷新',
      });
      dependenciesStore.refresh();
    } else {
      Message.error({
        align: 'tr tr',
        type: 'error',
        title: '项目依赖更新失败',
        content: '请查看控制台日志输出',
      });
    }
  });

  useSocket('project.dependency.install.data', (data) => {
    logger.info('project.dependency.install.data', data);
  });

  useSocket('project.dependency.install.exit', (code) => {
    if (code === 0) {
      Message.show({
        align: 'tr tr',
        type: 'success',
        title: '项目依赖安装成功',
        content: '依赖列表已经刷新',
      });
      dependenciesStore.refresh();
    } else {
      Message.show({
        align: 'tr tr',
        type: 'error',
        title: '项目依赖安装失败',
        content: '请查看控制台日志输出',
      });
    }
  });

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.dependency.title" /></h3>
          <div className={styles.icons}>
            <Icon
              className={styles.icon}
              type="refresh"
              size="small"
              onClick={onRefresh}
              title="刷新依赖"
            />
            <Icon
              className={
                classNames({
                  [styles.icon]: true,
                  [styles.reseting]: dataSource.status === STATUS_RESETING,
                })
              }
              type="download"
              size="small"
              onClick={onReset}
              title="重装依赖"
            />
            <Icon
              className={
                classNames({
                  [styles.icon]: true,
                  [styles.reseting]: dataSource.status === STATUS_RESETING,
                })
              }
              type="add"
              size="small"
              onClick={onCreate}
              title="添加依赖"
            />
          </div>
        </div>
      }
    >
      <div className={styles.main}>
        <CreateDependencyModel
          title="添加依赖"
          on={onCreateModel}
          onCancel={toggleCreateModal}
          onOk={create}
        />
        <Tab size="small" contentStyle={{ padding: '10px 0 0' }}>
          {
            [['dependencies', dependencies], ['devDependencies', devDependencies, true]].map(([key, deps, isDev]) => {
              return (
                <TabPane
                  title={
                    <div>
                      <strong>{key}</strong>
                      <span>({Object.keys(deps).length})</span>
                    </div>
                  }
                  key={key}
                >
                  <div className={styles.list}>
                    {
                      deps.map(({ package: packageName, localVersion, wantedVestion }) => {
                        return (
                          <div key={packageName} className={styles.item}>
                            <div className={styles.package}>
                              {packageName}
                            </div>
                            <div className={styles.info}>
                              <div className={styles.version}>{localVersion || '-'}</div>
                              {
                                wantedVestion ?
                                  <div title={`可升级到 ${wantedVestion}`}>
                                    <Icon type="download" size="xs" className={styles.download} onClick={() => onUpgrade(packageName, isDev)} />
                                  </div> :
                                  null
                              }
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </TabPane>
              );
            })
          }
        </Tab>
      </div>
    </Panel>
  );
};

export default DependencyPanel;
