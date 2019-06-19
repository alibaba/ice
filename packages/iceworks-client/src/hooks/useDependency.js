import stores from '@stores';
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';
import { useState } from 'react';
import { Message } from '@alifd/next';
import log from '@utils/logger';

const logger = log.getLogger('dependency');

export const STATUS_RESETING = 'reseting';

function useDependency() {
  const {
    on: onCreateModal,
    setModal: setCreateModal,
  } = useModal();
  const {
    on: onResetModal,
    setModal: setResetModal,
  } = useModal();
  const {
    on: onIncompatibleModal,
    setModal: setIncompatibleModal,
  } = useModal();
  const [createValues, setCreateValues] = useState({});
  const dependenciesStore = stores.useStore('dependencies');
  const { dataSource } = dependenciesStore;

  async function onCreate() {
    if (dataSource.status === STATUS_RESETING) {
      return;
    }

    setCreateModal(true);
  }

  async function onReset() {
    if (dataSource.status === STATUS_RESETING) {
      return;
    }

    setResetModal(true);
  }

  async function refresh() {
    await dependenciesStore.refresh();
  }

  async function upgrade(packageName, isDev) {
    dependenciesStore.upgrade({ package: packageName, isDev });
  }

  async function bulkCreate(values, force) {
    try {
      await dependenciesStore.bulkCreate(values, force);
      setCreateModal(false);
    } catch (error) {
      if (error.code === 'INCOMPATIBLE') {
        setCreateValues({ setDependencies: values, incompatibleDependencies: error.info });
        setIncompatibleModal(true);
      }
    }
  }

  async function reset() {
    await dependenciesStore.setStatus(STATUS_RESETING);
    await dependenciesStore.reset();

    setResetModal(false);
  }

  useSocket('adapter.dependency.reset.data', (data) => {
    logger.info('adapter.dependency.reset.data', data);
  });

  useSocket('adapter.dependency.reset.exit', (code) => {
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

  useSocket('adapter.dependency.upgrade.data', (data) => {
    logger.info('adapter.dependency.upgrade.data', data);
  });

  useSocket('adapter.dependency.upgrade.exit', (code) => {
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

  useSocket('adapter.dependency.install.data', (data) => {
    logger.info('adapter.dependency.install.data', data);
  });

  useSocket('adapter.dependency.install.exit', (code) => {
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
  const incompatibleDependencyText = incompatibleDependencies.map(({ pacakge: packageName, version }) => `${packageName}@${version}`).join(',');
  const projectDependencyText = incompatibleDependencies.map(({ pacakge: packageName }) => {
    const { specifyVersion } = dependenciesStore.dataSource.dependencies
      .find(({ package: projectPackage }) => projectPackage === packageName);
    return `${packageName}@${specifyVersion}`;
  }).join(',');

  return {
    // modal
    onCreateModal,
    setCreateModal,
    onResetModal,
    setResetModal,
    onIncompatibleModal,
    setIncompatibleModal,

    // event handles
    onCreate,
    onReset,

    // methond
    bulkCreate,
    upgrade,
    refresh,
    reset,

    // store
    dependenciesStore,

    // state
    setDependencies,
    incompatibleDependencyText,
    projectDependencyText,
  };
}

export default useDependency;
