import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import useTask from '@hooks/useTask';
import useProject from '@hooks/useProject';
import writeGlobalLog from '@utils/writeGlobalLog';
import TaskItem from '../TaskItem';

const QuickDevPanel = ({ intl, title, description }) => {
  function writeLog() {
    const msg = intl.formatMessage({ id: 'iceworks.task.dev.start.msg' });
    writeGlobalLog(msg, false);
  }

  const task = useTask({ type: 'dev', writeLog });
  const { project = {} } = useProject();
  const { path: projectPath, type: projectType } = project;

  let host;
  let port;
  let protocol;
  let url = '';

  const { dataSource: { dev = {} } } = task;
  if (dev.conf && Array.isArray(dev.conf)) {
    dev.conf.forEach((item) => {
      const { name, componentProps } = item;
      if (name === 'host') {
        host = componentProps.placeholder;
      }

      if (name === 'port') {
        port = componentProps.placeholder;
      }

      if (name === 'https') {
        protocol = componentProps.defaultChecked ? 'https' : 'http';
      }
    });

    url = `${protocol}://${host}:${port}`;
  }

  return (
    <TaskItem
      title={title}
      desc={description}
      icon="dev"
      path="/task/dev"
      taskType="dev"
      projectUrl={url}
      projectPath={projectPath}
      projectType={projectType}
      {...task}
    />
  );
};


QuickDevPanel.propTypes = {
  intl: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default injectIntl(QuickDevPanel);
