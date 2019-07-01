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

  const { status, onStart, onStop } = useTask({ type: 'dev', writeLog });

  return (
    <TaskItem
      title={intl.formatMessage({ id: 'iceworks.task.dev.title' })}
      desc={intl.formatMessage({ id: 'iceworks.task.dev.desc' })}
      icon="dev"
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
