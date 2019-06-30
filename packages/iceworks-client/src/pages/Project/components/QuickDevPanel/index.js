import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import useTask from '@hooks/useTask';
import writeGlobalLog from '@utils/writeGlobalLog';
import TaskItem from '../TaskItem';

const QuickDevPanel = ({ intl }) => {
  function writeLog() {
    const msg = intl.formatMessage({ id: 'iceworks.task.dev.start.msg' });
    writeGlobalLog(msg);
  }

  const { status, onStart, onStop } = useTask({ type: 'build', writeLog });

  return (
    <TaskItem
      title="启动服务"
      desc="编译和热更新，用于开发环境"
      icon="builder"
      path="/task/dev"
      status={status}
      onStart={onStart}
      onStop={onStop}
    />
  );
};


QuickDevPanel.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(QuickDevPanel);
