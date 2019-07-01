import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button } from '@alifd/next';
import Icon from '@components/Icon';
import TaskButton from '@components/TaskButton';
import Panel from '../Panel';
import styles from './index.module.scss';

const TaskItem = ({ title, desc, icon, path, history, status, onStart, onStop }) => {
  function renderHeader() {
    return (
      <div className={styles.header}>
        <h3><FormattedMessage id="iceworks.project.panel.task.title" /></h3>
      </div>
    );
  }

  function handleClick() {
    history.push(path);
  }

  return (
    <Panel header={renderHeader()}>
      <div className={styles.taskItem}>
        <div className={styles.taskInfo}>
          <Icon type={icon} />
          <h5 className={styles.title}>{title}</h5>
          <p className={styles.desc}>（{desc}）</p>
        </div>
        <div className={styles.taskAction}>
          <TaskButton
            status={status}
            onStart={onStart}
            onStop={onStop}
          />
          <Button type="normal" onClick={handleClick} className={styles.settingButton}>
            <Icon type="settings" className={styles.settingIcon} />
            <FormattedMessage id="iceworks.task.setting" />
          </Button>
        </div>
      </div>
    </Panel>
  );
};


TaskItem.defaultProps = {
  status: false,
  onStart: () => {},
  onStop: () => {},
};

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

export default withRouter(TaskItem);
