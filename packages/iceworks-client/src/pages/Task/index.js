import React from 'react';
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
    content: message || 'Plase try again',
    align: 'tr tr',
  });
}

const Task = () => {
  const project = stores.useStore('project');
  const task = taskStores.useStore('task');
  const { on, toggleModal } = useModal();

  async function onStart() {
    try {
      await task.start();
    } catch (error) {
      showMessage(error);
    }
  }

  async function onStop() {
    try {
      await task.stop();
    } catch (error) {
      showMessage(error);
    }
  }

  async function onSetting() {
    try {
      await task.setting();
      toggleModal();
    } catch (error) {
      showMessage(error);
    }
  }

  return (
    <Card
      title="语法检查"
      subTitle="用于开发环境"
      contentHeight="100%"
      className={styles.taskCard}
    >
      <TerminalBar
        isWorking={task.dataSource.status === 'working'}
        onStart={onStart}
        onStop={onStop}
        onSetting={onSetting}
      />

      <div className={styles.content}>
        <XtermTerminal
          name={project.dataSource.name}
          startEventName="project.task.start.data"
          stopEventName="project.task.stop.data"
        />
      </div>

      <TaskModal
        on={on}
        data={task.dataSource.setting}
        toggleModal={toggleModal}
      />
    </Card>
  );
};

export default Task;
