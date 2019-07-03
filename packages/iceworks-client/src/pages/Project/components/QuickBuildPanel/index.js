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

  const { isWorking, onStart, onStop } = useTask({ type: 'build', writeLog });

  return (
    <TaskItem
      title={intl.formatMessage({ id: 'iceworks.task.build.title' })}
      desc={intl.formatMessage({ id: 'iceworks.task.build.desc' })}
      icon="builder"
      path="/task/build"
      isWorking={isWorking}
      onStart={onStart}
      onStop={onStop}
    />
  );
};


QuickDevPanel.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(QuickDevPanel);
