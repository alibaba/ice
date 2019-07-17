import { useEffect } from 'react';
import useSocket from '@hooks/useSocket';
import showMessage from '@utils/showMessage';
import stores from '@stores';

const useTask = ({ type, writeLog, writeChunk }) => {
  const taskStore = stores.useStore('task');
  const { dataSource, setStatus, getStatus } = taskStore;
  const status = (dataSource[type] && dataSource[type].status) || 'stop';
  const startEventName = `adapter.task.start.data.${type}`;
  const stopEventName = `adapter.task.stop.data.${type}`;
  const taskErrorEventName = `adapter.task.error`;

  async function onStart() {
    try {
      writeLog(type);
      await taskStore.start(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onStop() {
    try {
      writeLog(type);
      await taskStore.stop(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function onGetStatus() {
    try {
      await getStatus(type);
    } catch (error) {
      showMessage(error.message);
    }
  }

  function taskEventListener(data) {
    setStatus(type, data.status);
    if (writeChunk) {
      writeChunk(data.chunk);
    }
  }

  useEffect(() => {
    onGetStatus();
  }, []);

  // listen start event handle
  useSocket(startEventName, data => taskEventListener(data), [status]);

  // listen stop event handle
  useSocket(stopEventName, data => taskEventListener(data), [status]);

  // listen event error
  useSocket(taskErrorEventName, error => showMessage(error.message));

  return {
    isWorking: status === 'working',
    onStart,
    onStop,
  };
};

export default useTask;
