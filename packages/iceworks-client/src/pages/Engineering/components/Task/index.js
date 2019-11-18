import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import showMessage from '@utils/showMessage';
import useModal from '@hooks/useModal';
import useTask from '@hooks/useTask';
import useTermTheme from '@hooks/useTermTheme';
import Card from '@components/Card';
import TaskBar from '@components/TaskBar';
import XtermTerminal from '@components/XtermTerminal';
import { withErrorBoundary } from '@components/ErrorBoundary';
import Modal from '@components/Modal';
import termManager from '@utils/termManager';
import logger from '@utils/logger';
import stores from '@stores';
import TaskModal from '../TaskModal';
import styles from './index.module.scss';

function getType(pathname) {
  if (!pathname) {
    return null;
  }
  const arr = pathname.split('/');
  return arr[arr.length - 1];
}

const Task = ({ history, intl }) => {
  const [projectStore, taskStore] = stores.useStores(['project', 'task']);
  const { dataSource, getConf } = taskStore;
  const { on, toggleModal } = useModal();
  const type = getType(history.location.pathname);
  const id = `${projectStore.dataSource.name}.${type}`;
  const conf = (dataSource[type] && dataSource[type].conf) || [];
  const { termTheme } = useTermTheme();

  function writeLog(taskType) {
    const msg = intl.formatMessage({
      id: `iceworks.task.${taskType}.start.msg`,
    });
    const term = termManager.find('globalTerminal');
    term.writeLog(msg);
  }

  function writeChunk(data, isStdout) {
    const term = termManager.find(id);
    term.writeChunk(data, isStdout);
  }

  async function onGetConf() {
    try {
      await getConf(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onSetting() {
    try {
      await onGetConf();
      toggleModal();
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onConfirm(values) {
    if (Object.entries(values).length === 0) {
      return;
    }

    const params = {};
    Object.keys(values).forEach(key => {
      // eslint-disable-next-line valid-typeof
      if (typeof values[key] !== undefined) {
        params[key] = values[key];
      }
    });

    logger.info(params);

    try {
      await taskStore.setConf(type, params);
      showMessage('配置修改成功', 'success');
    } catch (error) {
      showMessage(error);
    }
  }

  useEffect(() => {
    onGetConf();
  }, []);

  const {
    isWorking,
    onStart,
    onStop,
    installDependencyVisible,
    onInstallDependencyCancel,
    onInstallDependencyOk,
  } = useTask({ type, writeLog, writeChunk });

  return (
    <Card
      title={intl.formatMessage({ id: `iceworks.task.${type}.title` })}
      subTitle={intl.formatMessage({ id: `iceworks.task.${type}.desc` })}
      contentHeight="100%"
      className={styles.taskCard}
    >
      <TaskBar
        isWorking={isWorking}
        onStart={onStart}
        onStop={onStop}
        onSetting={onSetting}
        enableSetting={conf.length !== 0}
      />

      <div className={styles.content}>
        <XtermTerminal
          id={id}
          name={projectStore.dataSource.name}
          options={{
            theme: termTheme,
            scrollback: 5000,
            disableStdin: true,
            useFlowControl: true,
          }}
          autoSize
        />
      </div>

      <TaskModal
        on={on}
        data={conf}
        toggleModal={toggleModal}
        onConfirm={onConfirm}
      />

      <Modal
        title={<FormattedMessage id="iceworks.project.install.dependencies.title" />}
        visible={installDependencyVisible}
        onCancel={onInstallDependencyCancel}
        onOk={onInstallDependencyOk}
      >
        <FormattedMessage id="iceworks.project.install.dependencies.content" />
      </Modal>
    </Card>
  );
};

Task.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(withErrorBoundary(Task));
