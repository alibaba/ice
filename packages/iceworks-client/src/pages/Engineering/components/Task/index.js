import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Message } from '@alifd/next';
import useSocket from '@hooks/useSocket';
import useModal from '@hooks/useModal';
import useTermTheme from '@hooks/useTermTheme';
import Card from '@components/Card';
import TaskBar from '@components/TaskBar';
import XtermTerminal from '@components/XtermTerminal';
import { withErrorBoundary } from '@components/ErrorBoundary';
import { ThemeContext } from '@components/ThemeProvider';
import stores from '@stores';
import termManager from '@utils/termManager';
import logger from '@utils/logger';
import taskStores from './stores';
import TaskModal from './components/TaskModal';
import styles from './index.module.scss';

function showMessage(message, type) {
  Message.show({
    type: type || 'error',
    title: 'Message',
    content: message || 'Plase try again',
    align: 'tr tr',
  });
}

function getType(pathname) {
  if (!pathname) {
    return null;
  }
  const arr = pathname.split('/');
  return arr[arr.length - 1];
}

const Task = ({ history, intl }) => {
  const project = stores.useStore('project');
  const task = taskStores.useStore('task');
  const { dataSource, setStatus, getStatus, getConf } = task;
  const { on, toggleModal } = useModal();
  const type = getType(history.location.pathname);
  const { theme } = useContext(ThemeContext);

  const writeLog = (t) => {
    const msg = intl.formatMessage({ id: `iceworks.task.${t}.start.msg` });

    const term = termManager.find('globalTerminal');
    term.writeLog(msg);
  };

  async function onStart() {
    try {
      writeLog(type);
      await task.start(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onStop() {
    try {
      writeLog(type);
      await task.stop(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onSetting() {
    try {
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
      await task.setConf(type, params);
      Message.show({
        type: 'success',
        title: '提示',
        content: '配置修改成功',
        align: 'tr tr',
      });
    } catch (error) {
      Message.show({
        type: 'error',
        title: '提示',
        content: error.message,
        align: 'tr tr',
      });
    }
  }

  async function onGetStatus() {
    try {
      writeLog(type);
      await getStatus(type);
      await getConf(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  useEffect(() => {
    onGetStatus();
  }, []);

  const id = `${project.dataSource.name}.${type}`;
  const startEventName = `adapter.task.start.data.${type}`;
  const stopEventName = `adapter.task.stop.data.${type}`;
  const { termTheme } = useTermTheme(theme, id);

  const conf = (dataSource[type] && dataSource[type].conf) || [];
  const status = (dataSource[type] && dataSource[type].status) || 'stop';

  // listen start event handle
  useSocket(startEventName, (data) => {
    setStatus(type, data.status);
    const term = termManager.find(id);
    term.writeChunk(data.chunk);
  }, [status]);

  // listen stop event handle
  useSocket(stopEventName, (data) => {
    setStatus(type, data.status);
    const term = termManager.find(id);
    term.writeChunk(data.chunk);
  }, [status]);

  return (
    <Card
      title={intl.formatMessage({ id: `iceworks.task.${type}.title` })}
      subTitle={intl.formatMessage({ id: `iceworks.task.${type}.desc` })}
      contentHeight="100%"
      className={styles.taskCard}
    >
      <TaskBar
        type={type}
        loading={status === 'working'}
        onStart={onStart}
        onStop={onStop}
        onSetting={onSetting}
        enableSetting={conf.length !== 0}
      />

      <div className={styles.content}>
        <XtermTerminal
          id={id}
          name={project.dataSource.name}
          options={{ theme: termTheme }}
        />
      </div>

      <TaskModal
        on={on}
        data={conf}
        toggleModal={toggleModal}
        onConfirm={onConfirm}
      />
    </Card>
  );
};

Task.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(withErrorBoundary(Task));
