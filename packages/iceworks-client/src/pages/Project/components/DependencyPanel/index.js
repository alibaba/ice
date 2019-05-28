import React, { useState } from 'react';
import { Icon, Tab, Message } from '@alifd/next';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useSocket from '@hooks/useSocket';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';
import useModal from '@hooks/useModal';
import logger from '@utils/logger';
import CreateDependencyModal from './CreateDependencyModal';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const { Item: TabPane } = Tab;

const STATUS_RESETING = 'reseting';

const DependencyItem = ({
  package: packageName, localVersion, wantedVestion, isDev, onUpgrade,
}) => {
  return (
    <div key={packageName} className={styles.item}>
      <div className={styles.package}>
        {packageName}
      </div>
      <div className={styles.info}>
        <div className={styles.version}>{localVersion || '-'}</div>
        {
          wantedVestion ?
            <div title={<FormattedMessage id="iceworks.project.panel.dependency.main.upgrade" values={{ wantedVestion }} />}>
              <Icon type="download" size="xs" className={styles.download} onClick={() => onUpgrade(packageName, isDev)} />
            </div> :
            null
        }
      </div>
    </div>
  );
};

DependencyItem.defaultProps = {
  package: '',
  localVersion: '',
  wantedVestion: '',
  isDev: false,
  onUpgrade: () => {},
};

DependencyItem.propTypes = {
  package: PropTypes.string,
  localVersion: PropTypes.string,
  wantedVestion: PropTypes.string,
  isDev: PropTypes.bool,
  onUpgrade: PropTypes.func,
};

const DependencyPanel = () => {
  const {
    on: onCreateModal,
    toggleModal: toggleCreateModal,
  } = useModal();
  const {
    on: onResetModal,
    toggleModal: toggleResetModal,
  } = useModal();
  const {
    on: onIncompatibleModal,
    toggleModal: toggleIncompatibleModal,
  } = useModal();
  const [createValues, setCreateValues] = useState('');
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

    toggleResetModal();
  }

  async function onUpgrade(packageName, isDev) {
    dependenciesStore.upgrade({ package: packageName, isDev });
  }

  async function create(value) {
    try {
      await dependenciesStore.bulkCreate(value);
      toggleCreateModal();
    } catch (error) {
      if (error.code === 'INCOMPATIBLE') {
        setCreateValues({ setDependcies: value, incompatibleDependencies: error.info });
        toggleIncompatibleModal();
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

  const { setDependencies, incompatibleDependencies = [] } = createValues;
  const setDependencyText = incompatibleDependencies.map(({ pacakge: packageName, version }) => `${packageName}@${version}`).join(',');
  const projectDependencyText = incompatibleDependencies.map(({ pacakge: packageName }) => {
    const { specifyVersion } = dependencies.find(({ package: projectPackage }) =>
      projectPackage === packageName);
    return `${packageName}@${specifyVersion}`;
  }).join(',');

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.dependency.title" /></h3>
          <div className={styles.icons}>
            <FormattedMessage id="iceworks.project.panel.dependency.main.refresh">
              {(title) => (
                <Icon
                  className={styles.icon}
                  type="refresh"
                  size="small"
                  onClick={onRefresh}
                  title={title}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="iceworks.project.panel.dependency.main.download">
              {(title) => (
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
                  title={title}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="iceworks.project.panel.dependency.main.add">
              {(title) => (<Icon
                className={
                  classNames({
                    [styles.icon]: true,
                    [styles.reseting]: dataSource.status === STATUS_RESETING,
                  })
                }
                type="add"
                size="small"
                onClick={onCreate}
                title={title}
              />)}
            </FormattedMessage>
          </div>
        </div>
      }
    >
      <div className={styles.main}>
        <CreateDependencyModal
          on={onCreateModal}
          onCancel={toggleCreateModal}
          onOk={create}
        />
        <Modal
          title={<FormattedMessage id="iceworks.project.panel.dependency.main.reset.title" />}
          visible={onResetModal}
          onCancel={() => toggleResetModal()}
          onOk={() => {
            dependenciesStore.setStatus(STATUS_RESETING);
            dependenciesStore.reset();
          }}
        >
          <div className={styles.confirmContent}>
            <FormattedMessage id="iceworks.project.panel.dependency.main.reset.content" />
          </div>
        </Modal>
        <Modal
          title={<FormattedMessage id="iceworks.project.panel.dependency.main.incompatible.title" />}
          visible={onIncompatibleModal}
          onCancel={() => toggleIncompatibleModal()}
          onOk={async () => {
            await dependenciesStore.bulkCreate(setDependencies, true);
            toggleCreateModal();
          }}
        >
          <div>
            <FormattedMessage
              id="iceworks.project.panel.dependency.main.incompatible.content"
              values={{ setDependencyText, projectDependencyText }}
            />
          </div>
        </Modal>
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
                      deps.map((dep, index) => (<DependencyItem
                        {...dep}
                        isDev={isDev}
                        onUpgrade={onUpgrade}
                        key={index}
                      />))
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
