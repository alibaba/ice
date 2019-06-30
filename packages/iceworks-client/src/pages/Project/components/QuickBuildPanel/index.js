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
      title="构建项目"
      desc="编译并压缩，用于生产环境"
      icon="builder"
      path="/task/build"
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
