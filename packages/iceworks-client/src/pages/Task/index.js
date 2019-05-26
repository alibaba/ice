import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Message } from '@alifd/next';
import Card from '@components/Card';
import TerminalBar from '@components/TerminalBar';
import XtermTerminal from '@components/XtermTerminal';
import useModal from '@hooks/useModal';
import stores from '@stores';
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
      await task.setting(type);
      toggleModal();
    } catch (error) {
      showMessage(error.message);
    }
  }

  const data = task.dataSource[type] ? task.dataSource[type] : {};

  return (
    <Card
      title={intl.formatMessage({ id: `iceworks.task.${type}.title` })}
      subTitle={intl.formatMessage({
        id: `iceworks.task.${type}.desc`,
      })}
      contentHeight="100%"
      className={styles.taskCard}
    >
      <TerminalBar
        isWorking={data.status === 'working'}
        onStart={onStart}
        onStop={onStop}
        onSetting={onSetting}
      />

      <div className={styles.content}>
        <XtermTerminal
          name={project.dataSource.name}
          id={type}
          startEventName={`project.task.${type}.start.data`}
          stopEventName={`project.task.${type}.stop.data`}
        />
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
