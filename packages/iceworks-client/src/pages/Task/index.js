import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Message } from '@alifd/next';
import useSocket from '@hooks/useSocket';
import useModal from '@hooks/useModal';
import Card from '@components/Card';
import TaskBar from '@components/TaskBar';
import XtermTerminal from '@components/XtermTerminal';
import stores from '@stores';
import termManager from '@utils/termManager';
import taskStores from './stores';
import TaskModal from './components/TaskModal';
import styles from './index.module.scss';

function showMessage(message) {
  Message.show({
    type: 'error',
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
  const { on, toggleModal } = useModal();
  const type = getType(history.location.pathname);
  const [status, setStatus] = useState('');

  async function onStart() {
    try {
      await task.start(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onStop() {
    try {
      await task.stop(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onSetting() {
    try {
      await task.getSetting(type);
      toggleModal();
    } catch (error) {
      showMessage(error.message);
    }
  }

  const id = `${project.dataSource.name}.${type}`;
  const startEventName = `project.task.start.data.${type}`;
  const stopEventName = `project.task.stop.data.${type}`;

  // listen start envent handle
  useSocket(startEventName, (data) => {
    setStatus(data.status);
    termManager.formatWrite(id, data.chunk);
  }, [status]);

  // listen stop envent handle
  useSocket(stopEventName, (data) => {
    setStatus(data.status);
    termManager.formatWrite(id, data.chunk);
  }, [status]);

  const data = task.dataSource[type] ? task.dataSource[type] : {};

  return (
    <Card
      title={intl.formatMessage({ id: `iceworks.task.${type}.title` })}
      subTitle={intl.formatMessage({ id: `iceworks.task.${type}.desc` })}
      contentHeight="100%"
      className={styles.taskCard}
    >
      <TaskBar
        loading={status === 'working'}
        onStart={onStart}
        onStop={onStop}
        onSetting={onSetting}
      />

      <div className={styles.content}>
        <XtermTerminal id={id} name={project.dataSource.name} />
      </div>

      <TaskModal on={on} data={data.setting || []} toggleModal={toggleModal} />
    </Card>
  );
};

Task.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Task);
