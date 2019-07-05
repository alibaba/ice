import stores from '@stores';
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';
import { useState } from 'react';
import { Message } from '@alifd/next';
import writeGlobalLog from '@utils/writeGlobalLog';
import showMessage from '@utils/showMessage';

export const STATUS_RESETING = 'reseting';

function useDependency(diableUseSocket) {
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
  const [dependenciesStore, globalTerminalStore] = stores.useStores(['dependencies', 'globalTerminal']);
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
    globalTerminalStore.show();
  }

  async function bulkCreate(values, force) {
    try {
      await dependenciesStore.bulkCreate(values, force);
      setCreateModal(false);
      globalTerminalStore.show();
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
    globalTerminalStore.show();
  }

  if (!diableUseSocket) {
    useSocket('adapter.dependency.reset.data', writeGlobalLog);

    useSocket('adapter.dependency.reset.exit', (code) => {
      if (code === 0) {
        showMessage('项目依赖安装成功', 'success');
        dependenciesStore.refresh();
      } else {
        showMessage('项目依赖安装失败，请查看控制台日志输出');
      }
    });

    useSocket('adapter.dependency.upgrade.data', writeGlobalLog);

    useSocket('adapter.dependency.upgrade.exit', (code) => {
      if (code === 0) {
        showMessage('项目依赖更新成功', 'success');
        dependenciesStore.refresh();
      } else {
        showMessage('项目依赖更新失败，请查看控制台日志输出');
      }
    });

    useSocket('adapter.dependency.install.data', writeGlobalLog);

    useSocket('adapter.dependency.install.exit', (code) => {
      if (code === 0) {
        showMessage('项目依赖安装成功', 'success');
        dependenciesStore.refresh();
      } else {
        showMessage('项目依赖安装失败，请查看控制台日志输出');
      }
    });
  }

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
